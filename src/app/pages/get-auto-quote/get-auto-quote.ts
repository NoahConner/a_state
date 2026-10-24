import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Language } from '../../services/language';
import { HttpService } from '../../services/http.service';
import { PageSource, PageSourceFields } from '../../services/page-source';
import { buildRoute, OFFICES } from '../../components/header/header';

/**
 * A piece of translated text. Flags are strings ("true") because ngx-translate drops booleans
 * inside arrays: `hl` red text, `b` bold, `l` language code of the phrase (lang attribute),
 * `h` link target (tel:, "#quote" or an external URL), `x` open the link in a new tab,
 * `r` route key for an internal link.
 */
export interface AqSeg { t: string; hl?: string; b?: string; l?: string; h?: string; r?: string; x?: string }

/** One repeating vehicle block. `id` never changes, so DOM ids stay stable when blocks are removed. */
export interface AqVehicle {
  id: number; year: string; make: string; model: string; vin: string;
  own: string; use: string; miles: string; pzip: string;
}

/** One repeating driver block. */
export interface AqDriver {
  id: number; name: string; dob: string; marital: string; license: string; age: string;
}

interface AqForm {
  name: string; phone: string; email: string; email2: string; zip: string;
  vehicles: AqVehicle[]; drivers: AqDriver[];
  /** Single-choice answers by group: coverage, accidents, tickets, sr22, insured, lang, method, time. */
  pick: Record<string, string>;
  carrier: string; renewal: string; also: Record<string, boolean>; office: string;
}

const P = 'AUTO_QUOTE_PAGE.';
const SCHEMA_ID = 'get-auto-quote-structured-data';
const SITE = 'https://astateinsurance.com';
const MAX_BLOCKS = 6;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;
const TOTAL_STEPS = 6;

const NEED_ICONS = ['i-user', 'i-car', 'i-doc', 'i-alert'];
const BASICS_ICONS = ['i-scale', 'i-shield', 'i-health', 'i-doc'];
const ALSO_ICONS = ['i-home', 'i-briefcase', 'i-heart', 'i-health'];

const MAKES = [
  'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai',
  'Infiniti', 'Jeep', 'Kia', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Ram', 'Subaru',
  'Tesla', 'Toyota', 'Volkswagen', 'Volvo',
];

/** English values the existing /quotes/create payload used for these questions (labels shown to the visitor are translated). */
const OWN_VALUES: Record<string, string> = { owned: 'Owned', financed: 'Financed', leased: 'Leased' };
const USE_VALUES: Record<string, string> = { personal: 'Personal', commuting: 'Commuting', business: 'Business', rideshare: 'Rideshare or delivery' };
const MARITAL_VALUES: Record<string, string> = { single: 'Single', married: 'Married', other: 'Other' };
const YNU_VALUES: Record<string, string> = { yes: 'Yes', no: 'No', unsure: 'Not sure' };
const LANG_VALUES: Record<string, string> = { en: 'English', es: 'Spanish', hi: 'Hindi' };
const METHOD_VALUES: Record<string, string> = { call: 'Phone Call', text: 'Text Message', email: 'Email' };
const TIME_VALUES: Record<string, string> = { morning: 'Morning (9 AM–12 PM)', afternoon: 'Afternoon (12 PM–4 PM)', evening: 'Evening (4 PM–7 PM)' };
const LICENSE_VALUES: Record<string, string> = { texas: 'Texas', us: 'Other U.S. state', foreign: 'Foreign or international', none: 'No license yet' };
const COVERAGE_VALUES: Record<string, string> = { minimum: 'State minimum (liability only)', full: 'Full coverage', unsure: 'Not sure' };
const COUNT_VALUES: Record<string, string> = { '0': '0', '1': '1', '2+': '2+', unsure: 'Not sure' };
/** "Bundle" answers, one per product that has a slot. BUNDLE_NONE is only sent when none is ticked. */
const BUNDLE_VALUES: Record<string, string> = {
  home: 'Yes! I want an Auto + Home bundle discount.',
  commercial: 'Yes! I want an Auto + Commercial bundle discount.',
  life: 'Yes! I want an Auto + Life bundle discount.',
  health: 'Yes! I want an Auto + Health bundle discount.',
};
const BUNDLE_NONE = 'No, just Auto for now.';
const YEAR_OLD_VALUE = '1989 or older';

