import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Language } from '../../services/language';
import { HttpService } from '../../services/http.service';
import { PageSource, PageSourceFields } from '../../services/page-source';
import { buildRoute, OFFICES } from '../../components/header/header';

/**
 * A piece of translated text. Flags are strings ("true") because ngx-translate drops booleans
 * inside arrays: `hl` red text, `b` bold, `l` language code of the phrase (lang attribute),
 * `h` link target (tel: or "#other"), `r` route key for an internal link.
 */
export interface CqSeg { t: string; hl?: string; b?: string; l?: string; h?: string; r?: string }

type Field = 'name' | 'phone' | 'email' | 'zip' | 'cov' | 'other' | 'unsure' | 'email2';

/** Coverage checkboxes in step 2 (icons in the order of FORM.COVERAGE), then "Other" and "I'm not sure". */
const COVERAGE_ICONS = ['i-car', 'i-home', 'i-briefcase', 'i-heart', 'i-health', 'i-shield'];
const COVERAGE_KEYS = ['auto', 'home', 'commercial', 'life', 'health', 'bond', 'other', 'unsure'];

/** "Other insurance" chips, in the order of OTHER.ITEMS. There is no umbrella page yet, so it goes to the services list. */
const OTHER_ROUTES = [
  'rentersInsurance', 'condoInsurance', 'floodInsurance', 'motorcycleInsurance', 'boatInsurance',
  'rvInsurance', 'mexicanCarInsurance', 'sr22Insurance', 'insuranceServices', 'finalExpenseInsurance',
];

/** Ids of the element to focus for each field with an error. */
const FOCUS_ID: Record<Field, string> = {
  name: 'cq-name', phone: 'cq-phone', email: 'cq-email', zip: 'cq-zip',
  cov: 'cq-c-auto', other: 'cq-other', unsure: 'cq-unsure', email2: 'cq-email2',
};
const STEP_FIELDS: Record<number, Field[]> = { 1: ['name', 'phone', 'email', 'zip'], 2: ['cov', 'other', 'unsure'], 3: [], 4: ['email2'] };

/** Values the existing /quotes/create payload already used for these two questions. */
const CONTACT_VALUES: Record<string, string> = { text: 'Text Message', call: 'Phone', email: 'Email' };
const TIME_VALUES: Record<string, string> = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };

const SCHEMA_ID = 'get-custom-quote-structured-data';
const SITE = 'https://astateinsurance.com';
const P = 'GET_CUSTOM_QUOTE.';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CqForm {
  name: string; phone: string; email: string; email2: string; zip: string; lang: string;
  cov: Record<string, boolean>; other: string; unsure: string;
  goal: string; insured: string; carrier: string; renewal: string;
  method: string; time: string; office: string;
}

const LANG_VALUES: Record<string, string> = { en: 'English', es: 'Spanish', hi: 'Hindi' };
const GOAL_VALUES: Record<string, string> = { new: 'New coverage', compare: 'Compare current policy', unsure: 'Not sure yet' };

/**
 * Body of POST /quotes/create. Enum-like answers are canonical English strings whatever the page language,
 * dates are yyyy-mm-dd, flags are 0|1. Optional keys are omitted (never '' or null) when not answered.
 */
interface CustomQuotePayload extends PageSourceFields {
  type: 'custom';
  name: string;
  phone_number: string;
  email?: string;
  zip_code: string;
  preferred_language: string;
  coverage_auto: 0 | 1;
  coverage_home: 0 | 1;
  coverage_commercial: 0 | 1;
  coverage_life: 0 | 1;
  coverage_health: 0 | 1;
  coverage_travel: 0 | 1;
  coverage_super_bonds: 0 | 1;
  coverage_bundle_save: 0 | 1;
  coverage_unsure: 0 | 1;
  coverage_other_details?: string;
  coverage_unsure_details?: string;
  looking_for?: string;
  renewal_date?: string;
  preferred_office?: string;
  currently_insured?: string;
  current_insurance_provider?: string;
  preferred_contact_method?: string;
  best_time_to_reach?: string;
}

@Component({
  selector: 'app-get-custom-quote',
  standalone: false,
  templateUrl: './get-custom-quote.html',
  styleUrl: './get-custom-quote.scss',
})
export class GetCustomQuote implements AfterViewInit, OnDestroy {
  readonly offices = OFFICES;
  readonly coverageIcons = COVERAGE_ICONS;
  readonly otherRoutes = OTHER_ROUTES;
  readonly stepNumbers = [1, 2, 3, 4, 5];
  /** Icons for the three "Use this form if" cards. */
  readonly useIcons = ['i-layers', 'i-search', 'i-plus'];

  step = 1;
  /** True after "Edit" on the review step, so every step offers "Back to review". */
  editing = false;
  live = '';
  faqOpen = 0;
  showSticky = false;

