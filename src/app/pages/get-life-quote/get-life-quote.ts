/**
 * Life insurance quote page (/life-insurance/quote/, /es/seguros-de-vida/cotizacion/).
 *
 * A 5-step form inside the hero, followed by content sections (types, how much, FAQs, final CTA).
 * This component only handles what the visitor sees and does. The other pieces live next to it:
 *   life-quote.model.ts       form shape, option values, blank form
 *   life-quote.validation.ts  which field is wrong and why
 *   life-quote.payload.ts     what is sent to POST /quotes/create
 * All visible text comes from LIFE_QUOTE_PAGE.* in src/assets/i18n/{en,es}.json.
 */
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Language } from '../../services/language';
import { HttpService } from '../../services/http.service';
import { PageSource } from '../../services/page-source';
import { buildRoute, OFFICES } from '../../components/header/header';
import {
  ALSO_QUOTE_ICONS, ANSWER_VALUES, HEIGHT_FEET, HEIGHT_INCHES, LifeQuoteForm, PURPOSE_ICONS, Question, T, TOTAL_STEPS,
  TYPE_SECTION_ICONS, emptyLifeQuoteForm,
} from './life-quote.model';
import { CheckedField, FIELD_INPUT_IDS, STEP_FIELDS, fieldErrorKey, phoneDigits } from './life-quote.validation';
import { buildLifeQuotePayload } from './life-quote.payload';

/** One option in a translated list, e.g. { V: 'term', L: 'Term' }. `LG` is a lang attribute. */
interface Option { V: string; L: string; LG?: string }

/**
 * A piece of translated text, rendered by the segsTpl template.
 * `hl` red text, `b` bold, `l` lang code, `h` link (tel: or '#quote'), `x` new tab, `r` route key,
 * `k` answer a '#quote' link pre-selects (only 'amount' is used).
 */
interface Seg { t: string; hl?: string; b?: string; l?: string; h?: string; r?: string; x?: string; k?: string }

const SCHEMA_ID = 'get-life-quote-structured-data';
const SITE = 'https://astateinsurance.com';

@Component({
  selector: 'app-get-life-quote',
  standalone: false,
  templateUrl: './get-life-quote.html',
  styleUrl: './get-life-quote.scss',
})
export class GetLifeQuote implements AfterViewInit, OnDestroy {
  // ---------- Fixed data for the template ----------

  readonly offices = OFFICES;
  readonly stepNumbers = [1, 2, 3, 4, 5];
  readonly typeSectionIcons = TYPE_SECTION_ICONS;
  readonly purposeIcons = PURPOSE_ICONS;
  readonly alsoQuoteIcons = ALSO_QUOTE_ICONS;
  readonly heightFeetOptions = HEIGHT_FEET;
  readonly heightInchOptions = HEIGHT_INCHES;

  // ---------- Form state ----------

  form: LifeQuoteForm;
  /** Current step, 1 to 5. */
  step = 1;
  /** True after "Edit" on the review step, so every step shows "Back to review". */
  editing = false;
  /** Translated error text by field. Empty or missing means no error. */
  errors: Partial<Record<CheckedField, string>> = {};
  isSubmitting = false;
  submitError = '';

  // ---------- After a successful submit ----------
  // Copied at submit time because the form is cleared right after.

  sent = false;
  sentFirstName = '';
  /** How the agent will reach out: a key under SUCCESS.HOW (call, text, email, any). */
  sentContactMethod = 'any';
  /** Phone number or email the agent will use. */
  sentContactValue = '';
  sentAlsoQuote = false;

  // ---------- Page UI state ----------

  /** Read by screen readers when the step changes. */
  liveMessage = '';
  /** Index of the open FAQ (-1 = none). */
  openFaq = 0;
  /** Sticky Quote / Call / Text bar on phones. */
  showStickyBar = false;

  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly subscriptions = new Subscription();
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
    this.form = emptyLifeQuoteForm(this.languageService.getCurrentLanguage());
    this.prefillFromQueryString();