/**
 * Body of POST /quotes/create. Enum-like answers are canonical English strings whatever the page language,
 * dates are yyyy-mm-dd. Optional keys are omitted (never '' or null) when not answered.
 */
interface AutoQuotePayload extends PageSourceFields {
  type: 'auto';
  first_name: string;
  zip_code: string;
  email_address?: string;
  phone_number: string;
  vehicles: {
    year: string; make: string; model: string; vin?: string; annual_miles?: string; garaging_zip?: string;
    ownership?: string; primary_use?: string;
  }[];
  drivers: {
    full_name: string; date_of_birth: string; marital_status?: string; license_type?: string; age_first_licensed?: string;
  }[];
  coverage_type?: string;
  accidents?: string;
  tickets?: string;
  currently_issued?: string;
  current_carrier?: string;
  renewal_date?: string;
  sr_22_needed?: string;
  bundle?: string;
  preferred_office?: string;
  preferred_language: string;
  contact_method?: string;
  best_time_to_connect?: string;
}

@Component({
  selector: 'app-get-auto-quote',
  standalone: false,
  templateUrl: './get-auto-quote.html',
  styleUrl: './get-auto-quote.scss',
})
export class GetAutoQuote implements AfterViewInit, OnDestroy {
  readonly offices = OFFICES;
  readonly makes = MAKES;
  readonly maxBlocks = MAX_BLOCKS;
  readonly stepNumbers = [1, 2, 3, 4, 5, 6];
  readonly needIcons = NEED_ICONS;
  readonly basicsIcons = BASICS_ICONS;
  readonly alsoIcons = ALSO_ICONS;
  /** Model years for the vehicle select: next year down to 1990. "1989 or older" is added by the template. */
  readonly years: string[] = [];

  step = 1;
  /** True after "Edit" on the review step, so every step offers "Back to review". */
  editing = false;
  live = '';
  faqOpen = 0;
  showSticky = false;

  form!: AqForm;
  /** Error text by field key, e.g. "name", "v2.vin", "d1.dob". Empty or missing means no error. */
  errors: Record<string, string> = {};
  isSubmitting = false;
  sent = false;
  submitError = '';

  private seq = { vehicle: 0, driver: 0 };
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
    for (let y = new Date().getFullYear() + 1; y >= 1990; y--) this.years.push(String(y));
    this.form = this.emptyForm();
    this.applyPrefill();
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

  trackById(_i: number, item: { id: number }): number {
    return item.id;
  }

  // ---------- Links ----------

  /** In-text "#quote" links scroll to the form; tel: and external links follow normally. */
  onSegLink(href: string, event: Event) {
    if (href === '#quote') this.goToForm(event);
  }

  goToForm(event: Event) {
    event.preventDefault();
    this.scrollToCard();
    if (this.isBrowser) setTimeout(() => this.focusEl(`aq-h${this.step}`, true), 450);
  }

  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Inputs ----------

