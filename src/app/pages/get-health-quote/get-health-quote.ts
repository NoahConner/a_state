import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Language } from '../../services/language';
import { HttpService } from '../../services/http.service';
import { PageSource, PageSourceFields } from '../../services/page-source';
import { buildRoute, OFFICES } from '../../components/header/header';

interface MqAge {
  id: number;
  value: string;
}

interface MqForm {
  zip: string; county: string; ends: string; hh: string; income: string; keep: string;
  name: string; phone: string; email: string; office: string;
  ages: MqAge[];
  /** Single-choice answers by group: who, current, tobacco, medicare, medicaid, plan, lang, method, time. */
  pick: Record<string, string>;
  events: Record<string, boolean>;
  priorities: Record<string, boolean>;
}

const P = 'HEALTH_QUOTE_PAGE.';
const SCHEMA_ID = 'get-health-quote-structured-data';
const SITE = 'https://astateinsurance.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TOTAL_STEPS = 5;
const MAX_AGES = 10;

const ENROLL_ICONS = ['i-cal', 'i-alert', 'i-scale', 'i-shield', 'i-heart', 'i-health'];
const PRIORITY_ICONS: Record<string, string> = {
  premium: 'i-scale', oop: 'i-shield', doctor: 'i-user', rx: 'i-list', 'dental-vision': 'i-heart', mental: 'i-chat',
};
/** How many age boxes to start with for each "Who needs coverage?" answer. */
const WHO_COUNT: Record<string, number> = { me: 1, 'me-spouse': 2, 'me-children': 2, family: 3, children: 1, other: 1 };

/**
 * County from ZIP for the Houston area. ZIPs that cross a county line ask the visitor to choose;
 * any other 770xx ZIP is Harris. Elsewhere the visitor types the county.
 */
const SPLIT_ZIPS: Record<string, string> = {
  '77053': 'Harris / Fort Bend', '77071': 'Harris / Fort Bend', '77083': 'Harris / Fort Bend', '77085': 'Harris / Fort Bend',
  '77489': 'Fort Bend / Harris', '77546': 'Galveston / Harris', '77584': 'Brazoria / Fort Bend',
};
const ZIP_COUNTY: Record<string, string> = {
  '77406': 'Fort Bend', '77407': 'Fort Bend', '77459': 'Fort Bend', '77469': 'Fort Bend', '77477': 'Fort Bend', '77478': 'Fort Bend',
  '77479': 'Fort Bend', '77498': 'Fort Bend', '77581': 'Brazoria', '77583': 'Brazoria', '77550': 'Galveston', '77551': 'Galveston',
  '77573': 'Galveston', '77301': 'Montgomery', '77304': 'Montgomery', '77381': 'Montgomery', '77382': 'Montgomery', '77384': 'Montgomery',
  '77385': 'Montgomery', '77386': 'Montgomery', '77445': 'Waller', '77484': 'Waller',
};

/** English values sent to /quotes/create (labels shown to the visitor are translated). */
const WHO_VALUES: Record<string, string> = {
  me: 'Just me', 'me-spouse': 'Me and my spouse', 'me-children': 'Me and my children', family: 'My whole family',
  children: 'Just my children', other: 'Someone else',
};
const CURRENT_VALUES: Record<string, string> = { better: 'Yes, looking for a better plan', ending: "Yes, but it's ending soon", no: 'No' };
const EVENT_VALUES: Record<string, string> = {
  lost: 'Lost health coverage', married: 'Got married', baby: 'Had or adopted a baby', moved: 'Moved to a new ZIP code', none: 'None of these',
};
const PLAN_VALUES: Record<string, string> = {
  aca: 'Marketplace (ACA) health plan', medsup: 'Medicare Supplement', 'dental-vision': 'Dental and vision only',
  'short-term': 'Short-term health plan', unsure: 'Not sure: help me choose',
};
const PRIORITY_VALUES: Record<string, string> = {
  premium: 'Lowest monthly premium', oop: 'Lowest out-of-pocket costs', doctor: 'Keeping a specific doctor or hospital',
  rx: 'Prescription drug coverage', 'dental-vision': 'Dental and vision', mental: 'Mental health coverage',
};
const YN_VALUES: Record<string, string> = { yes: 'Yes', no: 'No' };
const YNU_VALUES: Record<string, string> = { yes: 'Yes', no: 'No', unsure: 'Not sure' };
const LANG_VALUES: Record<string, string> = { en: 'English', es: 'Spanish', hi: 'Hindi' };
const METHOD_VALUES: Record<string, string> = { call: 'Call', text: 'Text', email: 'Email' };
const TIME_VALUES: Record<string, string> = { morning: 'Morning (9 AM–12 PM)', afternoon: 'Afternoon (12 PM–4 PM)', evening: 'Evening (4 PM–7 PM)' };