  form!: CqForm;
  errors: Partial<Record<Field, string>> = {};
  isSubmitting = false;
  sent = false;
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

  // ---------- Links inside translated text and page buttons ----------

  /** In-text links: "#other" checks the Other box and goes to the form; tel: links follow normally. */
  onSegLink(href: string, event: Event) {
    if (href === '#other') this.pickOther(event);
  }

  pickOther(event: Event) {
    event.preventDefault();
    this.form.cov['other'] = true;
    this.errors.cov = '';
    this.scrollToCard();
    if (this.step === 2 && this.isBrowser) setTimeout(() => this.focusId('cq-other'), 400);
  }

  goToForm(event: Event) {
    event.preventDefault();
    this.scrollToCard();
    if (this.isBrowser) setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>(`#cq-h${this.step}`)?.focus({ preventScroll: true }), 450);
  }

  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Form inputs ----------

  onText(field: 'name' | 'email' | 'email2' | 'other' | 'unsure' | 'carrier' | 'renewal', event: Event) {
    this.form[field] = (event.target as HTMLInputElement).value;
    const f = field as Field; // carrier and renewal never have an error, so they skip this
    if (this.errors[f]) this.errors[f] = this.fieldError(f);
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const d = this.digits(input.value).slice(0, 10);
    let out = d;
    if (d.length > 6) out = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    else if (d.length > 3) out = `(${d.slice(0, 3)}) ${d.slice(3)}`;
    input.value = out;
    this.form.phone = out;
    if (this.errors.phone) this.errors.phone = this.fieldError('phone');
  }

  onZipInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 5);
    this.form.zip = input.value;
    if (this.errors.zip) this.errors.zip = this.fieldError('zip');
  }

  onCoverage(key: string, event: Event) {
    this.form.cov[key] = (event.target as HTMLInputElement).checked;
    if (this.selected().length) this.errors.cov = '';
  }

  /** Coverage keys that are checked, in display order. */
  selected(): string[] {
    return COVERAGE_KEYS.filter((k) => this.form.cov[k]);
  }

  /** Two or more real coverage types: show the multi-policy note ("not sure" does not count). */
  get isMulti(): boolean {
    return this.selected().filter((k) => k !== 'unsure').length >= 2;
  }

  /** Contact by email but no email given yet: step 4 asks for it. */
  get needEmail(): boolean {
    return this.form.method === 'email' && !this.form.email.trim();
  }

  // ---------- Steps ----------

  next() {
    const bad = this.validateStep(this.step);
    if (bad.length) return this.focusId(FOCUS_ID[bad[0]]);
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
    if (bad.length) return this.focusId(FOCUS_ID[bad[0]]);
    for (let k = 1; k <= 4; k++) {
      if (this.validateStep(k).length) return this.show(k);
    }
    this.show(5);
  }

  onEnter(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' && this.step < 5) {
      event.preventDefault();
      this.next();
    }
  }

  private show(n: number) {
    this.step = n;
    if (n === 5) this.editing = false;
    this.live = this.translate.instant(P + 'FORM.LIVE', { n, title: this.list<string>(P + 'FORM.STEP_TITLES')[n - 1] ?? '' });
    this.cdr.detectChanges();
    if (!this.isBrowser) return;
    const card = this.card();
    if (card) {
      const top = card.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.4) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>(`#cq-h${n}`)?.focus({ preventScroll: true }), 300);
  }

  private validateStep(n: number): Field[] {
    const bad: Field[] = [];
    for (const f of STEP_FIELDS[n] ?? []) {
      this.errors[f] = this.fieldError(f);
      if (this.errors[f]) bad.push(f);
    }
    // The email asked for in step 4 becomes the email on the request.
    if (n === 4 && !bad.length && this.needEmail) this.form.email = this.form.email2.trim();
    return bad;
  }

  private fieldError(f: Field): string {
    const t = (k: string) => this.translate.instant(P + 'FORM.ERR.' + k);
    switch (f) {
      case 'name':
        return this.form.name.trim().length < 2 ? t('NAME') : '';
      case 'phone': {
        const d = this.digits(this.form.phone);
        return !d ? t('PHONE_EMPTY') : d.length !== 10 ? t('PHONE_INVALID') : '';
      }
      case 'email': {
        const e = this.form.email.trim();
        return e && !EMAIL_RE.test(e) ? t('EMAIL') : '';
      }
      case 'zip':
        return !this.form.zip ? t('ZIP_EMPTY') : !/^\d{5}$/.test(this.form.zip) ? t('ZIP_INVALID') : '';
      case 'cov':
        return this.selected().length ? '' : t('COVERAGE');
      case 'other':
        return this.form.cov['other'] && !this.form.other.trim() ? t('OTHER') : '';
      case 'unsure':
        return this.form.cov['unsure'] && !this.form.unsure.trim() ? t('UNSURE') : '';
      case 'email2': {
        if (!this.needEmail) return '';
        const v = this.form.email2.trim();
        if (!v) return t('EMAIL_NEEDED');
        return EMAIL_RE.test(v) ? '' : t('EMAIL_NEEDED_INVALID');
      }
    }
  }

  // ---------- Submit ----------

  async submit(event: Event) {
    event.preventDefault();
    if (this.isSubmitting || this.step !== 5) return;
    for (let k = 1; k <= 4; k++) {
      if (this.validateStep(k).length) return this.show(k);
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.cdr.detectChanges();
    try {
      await firstValueFrom(this.http.post('/quotes/create', this.buildPayload(), true));
      this.form = this.emptyForm();
      this.errors = {};
      this.step = 1;
      this.editing = false;
      this.sent = true;
      this.live = this.translate.instant(P + 'FORM.SUCCESS.TITLE');
      this.cdr.detectChanges();
      if (this.isBrowser) {
        this.scrollToCard();
        setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>('#cq-success')?.focus({ preventScroll: true }), 300);
      }
    } catch {
      // Keep every answer, show a translated message and let the visitor try again. Nothing is logged: the request holds PII.
      this.submitError = this.translate.instant(P + 'FORM.ERR.SUBMIT');
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private buildPayload(): CustomQuotePayload {
    const f = this.form;
    const flag = (k: string): 0 | 1 => (f.cov[k] ? 1 : 0);
    const email = f.email.trim();
    const carrier = f.insured === 'yes' ? f.carrier.trim() : '';
    const unsure = f.cov['unsure'] ? f.unsure.trim() : '';
    const office = this.offices.find((o) => o.id === f.office);
    return {
      type: 'custom',
      name: f.name.trim(),
      phone_number: f.phone,
      ...(email ? { email } : {}),
      zip_code: f.zip,
      preferred_language: LANG_VALUES[f.lang] ?? 'English',
      coverage_auto: flag('auto'),
      coverage_home: flag('home'),
      coverage_commercial: flag('commercial'),
      coverage_life: flag('life'),
      coverage_health: flag('health'),
      coverage_travel: 0,
      coverage_super_bonds: flag('bond'),
      coverage_bundle_save: 0,
      coverage_unsure: flag('unsure'),
      ...(f.cov['other'] && f.other.trim() ? { coverage_other_details: f.other.trim() } : {}),
      ...(unsure ? { coverage_unsure_details: unsure } : {}),
      ...(GOAL_VALUES[f.goal] ? { looking_for: GOAL_VALUES[f.goal] } : {}),
      ...(f.insured === 'yes' && /^\d{4}-\d{2}-\d{2}$/.test(f.renewal) ? { renewal_date: f.renewal } : {}),
      ...(office ? { preferred_office: `${office.street}, ${office.city}` } : {}),
      ...(f.insured ? { currently_insured: f.insured === 'yes' ? 'Yes' : 'No' } : {}),
      ...(carrier ? { current_insurance_provider: carrier } : {}),
      ...(f.method ? { preferred_contact_method: CONTACT_VALUES[f.method] } : {}),
      ...(f.time ? { best_time_to_reach: TIME_VALUES[f.time] } : {}),
      ...this.pageSource.getSourceFields(),
    };
  }

  // ---------- Review step ----------

  /** Label of the chosen option in a translated {V, L} list. */
  label(key: string, value: string): string {
    return this.list<{ V: string; L: string }>(P + key).find((o) => o.V === value)?.L ?? '';
  }

  coverageLabel(key: string): string {
    if (key === 'other') return this.translate.instant(P + 'FORM.OTHER_L');
    if (key === 'unsure') return this.translate.instant(P + 'FORM.UNSURE_L');
    return this.label('FORM.COVERAGE', key);
  }

  coverageSummary(): string {
    return this.selected().map((k) => this.coverageLabel(k)).join(', ');
  }

  officeLabel(): string {
    const i = this.offices.findIndex((o) => o.id === this.form.office);
    return i > -1 ? (this.list<string>(P + 'FORM.OFFICES')[i] ?? '') : '';
  }

  /** The date input gives yyyy-mm-dd; show it as a long date in the page language. */
  renewalLabel(): string {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(this.form.renewal);
    if (!m) return '';
    const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    const locale = this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US';
    return date.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // ---------- Helpers ----------

  private emptyForm(): CqForm {
    return {
      name: '', phone: '', email: '', email2: '', zip: '',
      lang: this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en',
      cov: {}, other: '', unsure: '', goal: '', insured: '', carrier: '', renewal: '',
      method: '', time: '', office: '',
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

  private focusId(id: string) {
    if (this.isBrowser) this.host.nativeElement.querySelector<HTMLElement>('#' + id)?.focus();
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

    const pageUrl = this.url('requestACustomQuote');
    const t = (k: string) => this.translate.instant(P + k);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: t('BREADCRUMB.QUOTE'), item: this.url('getAQuote') },
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
