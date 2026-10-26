import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Language } from '../../services/language';
import { HttpService } from '../../services/http.service';
import { PageSource, PageSourceFields } from '../../services/page-source';
import { buildRoute, OFFICES } from '../../components/header/header';

interface BqForm {
  bizName: string; dba: string; industry: string; desc: string; zip: string; employees: string;
  payroll: string; bondFor: string; carrier: string; expiration: string; startDate: string;
  name: string; phone: string; email: string; office: string;
  /** Single-choice answers by group: structure, outside, years, revenue, vehicles, works, insured, start, coi, claims, role, lang, method, time. */
  pick: Record<string, string>;
  /** Ticked coverage boxes by value (gl, bop, ... unsure, bond). */
  coverage: Record<string, boolean>;
}

/** One option in a translated list. `S` is a small second line, `R` a shorter label for the review step, `LG` a lang attribute. */
interface Opt { V: string; L: string; S?: string; R?: string; LG?: string }

const P = 'COMMERCIAL_QUOTE_PAGE.';
const SCHEMA_ID = 'get-commercial-quote-structured-data';
const SITE = 'https://astateinsurance.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TOTAL_STEPS = 5;

const NEED_ICONS = ['i-briefcase', 'i-user', 'i-scale', 'i-car', 'i-doc', 'i-list'];
const BASICS_ICONS = ['i-shield', 'i-layers', 'i-car', 'i-user', 'i-scale'];
const COVERAGE_ICONS: Record<string, string> = {
  gl: 'i-shield', bop: 'i-layers', property: 'i-building', tools: 'i-briefcase', auto: 'i-car', 'workers-comp': 'i-user',
  professional: 'i-doc', cyber: 'i-globe', liquor: 'i-list', umbrella: 'i-umbrella', unsure: 'i-search', bond: 'i-scale',
};
/** Full-width boxes at the end of the coverage grid. */
const WIDE_COVERAGES = ['unsure', 'bond'];

/** English values sent to /quotes/create (labels shown to the visitor are translated). */
const INDUSTRY_VALUES: Record<string, string> = {
  'construction-contractors': 'Construction & contractors', 'restaurant-food': 'Restaurant & food', retail: 'Retail',
  'trucking-transportation': 'Trucking & transportation', 'cleaning-janitorial': 'Cleaning & janitorial', landscaping: 'Landscaping',
  'auto-repair': 'Auto repair', 'professional-services': 'Professional services', 'real-estate': 'Real estate', other: 'Other',
};
const STRUCTURE_VALUES: Record<string, string> = {
  'sole-proprietor': 'Sole proprietor', llc: 'LLC', corporation: 'Corporation', partnership: 'Partnership',
  nonprofit: 'Nonprofit', 'not-formed-yet': 'Not formed yet',
};
const OUTSIDE_VALUES: Record<string, string> = { no: 'No, Texas only', yes: 'Yes' };
const YEARS_VALUES: Record<string, string> = { starting: 'Just starting', 'under-1': 'Under 1 year', '1-3': '1–3 years', '4-plus': '4+ years' };
const REVENUE_VALUES: Record<string, string> = {
  'under-100k': 'Under $100k', '100k-500k': '$100k–$500k', '500k-1m': '$500k–$1M', '1m-5m': '$1M–$5M', '5m-plus': '$5M+',
};
const VEHICLES_VALUES: Record<string, string> = { '0': '0', '1-3': '1–3', '4-10': '4–10', '11-plus': '11+' };
const WORKS_VALUES: Record<string, string> = {
  office: 'Office, shop or store', home: 'Home-based', jobsites: 'Job sites or on the road', multiple: 'Multiple locations',
};
const COVERAGE_VALUES: Record<string, string> = {
  gl: 'General Liability', bop: "Business Owner's Policy (BOP)", property: 'Commercial Property',
  tools: 'Tools & Equipment (inland marine)', auto: 'Commercial Auto / Work Trucks', 'workers-comp': "Workers' Compensation",
  professional: 'Professional Liability / E&O', cyber: 'Cyber Liability', liquor: 'Liquor Liability', umbrella: 'Commercial Umbrella',
  unsure: "I'm not sure: help me choose", bond: 'Surety bond (license, permit or contract bond)',
};
const INSURED_VALUES: Record<string, string> = { no: 'No, I need new coverage', yes: 'Yes, I want to compare' };
const START_VALUES: Record<string, string> = { asap: 'As soon as possible', '30-days': 'Within 30 days', '30-plus': '30+ days' };
const YN_VALUES: Record<string, string> = { yes: 'Yes', no: 'No' };
const YNU_VALUES: Record<string, string> = { yes: 'Yes', no: 'No', 'not-sure': 'Not sure' };
const ROLE_VALUES: Record<string, string> = { owner: 'Owner', manager: 'Manager', other: 'Other' };
const LANG_VALUES: Record<string, string> = { en: 'English', es: 'Spanish', hi: 'Hindi' };
const METHOD_VALUES: Record<string, string> = { call: 'Call', text: 'Text', email: 'Email' };
const TIME_VALUES: Record<string, string> = { morning: 'Morning (9 AM–12 PM)', afternoon: 'Afternoon (12 PM–4 PM)', evening: 'Evening (4 PM–7 PM)' };

