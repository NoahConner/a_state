import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';
import { NAV_GROUPS, NavLink, OFFICES, buildRoute } from '../../components/header/header';

type ProductKey = 'auto' | 'home' | 'business' | 'life' | 'health' | 'other';

interface Product {
  key: ProductKey;
  icon: string;
  /** Tile label in the hero form; the final form uses `finalLabelKey`. */
  labelKey: string;
  finalLabelKey: string;
  /** Detailed quote page the visitor continues to after the short form. */
  quoteRouteKey: string;
}

interface QuoteForm {
  id: 'hero' | 'final';
  /** Visitors can pick several products. */
  products: ProductKey[];
  name: string;
  phone: string;
  errors: { product?: string; name?: string; phone?: string };
  isSubmitting: boolean;
}

const P = 'HOME_PAGE.FORM.PRODUCTS.';
const PRODUCTS: Product[] = [
  { key: 'auto', icon: 'i-car', labelKey: P + 'AUTO', finalLabelKey: P + 'AUTO', quoteRouteKey: 'getAutoQuote' },
  { key: 'home', icon: 'i-home', labelKey: P + 'HOME', finalLabelKey: P + 'HOMEOWNERS', quoteRouteKey: 'getHomeQuote' },
  { key: 'business', icon: 'i-briefcase', labelKey: P + 'BUSINESS', finalLabelKey: P + 'COMMERCIAL', quoteRouteKey: 'getCommercialQuote' },
  { key: 'life', icon: 'i-heart', labelKey: P + 'LIFE', finalLabelKey: P + 'LIFE', quoteRouteKey: 'getLifeQuote' },
  { key: 'health', icon: 'i-health', labelKey: P + 'HEALTH', finalLabelKey: P + 'HEALTH', quoteRouteKey: 'getHealthQuote' },
  { key: 'other', icon: 'i-more', labelKey: P + 'OTHER', finalLabelKey: P + 'OTHER', quoteRouteKey: 'getAQuote' },
];

