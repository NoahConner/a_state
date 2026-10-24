import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';
import { buildRoute, OFFICES } from '../../components/header/header';

/** Sections listed in the "On this page" bar, in the order of GET_QUOTE.OTP.ITEMS. */
const OTP_IDS = ['coverage', 'how-it-works', 'quote', 'why-astate', 'what-you-need', 'offices', 'faqs'];

/**
 * A piece of translated text. Flags are strings ("true") because ngx-translate drops
 * boolean values inside arrays: `hl` red text, `p` pending client placeholder, `b` bold,
 * `es` Spanish phrase inside English copy, `h` link target (tel:, mailto: or #section).
 */
export interface GqSeg { t: string; hl?: boolean | string; p?: boolean | string; b?: boolean | string; es?: boolean | string; h?: string }

/** Coverage cards, in the order of GET_QUOTE.COVERAGE.ITEMS: icon, insurance page, quote page. */
const COVERAGE = [
  { icon: 'i-car', page: 'autoInsurance', quote: 'getAutoQuote' },
  { icon: 'i-home', page: 'homeInsurance', quote: 'getHomeQuote' },
  { icon: 'i-briefcase', page: 'commercialInsurance', quote: 'getCommercialQuote' },
  { icon: 'i-heart', page: 'lifeInsurance', quote: 'getLifeQuote' },
  { icon: 'i-health', page: 'healthInsurance', quote: 'getHealthQuote' },
  { icon: 'i-shield', page: 'suretyBondInsurance', quote: 'getSuretyQuote' },
];

/** Icons for the "Why A-State", "Trusted by Texans" and "What you'll need" lists. */
const WHY_ICONS = ['i-scale', 'i-chat', 'i-pin', 'i-shield', 'i-user'];
const TRUST_ICONS = ['i-star-c', 'i-layers', 'i-doc', 'i-cal'];
const NEED_ICONS = ['i-car', 'i-home', 'i-briefcase', 'i-heart', 'i-health'];

/** Insurance type chip → the detailed quote page the visitor continues to after sending the form. */
const QUOTE_ROUTES: Record<string, string> = {
  auto: 'getAutoQuote',
  home: 'getHomeQuote',
  commercial: 'getCommercialQuote',
  life: 'getLifeQuote',
  health: 'getHealthQuote',
  bond: 'getSuretyQuote',
  unsure: 'requestACustomQuote',
};

/** Office names the backend already receives from the Our Locations form, in OFFICES order. */
const LEAD_OFFICES = ['Shotwell', 'Southwest', 'Post Oak', 'Antoine', 'Airline'];

const SCHEMA_ID = 'get-a-quote-structured-data';
const SITE = 'https://astateinsurance.com';
const P = 'GET_QUOTE.';

type OpenStatus = 'unknown' | 'open' | 'closed';
type Field = 'name' | 'phone' | 'email' | 'zip' | 'type';

@Component({
  selector: 'app-get-a-quote',
  standalone: false,
  templateUrl: './get-a-quote.html',
  styleUrl: './get-a-quote.scss',
})
export class GetAQuote implements AfterViewInit, OnDestroy {
  readonly otpIds = OTP_IDS;
  readonly offices = OFFICES;
  readonly coverage = COVERAGE;
  readonly whyIcons = WHY_ICONS;
  readonly trustIcons = TRUST_ICONS;
  readonly needIcons = NEED_ICONS;

  /** The "On this page" box is open from 768px and collapsible on phones. */
  otpOpen = true;
  faqOpen = 0;
  activeSection: string | null = null;
  showSticky = false;

  // Live open/closed status in Central Time (browser only; the server renders the plain hours).
  status: OpenStatus = 'unknown';
  statusKey = P + 'HOURS.DEFAULT';
  today = -1;

  // Quote form
  form = { name: '', phone: '', email: '', zip: '', type: '', lang: '', office: '', time: '', message: '' };
  errors: Partial<Record<Field, string>> = {};
  isSubmitting = false;

  private isTablet = true;
  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly subs = new Subscription();
  private stickyObserver?: IntersectionObserver;
  private spyObserver?: IntersectionObserver;
  private mq?: MediaQueryList;
  private statusTimer?: ReturnType<typeof setInterval>;
  private readonly onMqChange = () => {
    this.isTablet = !!this.mq?.matches;
    this.otpOpen = this.isTablet;
    this.cdr.detectChanges();
  };

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.form.lang = this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en';
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        this.listCache.clear();
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

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.mq = window.matchMedia('(min-width:768px)');
    this.mq.addEventListener('change', this.onMqChange);
    this.onMqChange();

    this.updateStatus();
    this.statusTimer = setInterval(() => this.updateStatus(), 60000);

    if (!('IntersectionObserver' in window)) return;