/**
 * Body of POST /quotes/create. Enum-like answers are canonical English strings whatever the page language,
 * dates are yyyy-mm-dd. Optional keys are omitted (never '' or null) when not answered.
 */
export interface CommercialQuotePayload extends PageSourceFields {
  type: 'commercial';
  business_name: string;
  dba?: string;
  industry_type: string;
  business_description: string;
  business_entity_type?: string;
  business_zip_code: string;
  works_outside_texas?: string;
  years_in_business?: string;
  number_of_employees: string;
  estimated_annual_revenue?: string;
  business_vehicles?: string;
  business_location_type?: string;
  coverage_items: string[];
  annual_payroll?: string;
  bond_purpose?: string;
  policy_status?: string;
  current_carrier?: string;
  expiration_date?: string;
  coverage_start?: string;
  coverage_start_date?: string;
  needs_coi?: string;
  recent_claims?: string;
  contact_name: string;
  job_title?: string;
  phone_number: string;
  email_address?: string;
  preferred_language: string;
  preferred_contact_method?: string;
  best_time_to_connect?: string;
  preferred_office?: string;
  lead_tags?: string;
}

@Component({
  selector: 'app-get-commercial-quote',
  standalone: false,
  templateUrl: './get-commercial-quote.html',
  styleUrl: './get-commercial-quote.scss',
})
export class GetCommercialQuote implements AfterViewInit, OnDestroy {
  readonly offices = OFFICES;
  readonly stepNumbers = [1, 2, 3, 4, 5];
  readonly needIcons = NEED_ICONS;
  readonly basicsIcons = BASICS_ICONS;
  readonly coverageIcons = COVERAGE_ICONS;
  readonly wideCoverages = WIDE_COVERAGES;

  step = 1;
  /** True after "Edit" on the review step, so every step offers "Back to review". */
  editing = false;
  live = '';
  faqOpen = 0;
  showSticky = false;
  /** Set by ?coverage=group-health (links from the group health pages). */
  groupHealth = false;

