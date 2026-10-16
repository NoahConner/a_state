import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';
import { buildRoute, OFFICES } from '../../components/header/header';
import { Seg } from '../insurance-services/insurance-services';
import { POPULAR_CITIES, TEXAS_CITIES } from './texas-cities';

/** Sections listed in the "On this page" bar, in the order of LOCATIONS_PAGE.OTP.ITEMS. */
const OTP_IDS = ['map', 'offices', 'service-area', 'why-visit', 'quote', 'faqs'];

/**
 * Per-office details from the content doc, in the same order as OFFICES and
 * LOCATIONS_PAGE.OFFICES.ITEMS. `anchor` is the card id the map pins and legend jump to.
 */
const OFFICE_EXTRAS = [
  { anchor: 'office-shotwell', rating: 4.8, reviews: 121 },
  { anchor: 'office-southwest', rating: 4.4, reviews: 32 },
  { anchor: 'office-post-oak', rating: 4.7, reviews: 31 },
  { anchor: 'office-antoine', rating: 4.9, reviews: 43 },
  { anchor: 'office-airline', rating: 5.0, reviews: 30 },
];

/** Map pins, in the order they are drawn (back to front). `office` indexes OFFICES. */
const PINS = [
  { office: 0, x: 262, y: 122, label: 'Shotwell', tx: 14, ty: -12, anchor: 'start' },
  { office: 4, x: 205, y: 92, label: 'Airline', tx: 14, ty: -12, anchor: 'start' },
  { office: 3, x: 130, y: 88, label: 'Antoine', tx: -14, ty: -12, anchor: 'end' },
  { office: 2, x: 178, y: 238, label: 'Post Oak', tx: 14, ty: -12, anchor: 'start' },
  { office: 1, x: 98, y: 226, label: 'Southwest Fwy', tx: 0, ty: 16, anchor: 'middle' },
];

/** Insurance type → the detailed quote page the visitor continues to after sending the form. */
const QUOTE_ROUTES: Record<string, string> = {
  auto: 'getAutoQuote',
  home: 'getHomeQuote',
  business: 'getCommercialQuote',
  life: 'getLifeQuote',
  health: 'getHealthQuote',
  other: 'getAQuote',
};

const SCHEMA_ID = 'locations-structured-data';
const SITE = 'https://astateinsurance.com';
const P = 'LOCATIONS_PAGE.';

type OpenStatus = 'unknown' | 'open' | 'closed';
type Field = 'name' | 'phone' | 'email' | 'type';

interface CityMatch { name: string; pre: string; hit: string; post: string }
interface CityGroup { letter: string; id: string; cities: CityMatch[] }

@Component({
  selector: 'app-our-locations',
  standalone: false,
  templateUrl: './our-locations.html',
  styleUrl: './our-locations.scss',
})
export class OurLocations implements AfterViewInit, OnDestroy {
  readonly otpIds = OTP_IDS;
  readonly offices = OFFICES;
  readonly extras = OFFICE_EXTRAS;
  readonly pins = PINS;
  readonly popularCities = POPULAR_CITIES;
  readonly cityTotal = TEXAS_CITIES.length;
  readonly cityTotalText = TEXAS_CITIES.length.toLocaleString('en-US');

  /** The "On this page" box is open from 768px and collapsible on phones. */
  otpOpen = true;
  faqOpen = 0;
  activeSection: string | null = null;
  showSticky = false;

  // Live open/closed status in Central Time (browser only; the server renders the plain hours).
  status: OpenStatus = 'unknown';
  statusKey = P + 'HOURS.DEFAULT';
  today = -1;

  // City directory: collapsed until opened; a search always shows the matches.
  dirOpen = false;
  query = '';
  groups: CityGroup[] = [];
  /** Letters that have at least one city, matching or not, for the A–Z index. */
  readonly letters: string[];
  matchCount = TEXAS_CITIES.length;

  // Quote form
  form = { name: '', phone: '', email: '', type: '', office: 'any' };
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
    private router: Router,
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.letters = [...new Set(TEXAS_CITIES.map((c) => this.fold(c).charAt(0).toUpperCase()))];
    this.filterCities();
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