const SCHEMA_ID = 'home-structured-data';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  readonly products = PRODUCTS;
  readonly offices = OFFICES;
  readonly heroForm = this.createForm('hero');
  readonly finalForm = this.createForm('final');

  /**
   * Product cards, in the same order as the header's NAV_GROUPS, whose links they reuse.
   * `titleRoute` follows the content doc: the Home title is not a link, and only "Surety Bonds"
   * is linked in the bonds title. `quoteRoute` is the detailed quote page for the card's CTA.
   */
  readonly productCards: Array<{ key: string; icon: string; titleRoute?: string; quoteRoute: string; links: NavLink[] }> = [
    { key: 'AUTO', icon: 'i-car', titleRoute: 'autoInsurance', quoteRoute: 'getAutoQuote', links: NAV_GROUPS[0].links },
    { key: 'HOME', icon: 'i-home', quoteRoute: 'getHomeQuote', links: NAV_GROUPS[1].links },
    { key: 'BUSINESS', icon: 'i-briefcase', titleRoute: 'commercialInsurance', quoteRoute: 'getCommercialQuote', links: NAV_GROUPS[2].links },
    { key: 'LIFE', icon: 'i-heart', titleRoute: 'lifeInsurance', quoteRoute: 'getLifeQuote', links: NAV_GROUPS[3].links },
    { key: 'HEALTH', icon: 'i-health', titleRoute: 'healthInsurance', quoteRoute: 'getHealthQuote', links: NAV_GROUPS[4].links },
    { key: 'BONDS', icon: 'i-shield', titleRoute: 'suretyBondInsurance', quoteRoute: 'getSuretyQuote', links: NAV_GROUPS[5].links },
  ];

  /** Same order as HOME_PAGE.SITUATIONS.ITEMS. */
  readonly situationRoutes = ['getAutoQuote', 'getAutoQuote', 'getHomeQuote', 'getHomeQuote', 'getCommercialQuote', 'getCommercialQuote', 'getHealthQuote', 'getAutoQuote'];
  readonly trustIcons = ['i-list', 'i-shield', 'i-chat', 'i-star-c'];
  readonly whyIcons = ['i-list', 'i-user', 'i-chat', 'i-layers'];
  readonly carriers = ['Progressive', 'GEICO', 'National General', 'Kemper (Infinity)', 'GAINSCO', 'Texas Mutual', 'NEXT Insurance', 'Hiscox', 'CNA', 'Tower Hill', 'Neptune Flood', 'Wellington'];
  // Real customer quotes, shown in the original English on both language versions.
  readonly reviews = [
    { office: 'Shotwell', text: 'She helped me find the best insurance company for my needs' },
    { office: 'Antoine', text: 'They have so many options for everyone.' },
    { office: 'Post Oak', text: 'took time to explain all my options' },
    { office: 'Airline', text: 'Fast and friendly service... I will recommend Ana, she is bilingual.' },
    { office: 'Southwest Fwy', text: 'Great customer service and good auto insurance price.' },
    { office: 'Airline', text: 'Customer service is great and is always respectful.' },
  ];
  readonly autoCities = this.cities('');
  readonly homeCities = this.cities('homeowners');
  readonly stars = [1, 2, 3, 4, 5];

  /** Product cards and footer-style accordions: open on desktop, collapsible on phones. */
  isDesktop = true;
  cardOpen = PRODUCTS.map((_, i) => i === 0);
  faqOpen = 0;
  showSticky = false;

  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly langSub: Subscription;
  private observer?: IntersectionObserver;
  private mq?: MediaQueryList;
  private readonly onMqChange = () => {
    this.isDesktop = !!this.mq?.matches;
    this.cardOpen = PRODUCTS.map((_, i) => i === 0);
    this.cdr.detectChanges();
  };

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.langSub = this.translate.onLangChange.subscribe(() => this.listCache.clear());
    this.addStructuredData();
  }

  get currentLang(): 'en' | 'es' {
    return (this.languageService.getCurrentLanguage() as 'en' | 'es') || 'en';
  }

  route(page: string, officeId?: string): string[] {
    return buildRoute(this.languageService, page, officeId);
  }

  /**
   * A translated array (e.g. FAQ items); empty until the translations have loaded.
   * Cached because `instant()` returns a new array on every call, which would make
   * *ngFor rebuild the FAQ <details> on each change detection and undo their open state.
   */
  list<T = any>(key: string): T[] {
    const cached = this.listCache.get(key);
    if (cached) return cached;
    const value = this.translate.instant(key);
    if (!Array.isArray(value)) return [];
    this.listCache.set(key, value);
    return value;
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.mq = window.matchMedia('(min-width:1024px)');
    this.mq.addEventListener('change', this.onMqChange);
    this.onMqChange();

    // Sticky mobile bar: only while neither quote form nor the footer is on screen.
    if ('IntersectionObserver' in window) {
      const watched = [
        this.host.nativeElement.querySelector('#quote'),
        this.host.nativeElement.querySelector('#final-cta'),
        this.document.getElementById('footer'),
      ].filter((el): el is HTMLElement => !!el);
      const visible = new Set<Element>(watched);
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        this.showSticky = visible.size === 0;
        this.cdr.detectChanges();
      });
      watched.forEach((el) => this.observer!.observe(el));
    }
  }

  ngOnDestroy() {
    this.langSub.unsubscribe();
    this.mq?.removeEventListener('change', this.onMqChange);
    this.observer?.disconnect();
    this.document.getElementById(SCHEMA_ID)?.remove();
  }

  // ---------- Accordions ----------

  onCardSummaryClick(event: Event) {
    if (this.isDesktop) event.preventDefault();
  }

  onCardToggle(index: number, event: Event) {
    if (!this.isDesktop) this.cardOpen[index] = (event.target as HTMLDetailsElement).open;
  }

  /** One FAQ open at a time keeps the list short on phones. */
  onFaqToggle(index: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open) this.faqOpen = index;
    else if (this.faqOpen === index) this.faqOpen = -1;
  }

  // ---------- Quote forms ----------

  isSelected(form: QuoteForm, key: ProductKey): boolean {
    return form.products.includes(key);
  }

  toggleProduct(form: QuoteForm, key: ProductKey) {
    form.products = this.isSelected(form, key) ? form.products.filter((p) => p !== key) : [...form.products, key];
    if (form.products.length) form.errors.product = undefined;
  }

  onNameInput(form: QuoteForm, event: Event) {
    form.name = (event.target as HTMLInputElement).value;
    if (form.errors.name) this.validate(form, ['name']);
  }

  onPhoneInput(form: QuoteForm, event: Event) {
    const input = event.target as HTMLInputElement;
    const d = this.digits(input.value).slice(0, 10);
    let out = d;
    if (d.length > 6) out = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    else if (d.length > 3) out = `(${d.slice(0, 3)}) ${d.slice(3)}`;
    input.value = out;
    form.phone = out;
    if (form.errors.phone) this.validate(form, ['phone']);
  }

  onBlur(form: QuoteForm, field: 'name' | 'phone') {
    if (form[field]) this.validate(form, [field]);
  }

  /** The sticky bar's "Get a Quote" scrolls to the hero form. */
  goToQuote(event: Event) {
    event.preventDefault();
    if (!this.isBrowser) return;
    this.host.nativeElement.querySelector('#quote')?.scrollIntoView({ block: 'start' });
    setTimeout(() => {
      this.host.nativeElement.querySelector<HTMLElement>('input[name="hero-product"]')?.focus({ preventScroll: true });
    }, 350);
  }

  async submit(form: QuoteForm, event: Event) {
    event.preventDefault();
    if (form.isSubmitting) return;

    const invalid = this.validate(form);
    if (invalid.length) {
      this.host.nativeElement.querySelector<HTMLElement>(invalid[0])?.focus();
      return;
    }

    const selected = PRODUCTS.filter((p) => form.products.includes(p.key));
    const label = selected
      .map((p) => this.translate.instant(form.id === 'final' ? p.finalLabelKey : p.labelKey))
      .join(', ');
    // One product goes to its own quote page; several go to the general quote page.
    const quoteRouteKey = selected.length === 1 ? selected[0].quoteRouteKey : 'getAQuote';

    form.isSubmitting = true;
    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: label,
        full_name: form.name,
        phone_number: form.phone,
      });
      if (!isSubmitted) return;

      this.resetForm(form);
      await this.router.navigate(this.route(quoteRouteKey));
    } finally {
      form.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  /** Returns selectors of the invalid fields, in page order. */
  private validate(form: QuoteForm, only?: Array<'product' | 'name' | 'phone'>): string[] {
    const want = (f: 'product' | 'name' | 'phone') => !only || only.includes(f);
    const bad: string[] = [];
    const t = (key: string) => this.translate.instant('HOME_PAGE.FORM.' + key);

    if (want('product')) {
      form.errors.product = form.products.length ? undefined : t('ERR_PRODUCT');
      if (!form.products.length) bad.push(`input[name="${form.id}-product"]`);
    }
    if (want('name')) {
      form.errors.name = form.name.trim().length < 2 ? t('ERR_NAME') : undefined;
      if (form.errors.name) bad.push(`#${form.id}-name`);
    }
    if (want('phone')) {
      const d = this.digits(form.phone);
      form.errors.phone = !d ? t('ERR_PHONE_EMPTY') : d.length !== 10 ? t('ERR_PHONE_INVALID') : undefined;
      if (form.errors.phone) bad.push(`#${form.id}-phone`);
    }
    return bad;
  }

  private digits(value: string): string {
    return value.replace(/\D/g, '').replace(/^1(?=\d{10})/, '');
  }

  private resetForm(form: QuoteForm) {
    form.products = [];
    form.name = '';
    form.phone = '';
    form.errors = {};
  }

  private createForm(id: QuoteForm['id']): QuoteForm {
    return { id, products: [], name: '', phone: '', errors: {}, isSubmitting: false };
  }

  private cities(prefix: '' | 'homeowners'):Array<{ routeKey: string; label: string }> {
    const names: Array<[string, string]> = [
      ['HoustonTx', 'Houston'], ['SanAntonioTx', 'San Antonio'], ['DallasTx', 'Dallas'], ['AustinTx', 'Austin'],
      ['FortWorthTx', 'Fort Worth'], ['ElPasoTx', 'El Paso'], ['ArlingtonTx', 'Arlington'], ['CorpusChristiTx', 'Corpus Christi'],
      ['PlanoTx', 'Plano'], ['LubbockTx', 'Lubbock'], ['LaredoTx', 'Laredo'], ['IrvingTx', 'Irving'],
      ['GarlandTx', 'Garland'], ['FriscoTx', 'Frisco'],
    ];
    return names.map(([key, label]) => ({
      routeKey: prefix ? prefix + key : key.charAt(0).toLowerCase() + key.slice(1),
      label,
    }));
  }

  // ---------- Structured data (rendered on the server for crawlers) ----------

  private addStructuredData() {
    if (this.document.getElementById(SCHEMA_ID)) return;
    const site = 'https://astateinsurance.com/';
    const data = [
      {
        '@context': 'https://schema.org',
        '@type': 'InsuranceAgency',
        '@id': site + '#agency',
        name: 'A-State Insurance',
        url: site,
        logo: site + 'assets/images/logo.png',
        telephone: '+1-713-357-7771',
        email: 'save@astateinsurance.com',
        foundingDate: '2018',
        areaServed: { '@type': 'State', name: 'Texas' },
        knowsLanguage: ['en', 'es', 'hi'],
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        }],
        department: OFFICES.map((o) => {
          const [locality, rest] = o.city.split(', ');
          const [region, postalCode] = rest.split(' ');
          return {
            '@type': 'InsuranceAgency',
            name: 'A-State Insurance ' + o.name,
            telephone: o.tel.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, '+1-$1-$2-$3'),
            address: { '@type': 'PostalAddress', streetAddress: o.street, addressLocality: locality, addressRegion: region, postalCode, addressCountry: 'US' },
          };
        }),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': site + '#website',
        name: 'A-State Insurance',
        alternateName: 'A-State',
        url: site,
        inLanguage: ['en-US', 'es-US'],
        publisher: { '@id': site + '#agency' },
      },
    ];
    const script = this.document.createElement('script');
    script.id = SCHEMA_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}
