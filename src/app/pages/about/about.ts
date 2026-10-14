import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { buildRoute } from '../../components/header/header';
import { Seg } from '../insurance-services/insurance-services';

type Text = string | Seg[];

/** Sections listed in the "On this page" bar, in the order of ABOUT_PAGE.OTP.ITEMS. */
const OTP_IDS = ['our-story', 'numbers', 'mission', 'services', 'why-astate', 'reviews', 'faqs'];

const SCHEMA_ID = 'about-structured-data';
const SITE = 'https://astateinsurance.com';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  readonly otpIds = OTP_IDS;
  readonly valueIcons = ['i-globe', 'i-scale', 'i-shield', 'i-storm', 'i-home'];
  readonly whyIcons = ['i-list', 'i-shield', 'i-chat', 'i-cal', 'i-layers', 'i-pin', 'i-globe', 'i-search'];
  /** Same order as ABOUT_PAGE.SERVICES.ITEMS. */
  readonly services = [
    { icon: 'i-car', routeKey: 'autoInsurance' },
    { icon: 'i-home', routeKey: 'homeInsurance' },
    { icon: 'i-briefcase', routeKey: 'commercialInsurance' },
    { icon: 'i-heart', routeKey: 'lifeInsurance' },
    { icon: 'i-health', routeKey: 'healthInsurance' },
    { icon: 'i-doc', routeKey: 'suretyBondInsurance' },
  ];
  // Real customer quotes, shown in the original English on both language versions.
  readonly reviews = [
    { office: 'Shotwell', text: 'She helped me find the best insurance company for my needs' },
    { office: 'Antoine', text: 'They have so many options for everyone.' },
    { office: 'Post Oak', text: 'took time to explain all my options' },
    { office: 'Airline', text: 'Fast and friendly service... I will recommend Ana, she is bilingual.' },
    { office: 'Southwest Fwy', text: 'Great customer service and good auto insurance price.' },
    { office: 'Airline', text: 'Customer service is great and is always respectful.' },
  ];
  readonly stars = [1, 2, 3, 4, 5];

  /** The "On this page" box is open from 768px and collapsible on phones. */
  isTablet = true;
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

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.mq = window.matchMedia('(min-width:768px)');
    this.mq.addEventListener('change', this.onMqChange);
    this.onMqChange();

    if (!('IntersectionObserver' in window)) return;

    // Sticky mobile bar: only while neither the hero buttons, the quote form nor the footer is on screen.
    const watched = [
      this.host.nativeElement.querySelector('.btn-row'),
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

  /** In-page links: scroll without changing the route. */
  goToSection(id: string, event: Event) {
    event.preventDefault();
    if (!this.isTablet) this.otpOpen = false;
    if (!this.isBrowser) return;
    setTimeout(() => this.host.nativeElement.querySelector(`#${id}`)?.scrollIntoView({ block: 'start' }));
  }

  /** The sticky bar's "Get a Quote" scrolls to the quote form at the end of the page. */
  goToQuote(event: Event) {
    event.preventDefault();
    if (!this.isBrowser) return;
    this.host.nativeElement.querySelector('#quote')?.scrollIntoView({ block: 'start' });
    setTimeout(() => {
      this.host.nativeElement.querySelector<HTMLElement>('input[name="about-product"]')?.focus({ preventScroll: true });
    }, 350);
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

  private url(page: string): string {
    const path = this.route(page).join('/').replace(/^\/+/, '');
    return `${SITE}/${path ? path + '/' : ''}`;
  }

  private addStructuredData() {
    const p = 'ABOUT_PAGE.';
    const faq = this.list<{ Q: string; A: Text }>(p + 'FAQ.ITEMS');
    if (!faq.length) return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url('about');
    const plain = (v: Text) => this.segs(v).map((s) => s.t).join('');
    const lang = this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US';
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          name: this.translate.instant(p + 'BREADCRUMB.CURRENT'),
          inLanguage: lang,
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
