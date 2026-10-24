import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { buildRoute } from '../../components/header/header';

/** A piece of translated text: plain, a site link (`r` route key, optional office `id`), an external link (`h`) or highlighted (`hl`). */
export interface Seg { t: string; r?: string; id?: string; h?: string; hl?: boolean | string }
type Text = string | Seg[];

interface Category {
  id: string;
  key: string;
  icon: string;
  /** Category page; the content doc leaves Home & Property and Additional Coverage unlinked. */
  titleRoute?: string;
  /** Detailed quote page for the CTA; without one the CTA scrolls to the hero form. */
  quoteRoute?: string;
  /**
   * Page for each item, in the order of SERVICES_PAGE.CATS.<key>.ITEMS. `null` means the item has
   * no page on the site yet (or links inside its own title), so its heading is not a link.
   */
  items: Array<string | null>;
}

const CATEGORIES: Category[] = [
  {
    id: 'auto', key: 'AUTO', icon: 'i-car', titleRoute: 'autoInsurance', quoteRoute: 'getAutoQuote',
    items: ['carInsurance', 'motorcycleInsurance', 'boatInsurance', 'rvInsurance', 'classicCarInsurance', 'sr22Insurance',
      'atvAndUtvInsurance', 'trailerInsurance', 'mexicanCarInsurance', 'rideshareInsurance'],
  },
  {
    id: 'home-property', key: 'HOME', icon: 'i-home', quoteRoute: 'getHomeQuote',
    // Windstorm & Hail has no page yet.
    items: ['homeInsurance', null, 'floodInsurance', 'rentersInsurance', 'condoInsurance', 'manufacturedMobileHomeInsurance',
      'landlordInsurance', 'earthquakeInsurance'],
  },
  {
    id: 'commercial', key: 'COMMERCIAL', icon: 'i-briefcase', titleRoute: 'commercialInsurance', quoteRoute: 'getCommercialQuote',
    // Inland Marine and Commercial Umbrella have no pages yet.
    items: ['generalLiabilityInsurance', 'businessOwnerInsurance', 'workersCompensationInsurance', 'commercialPropertyInsurance',
      'commercialAutoInsurance', 'professionalLiabilityInsurance', 'employmentPracticesLiabilityInsurance', 'cyberLiabilityInsurance',
      'buildersRiskInsurance', 'directorsOfficersLiabilityInsurance', null, null],
  },
  {
    id: 'life', key: 'LIFE', icon: 'i-heart', titleRoute: 'lifeInsurance', quoteRoute: 'getLifeQuote',
    items: ['termLifeInsurance', 'wholeLifeInsurance', 'universalLifeInsurance', 'finalExpenseInsurance', 'variableLifeInsurance',
      'groupLifeInsurance'],
  },
  {
    id: 'health', key: 'HEALTH', icon: 'i-health', titleRoute: 'healthInsurance', quoteRoute: 'getHealthQuote',
    // The first item ("Individual and Family Plans") links both pages inside its title.
    items: [null, 'acaMarketplacePlansInsurance', 'smallBusinessHealthInsurance', 'medicareSupplementInsurance',
      'shortTermHealthInsurance', 'dentalVisionInsurance', 'travelHealthInsurance'],
  },
  {
    id: 'surety-bonds', key: 'BONDS', icon: 'i-doc', titleRoute: 'suretyBondInsurance', quoteRoute: 'getSuretyQuote',
    items: ['performanceBondsPaymentBonds', 'commercialSuretyBonds', 'notaryBonds'],
  },
  {
    id: 'additional', key: 'ADDITIONAL', icon: 'i-umbrella', quoteRoute: 'requestACustomQuote',
    // Umbrella and Identity Theft Protection have no pages yet.
    items: [null, 'petInsurance', null, 'titleInsurance'],
  },
];

/** Sections listed in the "On this page" bar, in the order of SERVICES_PAGE.OTP.ITEMS. */
const OTP_IDS = [...CATEGORIES.map((c) => c.id), 'texas', 'why-astate', 'steps', 'faqs'];

const SCHEMA_ID = 'services-structured-data';
const SITE = 'https://astateinsurance.com';

@Component({
  selector: 'app-insurance-services',
  standalone: false,
  templateUrl: './insurance-services.html',
  styleUrl: './insurance-services.scss',
})
export class InsuranceServices implements AfterViewInit, OnDestroy {
  readonly categories = CATEGORIES;
  readonly otpIds = OTP_IDS;
  readonly texasIcons = ['i-storm', 'i-scale', 'i-alert'];
  readonly whyIcons = ['i-list', 'i-shield', 'i-chat', 'i-cal', 'i-layers', 'i-pin', 'i-globe', 'i-search'];

