import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { routeTranslations } from '../../app-routing-module';
import { Language } from '../../services/language';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';
import { buildRoute, OFFICES } from '../../components/header/header';
import { Seg } from '../insurance-services/insurance-services';
import { OFFICE_PAGES, OfficeConfig } from './offices';

/** Sections listed in the "On this page" bar, in the order of OFFICE_PAGE.COMMON.OTP.ITEMS. */
const OTP_IDS = ['visit', 'why-us', 'neighborhoods', 'coverage', 'reviews', 'faqs', 'quote'];

/** Icons for the "Insurance made simple" cards, in content order. */
const WHY_ICONS = ['i-cal', 'i-chat', 'i-pin', 'i-scale', 'i-check'];

/** Insurance type → the detailed quote page the visitor continues to after sending the form. */
const QUOTE_ROUTES: Record<string, string> = {
  auto: 'getAutoQuote',
  home: 'getHomeQuote',
  commercial: 'getCommercialQuote',
  life: 'getLifeQuote',
  health: 'getHealthQuote',
  bond: 'getSuretyQuote',
  other: 'getAQuote',
};

const SCHEMA_ID = 'office-structured-data';
const SITE = 'https://astateinsurance.com';
const C = 'OFFICE_PAGE.COMMON.';

type OpenStatus = 'unknown' | 'open' | 'closed';
type Field = 'name' | 'phone' | 'type';

/**
 * Office page (one per office, chosen from the URL). Text comes from OFFICE_PAGE in the
 * translation files and the language-independent facts from offices.ts.
 */
@Component({
  selector: 'app-office-detail',
  standalone: false,
  templateUrl: './office-detail.html',
  styleUrl: './office-detail.scss',
})
export class OfficeDetail implements AfterViewInit, OnDestroy {
  readonly otpIds = OTP_IDS;
  readonly whyIcons = WHY_ICONS;
  readonly office: OfficeConfig;
  /** Prefix of this office's text in the translation files */
  readonly o: string;
  readonly directionsUrl: string;

  otpOpen = true;
  faqOpen = 0;
  activeSection: string | null = null;
  showSticky = false;
  mapLoaded = false;
  mapUrl?: SafeResourceUrl;

  status: OpenStatus = 'unknown';
  statusKey = C + 'HOURS.DEFAULT';
  today = -1;

