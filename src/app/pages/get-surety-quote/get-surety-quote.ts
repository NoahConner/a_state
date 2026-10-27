import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Language } from '../../services/language';
import { HttpService } from '../../services/http.service';
import { PageSource, PageSourceFields } from '../../services/page-source';
import { buildRoute, OFFICES } from '../../components/header/header';

interface SqForm {
  name: string; biz: string; phone: string; email: string; zip: string;
  obligee: string; amount: string; amountUnsure: boolean; date: string; years: string; office: string;
  /** Single-choice answers by group: applicant, bond, when, credit, renewal, claims, judgments, lang, method, time. */
  pick: Record<string, string>;
}

const P = 'SURETY_QUOTE_PAGE.';
const SCHEMA_ID = 'get-surety-quote-structured-data';
const SITE = 'https://astateinsurance.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TOTAL_STEPS = 5;

const HOW_ICONS = ['i-layers', 'i-shield', 'i-scale', 'i-cal'];

/** English values sent to /quotes/create (labels shown to the visitor are translated). */
const APPLICANT_VALUES: Record<string, string> = { individual: 'Individual', business: 'Business', unsure: 'Not sure' };
const BOND_VALUES: Record<string, string> = {
  notary: 'Notary bond', 'bonded-title': 'Bonded title (vehicle title bond)', 'auto-dealer': 'Auto dealer bond',
  contractor: 'City or trade contractor bond', janitorial: 'Cleaning or janitorial bond', 'license-permit': 'Other license or permit bond',
  'court-probate': 'Court or probate bond', 'performance-payment': 'Performance or payment bond (contract)',
  unsure: 'Not sure: help me find the right bond',
};
const WHEN_VALUES: Record<string, string> = { asap: 'As soon as possible', '30-days': 'Within 30 days', date: 'Specific date', unsure: 'Not sure' };
const CREDIT_VALUES: Record<string, string> = {
  excellent: 'Excellent (720+)', good: 'Good (680-719)', fair: 'Fair (620-679)', 'below-620': 'Below 620', unsure: 'Not sure',
};
const RENEWAL_VALUES: Record<string, string> = { new: 'New', renewal: 'Renewal' };
const CLAIMS_VALUES: Record<string, string> = { no: 'No', yes: 'Yes', unsure: 'Not sure' };
const JUDGMENT_VALUES: Record<string, string> = { no: 'No', yes: 'Yes', discuss: 'Prefer to discuss with an agent' };
const LANG_VALUES: Record<string, string> = { en: 'English', es: 'Spanish', hi: 'Hindi' };
const METHOD_VALUES: Record<string, string> = { call: 'Call', text: 'Text', email: 'Email' };
const TIME_VALUES: Record<string, string> = { morning: 'Morning (9 AM–12 PM)', afternoon: 'Afternoon (12 PM–4 PM)', evening: 'Evening (4 PM–7 PM)' };

/**
 * Body of POST /quotes/create. Enum-like answers are canonical English strings whatever the page language,
 * dates are yyyy-mm-dd. Optional keys are omitted (never '' or null) when not answered.
 * Credit, claims and judgment answers go only to this request: never to analytics, storage or logs.
 */
export interface SuretyQuotePayload extends PageSourceFields {
  type: 'surety_bond';
  applicant_type?: string;
  full_name: string;
  business_name?: string;
  phone_number: string;
  email_address?: string;
  zip_code: string;
  bond_type: string;
  obligee_name?: string;
  bond_amount?: string;
  bond_needed_by?: string;
  bond_needed_by_specific_date?: string;
  estimated_credit_score?: string;
  new_or_renewal?: string;
  prior_bond_history?: string;
  has_judgments_liens_bankruptcies?: string;
  years_in_business?: string;
  preferred_language: string;
  contact_method?: string;
  best_time_to_call?: string;
  preferred_office?: string;
}

@Component({
  selector: 'app-get-surety-quote',
  standalone: false,
  templateUrl: './get-surety-quote.html',
  styleUrl: './get-surety-quote.scss',
})
export class GetSuretyQuote implements AfterViewInit, OnDestroy {
  readonly offices = OFFICES;
  readonly stepNumbers = [1, 2, 3, 4, 5];
  readonly howIcons = HOW_ICONS;

  step = 1;
  /** True after "Edit" on the review step, so every step offers "Back to review". */
  editing = false;
  live = '';
  faqOpen = 0;
  showSticky = false;

  form!: SqForm;
  /** Error text by field key (name, phone, email, zip, bond, date, method). Empty or missing means no error. */
  errors: Record<string, string> = {};
  isSubmitting = false;
  sent = false;
  /** Set at submit time because the form is reset afterwards. */
  sentAsap = false;
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

  get isBusiness(): boolean {
    return this.form.pick['applicant'] === 'business';
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
    if (this.isBrowser) setTimeout(() => this.focusEl(`sq-h${this.step}`, true), 450);
  }

  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Inputs ----------