/**
 * Body of POST /quotes/create. Enum-like answers are canonical English strings whatever the page language,
 * dates are yyyy-mm-dd. Optional keys are omitted (never '' or null) when not answered.
 * Health, age and income answers go only to this request: never to analytics, storage or logs.
 */
export interface HealthQuotePayload extends PageSourceFields {
  type: 'health';
  who_needs_coverage?: string;
  zip_code: string;
  county?: string;
  current_insurance_status?: string;
  coverage_end_date?: string;
  life_events?: string;
  household_size: string;
  ages_covered: string;
  household_income?: string;
  uses_tobacco?: string;
  on_medicare?: string;
  on_medicaid_chip?: string;
  plan_type?: string;
  plan_priorities?: string[];
  keep_provider?: string;
  full_name: string;
  phone_number: string;
  email_address?: string;
  preferred_language: string;
  contact_method?: string;
  best_time_to_call?: string;
  preferred_office?: string;
}

@Component({
  selector: 'app-get-health-quote',
  standalone: false,
  templateUrl: './get-health-quote.html',
  styleUrl: './get-health-quote.scss',
})
export class GetHealthQuote implements AfterViewInit, OnDestroy {
  readonly offices = OFFICES;
  readonly stepNumbers = [1, 2, 3, 4, 5];
  readonly enrollIcons = ENROLL_ICONS;
  readonly priorityIcons = PRIORITY_ICONS;
  readonly maxAges = MAX_AGES;
  /** Open Enrollment line from October 15 to January 15, the "lost your coverage" line the rest of the year. */
  readonly openEnrollment = GetHealthQuote.inOpenEnrollment(new Date());

  step = 1;
  /** True after "Edit" on the review step, so every step offers "Back to review". */
  editing = false;
  live = '';
  faqOpen = 0;
  showSticky = false;
  /** Translation key and params for the county hint under the County field. */
  countyHint: { key: string; params?: Record<string, string> } = { key: 'FORM.COUNTY_HINT' };

  form!: MqForm;
  /** Error text by field key (zip, ends, hh, ages, name, phone, email). Empty or missing means no error. */
  errors: Record<string, string> = {};
  isSubmitting = false;
  sent = false;
  /** Set at submit time because the form is reset afterwards. */
  sentEnding = false;
  submitError = '';

  private ageSeq = 1;
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

  static inOpenEnrollment(d: Date): boolean {
    const m = d.getMonth();
    const day = d.getDate();
    return (m === 9 && day >= 15) || m === 10 || m === 11 || (m === 0 && day <= 15);
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
    if (this.isBrowser) setTimeout(() => this.focusEl(`mq-h${this.step}`, true), 450);
  }

  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Inputs ----------

  onText(field: 'county' | 'ends' | 'keep' | 'name' | 'email', event: Event) {
    this.form[field] = (event.target as HTMLInputElement).value;
    if (this.errors[field]) this.errors[field] = this.fieldError(field);
  }

  onZipInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 5);
    this.form.zip = input.value;
    this.fillCounty();
    if (this.errors['zip']) this.errors['zip'] = this.fieldError('zip');
  }

  onHouseholdInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 2);
    this.form.hh = input.value;
    if (this.errors['hh']) this.errors['hh'] = this.fieldError('hh');
    if (this.errors['ages']) this.errors['ages'] = this.fieldError('ages');
  }

  onAgeInput(age: MqAge, event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 3);
    age.value = input.value;
    if (this.errors['ages']) this.errors['ages'] = this.fieldError('ages');
  }

  onIncomeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const m = input.value.replace(/\D/g, '').slice(0, 8);
    input.value = m ? Number(m).toLocaleString('en-US') : '';
    this.form.income = input.value;
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

  /** Radio groups. Some answers change other parts of the form. */
  pick(group: string, value: string) {
    this.form.pick[group] = value;
    if (group === 'who') this.fitAges(WHO_COUNT[value] ?? 1);
    // Medicare: preselect Medicare Supplement in step 3 (doc dev note).
    if (group === 'medicare' && value === 'yes') this.form.pick['plan'] = 'medsup';
    if (group === 'method' && this.errors['email']) this.errors['email'] = this.fieldError('email');
  }

  /** "None of these" clears the other life events, and any other event clears "None of these". */
  onEvent(key: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.form.events[key] = checked;
    if (!checked) return;
    if (key === 'none') Object.keys(this.form.events).forEach((k) => k !== 'none' && (this.form.events[k] = false));
    else this.form.events['none'] = false;
  }

  onPriority(key: string, event: Event) {
    this.form.priorities[key] = (event.target as HTMLInputElement).checked;
  }

  // ---------- Ages ----------

  addAge(focus = true) {
    if (this.form.ages.length >= MAX_AGES) return;
    const age = { id: ++this.ageSeq, value: '' };
    this.form.ages.push(age);
    if (focus && this.isBrowser) {
      this.cdr.detectChanges();
      this.focusEl('mq-age-' + age.id);
    }
  }

  removeAge(index: number) {
    if (this.form.ages.length < 2) return;
    this.form.ages.splice(index, 1);
    if (this.errors['ages']) this.errors['ages'] = this.fieldError('ages');
    if (this.isBrowser) {
      this.cdr.detectChanges();
      this.focusEl('mq-age-' + this.form.ages[Math.max(0, index - 1)].id);
    }
  }

  trackAge(_: number, age: MqAge) {
    return age.id;
  }

  /** Matches the number of age boxes to "Who needs coverage?" until the visitor has typed an age. */
  private fitAges(n: number) {
    if (this.form.ages.some((a) => a.value)) return;
    while (this.form.ages.length < n) this.form.ages.push({ id: ++this.ageSeq, value: '' });
    this.form.ages.length = Math.max(1, Math.min(n, this.form.ages.length));
  }

  // ---------- County ----------

  private fillCounty() {
    const z = this.form.zip;
    if (!ZIP_RE.test(z)) {
      this.countyHint = { key: 'FORM.COUNTY_HINT' };
      return;
    }
    if (SPLIT_ZIPS[z]) {
      this.form.county = '';
      this.countyHint = { key: 'FORM.COUNTY_SPLIT', params: { counties: SPLIT_ZIPS[z] } };
      return;
    }
    const county = ZIP_COUNTY[z] ?? (/^770\d\d$/.test(z) ? 'Harris' : '');
    if (county) {
      this.form.county = county;
      this.countyHint = { key: 'FORM.COUNTY_FILLED' };
    } else {
      this.countyHint = { key: 'FORM.COUNTY_TYPE' };
    }
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
    setTimeout(() => this.focusEl(`mq-h${n}`, true), 300);
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
      check('zip', 'mq-zip');
      check('ends', 'mq-ends');
    } else if (n === 2) {
      check('hh', 'mq-hh');
      check('ages', this.firstBadAgeId());
    } else if (n === 4) {
      check('name', 'mq-name');
      check('phone', 'mq-phone');
      check('email', 'mq-email');
    }
    return bad;
  }

  /** Age boxes that are empty or out of range; only flagged while the ages error is showing. */
  ageInvalid(age: MqAge): boolean {
    return !!this.errors['ages'] && (!age.value || Number(age.value) > 120);
  }

  private firstBadAgeId(): string {
    const a = this.form.ages.find((x) => !x.value || Number(x.value) > 120);
    return a ? 'mq-age-' + a.id : 'mq-hh';
  }

  private err(k: string): string {
    return this.translate.instant(P + 'FORM.ERR.' + k);
  }

  private fieldError(f: string): string {
    const form = this.form;
    switch (f) {
      case 'zip':
        return !form.zip ? this.err('ZIP_EMPTY') : !ZIP_RE.test(form.zip) ? this.err('ZIP') : '';
      case 'ends':
        // Only matters when coverage is ending; a hidden leftover value is ignored.
        return form.pick['current'] === 'ending' && form.ends && form.ends < this.todayIso() ? this.err('ENDS_PAST') : '';
      case 'hh':
        return !form.hh ? this.err('HH_EMPTY') : Number(form.hh) < 1 ? this.err('HH_MIN') : '';
      case 'ages': {
        const filled = form.ages.filter((a) => a.value !== '');
        if (!filled.length) return this.err('AGES_EMPTY');
        if (filled.some((a) => Number(a.value) > 120)) return this.err('AGES_RANGE');
        if (filled.length < form.ages.length) return this.err('AGES_BLANK');
        const hh = Number(form.hh);
        if (hh >= 1 && filled.length > hh) return this.err('AGES_HH');
        return '';
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
    for (let k = 1; k < TOTAL_STEPS; k++) {
      if (this.validateStep(k).length) return this.show(k);
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.cdr.detectChanges();
    try {
      await firstValueFrom(this.http.post('/quotes/create', this.buildPayload(), true));
      this.sentEnding = this.form.pick['current'] === 'ending' && ISO_DATE_RE.test(this.form.ends);
      this.form = this.emptyForm();
      this.countyHint = { key: 'FORM.COUNTY_HINT' };
      this.errors = {};
      this.step = 1;
      this.editing = false;
      this.sent = true;
      this.live = this.translate.instant(P + 'FORM.SUCCESS.TITLE');
      this.cdr.detectChanges();
      if (this.isBrowser) {
        this.scrollToCard();
        setTimeout(() => this.focusEl('mq-success', true), 300);
      }
    } catch {
      // Keep every answer, show a translated message and let the visitor try again. Nothing is logged: the request holds PII.
      this.submitError = this.err('SUBMIT');
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private buildPayload(): HealthQuotePayload {
    const f = this.form;
    const pick = f.pick;
    const email = f.email.trim();
    const p: Omit<HealthQuotePayload, keyof PageSourceFields> = {
      type: 'health',
      zip_code: f.zip,
      household_size: f.hh,
      ages_covered: f.ages.map((a) => a.value).filter(Boolean).join(', '),
      full_name: f.name.trim(),
      phone_number: f.phone,
      preferred_language: LANG_VALUES[pick['lang']] ?? 'English',
    };
    const set = (key: keyof typeof p, map: Record<string, string>, group: string) => {
      const v = map[pick[group]];
      if (v) (p as any)[key] = v;
    };
    set('who_needs_coverage', WHO_VALUES, 'who');
    const county = f.county.trim().slice(0, 100);
    if (county) p.county = county;
    set('current_insurance_status', CURRENT_VALUES, 'current');
    if (pick['current'] === 'ending' && ISO_DATE_RE.test(f.ends)) p.coverage_end_date = f.ends;
    const events = Object.keys(EVENT_VALUES).filter((k) => f.events[k]).map((k) => EVENT_VALUES[k]);
    if (events.length) p.life_events = events.join(', ');

    const income = f.income.replace(/\D/g, '');
    if (income) p.household_income = income;
    set('uses_tobacco', YN_VALUES, 'tobacco');
    set('on_medicare', YN_VALUES, 'medicare');
    set('on_medicaid_chip', YNU_VALUES, 'medicaid');

    set('plan_type', PLAN_VALUES, 'plan');
    const priorities = Object.keys(PRIORITY_VALUES).filter((k) => f.priorities[k]).map((k) => PRIORITY_VALUES[k]);
    if (priorities.length) p.plan_priorities = priorities;
    const keep = f.keep.trim().slice(0, 200);
    if (keep) p.keep_provider = keep;

    if (email) p.email_address = email;
    set('contact_method', METHOD_VALUES, 'method');
    set('best_time_to_call', TIME_VALUES, 'time');
    const office = this.offices.find((o) => o.id === f.office);
    if (office) p.preferred_office = `${office.street}, ${office.city}`;

    return { ...p, ...this.pageSource.getSourceFields() };
  }

  // ---------- Review step ----------

  /** Label of the chosen option in a translated {V, L} list. */
  label(key: string, value: string): string {
    return this.list<{ V: string; L: string }>(P + key).find((o) => o.V === value)?.L ?? '';
  }

  /** Labels of the ticked boxes in a translated {V, L} list. */
  checked(key: string, state: Record<string, boolean>): string {
    return this.list<{ V: string; L: string }>(P + key)
      .filter((o) => state[o.V])
      .map((o) => o.L)
      .join(', ');
  }

  agesSummary(): string {
    return this.form.ages.map((a) => a.value).filter(Boolean).join(', ');
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

  private emptyForm(): MqForm {
    return {
      zip: '', county: '', ends: '', hh: '', income: '', keep: '',
      name: '', phone: '', email: '', office: '',
      ages: [{ id: ++this.ageSeq, value: '' }],
      pick: { lang: this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en' },
      events: {},
      priorities: {},
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
    const faq = this.list<{ Q: string; A: { t: string }[] }>(P + 'FAQ.ITEMS');
    if (!faq.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url('getHealthQuote');
    const t = (k: string) => this.translate.instant(P + k);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: t('BREADCRUMB.SECTION'), item: this.url('healthInsurance') },
            { '@type': 'ListItem', position: 3, name: t('BREADCRUMB.CURRENT'), item: pageUrl },
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
    script.text = JSON.stringify(data).replace(/</g, '\\u003c');
    this.document.head.appendChild(script);
  }
}