  onText(field: 'name' | 'email' | 'email2' | 'carrier' | 'renewal', event: Event) {
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

  onZipInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 5);
    this.form.zip = input.value;
    if (this.errors['zip']) this.errors['zip'] = this.fieldError('zip');
  }

  onVehicle(v: AqVehicle, key: 'year' | 'make' | 'model' | 'vin' | 'miles' | 'pzip', event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    if (key === 'vin') {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17);
    } else if (key === 'miles') {
      const m = value.replace(/\D/g, '').slice(0, 6);
      value = m ? Number(m).toLocaleString('en-US') : '';
    } else if (key === 'pzip') {
      value = value.replace(/\D/g, '').slice(0, 5);
    }
    if (value !== input.value) input.value = value;
    v[key] = value;
    const k = `v${v.id}.${key}`;
    if (this.errors[k]) this.errors[k] = this.vehicleError(v, key);
  }

  onDriver(d: AqDriver, key: 'name' | 'dob' | 'age', event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    if (key === 'age') {
      value = value.replace(/\D/g, '').slice(0, 2);
      if (value !== input.value) input.value = value;
    }
    d[key] = value;
    const k = `d${d.id}.${key}`;
    if (this.errors[k]) this.errors[k] = this.driverError(d, key);
    // The age-first-licensed check depends on the date of birth.
    if (key === 'dob' && this.errors[`d${d.id}.age`]) this.errors[`d${d.id}.age`] = this.driverError(d, 'age');
  }

  onAlso(key: string, event: Event) {
    this.form.also[key] = (event.target as HTMLInputElement).checked;
  }

  isLoan(v: AqVehicle): boolean {
    return v.own === 'financed' || v.own === 'leased';
  }

  /** Contact by email but no email given yet: step 5 asks for it. */
  get needEmail(): boolean {
    return this.form.pick['method'] === 'email' && !this.form.email.trim();
  }

  // ---------- Vehicles and drivers ----------

  addBlock(kind: 'vehicle' | 'driver') {
    const list = kind === 'vehicle' ? this.form.vehicles : this.form.drivers;
    if (list.length >= MAX_BLOCKS) return;
    const item = kind === 'vehicle' ? this.newVehicle() : this.newDriver();
    (list as { id: number }[]).push(item);
    this.live = this.translate.instant(P + (kind === 'vehicle' ? 'FORM.ADDED_V' : 'FORM.ADDED_D'), { n: list.length });
    this.cdr.detectChanges();
    if (!this.isBrowser) return;
    const first = this.host.nativeElement.querySelector<HTMLElement>(`#aq-${kind === 'vehicle' ? 'v' : 'd'}${item.id}-${kind === 'vehicle' ? 'year' : 'name'}`);
    first?.closest<HTMLElement>('.aq-item')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => first?.focus({ preventScroll: true }), 30);
  }

  removeBlock(kind: 'vehicle' | 'driver', index: number) {
    const list = kind === 'vehicle' ? this.form.vehicles : this.form.drivers;
    if (list.length < 2) return;
    const [gone] = list.splice(index, 1);
    const prefix = (kind === 'vehicle' ? 'v' : 'd') + gone.id + '.';
    Object.keys(this.errors).filter((k) => k.startsWith(prefix)).forEach((k) => delete this.errors[k]);
    this.live = this.translate.instant(P + (kind === 'vehicle' ? 'FORM.REMOVED_V' : 'FORM.REMOVED_D'), { n: index + 1 });
    this.cdr.detectChanges();
    // Focus the heading of the block before the removed one (or the first block).
    const target = list[Math.max(0, index - 1)];
    this.focusEl(`aq-${kind === 'vehicle' ? 'v' : 'd'}${target.id}-h`, true);
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
    // Driver 1 starts with the name from step 1.
    if (n === 3 && !this.form.drivers[0].name.trim()) this.form.drivers[0].name = this.form.name.trim();
    this.live = this.translate.instant(P + 'FORM.LIVE', { n, title: this.list<string>(P + 'FORM.STEP_TITLES')[n - 1] ?? '' });
    this.cdr.detectChanges();
    if (!this.isBrowser) return;
    const card = this.card();
    if (card) {
      const top = card.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.4) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => this.focusEl(`aq-h${n}`, true), 300);
  }

  // ---------- Validation ----------

  /** Validates one step, stores the messages and returns the DOM ids of invalid fields in page order. */
  private validateStep(n: number): string[] {
    const bad: string[] = [];
    const check = (key: string, id: string, msg: string) => {
      this.errors[key] = msg;
      if (msg) bad.push(id);
    };
    if (n === 1) {
      check('name', 'aq-name', this.fieldError('name'));
      check('phone', 'aq-phone', this.fieldError('phone'));
      check('email', 'aq-email', this.fieldError('email'));
      check('zip', 'aq-zip', this.fieldError('zip'));
    } else if (n === 2) {
      for (const v of this.form.vehicles) {
        for (const key of ['year', 'make', 'model', 'vin', 'pzip'] as const) {
          check(`v${v.id}.${key}`, `aq-v${v.id}-${key}`, this.vehicleError(v, key));
        }
      }
    } else if (n === 3) {
      for (const d of this.form.drivers) {
        for (const key of ['name', 'dob', 'age'] as const) {
          check(`d${d.id}.${key}`, `aq-d${d.id}-${key}`, this.driverError(d, key));
        }
      }
    } else if (n === 5) {
      check('email2', 'aq-email2', this.fieldError('email2'));
      // The email asked for here becomes the email on the request.
      if (!bad.length && this.needEmail) this.form.email = this.form.email2.trim();
    }
    return bad;
  }

  private err(k: string, params?: object): string {
    return this.translate.instant(P + 'FORM.ERR.' + k, params);
  }

  private fieldError(f: 'name' | 'phone' | 'email' | 'zip' | 'email2' | 'carrier' | 'renewal'): string {
    switch (f) {
      case 'name':
        return this.form.name.trim().length < 2 ? this.err('NAME') : '';
      case 'phone': {
        const d = this.digits(this.form.phone);
        return !d ? this.err('PHONE_EMPTY') : d.length !== 10 ? this.err('PHONE_INVALID') : '';
      }
      case 'email': {
        const e = this.form.email.trim();
        return e && !EMAIL_RE.test(e) ? this.err('EMAIL') : '';
      }
      case 'zip':
        return !this.form.zip ? this.err('ZIP_EMPTY') : !/^\d{5}$/.test(this.form.zip) ? this.err('ZIP_INVALID') : '';
      case 'email2': {
        if (!this.needEmail) return '';
        const v = this.form.email2.trim();
        if (!v) return this.err('EMAIL_NEEDED');
        return EMAIL_RE.test(v) ? '' : this.err('EMAIL_NEEDED_INVALID');
      }
      default:
        return '';
    }
  }

  private vehicleError(v: AqVehicle, key: 'year' | 'make' | 'model' | 'vin' | 'miles' | 'pzip'): string {
    switch (key) {
      case 'year':
        return v.year ? '' : this.err('YEAR');
      case 'make':
        return v.make.trim() ? '' : this.err('MAKE');
      case 'model':
        return v.model.trim() ? '' : this.err('MODEL');
      case 'vin':
        if (!v.vin || VIN_RE.test(v.vin)) return '';
        return v.vin.length !== 17 ? this.err('VIN_LENGTH', { n: v.vin.length }) : this.err('VIN_CHARS');
      case 'pzip':
        return v.pzip && !/^\d{5}$/.test(v.pzip) ? this.err('PZIP') : '';
      default:
        return '';
    }
  }

  private driverError(d: AqDriver, key: 'name' | 'dob' | 'age'): string {
    switch (key) {
      case 'name':
        return d.name.trim().length < 2 ? this.err('D_NAME') : '';
      case 'dob': {
        if (!d.dob) return this.err('DOB_EMPTY');
        const a = this.ageOf(d.dob);
        return a === null || a < 15 || a > 100 ? this.err('DOB_AGE') : '';
      }
      case 'age': {
        if (!d.age) return '';
        const first = Number(d.age);
        const a = d.dob ? this.ageOf(d.dob) : null;
        const dobOk = a !== null && a >= 15 && a <= 100;
        return first < 14 || (dobOk && first > a!) ? this.err('D_AGE') : '';
      }
    }
  }

  /** Whole years since the date of birth (yyyy-mm-dd), or null when it is not a real date. */
  private ageOf(dob: string): number | null {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
    if (!m) return null;
    const birth = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
    return age;
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
      this.form = this.emptyForm();
      this.errors = {};
      this.step = 1;
      this.editing = false;
      this.sent = true;
      this.live = this.translate.instant(P + 'FORM.SUCCESS.TITLE');
      this.cdr.detectChanges();
      if (this.isBrowser) {
        this.scrollToCard();
        setTimeout(() => this.focusEl('aq-success', true), 300);
      }
    } catch {
      // Keep every answer, show a translated message and let the visitor try again. Nothing is logged: the request holds PII.
      this.submitError = this.translate.instant(P + 'FORM.ERR.SUBMIT');
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private buildPayload(): AutoQuotePayload {
    const f = this.form;
    const pick = f.pick;
    const email = f.email.trim();
    const bundles = Object.keys(BUNDLE_VALUES).filter((k) => f.also[k]).map((k) => BUNDLE_VALUES[k]);
    const insured = pick['insured'] === 'yes';
    const carrier = insured ? f.carrier.trim() : '';
    const office = this.offices.find((o) => o.id === f.office);
    return {
      type: 'auto',
      first_name: f.name.trim(),
      zip_code: f.zip,
      ...(email ? { email_address: email } : {}),
      phone_number: f.phone,
      vehicles: f.vehicles.map((v) => {
        const miles = v.miles.replace(/\D/g, '');
        return {
          year: v.year === '1989' ? YEAR_OLD_VALUE : v.year,
          make: v.make.trim(),
          model: v.model.trim(),
          ...(v.vin ? { vin: v.vin } : {}),
          ...(miles ? { annual_miles: miles } : {}),
          ...(/^\d{5}$/.test(v.pzip) ? { garaging_zip: v.pzip } : {}),
          ...(v.own ? { ownership: OWN_VALUES[v.own] } : {}),
          ...(v.use ? { primary_use: USE_VALUES[v.use] } : {}),
        };
      }),
      drivers: f.drivers.map((d) => ({
        full_name: d.name.trim(),
        date_of_birth: d.dob,
        ...(d.marital ? { marital_status: MARITAL_VALUES[d.marital] } : {}),
        ...(LICENSE_VALUES[d.license] ? { license_type: LICENSE_VALUES[d.license] } : {}),
        ...(d.age ? { age_first_licensed: d.age } : {}),
      })),
      ...(COVERAGE_VALUES[pick['coverage']] ? { coverage_type: COVERAGE_VALUES[pick['coverage']] } : {}),
      ...(COUNT_VALUES[pick['accidents']] ? { accidents: COUNT_VALUES[pick['accidents']] } : {}),
      ...(COUNT_VALUES[pick['tickets']] ? { tickets: COUNT_VALUES[pick['tickets']] } : {}),
      ...(pick['insured'] ? { currently_issued: insured ? 'Yes' : 'No' } : {}),
      ...(carrier ? { current_carrier: carrier } : {}),
      ...(insured && /^\d{4}-\d{2}-\d{2}$/.test(f.renewal) ? { renewal_date: f.renewal } : {}),
      ...(office ? { preferred_office: `${office.street}, ${office.city}` } : {}),
      ...(pick['sr22'] ? { sr_22_needed: YNU_VALUES[pick['sr22']] } : {}),
      bundle: bundles.length ? bundles.join(' ') : BUNDLE_NONE,
      preferred_language: LANG_VALUES[pick['lang']] ?? 'English',
      ...(pick['method'] ? { contact_method: METHOD_VALUES[pick['method']] } : {}),
      ...(pick['time'] ? { best_time_to_connect: TIME_VALUES[pick['time']] } : {}),
      ...this.pageSource.getSourceFields(),
    };
  }

  // ---------- Review step ----------

  /** Label of the chosen option in a translated {V, L} list. */
  label(key: string, value: string): string {
    return this.list<{ V: string; L: string }>(P + key).find((o) => o.V === value)?.L ?? '';
  }

  yearLabel(v: AqVehicle): string {
    return v.year === '1989' ? this.translate.instant(P + 'FORM.YEAR_OLD') : v.year;
  }

  ymm(v: AqVehicle): string {
    return [this.yearLabel(v), v.make.trim(), v.model.trim()].filter(Boolean).join(' ');
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

  private newVehicle(): AqVehicle {
    return { id: ++this.seq.vehicle, year: '', make: '', model: '', vin: '', own: '', use: '', miles: '', pzip: '' };
  }

  private newDriver(): AqDriver {
    return { id: ++this.seq.driver, name: '', dob: '', marital: '', license: '', age: '' };
  }

  private emptyForm(): AqForm {
    this.seq = { vehicle: 0, driver: 0 };
    return {
      name: '', phone: '', email: '', email2: '', zip: '',
      vehicles: [this.newVehicle()], drivers: [this.newDriver()],
      pick: { lang: this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en' },
      carrier: '', renewal: '', also: {}, office: '',
    };
  }

  /** Name and phone can arrive from the short quote form as query parameters; they are only read, never logged or stored. */
  private applyPrefill() {
    const q = this.activatedRoute.snapshot.queryParamMap;
    const name = q.get('fullName')?.trim();
    const phone = q.get('phone')?.trim();
    if (name) this.form.name = name;
    if (phone) {
      const d = this.digits(phone).slice(0, 10);
      this.form.phone = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d;
    }
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

    const pageUrl = this.url('getAutoQuote');
    const t = (k: string) => this.translate.instant(P + k);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: t('BREADCRUMB.SECTION'), item: this.url('autoInsurance') },
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
