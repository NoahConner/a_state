import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Language } from '../../services/language';
import { HttpService } from '../../services/http.service';
import { PageSource, PageSourceFields } from '../../services/page-source';
import { buildRoute, OFFICES } from '../../components/header/header';

interface HqForm {
  address: string; close: string; year: string; sqft: string; breed: string; carrier: string; renewal: string;
  name: string; phone: string; email: string; office: string;
  /**
   * Single-choice answers by group: usage, ptype, status, stories, roofAge, roofType, construction, foundation,
   * alarm, pool, tramp, dogs, claims, insured, flood, lang, method, time.
   */
  pick: Record<string, string>;
  also: Record<string, boolean>;
}

const P = 'HOME_QUOTE_PAGE.';
const SCHEMA_ID = 'get-home-quote-structured-data';
const SITE = 'https://astateinsurance.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADDRESS_ZIP_RE = /\b\d{5}(-\d{4})?\s*$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TOTAL_STEPS = 6;

const NEED_ICONS = ['i-pin', 'i-home', 'i-building', 'i-doc', 'i-cal'];
const BASICS_ICONS = ['i-shield', 'i-storm', 'i-alert', 'i-pin', 'i-cal'];
const ALSO_ICONS: Record<string, string> = { auto: 'i-car', life: 'i-heart', umbrella: 'i-umbrella' };

/** English values sent to /quotes/create (labels shown to the visitor are translated). */
const USAGE_VALUES: Record<string, string> = { primary: 'Primary home', second: 'Second or vacation home', rental: 'Rental (tenants)' };
const PTYPE_VALUES: Record<string, string> = {
  'single-family': 'Single-family', condo: 'Condo', townhome: 'Townhome', mobile: 'Mobile or manufactured home', other: 'Other',
};
const STATUS_VALUES: Record<string, string> = { owner: 'Already the owner', buying: 'Buying this home', refinancing: 'Refinancing' };
const STORIES_VALUES: Record<string, string> = { '1': '1', '2': '2', '3+': '3+' };
const ROOF_AGE_VALUES: Record<string, string> = {
  'under-1': 'Under 1 year', '1-10': '1-10 years', '11-20': '11-20 years', '20-plus': '20+ years', unsure: 'Not sure',
};
const ROOF_TYPE_VALUES: Record<string, string> = {
  asphalt: 'Asphalt shingle', metal: 'Metal', tile: 'Tile', wood: 'Wood', other: 'Other', unsure: 'Not sure',
};
const CONSTRUCTION_VALUES: Record<string, string> = { frame: 'Frame', brick: 'Brick or masonry', mixed: 'Mixed', unsure: 'Not sure' };
const FOUNDATION_VALUES: Record<string, string> = { slab: 'Slab', pier: 'Pier and beam', unsure: 'Not sure' };
const YN_VALUES: Record<string, string> = { yes: 'Yes', no: 'No' };
const YNU_VALUES: Record<string, string> = { yes: 'Yes', no: 'No', unsure: 'Not sure' };
const ALSO_VALUES: Record<string, string> = { auto: 'Auto', life: 'Life', umbrella: 'Umbrella' };
const LANG_VALUES: Record<string, string> = { en: 'English', es: 'Spanish', hi: 'Hindi' };
const METHOD_VALUES: Record<string, string> = { text: 'Text', call: 'Call', email: 'Email' };
const TIME_VALUES: Record<string, string> = { morning: 'Morning (9 AM–12 PM)', afternoon: 'Afternoon (12 PM–4 PM)', evening: 'Evening (4 PM–7 PM)' };

/**
 * Body of POST /quotes/create. Enum-like answers are canonical English strings whatever the page language,
 * dates are yyyy-mm-dd. Optional keys are omitted (never '' or null) when not answered.
 */
export interface HomeQuotePayload extends PageSourceFields {
  type: 'home';
  property_address: string;
  is_primary_residence?: string;
  property_type?: string;
  ownership_status?: string;
  closing_date?: string;
  year_built?: string;
  square_footage?: string;
  number_of_stories?: string;
  roof_age?: string;
  roof_type?: string;
  construction_type?: string;
  foundation_type?: string;
  has_alarm_system?: string;
  has_swimming_pool?: string;
  has_trampoline?: string;
  has_pets?: string;
  dog_breed?: string;
  recent_claims?: string;
  current_insurance_status?: string;
  current_carrier?: string;
  renewal_date?: string;
  needs_flood_insurance?: string;
  bundle_option?: string;
  full_name: string;
  phone_number: string;
  email_address?: string;
  preferred_language: string;
  contact_method?: string;
  best_time_to_connect?: string;
  preferred_office?: string;
  lead_tags?: string;
}

