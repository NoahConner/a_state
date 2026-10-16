import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { buildRoute } from '../../components/header/header';
import { Seg } from '../insurance-services/insurance-services';
import { CAREERS_APPLICATION_KEY, CareersApplication } from '../thank-you/thank-you';

type Text = string | Seg[];
type Field = 'name' | 'phone' | 'email' | 'langs' | 'area' | 'office' | 'file';
/** Option-chip groups: on error, focus goes to the first option (radio/checkbox name). */
const CHOICE_INPUTS: Partial<Record<Field, string>> = { langs: 'lang', area: 'area', office: 'office' };

/** Sections listed in the "On this page" bar, in the order of CAREERS_PAGE.OTP.ITEMS. */
const OTP_IDS = ['advantage', 'pillars', 'culture', 'benefits', 'hiring', 'openings', 'faqs', 'apply'];

const MAX_FILE = 5 * 1024 * 1024;
const SCHEMA_ID = 'careers-structured-data';
const SITE = 'https://astateinsurance.com';

@Component({
  selector: 'app-careers',
  standalone: false,
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers implements AfterViewInit, OnDestroy {
  readonly otpIds = OTP_IDS;
  readonly pillarIcons = ['i-pin', 'i-heart', 'i-globe'];
  readonly standIcons = ['i-grow', 'i-clock', 'i-shield'];
  readonly benefitIcons = ['i-dollar', 'i-doc', 'i-cal', 'i-user', 'i-chat'];

  /** The "On this page" box is open from 768px and collapsible on phones. */
  otpOpen = true;
  faqOpen = 0;
  activeSection: string | null = null;
  showSticky = false;

  // General application form
  form = { name: '', phone: '', email: '', langs: [] as string[], area: '', office: 'any' };
  file: File | null = null;
  dragOver = false;
  errors: Partial<Record<Field, string>> = {};

  private isTablet = true;
  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly segCache = new Map<string, Seg[]>();
  private readonly subs = new Subscription();
  private stickyObserver?: IntersectionObserver;
  private spyObserver?: IntersectionObserver;
  private mq?: MediaQueryList;
  private readonly onMqChange = () => {
    this.isTablet = !!this.mq?.matches;
    this.otpOpen = this.isTablet;
    this.cdr.detectChanges();
  };

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.form.langs = [this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en'];
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        this.listCache.clear();
        this.segCache.clear();
        this.addStructuredData();
      }),
    );
    this.addStructuredData();
  }

  route(page: string, officeId?: string): string[] {
    return buildRoute(this.languageService, page, officeId);
  }

  /** A translated array, cached because `instant()` returns a new array on every call. */
  list<T = any>(key: string): T[] {
    const cached = this.listCache.get(key);
    if (cached) return cached;
    const value = this.translate.instant(key);
    if (!Array.isArray(value)) return [];
    this.listCache.set(key, value);
    return value;
  }

  segs(value: Text | undefined): Seg[] {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    let cached = this.segCache.get(value);
    if (!cached) this.segCache.set(value, (cached = [{ t: value }]));
    return cached;
  }

  isExternal(href: string): boolean {
    return /^https?:/.test(href);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.mq = window.matchMedia('(min-width:768px)');
    this.mq.addEventListener('change', this.onMqChange);
    this.onMqChange();

    if (!('IntersectionObserver' in window)) return;

    // Sticky mobile bar: hidden while the hero buttons, the application form or the footer is on screen.
    const watched = [this.host.nativeElement.querySelector('.btn-row'), this.host.nativeElement.querySelector('#apply'), this.document.getElementById('footer')]
      .filter((el): el is HTMLElement => !!el);
    const visible = new Set<Element>(watched);
    this.stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      this.showSticky = visible.size === 0;
      this.cdr.detectChanges();
    });
    watched.forEach((el) => this.stickyObserver!.observe(el));

    // "On this page": highlight the section in the middle of the screen.
    this.spyObserver = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        this.activeSection = hit.target.id;
        this.cdr.detectChanges();
        this.scrollOtpLinkIntoView(hit.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    OTP_IDS.forEach((id) => {
      const el = this.host.nativeElement.querySelector(`#${id}`);
      if (el) this.spyObserver!.observe(el);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.mq?.removeEventListener('change', this.onMqChange);
    this.stickyObserver?.disconnect();
    this.spyObserver?.disconnect();
    this.document.getElementById(SCHEMA_ID)?.remove();
  }

  /** In-page links: scroll without changing the route. */
  goToSection(id: string, event: Event) {
    event.preventDefault();
    if (!this.isTablet) this.otpOpen = false;
    if (!this.isBrowser) return;
    setTimeout(() => this.scrollToSection(id));
  }

  /**
   * Scrolls so the section starts right under the sticky header (and the sticky "On this page" bar from 768px).
   * scrollIntoView() would also add the site-wide scroll-padding-top on <html>, stopping too high.
   */
  private scrollToSection(id: string) {
    const el = this.host.nativeElement.querySelector<HTMLElement>(`#${id}`);
    if (!el) return;
    const otp = this.host.nativeElement.querySelector<HTMLElement>('.otp');
    const headerH = parseFloat(getComputedStyle(this.host.nativeElement).getPropertyValue('--header-h')) || 64;
    const otpSticky = !!otp && getComputedStyle(otp).position === 'sticky';
    const offset = headerH + (otpSticky ? otp!.offsetHeight : 0);
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  }

  onOtpToggle(event: Event) {
    if (!this.isTablet) this.otpOpen = (event.target as HTMLDetailsElement).open;
  }

  /** One FAQ open at a time keeps the list short on phones. */
  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Application form ----------

  onInput(field: 'name' | 'email', event: Event) {
    this.form[field] = (event.target as HTMLInputElement).value;
    if (this.errors[field]) this.validate([field]);
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const d = this.digits(input.value).slice(0, 10);
    let out = d;
    if (d.length > 6) out = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    else if (d.length > 3) out = `(${d.slice(0, 3)}) ${d.slice(3)}`;
    input.value = out;
    this.form.phone = out;
    if (this.errors.phone) this.validate(['phone']);
  }

  onBlur(field: 'name' | 'phone' | 'email') {
    if (this.form[field]) this.validate([field]);
  }

  toggleLang(value: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.form.langs = checked ? [...this.form.langs, value] : this.form.langs.filter((v) => v !== value);
    if (this.errors.langs) this.validate(['langs']);
  }

  setOffice(value: string) {
    this.form.office = value;
    if (this.errors.office) this.validate(['office']);
  }

  setArea(value: string) {
    this.form.area = value;
    if (this.errors.area) this.validate(['area']);
  }

  onFileChange(event: Event) {
    this.setFile((event.target as HTMLInputElement).files?.[0] ?? null);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const dropped = event.dataTransfer?.files?.[0];
    if (dropped) this.setFile(dropped);
  }

  submit(event: Event) {
    event.preventDefault();
    const bad = this.validate();
    if (bad.length) {
      const choice = CHOICE_INPUTS[bad[0]];
      const target = choice ? `input[name="${choice}"]` : `#a-${bad[0]}`;
      const el = this.host.nativeElement.querySelector<HTMLElement>(target);
      if (bad[0] === 'file') this.host.nativeElement.querySelector('.drop')?.scrollIntoView({ block: 'center' });
      el?.focus();
      return;
    }
    // Hand the details to the thank-you page (personal greeting, reference, chips).
    const application: CareersApplication = {
      first: this.form.name.trim().split(/\s+/)[0],
      area: this.form.area,
      office: this.form.office,
      ref: 'AP-' + String(Date.now()).slice(-6),
      sent: Date.now(),
    };
    try {
      sessionStorage.setItem(CAREERS_APPLICATION_KEY, JSON.stringify(application));
    } catch {
      /* storage blocked: the thank-you page still shows its general message */
    }
    this.router.navigate(this.route('thankyou'), { queryParams: { type: 'career' } });
  }

  private setFile(file: File | null) {
    this.file = file;
    this.validate(['file']);
  }

  private fileError(): string {
    const t = (k: string, p?: object) => this.translate.instant('CAREERS_PAGE.APPLY.' + k, p);
    if (!this.file) return t('ERR_FILE_EMPTY');
    if (!/\.(pdf|docx)$/i.test(this.file.name)) return t('ERR_FILE_TYPE');
    if (this.file.size > MAX_FILE) return t('ERR_FILE_SIZE', { size: (this.file.size / 1048576).toFixed(1) });
    return '';
  }

  private validate(only?: Field[]): Field[] {
    const want = (f: Field) => !only || only.includes(f);
    const t = (k: string) => this.translate.instant('CAREERS_PAGE.APPLY.' + k);
    const bad: Field[] = [];
    const set = (f: Field, msg: string) => {
      this.errors[f] = msg;
      if (msg) bad.push(f);
    };
    if (want('name')) set('name', this.form.name.trim().length < 2 ? t('ERR_NAME') : '');
    if (want('phone')) {
      const d = this.digits(this.form.phone);
      set('phone', !d ? t('ERR_PHONE_EMPTY') : d.length !== 10 ? t('ERR_PHONE_INVALID') : '');
    }
    if (want('email')) {
      const e = this.form.email.trim();
      set('email', !e ? t('ERR_EMAIL_EMPTY') : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? t('ERR_EMAIL_INVALID') : '');
    }
    if (want('langs')) set('langs', this.form.langs.length ? '' : t('ERR_LANGS'));
    if (want('area')) set('area', this.form.area ? '' : t('ERR_AREA'));
    if (want('office')) set('office', this.form.office ? '' : t('ERR_OFFICE'));
    if (want('file')) set('file', this.fileError());
    return bad;
  }

  private digits(v: string): string {
    return v.replace(/\D/g, '').replace(/^1(?=\d{10})/, '');
  }

  private scrollOtpLinkIntoView(id: string) {
    if (!this.isTablet) return;
    const link = this.host.nativeElement.querySelector<HTMLElement>(`.otp a[href="#${id}"]`);
    const li = link?.parentElement;
    const ol = link?.closest('ol');
    if (!li || !ol) return;
    if (li.offsetLeft < ol.scrollLeft || li.offsetLeft + li.offsetWidth > ol.scrollLeft + ol.clientWidth) {
      ol.scrollLeft = li.offsetLeft - 24;
    }
  }

  // ---------- Structured data (rendered on the server for crawlers) ----------

  private url(page: string): string {
    const path = this.route(page).join('/').replace(/^\/+/, '');
    return `${SITE}/${path ? path + '/' : ''}`;
  }

  private addStructuredData() {
    const p = 'CAREERS_PAGE.';
    const faq = this.list<{ Q: string; A: Text }>(p + 'FAQ.ITEMS');
    if (!faq.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url('careers');
    const plain = (v: Text) => this.segs(v).map((s) => s.t).join('');
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          name: this.translate.instant(p + 'HERO.TITLE'),
          inLanguage: this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US',
          isPartOf: { '@id': SITE + '/#website' },
          about: { '@id': SITE + '/#agency' },
          breadcrumb: { '@id': pageUrl + '#breadcrumb' },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: this.translate.instant(p + 'BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: this.translate.instant(p + 'BREADCRUMB.CURRENT'), item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': pageUrl + '#faq',
          mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.Q, acceptedAnswer: { '@type': 'Answer', text: plain(f.A) } })),
        },
      ],
    };
    const script = this.document.createElement('script');
    script.id = SCHEMA_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}
