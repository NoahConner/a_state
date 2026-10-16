import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { buildRoute, OFFICES } from '../../components/header/header';
import { Seg } from '../insurance-services/insurance-services';
import { CONTACT_MESSAGE_KEY, ContactMessage } from '../thank-you/thank-you';

/** Sections listed in the "On this page" bar, in the order of CONTACT_PAGE.OTP.ITEMS. */
const OTP_IDS = ['reach', 'message', 'offices', 'answers', 'social'];

/** All profiles from the content doc; a profile without a URL is hidden. */
const SOCIAL = [
  { name: 'Facebook', url: 'https://www.facebook.com/astateinsurancetx' },
  { name: 'Instagram', url: 'https://www.instagram.com/astateinsurance/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@a-state-insurance' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@astateinsurancetx' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/astateinsurance/' },
  { name: 'Snapchat', url: 'https://www.snapchat.com/@astateinsurance' },
  { name: 'X', url: 'https://x.com/astateinsurance' },
  { name: 'Threads', url: 'https://www.threads.com/@astateinsurance' },
];

const SCHEMA_ID = 'contact-structured-data';
const SITE = 'https://astateinsurance.com';

type OpenStatus = 'unknown' | 'open' | 'closed';
type Field = 'name' | 'phone' | 'email' | 'method' | 'type' | 'lang';
/** Fields picked from option chips (radio groups); focus goes to the first option on error. */
const CHOICE_FIELDS: Field[] = ['method', 'type', 'lang'];

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  readonly otpIds = OTP_IDS;
  readonly offices = OFFICES;
  readonly social = SOCIAL.filter((s) => s.url);
  readonly reachCards = [
    { icon: 'i-phone', href: 'tel:+17133577771' },
    { icon: 'i-chat', href: 'sms:+17133577771' },
    { icon: 'i-mail', href: 'mailto:save@astateinsurance.com' },
    // The Visit card links to the Our Locations page (see the template).
    { icon: 'i-pin', href: '' },
  ];

  /** The "On this page" box is open from 768px and collapsible on phones. */
  otpOpen = true;
  faqOpen = 0;
  activeSection: string | null = null;
  showSticky = false;

  // Live open/closed status in Central Time (browser only; the server renders the plain hours).
  status: OpenStatus = 'unknown';
  statusKey = 'CONTACT_PAGE.HOURS.DEFAULT';
  today = -1;

  // Contact form
  form = { name: '', phone: '', email: '', method: 'call', type: '', lang: '', time: '', message: '' };
  errors: Partial<Record<Field, string>> = {};

  private isTablet = true;
  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly segCache = new Map<string, Seg[]>();
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

  segs(value: string | Seg[] | undefined): Seg[] {
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

    this.updateStatus();
    this.statusTimer = setInterval(() => this.updateStatus(), 60000);

    if (!('IntersectionObserver' in window)) return;

    // Sticky mobile bar: hidden while the hero buttons, the message form, the final CTA or the footer is on screen.
    const watched = ['.btn-row', '#message', '#final-cta']
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

  onOtpToggle(event: Event) {
    if (!this.isTablet) this.otpOpen = (event.target as HTMLDetailsElement).open;
  }

  /** One FAQ open at a time keeps the list short on phones. */
  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Contact form ----------

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

  onBlur(field: 'name' | 'phone' | 'email') {
    if (this.form[field]) this.validate([field]);
  }

  setMethod(value: string) {
    this.form.method = value;
    this.errors.method = '';
    if (this.errors.email) this.validate(['email']);
  }

  /** Insurance type and preferred language chips. */
  setChoice(field: 'type' | 'lang', value: string) {
    this.form[field] = value;
    this.errors[field] = '';
  }

  submit(event: Event) {
    event.preventDefault();
    const bad = this.validate();
    if (bad.length) {
      const target = CHOICE_FIELDS.includes(bad[0]) ? `input[name="${bad[0]}"]` : `#c-${bad[0]}`;
      this.host.nativeElement.querySelector<HTMLElement>(target)?.focus();
      return;
    }
    // Hand the details to the thank-you page (personal greeting, reply method, reference).
    const message: ContactMessage = {
      first: this.form.name.trim().split(/\s+/)[0],
      method: this.form.method,
      ref: 'AS-' + String(Date.now()).slice(-6),
      sent: Date.now(),
    };
    try {
      sessionStorage.setItem(CONTACT_MESSAGE_KEY, JSON.stringify(message));
    } catch {
      /* storage blocked: the thank-you page still shows its general message */
    }
    this.router.navigate(this.route('thankyou'), { queryParams: { type: 'contact' } });
  }

  private validate(only?: Field[]): Field[] {
    const want = (f: Field) => !only || only.includes(f);
    const t = (k: string) => this.translate.instant('CONTACT_PAGE.FORM.' + k);
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
      let msg = e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? t('ERR_EMAIL') : '';
      if (!msg && !e && this.form.method === 'email') msg = t('ERR_EMAIL_NEEDED');
      this.errors.email = msg;
      if (msg) bad.push('email');
    }
    // Required choices, in page order.
    const choices: [Field, string][] = [['method', 'ERR_METHOD'], ['type', 'ERR_TYPE'], ['lang', 'ERR_LANG']];
    for (const [field, key] of choices) {
      if (!want(field)) continue;
      this.errors[field] = this.form[field as 'method' | 'type' | 'lang'] ? '' : t(key);
      if (this.errors[field]) bad.push(field);
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
    const k = 'CONTACT_PAGE.HOURS.';
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
    const p = 'CONTACT_PAGE.';
    const faq = this.list<{ Q: string; A?: string; LIST?: { L: string; T: string }[] }>(p + 'FAQ.ITEMS');
    if (!faq.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url('contact');
    const answer = (f: { A?: string; LIST?: { L: string; T: string }[] }) =>
      f.A ?? (f.LIST ?? []).map((i) => `${i.L}: ${i.T}.`).join(' ');
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          name: this.translate.instant(p + 'BREADCRUMB.CURRENT'),
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
          '@type': 'InsuranceAgency',
          '@id': SITE + '/#agency',
          name: 'A-State Insurance',
          url: SITE + '/',
          telephone: '+1-713-357-7771',
          email: 'save@astateinsurance.com',
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              telephone: '+1-713-357-7771',
              email: 'save@astateinsurance.com',
              areaServed: 'US-TX',
              availableLanguage: ['English', 'Spanish', 'Hindi'],
              hoursAvailable: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '19:00',
              },
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': pageUrl + '#faq',
          mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.Q, acceptedAnswer: { '@type': 'Answer', text: answer(f) } })),
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