@Component({
  selector: 'app-get-home-quote',
  standalone: false,
  templateUrl: './get-home-quote.html',
  styleUrl: './get-home-quote.scss',
})
export class GetHomeQuote implements AfterViewInit, OnDestroy {
  readonly offices = OFFICES;
  readonly stepNumbers = [1, 2, 3, 4, 5, 6];
  readonly needIcons = NEED_ICONS;
  readonly basicsIcons = BASICS_ICONS;
  readonly alsoIcons = ALSO_ICONS;

  step = 1;
  /** True after "Edit" on the review step, so every step offers "Back to review". */
  editing = false;
  live = '';
  faqOpen = 0;
  showSticky = false;

  form!: HqForm;
  /** Error text by field key (address, close, year, sqft, name, phone, email). Empty or missing means no error. */
  errors: Record<string, string> = {};
  isSubmitting = false;
  sent = false;
  /** What the success panel mentions; set at submit time because the form is reset afterwards. */
  sentBuying = false;
  sentAlso = false;
  submitError = '';

  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly subs = new Subscription();
  private stickyObserver?: IntersectionObserver;

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private http: HttpService,
    private pageSource: PageSource,
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.form = this.emptyForm();
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        this.listCache.clear();
        this.errors = {};
        this.submitError = '';
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
    if (!this.isBrowser || !('IntersectionObserver' in window)) return;
    // Sticky mobile bar: hidden while the form card, the final CTA or the footer is on screen.
    const watched = ['#quote', '#final-cta']
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
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.stickyObserver?.disconnect();
    this.document.getElementById(SCHEMA_ID)?.remove();
  }

  // ---------- Links ----------

  /** In-text "#quote" links scroll to the form; tel: and external links follow normally. */
  onSegLink(href: string, event: Event) {
    if (href === '#quote') this.goToForm(event);
  }

  goToForm(event: Event) {
    event.preventDefault();
    this.scrollToCard();
    if (this.isBrowser) setTimeout(() => this.focusEl(`hq-h${this.step}`, true), 450);
  }

  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Inputs ----------

  onText(field: 'address' | 'close' | 'breed' | 'carrier' | 'renewal' | 'name' | 'email', event: Event) {
    this.form[field] = (event.target as HTMLInputElement).value;
    if (this.errors[field]) this.errors[field] = this.fieldError(field);
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const d = this.digits(input.value).slice(0, 10);
    let out = d;
    if (d.length > 6) out = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    else if (d.length > 3) out = `(${d.slice(0, 3)}) ${d.slice(3)}`;
    input.value = out;
    this.form.phone = out;
    if (this.errors['phone']) this.errors['phone'] = this.fieldError('phone');
  }

  onYearInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 4);
    this.form.year = input.value;
    if (this.errors['year']) this.errors['year'] = this.fieldError('year');
  }

  onSqftInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const m = input.value.replace(/\D/g, '').slice(0, 5);
    input.value = m ? Number(m).toLocaleString('en-US') : '';
    this.form.sqft = input.value;
    if (this.errors['sqft']) this.errors['sqft'] = this.fieldError('sqft');
  }

  onAlso(key: string, event: Event) {
    this.form.also[key] = (event.target as HTMLInputElement).checked;
  }

  /** Flags the agent sees right away: rental, mobile or manufactured home, buying. */
  tags(): string[] {
    const p = this.form.pick;
    const out: string[] = [];
    if (p['usage'] === 'rental') out.push('rental');
    if (p['ptype'] === 'mobile') out.push('mobile');
    if (p['status'] === 'buying') out.push('buying');
    return out;
  }

  // ---------- Steps ----------

  next() {
    const bad = this.validateStep(this.step);
    if (bad.length) return this.focusEl(bad[0]);
    this.show(this.step + 1);
  }

  prev() {
    this.show(this.step - 1);
  }

  edit(step: number) {
    this.editing = true;
    this.show(step);
  }

  backToReview() {
    const bad = this.validateStep(this.step);
    if (bad.length) return this.focusEl(bad[0]);
    for (let k = 1; k <= 5; k++) {
      if (this.validateStep(k).length) return this.show(k);
    }
    this.show(6);
  }

  onEnter(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' && this.step < TOTAL_STEPS) {
      event.preventDefault();
      this.next();
    }
  }

  private show(n: number) {
    this.step = n;
    if (n === TOTAL_STEPS) this.editing = false;
    this.live = this.translate.instant(P + 'FORM.LIVE', { n, title: this.list<string>(P + 'FORM.STEP_TITLES')[n - 1] ?? '' });
    this.cdr.detectChanges();
    if (!this.isBrowser) return;
    const card = this.card();
    if (card) {
      const top = card.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.4) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => this.focusEl(`hq-h${n}`, true), 300);
  }

  // ---------- Validation ----------

  /** Validates one step, stores the messages and returns the DOM ids of invalid fields in page order. */
  private validateStep(n: number): string[] {
    const bad: string[] = [];
    const check = (key: string, id: string) => {
      const msg = this.fieldError(key);
      this.errors[key] = msg;
      if (msg) bad.push(id);
    };
    if (n === 1) {
      check('address', 'hq-addr');
      check('close', 'hq-close');
    } else if (n === 2) {
      check('year', 'hq-year');
      check('sqft', 'hq-sqft');
    } else if (n === 5) {
      check('name', 'hq-name');
      check('phone', 'hq-phone');
      check('email', 'hq-email');
    }
    return bad;
  }

  private err(k: string): string {
    return this.translate.instant(P + 'FORM.ERR.' + k);
  }

  private fieldError(f: string): string {
    const form = this.form;
    switch (f) {
      case 'address': {
        const v = form.address.trim();
        return !v ? this.err('ADDR_EMPTY') : !ADDRESS_ZIP_RE.test(v) ? this.err('ADDR_ZIP') : '';
      }
      case 'close':
        // Only matters when buying; a hidden leftover value is ignored.
        return form.pick['status'] === 'buying' && form.close && form.close < this.todayIso() ? this.err('CLOSE_PAST') : '';
      case 'year': {
        if (!form.year) return '';
        const y = Number(form.year);
        return y < 1800 || y > new Date().getFullYear() + 1 ? this.err('YEAR') : '';
      }
      case 'sqft': {
        if (!form.sqft) return '';
        const s = Number(form.sqft.replace(/\D/g, ''));
        return s < 200 || s > 20000 ? this.err('SQFT') : '';
      }
      case 'name':
        return form.name.trim().length < 2 ? this.err('NAME') : '';
      case 'phone': {
        const d = this.digits(form.phone);
        return !d ? this.err('PHONE_EMPTY') : d.length !== 10 ? this.err('PHONE_INVALID') : '';
      }
      case 'email': {
        const e = form.email.trim();
        if (!e) return form.pick['method'] === 'email' ? this.err('EMAIL_NEEDED') : '';
        return EMAIL_RE.test(e) ? '' : this.err('EMAIL');
      }
      default:
        return '';
    }
  }

  /** Today as yyyy-mm-dd in the visitor's time zone. */
  private todayIso(): string {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  // ---------- Submit ----------

  async submit(event: Event) {
    event.preventDefault();
    if (this.isSubmitting || this.step !== TOTAL_STEPS) return;
    for (let k = 1; k <= 5; k++) {
      if (this.validateStep(k).length) return this.show(k);
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.cdr.detectChanges();
    try {
      await firstValueFrom(this.http.post('/quotes/create', this.buildPayload(), true));
      this.sentBuying = this.form.pick['status'] === 'buying';
      this.sentAlso = Object.keys(ALSO_VALUES).some((k) => this.form.also[k]);
      this.form = this.emptyForm();
      this.errors = {};
      this.step = 1;
      this.editing = false;
      this.sent = true;
      this.live = this.translate.instant(P + 'FORM.SUCCESS.TITLE');
      this.cdr.detectChanges();
      if (this.isBrowser) {
        this.scrollToCard();
        setTimeout(() => this.focusEl('hq-success', true), 300);
      }
    } catch {
      // Keep every answer, show a translated message and let the visitor try again. Nothing is logged: the request holds PII.
      this.submitError = this.translate.instant(P + 'FORM.ERR.SUBMIT');
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private buildPayload(): HomeQuotePayload {
    const f = this.form;
    const pick = f.pick;
    const email = f.email.trim();
    const p: Omit<HomeQuotePayload, keyof PageSourceFields> = {
      type: 'home',
      property_address: f.address.trim(),
      full_name: f.name.trim(),
      phone_number: f.phone,
      preferred_language: LANG_VALUES[pick['lang']] ?? 'English',
    };
    const set = (key: keyof typeof p, map: Record<string, string>, group: string) => {
      const v = map[pick[group]];
      if (v) (p as any)[key] = v;
    };
    set('is_primary_residence', USAGE_VALUES, 'usage');
    set('property_type', PTYPE_VALUES, 'ptype');
    set('ownership_status', STATUS_VALUES, 'status');
    if (pick['status'] === 'buying' && ISO_DATE_RE.test(f.close)) p.closing_date = f.close;

    const year = f.year.replace(/\D/g, '');
    if (year) p.year_built = year;
    const sqft = f.sqft.replace(/\D/g, '');
    if (sqft) p.square_footage = sqft;
    set('number_of_stories', STORIES_VALUES, 'stories');
    set('roof_age', ROOF_AGE_VALUES, 'roofAge');
    set('roof_type', ROOF_TYPE_VALUES, 'roofType');
    set('construction_type', CONSTRUCTION_VALUES, 'construction');
    set('foundation_type', FOUNDATION_VALUES, 'foundation');

    set('has_alarm_system', YN_VALUES, 'alarm');
    set('has_swimming_pool', YN_VALUES, 'pool');
    set('has_trampoline', YN_VALUES, 'tramp');
    set('has_pets', YN_VALUES, 'dogs');
    const breed = f.breed.trim().slice(0, 100);
    if (pick['dogs'] === 'yes' && breed) p.dog_breed = breed;
    set('recent_claims', YNU_VALUES, 'claims');

    set('current_insurance_status', YN_VALUES, 'insured');
    if (pick['insured'] === 'yes') {
      const carrier = f.carrier.trim().slice(0, 100);
      if (carrier) p.current_carrier = carrier;
      if (ISO_DATE_RE.test(f.renewal)) p.renewal_date = f.renewal;
    }
    set('needs_flood_insurance', YNU_VALUES, 'flood');
    const bundles = Object.keys(ALSO_VALUES).filter((k) => f.also[k]).map((k) => ALSO_VALUES[k]);
    if (bundles.length) p.bundle_option = bundles.join(', ');

    if (email) p.email_address = email;
    set('contact_method', METHOD_VALUES, 'method');
    set('best_time_to_connect', TIME_VALUES, 'time');
    const office = this.offices.find((o) => o.id === f.office);
    if (office) p.preferred_office = `${office.street}, ${office.city}`;
    const tags = this.tags();
    if (tags.length) p.lead_tags = tags.join(',');

    return { ...p, ...this.pageSource.getSourceFields() };
  }

  // ---------- Review step ----------

  /** Label of the chosen option in a translated {V, L} list. */
  label(key: string, value: string): string {
    return this.list<{ V: string; L: string }>(P + key).find((o) => o.V === value)?.L ?? '';
  }

  flagLabel(tag: string): string {
    return this.translate.instant(P + 'FORM.FLAGS.' + tag);
  }

  alsoSummary(): string {
    return this.list<{ V: string; L: string }>(P + 'FORM.ALSO')
      .filter((o) => this.form.also[o.V])
      .map((o) => o.L)
      .join(', ');
  }

  officeLabel(): string {
    const i = this.offices.findIndex((o) => o.id === this.form.office);
    return i > -1 ? (this.list<string>(P + 'FORM.OFFICES')[i] ?? '') : '';
  }

  /** The date input gives yyyy-mm-dd; show it as a long date in the page language. */
  dateLabel(value: string): string {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!m) return '';
    const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    const locale = this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US';
    return date.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // ---------- Helpers ----------

  private emptyForm(): HqForm {
    return {
      address: '', close: '', year: '', sqft: '', breed: '', carrier: '', renewal: '',
      name: '', phone: '', email: '', office: '',
      pick: { lang: this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en' },
      also: {},
    };
  }

  private digits(v: string): string {
    return v.replace(/\D/g, '').replace(/^1(?=\d{10})/, '');
  }

  private card(): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>('#quote');
  }

  private scrollToCard() {
    if (this.isBrowser) this.card()?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private focusEl(id: string, noScroll = false) {
    if (!this.isBrowser) return;
    this.host.nativeElement.querySelector<HTMLElement>('#' + id)?.focus(noScroll ? { preventScroll: true } : undefined);
  }

  // ---------- Structured data (rendered on the server for crawlers) ----------

  private url(page: string): string {
    const path = this.route(page).join('/').replace(/^\/+/, '');
    return `${SITE}/${path ? path + '/' : ''}`;
  }

  private addStructuredData() {
    const faq = this.list<{ Q: string; A: string }>(P + 'FAQ.ITEMS');
    if (!faq.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url('getHomeQuote');
    const t = (k: string) => this.translate.instant(P + k);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: t('BREADCRUMB.SECTION'), item: this.url('homeInsurance') },
            { '@type': 'ListItem', position: 3, name: t('BREADCRUMB.CURRENT'), item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': pageUrl + '#faq',
          inLanguage: this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US',
          mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.Q, acceptedAnswer: { '@type': 'Answer', text: f.A } })),
        },
      ],
    };
    const script = this.document.createElement('script');
    script.id = SCHEMA_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data).replace(/</g, '\\u003c');
    this.document.head.appendChild(script);
  }
}