  form!: BqForm;
  /** Error text by field key (bizName, industry, desc, zip, employees, coverage, startDate, name, phone, email). */
  errors: Record<string, string> = {};
  isSubmitting = false;
  sent = false;
  /** What the success panel mentions; set at submit time because the form is reset afterwards. */
  sentFirst = '';
  sentHow = 'any';
  sentContact = '';
  sentBond = false;
  sentCoi = false;
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
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.form = this.emptyForm();
    this.applyQueryParams();
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
    if (this.isBrowser) setTimeout(() => this.focusEl(`bq-h${this.step}`, true), 450);
  }

  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Inputs ----------

  onText(field: 'bizName' | 'dba' | 'industry' | 'desc' | 'bondFor' | 'carrier' | 'expiration' | 'startDate' | 'name' | 'email', event: Event) {
    this.form[field] = (event.target as HTMLInputElement).value;
    if (this.errors[field]) this.errors[field] = this.fieldError(field);
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const d = this.digits(input.value).slice(0, 10);
    input.value = this.formatPhone(d);
    this.form.phone = input.value;
    if (this.errors['phone']) this.errors['phone'] = this.fieldError('phone');
  }

  /** ZIP and employee count: digits only, 5 at most. */
  onDigits(field: 'zip' | 'employees', event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 5);
    this.form[field] = input.value;
    if (this.errors[field]) this.errors[field] = this.fieldError(field);
  }

  onPayrollInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const m = input.value.replace(/\D/g, '').slice(0, 9);
    input.value = m ? Number(m).toLocaleString('en-US') : '';
    this.form.payroll = input.value;
  }

  /** Radio chips. Choosing "Not formed yet" fills an empty business name, as the label suggests. */
  pick(key: string, value: string) {
    this.form.pick[key] = value;
    if (key === 'structure' && value === 'not-formed-yet' && !this.form.bizName.trim()) {
      this.form.bizName = this.translate.instant(P + 'FORM.NOT_FORMED');
      if (this.errors['bizName']) this.errors['bizName'] = this.fieldError('bizName');
    }
  }

  onCoverage(key: string, event: Event) {
    this.form.coverage[key] = (event.target as HTMLInputElement).checked;
    if (this.errors['coverage']) this.errors['coverage'] = this.fieldError('coverage');
  }

  covered(key: string): boolean {
    return !!this.form.coverage[key];
  }

  /** Flags the agent sees right away: surety bond (bond team), certificate of insurance, group health. */
  tags(): string[] {
    const out: string[] = [];
    if (this.covered('bond')) out.push('bond');
    if (this.form.pick['coi'] === 'yes') out.push('coi');
    if (this.groupHealth) out.push('group-health');
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
    for (let k = 1; k < TOTAL_STEPS; k++) {
      if (this.validateStep(k).length) return this.show(k);
    }
    this.show(TOTAL_STEPS);
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
    setTimeout(() => this.focusEl(`bq-h${n}`, true), 300);
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
      check('bizName', 'bq-name');
      check('industry', 'bq-ind');
      check('desc', 'bq-desc');
      check('zip', 'bq-zip');
    } else if (n === 2) {
      check('employees', 'bq-emp');
    } else if (n === 3) {
      check('coverage', 'bq-c-gl');
      check('startDate', 'bq-sdate');
    } else if (n === 4) {
      check('name', 'bq-cname');
      check('phone', 'bq-phone');
      check('email', 'bq-email');
    }
    return bad;
  }

  private err(k: string): string {
    return this.translate.instant(P + 'FORM.ERR.' + k);
  }

  private fieldError(f: string): string {
    const form = this.form;
    switch (f) {
      case 'bizName':
        return form.bizName.trim().length < 2 ? this.err('BIZ_NAME') : '';
      case 'industry':
        return form.industry ? '' : this.err('INDUSTRY');
      case 'desc':
        return form.desc.trim().length < 3 ? this.err('DESC') : '';
      case 'zip':
        return !form.zip ? this.err('ZIP_EMPTY') : !ZIP_RE.test(form.zip) ? this.err('ZIP') : '';
      case 'employees':
        return !form.employees ? this.err('EMP_EMPTY') : Number(form.employees) < 1 ? this.err('EMP_MIN') : '';
      case 'coverage':
        return Object.keys(COVERAGE_VALUES).some((k) => form.coverage[k]) ? '' : this.err('COVERAGE');
      case 'startDate':
        return form.startDate && form.startDate < this.todayIso() ? this.err('DATE_PAST') : '';
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
    for (let k = 1; k < TOTAL_STEPS; k++) {
      if (this.validateStep(k).length) return this.show(k);
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.cdr.detectChanges();
    try {
      await firstValueFrom(this.http.post('/quotes/create', this.buildPayload(), true));
      const f = this.form;
      const method = f.pick['method'];
      this.sentFirst = f.name.trim().split(/\s+/)[0];
      this.sentHow = method && METHOD_VALUES[method] ? method : 'any';
      this.sentContact = method === 'email' ? f.email.trim() : f.phone;
      this.sentBond = this.covered('bond');
      this.sentCoi = f.pick['coi'] === 'yes';
      this.form = this.emptyForm();
      this.errors = {};
      this.step = 1;
      this.editing = false;
      this.sent = true;
      this.live = this.translate.instant(P + 'FORM.SUCCESS.TITLE', { first: this.sentFirst });
      this.cdr.detectChanges();
      if (this.isBrowser) {
        this.scrollToCard();
        setTimeout(() => this.focusEl('bq-success', true), 300);
      }
    } catch {
      // Keep every answer, show a translated message and let the visitor try again. Nothing is logged: the request holds PII.
      this.submitError = this.translate.instant(P + 'FORM.ERR.SUBMIT');
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private buildPayload(): CommercialQuotePayload {
    const f = this.form;
    const pick = f.pick;
    const email = f.email.trim();
    const p: Omit<CommercialQuotePayload, keyof PageSourceFields> = {
      type: 'commercial',
      business_name: f.bizName.trim(),
      industry_type: INDUSTRY_VALUES[f.industry] ?? '',
      business_description: f.desc.trim().slice(0, 300),
      business_zip_code: f.zip,
      number_of_employees: f.employees,
      coverage_items: Object.keys(COVERAGE_VALUES).filter((k) => f.coverage[k]).map((k) => COVERAGE_VALUES[k]),
      contact_name: f.name.trim(),
      phone_number: f.phone,
      preferred_language: LANG_VALUES[pick['lang']] ?? 'English',
    };
    const set = (key: keyof typeof p, map: Record<string, string>, group: string) => {
      const v = map[pick[group]];
      if (v) (p as any)[key] = v;
    };
    const dba = f.dba.trim();
    if (dba) p.dba = dba;
    set('business_entity_type', STRUCTURE_VALUES, 'structure');
    set('works_outside_texas', OUTSIDE_VALUES, 'outside');

    set('years_in_business', YEARS_VALUES, 'years');
    set('estimated_annual_revenue', REVENUE_VALUES, 'revenue');
    set('business_vehicles', VEHICLES_VALUES, 'vehicles');
    set('business_location_type', WORKS_VALUES, 'works');

    const payroll = f.payroll.replace(/\D/g, '');
    if (f.coverage['workers-comp'] && payroll) p.annual_payroll = payroll;
    const bondFor = f.bondFor.trim().slice(0, 255);
    if (f.coverage['bond'] && bondFor) p.bond_purpose = bondFor;
    set('policy_status', INSURED_VALUES, 'insured');
    if (pick['insured'] === 'yes') {
      const carrier = f.carrier.trim().slice(0, 100);
      if (carrier) p.current_carrier = carrier;
      if (ISO_DATE_RE.test(f.expiration)) p.expiration_date = f.expiration;
    }
    set('coverage_start', START_VALUES, 'start');
    if (ISO_DATE_RE.test(f.startDate)) p.coverage_start_date = f.startDate;
    set('needs_coi', YN_VALUES, 'coi');
    set('recent_claims', YNU_VALUES, 'claims');

    set('job_title', ROLE_VALUES, 'role');
    if (email) p.email_address = email;
    set('preferred_contact_method', METHOD_VALUES, 'method');
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
    return this.list<Opt>(P + key).find((o) => o.V === value)?.L ?? '';
  }

  flagLabel(tag: string): string {
    return this.translate.instant(P + 'FORM.FLAGS.' + tag);
  }

  coverageSummary(): string {
    return this.list<Opt>(P + 'FORM.COVERAGES')
      .filter((o) => this.covered(o.V))
      .map((o) => o.R || o.L)
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

  private emptyForm(): BqForm {
    return {
      bizName: '', dba: '', industry: '', desc: '', zip: '', employees: '',
      payroll: '', bondFor: '', carrier: '', expiration: '', startDate: '',
      name: '', phone: '', email: '', office: '',
      pick: { lang: this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en' },
      coverage: {},
    };
  }

  /**
   * Name and phone can arrive from the short quote form as query parameters; they are only read, never logged or stored.
   * ?coverage=group-health comes from the group health pages: it ticks "I'm not sure" and flags the lead.
   */
  private applyQueryParams() {
    const q = this.activatedRoute.snapshot?.queryParamMap;
    if (!q) return;
    const name = q.get('fullName')?.trim();
    const phone = q.get('phone')?.trim();
    if (name) this.form.name = name;
    if (phone) this.form.phone = this.formatPhone(this.digits(phone).slice(0, 10));
    if (q.get('coverage') === 'group-health') {
      this.groupHealth = true;
      this.form.coverage['unsure'] = true;
    }
  }

  private formatPhone(d: string): string {
    if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return d;
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

    const pageUrl = this.url('getCommercialQuote');
    const t = (k: string) => this.translate.instant(P + k);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: t('BREADCRUMB.SECTION'), item: this.url('commercialInsurance') },
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