    this.subscriptions.add(
      this.translate.onLangChange.subscribe(() => {
        // Translated lists and error texts belong to the old language.
        this.listCache.clear();
        this.errors = {};
        this.submitError = '';
        this.addStructuredData();
      }),
    );
    this.addStructuredData();
  }

  ngAfterViewInit() {
    this.watchStickyBar();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.stickyObserver?.disconnect();
    this.document.getElementById(SCHEMA_ID)?.remove();
  }

  // =====================================================================
  // Translations and links
  // =====================================================================

  /** A translated array (options, FAQs...). Cached because `instant()` returns a new array every call. */
  list<X = any>(key: string): X[] {
    const cached = this.listCache.get(key);
    if (cached) return cached;
    const value = this.translate.instant(key);
    if (!Array.isArray(value)) return [];
    this.listCache.set(key, value);
    return value;
  }

  /** Router link for a route key in the current language, e.g. route('lifeInsurance'). */
  route(page: string): string[] {
    return buildRoute(this.languageService, page);
  }

  /** In-text links: '#quote' scrolls to the form (and may pre-select an answer). tel: links work normally. */
  onSegLink(seg: Seg, event: Event) {
    if (seg.h !== '#quote') return;
    if (seg.k === 'amount') this.form.answers.amount = 'unsure';
    this.goToForm(event);
  }

  /** "Quote term life" etc. below the form: pre-select the type in step 3, then scroll up to the form. */
  pickType(type: string, event: Event) {
    this.form.answers.type = type;
    this.goToForm(event);
  }

  goToForm(event: Event) {
    event.preventDefault();
    this.scrollToCard();
    if (this.isBrowser) setTimeout(() => this.focus(`lq-h${this.step}`, true), 450);
  }

  onFaqToggle(index: number, event: Event) {
    const isOpen = (event.target as HTMLDetailsElement).open;
    if (isOpen) this.openFaq = index;
    else if (this.openFaq === index) this.openFaq = -1;
  }

  // =====================================================================
  // Input handlers
  // =====================================================================

  onText(field: 'dob' | 'spouseDob' | 'heightFeet' | 'heightInches' | 'name' | 'email', event: Event) {
    this.form[field] = (event.target as HTMLInputElement).value;
    this.recheck(field);
  }

  /** Formats the phone as the visitor types: (713) 555-0123. */
  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = formatPhone(phoneDigits(input.value).slice(0, 10));
    this.form.phone = input.value;
    this.recheck('phone');
  }

  /** ZIP and weight accept digits only, up to `maxLength`. */
  onDigits(field: 'zip' | 'weight', maxLength: number, event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, maxLength);
    this.form[field] = input.value;
    this.recheck(field);
  }

  /** Radio chips: is this option the chosen one? */
  isAnswer(question: Question, value: string): boolean {
    return this.form.answers[question] === value;
  }

  setAnswer(question: Question, value: string) {
    this.form.answers[question] = value;
  }

  onCheck(group: 'purpose' | 'alsoQuote', key: string, event: Event) {
    this.form[group][key] = (event.target as HTMLInputElement).checked;
  }

  isChecked(group: 'purpose' | 'alsoQuote', key: string): boolean {
    return !!this.form[group][key];
  }

  /** "Me and my spouse": the spouse's date of birth and sex are asked too. */
  get coversSpouse(): boolean {
    return this.form.answers.who === 'both';
  }

  /** Buying for anyone other than yourself shows the consent note. */
  get buyingForSomeoneElse(): boolean {
    return !!this.form.answers.who && this.form.answers.who !== 'me';
  }

  // =====================================================================
  // Step navigation
  // =====================================================================

  next() {
    if (this.validateStep(this.step)) this.showStep(this.step + 1);
  }

  prev() {
    this.showStep(this.step - 1);
  }

  /** "Edit" on the review step. */
  edit(step: number) {
    this.editing = true;
    this.showStep(step);
  }

  /** "Back to review" while editing: jump to the first step that still has an error, or to the review. */
  backToReview() {
    if (!this.validateStep(this.step)) return;
    this.showStep(this.firstInvalidStep() ?? TOTAL_STEPS);
  }

  /** Enter in a text input moves to the next step instead of submitting the form. */
  onEnter(event: Event) {
    if ((event.target as HTMLElement).tagName === 'INPUT' && this.step < TOTAL_STEPS) {
      event.preventDefault();
      this.next();
    }
  }

  private showStep(step: number) {
    this.step = step;
    if (step === TOTAL_STEPS) this.editing = false;
    const title = this.list<string>(T + 'FORM.STEP_TITLES')[step - 1] ?? '';
    this.liveMessage = this.translate.instant(T + 'FORM.LIVE', { n: step, title });
    this.cdr.detectChanges();

    if (!this.isBrowser) return;
    const card = this.card();
    const top = card?.getBoundingClientRect().top ?? 0;
    if (card && (top < 0 || top > window.innerHeight * 0.4)) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => this.focus(`lq-h${step}`, true), 300);
  }

  // =====================================================================
  // Validation (rules are in life-quote.validation.ts)
  // =====================================================================

  /** Checks every field of a step, shows the errors and focuses the first bad field. True when the step is fine. */
  private validateStep(step: number, moveFocus = true): boolean {
    const fields = STEP_FIELDS[step] ?? [];
    fields.forEach((field) => (this.errors[field] = this.errorText(field)));
    const firstBad = fields.find((field) => this.errors[field]);
    if (firstBad && moveFocus) this.focus(FIELD_INPUT_IDS[firstBad]);
    return !firstBad;
  }

  /** The first step (1-4) with an error, or undefined when everything is valid. */
  private firstInvalidStep(): number | undefined {
    for (let step = 1; step < TOTAL_STEPS; step++) {
      if (!this.validateStep(step, false)) return step;
    }
    return undefined;
  }

  /** While a field shows an error, re-check it on every change so the message goes away once it's fixed. */
  private recheck(field: string) {
    if (field in this.errors && this.errors[field as CheckedField]) {
      this.errors[field as CheckedField] = this.errorText(field as CheckedField);
    }
  }

  private errorText(field: CheckedField): string {
    const key = fieldErrorKey(field, this.form);
    return key ? this.translate.instant(T + 'FORM.ERR.' + key) : '';
  }

  // =====================================================================
  // Submit
  // =====================================================================

  async submit(event: Event) {
    event.preventDefault();
    if (this.isSubmitting || this.step !== TOTAL_STEPS) return;

    const badStep = this.firstInvalidStep();
    if (badStep) return this.showStep(badStep);

    this.isSubmitting = true;
    this.submitError = '';
    this.cdr.detectChanges();
    try {
      const payload = buildLifeQuotePayload(this.form, this.pageSource.getSourceFields());
      await firstValueFrom(this.http.post('/quotes/create', payload, true));
      this.showSuccess();
    } catch {
      // Keep every answer so the visitor can try again. Nothing is logged: the request holds PII and health answers.
      this.submitError = this.translate.instant(T + 'FORM.ERR.SUBMIT');
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private showSuccess() {
    const form = this.form;
    const method = form.answers.method ?? '';
    this.sentFirstName = form.name.trim().split(/\s+/)[0];
    this.sentContactMethod = ANSWER_VALUES.method[method] ? method : 'any';
    this.sentContactValue = method === 'email' ? form.email.trim() : form.phone;
    this.sentAlsoQuote = Object.values(form.alsoQuote).some(Boolean);

    this.form = emptyLifeQuoteForm(this.languageService.getCurrentLanguage());
    this.errors = {};
    this.step = 1;
    this.editing = false;
    this.sent = true;
    this.liveMessage = this.translate.instant(T + 'FORM.SUCCESS.TITLE', { first: this.sentFirstName });
    this.cdr.detectChanges();

    if (this.isBrowser) {
      this.scrollToCard();
      setTimeout(() => this.focus('lq-success', true), 300);
    }
  }

  // =====================================================================
  // Review step labels
  // =====================================================================

  /** Translated label of the chosen option, e.g. label('FORM.TYPES', 'term') = 'Term'. */
  label(listKey: string, value: string): string {
    return this.list<Option>(T + listKey).find((o) => o.V === value)?.L ?? '';
  }

  /** Translated labels of the ticked boxes, comma separated. */
  checkedLabels(listKey: string, group: 'purpose' | 'alsoQuote'): string {
    return this.list<Option>(T + listKey)
      .filter((o) => this.form[group][o.V])
      .map((o) => o.L)
      .join(', ');
  }

  heightLabel(): string {
    const { heightFeet, heightInches } = this.form;
    if (!heightFeet) return '';
    return `${heightFeet} ${this.translate.instant(T + 'FORM.FT')} ${heightInches || '0'} ${this.translate.instant(T + 'FORM.IN')}`;
  }

  weightLabel(): string {
    return this.form.weight ? `${this.form.weight} ${this.translate.instant(T + 'FORM.LBS')}` : '';
  }

  officeLabel(): string {
    const index = this.offices.findIndex((o) => o.id === this.form.office);
    return index > -1 ? (this.list<string>(T + 'FORM.OFFICES')[index] ?? '') : '';
  }

  /** yyyy-mm-dd shown as a long date in the page language, e.g. "May 20, 1980". */
  dateLabel(value: string): string {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return '';
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    const locale = this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US';
    return date.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // =====================================================================
  // Helpers
  // =====================================================================

  /** Name and phone can arrive from the short quote form as ?fullName=&phone=. Only read, never logged or stored. */
  private prefillFromQueryString() {
    const params = this.activatedRoute.snapshot?.queryParamMap;
    if (!params) return;
    const name = params.get('fullName')?.trim();
    const phone = params.get('phone')?.trim();
    if (name) this.form.name = name;
    if (phone) this.form.phone = formatPhone(phoneDigits(phone).slice(0, 10));
  }

  /** Shows the sticky bar on phones only while the form card, the final CTA and the footer are all off screen. */
  private watchStickyBar() {
    if (!this.isBrowser || !('IntersectionObserver' in window)) return;
    const watched = ['#quote', '#final-cta']
      .map((selector) => this.host.nativeElement.querySelector(selector))
      .concat(this.document.getElementById('footer'))
      .filter((el): el is HTMLElement => !!el);
    const onScreen = new Set<Element>(watched);
    this.stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      this.showStickyBar = onScreen.size === 0;
      this.cdr.detectChanges();
    });
    watched.forEach((el) => this.stickyObserver!.observe(el));
  }

  private card(): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>('#quote');
  }

  private scrollToCard() {
    if (this.isBrowser) this.card()?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private focus(id: string, preventScroll = false) {
    if (!this.isBrowser) return;
    this.host.nativeElement.querySelector<HTMLElement>('#' + id)?.focus(preventScroll ? { preventScroll: true } : undefined);
  }

  // =====================================================================
  // Structured data for search engines (rendered on the server)
  // =====================================================================

  private addStructuredData() {
    const faqs = this.list<{ Q: string; A: Seg[] }>(T + 'FAQ.ITEMS');
    if (!faqs.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.absoluteUrl('getLifeQuote');
    const t = (key: string) => this.translate.instant(T + key);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('BREADCRUMB.HOME'), item: this.absoluteUrl('home') },
            { '@type': 'ListItem', position: 2, name: t('BREADCRUMB.SECTION'), item: this.absoluteUrl('lifeInsurance') },
            { '@type': 'ListItem', position: 3, name: t('BREADCRUMB.CURRENT'), item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': pageUrl + '#faq',
          inLanguage: this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.Q,
            acceptedAnswer: { '@type': 'Answer', text: faq.A.map((seg) => seg.t).join('') },
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

  private absoluteUrl(page: string): string {
    const path = this.route(page).join('/').replace(/^\/+/, '');
    return `${SITE}/${path ? path + '/' : ''}`;
  }
}

/** 10 digits shown as (713) 555-0123 while typing. */
function formatPhone(digits: string): string {
  if (digits.length > 6) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length > 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return digits;
}