  form = { name: '', phone: '', type: '', lang: '', time: '', method: 'call' };
  errors: Partial<Record<Field, string>> = {};
  isSubmitting = false;

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
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    const slug = this.router.url.split(/[?#]/)[0].split('/').filter(Boolean).pop();
    this.office = OFFICE_PAGES.find((p) => p.id === slug) ?? OFFICE_PAGES[0];
    this.o = `OFFICE_PAGE.OFFICES.${this.office.key}.`;
    this.directionsUrl = OFFICES.find((x) => x.id === this.office.id)?.directionsUrl ?? this.office.placeUrl;
    this.form.lang = this.lang;
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        this.listCache.clear();
        this.segCache.clear();
        this.addStructuredData();
      }),
    );
    this.addStructuredData();
  }

  get lang(): 'en' | 'es' {
    return this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en';
  }

  route(page: string, officeId?: string): string[] {
    return buildRoute(this.languageService, page, officeId);
  }

  /** This page in the other language, for the language band. */
  otherLanguageRoute(): string[] {
    const other = this.lang === 'es' ? 'en' : 'es';
    const segments = routeTranslations['ourLocations/:id'][other].replace(':id', this.office.id).split('/');
    return other === 'en' ? ['/', ...segments] : ['/', 'es', ...segments];
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

  starWidth(rating: number): string {
    return `${(rating / 5) * 100}%`;
  }

  /** Google Maps links in the page language. */
  get placeUrl(): string {
    return this.lang === 'es' ? `${this.office.placeUrl}&hl=es` : this.office.placeUrl;
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.mq = window.matchMedia('(min-width:768px)');
    this.mq.addEventListener('change', this.onMqChange);
    this.onMqChange();

    this.updateStatus();
    this.statusTimer = setInterval(() => this.updateStatus(), 60000);

    if (!('IntersectionObserver' in window)) return;

    // Sticky mobile bar: hidden while the hero buttons, the quote form or the footer is on screen.
    const watched = ['.hero .btn-row', '#quote']
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

  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  /** The Google map loads only when asked: a faster first load and no third-party request until then. */
  loadMap() {
    const hl = this.lang === 'es' ? '1ses!2sus' : '1sen!2s';
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.office.mapEmbed.split('{hl}').join(hl));
    this.mapLoaded = true;
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

  onBlur(field: 'name' | 'phone') {
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
      const target = bad[0] === 'type' ? 'input[name="oq-type"]' : `#oq-${bad[0]}`;
      this.host.nativeElement.querySelector<HTMLElement>(target)?.focus();
      return;
    }

    const label = (key: string, value: string) => this.list<{ V: string; L: string }>(C + 'QUOTE.' + key).find((x) => x.V === value)?.L ?? value;
    this.isSubmitting = true;
    try {
      const sent = await this.quoteLeadCaptureService.submitLead({
        selected_chip: label('TYPES', this.form.type),
        full_name: this.form.name,
        phone_number: this.form.phone,
        preferred_office: this.office.name,
        // Plain values (en/es/hi, morning/…, call/text) so the backend gets the same words on both sites.
        preferred_language: this.form.lang,
        best_time: this.form.time,
        contact_method: this.form.method,
      });
      if (!sent) return;
      const next = QUOTE_ROUTES[this.form.type] ?? 'getAQuote';
      this.form = { name: '', phone: '', type: '', lang: this.lang, time: '', method: 'call' };
      this.errors = {};
      await this.router.navigate(this.route(next));
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private validate(only?: Field[]): Field[] {
    const want = (f: Field) => !only || only.includes(f);
    const t = (k: string) => this.translate.instant(C + 'QUOTE.' + k);
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
    const k = C + 'HOURS.';
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

  private url(page: string, officeId?: string): string {
    const path = this.route(page, officeId).join('/').replace(/^\/+/, '');
    return `${SITE}/${path ? path + '/' : ''}`;
  }

  private addStructuredData() {
    const faq = this.list<{ Q: string; A: string | Seg[] }>(this.o + 'FAQ');
    if (!faq.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const t = (k: string) => this.translate.instant(k);
    const pageUrl = this.url('ourLocations/:id', this.office.id);
    const name = t(this.o + 'NAME');
    const title = t(this.o + 'TITLE');
    const text = (a: string | Seg[]) => (Array.isArray(a) ? a.map((s) => s.t).join('') : a);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          name: title,
          inLanguage: this.lang === 'es' ? 'es-US' : 'en-US',
          isPartOf: { '@id': SITE + '/#website' },
          about: { '@id': pageUrl + '#office' },
          breadcrumb: { '@id': pageUrl + '#breadcrumb' },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t(C + 'BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: t(C + 'BREADCRUMB.LOCATIONS'), item: this.url('ourLocations') },
            { '@type': 'ListItem', position: 3, name, item: pageUrl },
          ],
        },
        {
          '@type': 'InsuranceAgency',
          '@id': pageUrl + '#office',
          name: `A-State Insurance (${this.office.name})`,
          alternateName: `A-State Insurance – ${name}`,
          url: pageUrl,
          telephone: this.office.tel,
          parentOrganization: { '@id': SITE + '/#agency' },
          address: {
            '@type': 'PostalAddress',
            streetAddress: this.office.address.street,
            addressLocality: this.office.address.city,
            addressRegion: this.office.address.region,
            postalCode: this.office.address.postalCode,
            addressCountry: 'US',
          },
          hasMap: this.office.placeUrl,
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
          availableLanguage: ['English', 'Spanish', 'Hindi'],
          amenityFeature: { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
          areaServed: [
            ...this.office.hoods.map((h) => ({ '@type': 'Place', name: `${h}, Houston, TX` })),
            { '@type': 'State', name: 'Texas' },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': pageUrl + '#faq',
          mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.Q, acceptedAnswer: { '@type': 'Answer', text: text(f.A) } })),
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
