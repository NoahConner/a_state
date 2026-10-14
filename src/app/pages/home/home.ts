import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { NAV_GROUPS, NavLink, OFFICES, buildRoute } from '../../components/header/header';

const SCHEMA_ID = 'home-structured-data';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  readonly offices = OFFICES;

  /**
   * Product cards, in the same order as the header's NAV_GROUPS, whose links they reuse.
   * `titleRoute` follows the content docs: only "Surety Bonds" is linked in the bonds title, and
   * the Home title is a link only on the Spanish page (`titleLangs`). `quoteRoute` is the detailed
   * quote page for the card's CTA.
   */
  readonly productCards: Array<{ key: string; icon: string; titleRoute?: string; titleLangs?: string[]; quoteRoute: string; links: NavLink[] }> = [
    { key: 'AUTO', icon: 'i-car', titleRoute: 'autoInsurance', quoteRoute: 'getAutoQuote', links: NAV_GROUPS[0].links },
    { key: 'HOME', icon: 'i-home', titleRoute: 'homeInsurance', titleLangs: ['es'], quoteRoute: 'getHomeQuote', links: NAV_GROUPS[1].links },
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
  // Real customer quotes in the original English, with the content doc's Spanish translation.
  readonly reviews = [
    { office: 'Shotwell', text: 'She helped me find the best insurance company for my needs', es: 'Me ayudó a encontrar la mejor compañía de seguros para mis necesidades' },
    { office: 'Antoine', text: 'They have so many options for everyone.', es: 'Tienen muchísimas opciones para todos.' },
    { office: 'Post Oak', text: 'took time to explain all my options', es: 'se tomó el tiempo de explicarme todas mis opciones' },
    { office: 'Airline', text: 'Fast and friendly service... I will recommend Ana, she is bilingual.', es: 'Servicio rápido y amable... Recomiendo a Ana, es bilingüe.' },
    { office: 'Southwest Fwy', text: 'Great customer service and good auto insurance price.', es: 'Excelente servicio al cliente y buen precio en el seguro de auto.' },
    { office: 'Airline', text: 'Customer service is great and is always respectful.', es: 'El servicio al cliente es excelente y siempre respetuoso.' },
  ];
  readonly autoCities = this.cities('');
  readonly homeCities = this.cities('homeowners');
  readonly stars = [1, 2, 3, 4, 5];

  /** Product cards and footer-style accordions: open on desktop, collapsible on phones. */
  isDesktop = true;
  cardOpen = this.productCards.map((_, i) => i === 0);
  faqOpen = 0;
  showSticky = false;

  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly langSub: Subscription;
  private observer?: IntersectionObserver;
  private mq?: MediaQueryList;
  private readonly onMqChange = () => {
    this.isDesktop = !!this.mq?.matches;
    this.cardOpen = this.productCards.map((_, i) => i === 0);
    this.cdr.detectChanges();
  };

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
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

  /** The card title's route, if its title is a link in the current language. */
  titleRoute(card: { titleRoute?: string; titleLangs?: string[] }): string | undefined {
    if (card.titleLangs && !card.titleLangs.includes(this.currentLang)) return undefined;
    return card.titleRoute;
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

  /** The sticky bar's "Get a Quote" scrolls to the hero form. */
  goToQuote(event: Event) {
    event.preventDefault();
    if (!this.isBrowser) return;
    this.host.nativeElement.querySelector('#quote')?.scrollIntoView({ block: 'start' });
    setTimeout(() => {
      this.host.nativeElement.querySelector<HTMLElement>('input[name="hero-product"]')?.focus({ preventScroll: true });
    }, 350);
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