  /** Category lists and the "On this page" box are open from 768px and collapsible on phones. */
  isTablet = true;
  listOpen = CATEGORIES.map(() => true);
  otpOpen = true;
  faqOpen = 0;
  activeSection: string | null = null;
  showSticky = false;

  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly segCache = new Map<string, Seg[]>();
  private readonly subs = new Subscription();
  private stickyObserver?: IntersectionObserver;
  private spyObserver?: IntersectionObserver;
  private mq?: MediaQueryList;
  private readonly onMqChange = () => {
    this.isTablet = !!this.mq?.matches;
    this.listOpen = CATEGORIES.map(() => this.isTablet);
    this.otpOpen = this.isTablet;
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
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        this.listCache.clear();
        this.segCache.clear();
        this.addStructuredData();
      }),
    );
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
   * *ngFor rebuild the <details> on each change detection and undo their open state.
   */
  list<T = any>(key: string): T[] {
    const cached = this.listCache.get(key);
    if (cached) return cached;
    const value = this.translate.instant(key);
    if (!Array.isArray(value)) return [];
    this.listCache.set(key, value);
    return value;
  }

  /** Text as segments, so plain strings and linked text render the same way. */
  segs(value: Text | undefined): Seg[] {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    let cached = this.segCache.get(value);
    if (!cached) this.segCache.set(value, (cached = [{ t: value }]));
    return cached;
  }

  /** The Text at a translation key (string or segments). */
  text(key: string): Text {
    const value = this.translate.instant(key);
    return Array.isArray(value) ? this.list(key) : value;
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.mq = window.matchMedia('(min-width:768px)');
    this.mq.addEventListener('change', this.onMqChange);
    this.onMqChange();

    if (!('IntersectionObserver' in window)) return;

    // Sticky mobile bar: only while neither quote form nor the footer is on screen.
    const watched = [
      this.host.nativeElement.querySelector('#quote'),
      this.host.nativeElement.querySelector('#final-cta'),
      this.document.getElementById('footer'),
    ].filter((el): el is HTMLElement => !!el);
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
    this.document.getElementById(SCHEMA_ID)?.remove();
  }

  /** In-page links: scroll without changing the route, and open that section's list on phones. */
  goToSection(id: string, event: Event) {
    event.preventDefault();
    const index = CATEGORIES.findIndex((c) => c.id === id);
    if (index >= 0) this.listOpen[index] = true;
    if (!this.isTablet) this.otpOpen = false;
    if (!this.isBrowser) return;
    setTimeout(() => this.host.nativeElement.querySelector(`#${id}`)?.scrollIntoView({ block: 'start' }));
  }

  /** CTAs without a quote page (Additional Coverage, sticky bar) scroll to the hero form. */
  goToQuote(event: Event) {
    event.preventDefault();
    if (!this.isBrowser) return;
    this.host.nativeElement.querySelector('#quote')?.scrollIntoView({ block: 'start' });
    setTimeout(() => {
      this.host.nativeElement.querySelector<HTMLElement>('input[name="hero-product"]')?.focus({ preventScroll: true });
    }, 350);
  }

  // ---------- Accordions ----------

  /** From 768px the summaries are hidden and the lists stay open. */
  onListSummaryClick(event: Event) {
    if (this.isTablet) event.preventDefault();
  }

  onListToggle(index: number, event: Event) {
    if (!this.isTablet) this.listOpen[index] = (event.target as HTMLDetailsElement).open;
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
    const p = 'SERVICES_PAGE.';
    const faq = this.list<{ Q: string; A: Text }>(p + 'FAQ.ITEMS');
    if (!faq.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url('insuranceServices');
    const plain = (v: Text) => this.segs(v).map((s) => s.t).join('');
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          name: plain(this.text(p + 'HERO.TITLE')),
          inLanguage: this.currentLang === 'es' ? 'es-US' : 'en-US',
          isPartOf: { '@id': SITE + '/#website' },
          about: { '@id': SITE + '/#agency' },
          breadcrumb: { '@id': pageUrl + '#breadcrumb' },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: this.translate.instant(p + 'BREADCRUMB.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: this.translate.instant(p + 'BREADCRUMB.CURRENT'), item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': pageUrl + '#faq',
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.Q,
            acceptedAnswer: { '@type': 'Answer', text: plain(f.A) },
          })),
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