  onText(field: 'name' | 'biz' | 'email' | 'obligee' | 'date', event: Event) {
    this.form[field] = (event.target as HTMLInputElement).value;
    if (this.errors[field]) this.errors[field] = this.fieldError(field);
    if (field === 'email' && this.errors['method']) this.errors['method'] = this.fieldError('method');
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

  onYearsInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 3);
    this.form.years = input.value;
  }

  onAmountInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const m = input.value.replace(/\D/g, '').slice(0, 9);
    input.value = m ? Number(m).toLocaleString('en-US') : '';
    this.form.amount = input.value;
  }

  onAmountUnsure(event: Event) {
    this.form.amountUnsure = (event.target as HTMLInputElement).checked;
    if (this.form.amountUnsure) this.form.amount = '';
  }

  pick(group: string, value: string) {
    this.form.pick[group] = value;
    if (group === 'bond' && this.errors['bond']) this.errors['bond'] = '';
    if (group === 'method' && this.errors['method']) this.errors['method'] = this.fieldError('method');
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
    setTimeout(() => this.focusEl(`sq-h${n}`, true), 300);
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
      check('name', 'sq-name');
      check('phone', 'sq-phone');
      check('email', 'sq-email');
      check('zip', 'sq-zip');
    } else if (n === 2) {
      check('bond', 'sq-b-notary');
      check('date', 'sq-date');
    } else if (n === 4) {
      check('method', 'sq-m-email');
    }
    return bad;
  }

  private err(k: string): string {
    return this.translate.instant(P + 'FORM.ERR.' + k);
  }

  private fieldError(f: string): string {
    const form = this.form;
    switch (f) {
      case 'name':
        return form.name.trim().length < 2 ? this.err('NAME') : '';
      case 'phone': {
        const d = this.digits(form.phone);
        return !d ? this.err('PHONE_EMPTY') : d.length !== 10 ? this.err('PHONE_INVALID') : '';
      }
      case 'email': {
        const e = form.email.trim();
        return e && !EMAIL_RE.test(e) ? this.err('EMAIL') : '';
      }
      case 'zip':
        return !form.zip ? this.err('ZIP_EMPTY') : !ZIP_RE.test(form.zip) ? this.err('ZIP') : '';
      case 'bond':
        return form.pick['bond'] ? '' : this.err('BOND');
      case 'date':
        // Only matters for "Specific date"; a hidden leftover value is ignored.
        return form.pick['when'] === 'date' && form.date && form.date < this.todayIso() ? this.err('DATE_PAST') : '';
      case 'method':
        // Email lives in step 1, so step 4 points the visitor back to it.
        return form.pick['method'] === 'email' && !form.email.trim() ? this.err('EMAIL_NEEDED') : '';
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
      this.sentAsap = this.form.pick['when'] === 'asap';
      this.form = this.emptyForm();
      this.errors = {};
      this.step = 1;
      this.editing = false;
      this.sent = true;
      this.live = this.translate.instant(P + 'FORM.SUCCESS.TITLE');
      this.cdr.detectChanges();
      if (this.isBrowser) {
        this.scrollToCard();
        setTimeout(() => this.focusEl('sq-success', true), 300);
      }
    } catch {
      // Keep every answer, show a translated message and let the visitor try again. Nothing is logged: the request holds PII.
      this.submitError = this.err('SUBMIT');
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private buildPayload(): SuretyQuotePayload {
    const f = this.form;
    const pick = f.pick;
    const email = f.email.trim();
    const p: Omit<SuretyQuotePayload, keyof PageSourceFields> = {
      type: 'surety_bond',
      full_name: f.name.trim(),
      phone_number: f.phone,
      zip_code: f.zip,
      bond_type: BOND_VALUES[pick['bond']] ?? '',
      preferred_language: LANG_VALUES[pick['lang']] ?? 'English',
    };
    const set = (key: keyof typeof p, map: Record<string, string>, group: string) => {
      const v = map[pick[group]];
      if (v) (p as any)[key] = v;
    };
    set('applicant_type', APPLICANT_VALUES, 'applicant');
    const biz = f.biz.trim().slice(0, 200);
    if (this.isBusiness && biz) p.business_name = biz;
    if (email) p.email_address = email;

    const obligee = f.obligee.trim().slice(0, 200);
    if (obligee) p.obligee_name = obligee;
    const amount = f.amount.replace(/\D/g, '');
    if (f.amountUnsure) p.bond_amount = 'Not sure';
    else if (amount) p.bond_amount = amount;
    set('bond_needed_by', WHEN_VALUES, 'when');
    if (pick['when'] === 'date' && ISO_DATE_RE.test(f.date)) p.bond_needed_by_specific_date = f.date;

    set('estimated_credit_score', CREDIT_VALUES, 'credit');
    set('new_or_renewal', RENEWAL_VALUES, 'renewal');
    set('prior_bond_history', CLAIMS_VALUES, 'claims');
    set('has_judgments_liens_bankruptcies', JUDGMENT_VALUES, 'judgments');
    if (this.isBusiness && f.years) p.years_in_business = f.years;

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

  amountLabel(): string {
    if (this.form.amountUnsure) return this.translate.instant(P + 'FORM.AMOUNT_UNSURE');
    return this.form.amount ? '$' + this.form.amount : '';
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

  private emptyForm(): SqForm {
    return {
      name: '', biz: '', phone: '', email: '', zip: '',
      obligee: '', amount: '', amountUnsure: false, date: '', years: '', office: '',
      pick: { lang: this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en' },
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

    const pageUrl = this.url('getSuretyQuote');
    const t = (k: string) => this.translate.instant(P + k);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: t('BREADCRUMB.SECTION'), item: this.url('suretyBondInsurance') },
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