    // Sticky mobile bar: hidden while the hero buttons, the quote form, the final CTA or the footer is on screen.
    const watched = ['.hero .btn-row', '#quote', '#final-cta']
      .map((s) => this.host.nativeElement.querySelector(s))
      .concat(this.document.getElementById('footer'))
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
    if (this.statusTimer) clearInterval(this.statusTimer);
    this.document.getElementById(SCHEMA_ID)?.remove();
  }

  /** In-page links: scroll without changing the route. */
  goToSection(id: string, event: Event) {
    event.preventDefault();
    if (!this.isTablet) this.otpOpen = false;
    if (!this.isBrowser) return;
    setTimeout(() => this.host.nativeElement.querySelector(`#${id}`)?.scrollIntoView({ block: 'start' }));
  }

  /** "Start My Free Quote" buttons: jump to the form and focus the first field. */
  goToForm(event: Event) {
    this.goToSection('quote', event);
    if (!this.isBrowser) return;
    setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>('#qf-name')?.focus({ preventScroll: true }), 450);
  }

  /** In-page links inside translated text (e.g. the FAQ pointing to "What You'll Need"). */
  onSegLink(href: string, event: Event) {
    if (href.startsWith('#')) this.goToSection(href.slice(1), event);
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

  // ---------- Quote form ----------

  onNameInput(event: Event) {
    this.form.name = (event.target as HTMLInputElement).value;
    if (this.errors.name) this.validate(['name']);
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

  onEmailInput(event: Event) {
    this.form.email = (event.target as HTMLInputElement).value;
    if (this.errors.email) this.validate(['email']);
  }

  onZipInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 5);
    this.form.zip = input.value;
    if (this.errors.zip) this.validate(['zip']);
  }

  onBlur(field: 'name' | 'phone' | 'email' | 'zip') {
    if (this.form[field]) this.validate([field]);
  }

  setType(value: string) {
    this.form.type = value;
    this.errors.type = '';
  }

  async submit(event: Event) {
    event.preventDefault();
    if (this.isSubmitting) return;
    const bad = this.validate();
    if (bad.length) {
      const target = bad[0] === 'type' ? 'input[name="type"]' : `#qf-${bad[0]}`;
      this.host.nativeElement.querySelector<HTMLElement>(target)?.focus();
      return;
    }

    const type = this.list<{ V: string; L: string }>(P + 'FORM.TYPES').find((t) => t.V === this.form.type);
    const officeIndex = this.offices.findIndex((o) => o.id === this.form.office);

    this.isSubmitting = true;
    try {
      // The lead service has no slot for ZIP code or the free-text note, so those two stay on this page.
      const sent = await this.quoteLeadCaptureService.submitLead({
        selected_chip: type?.L ?? this.form.type,
        full_name: this.form.name,
        phone_number: this.form.phone,
        email: this.form.email,
        preferred_office: officeIndex > -1 ? LEAD_OFFICES[officeIndex] : undefined,
        // Plain values (en/es/hi, morning/…) so the backend gets the same words on both sites.
        preferred_language: this.form.lang,
        best_time: this.form.time,
      });
      if (!sent) return;
      const next = QUOTE_ROUTES[this.form.type] ?? 'getAQuote';
      this.form = { name: '', phone: '', email: '', zip: '', type: '', lang: this.form.lang, office: '', time: '', message: '' };
      this.errors = {};
      await this.router.navigate(this.route(next));
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private validate(only?: Field[]): Field[] {
    const want = (f: Field) => !only || only.includes(f);
    const t = (k: string) => this.translate.instant(P + 'FORM.' + k);
    const bad: Field[] = [];
    if (want('name')) {
      this.errors.name = this.form.name.trim().length < 2 ? t('ERR_NAME') : '';
      if (this.errors.name) bad.push('name');
    }
    if (want('phone')) {
      const d = this.digits(this.form.phone);
      this.errors.phone = !d ? t('ERR_PHONE_EMPTY') : d.length !== 10 ? t('ERR_PHONE_INVALID') : '';
      if (this.errors.phone) bad.push('phone');
    }
    if (want('email')) {
      const e = this.form.email.trim();
      this.errors.email = e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? t('ERR_EMAIL') : '';
      if (this.errors.email) bad.push('email');
    }
    if (want('zip')) {
      const z = this.form.zip;
      this.errors.zip = !z ? t('ERR_ZIP_EMPTY') : !/^\d{5}$/.test(z) ? t('ERR_ZIP_INVALID') : '';
      if (this.errors.zip) bad.push('zip');
    }
    if (want('type')) {
      this.errors.type = this.form.type ? '' : t('ERR_TYPE');
      if (this.errors.type) bad.push('type');
    }
    return bad;
  }

  private digits(v: string): string {
    return v.replace(/\D/g, '').replace(/^1(?=\d{10})/, '');
  }

  // ---------- Open / closed status (Mon–Sat 9 AM–7 PM Central) ----------

  private updateStatus() {
    const parts: Record<string, string> = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date())
      .forEach((p) => (parts[p.type] = p.value));
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts['weekday']);
    const minutes = Number(parts['hour']) * 60 + Number(parts['minute']);
    const weekday = day >= 1 && day <= 6;
    const open = weekday && minutes >= 540 && minutes < 1140;
    this.today = day;
    this.status = open ? 'open' : 'closed';
    const k = P + 'HOURS.';
    if (open) this.statusKey = k + 'OPEN';
    else if (weekday && minutes < 540) this.statusKey = k + 'OPENS_TODAY';
    else if (day === 6 || day === 0) this.statusKey = k + 'OPENS_MONDAY';
    else this.statusKey = k + 'OPENS_TOMORROW';
    this.cdr.detectChanges();
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
    const faq = this.list<{ Q: string; A: GqSeg[] }>(P + 'FAQ.ITEMS');
    if (!faq.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url('getAQuote');
    const current = this.translate.instant(P + 'BREADCRUMB.CURRENT');
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: this.translate.instant(P + 'BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: current, item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': pageUrl + '#faq',
          inLanguage: this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US',
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.Q,
            acceptedAnswer: { '@type': 'Answer', text: f.A.map((s) => s.t).join('') },
          })),
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