  /** Width of the filled part of the five-star bar. */
  starWidth(rating: number): string {
    return `${(rating / 5) * 100}%`;
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

  /** In-page links inside translated text (e.g. "map above" in the FAQ). */
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

  // ---------- City directory ----------

  onQuery(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.filterCities();
  }

  clearQuery(input: HTMLInputElement) {
    this.query = '';
    input.value = '';
    this.filterCities();
    input.focus();
  }

  toggleDirectory() {
    this.dirOpen = !this.dirOpen;
  }

  hasLetter(letter: string): boolean {
    return this.groups.some((g) => g.letter === letter);
  }

  goToLetter(letter: string, event: Event) {
    event.preventDefault();
    if (!this.hasLetter(letter) || !this.isBrowser) return;
    this.host.nativeElement.querySelector(`#cities-${letter.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  trackGroup = (_: number, g: CityGroup) => g.letter;
  trackCity = (_: number, c: CityMatch) => c.name;

  /** Matches the start of any word, ignoring case and accents ("san" finds San Antonio and Lake San…). */
  private filterCities() {
    const q = this.fold(this.query.trim());
    const groups = new Map<string, CityMatch[]>();
    let count = 0;
    for (const name of TEXAS_CITIES) {
      const i = q ? this.wordIndex(this.fold(name), q) : -1;
      if (q && i < 0) continue;
      const match = q
        ? { name, pre: name.slice(0, i), hit: name.slice(i, i + q.length), post: name.slice(i + q.length) }
        : { name, pre: name, hit: '', post: '' };
      const letter = this.fold(name).charAt(0).toUpperCase();
      if (!groups.has(letter)) groups.set(letter, []);
      groups.get(letter)!.push(match);
      count++;
    }
    this.groups = [...groups].map(([letter, cities]) => ({ letter, id: `cities-${letter.toLowerCase()}`, cities }));
    this.matchCount = count;
  }

  private fold(s: string): string {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  private wordIndex(key: string, q: string): number {
    let i = -1;
    while ((i = key.indexOf(q, i + 1)) > -1) {
      if (i === 0 || /[\s\-('.]/.test(key.charAt(i - 1))) return i;
    }
    return -1;
  }

  // ---------- Quote form ----------

  /** "Get a Quote" on an office card: pre-select that office and jump to the form. */
  pickOffice(index: number, event: Event) {
    event.preventDefault();
    this.form.office = this.offices[index].id;
    if (!this.isBrowser) return;
    this.host.nativeElement.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>('#lq-name')?.focus({ preventScroll: true }), 450);
  }

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

  setType(value: string) {
    this.form.type = value;
    this.errors.type = '';
  }

  async submit(event: Event) {
    event.preventDefault();
    if (this.isSubmitting) return;
    const bad = this.validate();
    if (bad.length) {
      const target = bad[0] === 'type' ? 'input[name="lq-type"]' : `#lq-${bad[0]}`;
      this.host.nativeElement.querySelector<HTMLElement>(target)?.focus();
      return;
    }

    const type = this.list<{ V: string; L: string }>(P + 'QUOTE.TYPES').find((t) => t.V === this.form.type);
    const officeIndex = this.offices.findIndex((o) => o.id === this.form.office);
    // Office names are the same in both languages, so the backend always gets e.g. "Post Oak".
    const office = officeIndex > -1 ? this.list<{ NAME: string }>(P + 'OFFICES.ITEMS')[officeIndex]?.NAME : undefined;

    this.isSubmitting = true;
    try {
      const sent = await this.quoteLeadCaptureService.submitLead({
        selected_chip: type?.L ?? this.form.type,
        full_name: this.form.name,
        phone_number: this.form.phone,
        email: this.form.email,
        preferred_office: office,
      });
      if (!sent) return;
      const next = QUOTE_ROUTES[this.form.type] ?? 'getAQuote';
      this.form = { name: '', phone: '', email: '', type: '', office: 'any' };
      this.errors = {};
      await this.router.navigate(this.route(next));
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private validate(only?: Field[]): Field[] {
    const want = (f: Field) => !only || only.includes(f);
    const t = (k: string) => this.translate.instant(P + 'QUOTE.' + k);
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

  private url(page: string, officeId?: string): string {
    const path = this.route(page, officeId).join('/').replace(/^\/+/, '');
    return `${SITE}/${path ? path + '/' : ''}`;
  }

  private addStructuredData() {
    const faq = this.list<{ Q: string; A: string | Seg[] }>(P + 'FAQ.ITEMS');
    const items = this.list<{ NAME: string; ADDRESS: string }>(P + 'OFFICES.ITEMS');
    if (!faq.length || !items.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url('ourLocations');
    const name = this.translate.instant('LOCATIONS_PAGE.BREADCRUMB.CURRENT');
    const text = (a: string | Seg[]) => (Array.isArray(a) ? a.map((s) => s.t).join('') : a);
    const officeUrl = (i: number) => this.url('ourLocations/:id', this.offices[i].id);
    const agencies = this.offices.map((o, i) => {
      // "707 Shotwell St, Suite A, Houston, TX 77020" → street, city, region, postal code
      const m = items[i].ADDRESS.match(/^(.*), ([^,]+), ([A-Z]{2}) (\d{5})$/);
      return {
        '@type': 'InsuranceAgency',
        '@id': officeUrl(i) + '#office',
        name: `A-State Insurance (${items[i].NAME})`,
        url: officeUrl(i),
        telephone: o.tel,
        parentOrganization: { '@id': SITE + '/#agency' },
        address: {
          '@type': 'PostalAddress',
          streetAddress: m?.[1] ?? items[i].ADDRESS,
          addressLocality: m?.[2] ?? 'Houston',
          addressRegion: m?.[3] ?? 'TX',
          postalCode: m?.[4],
          addressCountry: 'US',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
        availableLanguage: ['English', 'Spanish', 'Hindi'],
        amenityFeature: { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
      };
    });
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          name,
          inLanguage: this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US',
          isPartOf: { '@id': SITE + '/#website' },
          about: { '@id': SITE + '/#agency' },
          breadcrumb: { '@id': pageUrl + '#breadcrumb' },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: agencies.map((a, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@id': a['@id'] } })),
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: this.translate.instant('LOCATIONS_PAGE.BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name, item: pageUrl },
          ],
        },
        ...agencies,
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
