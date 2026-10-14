import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { buildRoute } from '../header/header';
import { Seg } from '../../pages/insurance-services/insurance-services';

/** Legal text segment: like Seg, plus bold. Links with `h` that start with http open in a new tab. */
export interface LegalSeg extends Seg { b?: boolean }

interface LegalBlock {
  P?: LegalSeg[];
  UL?: LegalSeg[][];
  TABLE?: { LABEL: string; HEAD: string[]; ROWS: string[][] };
  ADDRESS?: LegalSeg[][];
  NOTE?: LegalSeg[];
  LANG?: string;
  STYLE?: 'band' | 'italic';
}

interface LegalSection { ID: string; NUM: string; TITLE: string; BLOCKS: LegalBlock[] }

type LegalPageKey = 'PRIVACY' | 'TERMS';

const ROUTE_KEYS: Record<LegalPageKey, string> = { PRIVACY: 'privacyPolicy', TERMS: 'termsAndConditions' };
const EFFECTIVE_ISO = '2026-02-10';
const UPDATED_ISO = '2026-10-12';
const SCHEMA_ID = 'legal-structured-data';
const SITE = 'https://astateinsurance.com';

/**
 * Shared layout for the Privacy Policy and Terms & Conditions pages: title and summary,
 * then the policy text with a table of contents (collapsed on phones, sticky on desktop).
 */
@Component({
  selector: 'app-legal-page',
  standalone: false,
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.scss',
})
export class LegalPage implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) page!: LegalPageKey;

  readonly effectiveIso = EFFECTIVE_ISO;
  readonly updatedIso = UPDATED_ISO;

  /** The table of contents is open from 768px and collapsible on phones. */
  tocOpen = true;
  activeSection: string | null = null;
  showSticky = false;

  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly subs = new Subscription();
  private stickyObserver?: IntersectionObserver;
  private mqTablet?: MediaQueryList;
  private mqDesktop?: MediaQueryList;
  private ticking = false;
  private readonly onMqChange = () => {
    this.tocOpen = !!this.mqTablet?.matches;
    this.cdr.detectChanges();
  };
  private readonly onScroll = () => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      this.spy();
    });
  };

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get ns(): string {
    return `LEGAL_PAGE.${this.page}.`;
  }

  get sections(): LegalSection[] {
    return this.list<LegalSection>(this.ns + 'SECTIONS');
  }

  ngOnInit() {
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        this.listCache.clear();
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

  isExternal(href: string): boolean {
    return /^https?:/.test(href);
  }

  /** "01" for both "01" and "1."; empty for the unnumbered contact section. */
  tocNum(section: LegalSection): string {
    const n = section.NUM.replace(/\D/g, '');
    return n ? n.padStart(2, '0') : '';
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.mqTablet = window.matchMedia('(min-width:768px)');
    this.mqDesktop = window.matchMedia('(min-width:1024px)');
    this.mqTablet.addEventListener('change', this.onMqChange);
    this.onMqChange();

    this.zone.runOutsideAngular(() => window.addEventListener('scroll', this.onScroll, { passive: true }));
    this.spy();

    if (!('IntersectionObserver' in window)) return;
    // Sticky mobile bar: only while neither the page dates nor the footer is on screen.
    const watched = [
      this.host.nativeElement.querySelector('.legal-meta'),
      this.document.getElementById('footer'),
    ].filter((el): el is HTMLElement => !!el);
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
    this.mqTablet?.removeEventListener('change', this.onMqChange);
    this.stickyObserver?.disconnect();
    if (this.isBrowser) window.removeEventListener('scroll', this.onScroll);
    this.document.getElementById(SCHEMA_ID)?.remove();
  }

  /** In-page links: scroll without changing the route. */
  goToSection(id: string, event: Event) {
    event.preventDefault();
    if (!this.mqTablet?.matches) this.tocOpen = false;
    if (!this.isBrowser) return;
    setTimeout(() => this.host.nativeElement.querySelector(`#${id}`)?.scrollIntoView({ block: 'start' }));
  }

  backToContents(event: Event) {
    event.preventDefault();
    this.tocOpen = true;
    if (!this.isBrowser) return;
    setTimeout(() => this.host.nativeElement.querySelector('#contents')?.scrollIntoView({ block: 'start' }));
  }

  onTocToggle(event: Event) {
    this.tocOpen = (event.target as HTMLDetailsElement).open;
  }

  /** On desktop the table of contents is a fixed side column, not a toggle. */
  onTocSummaryClick(event: Event) {
    if (this.mqDesktop?.matches) event.preventDefault();
  }

  print() {
    if (this.isBrowser) window.print();
  }

  /** Highlights the section whose heading has passed a line a quarter of the way down the screen. */
  private spy() {
    const headerH = parseInt(getComputedStyle(this.host.nativeElement).getPropertyValue('--header-h'), 10) || 72;
    const line = headerH + window.innerHeight * 0.25;
    let current: string | null = null;
    for (const s of this.sections) {
      const el = this.host.nativeElement.querySelector(`#${s.ID}`);
      if (el && el.getBoundingClientRect().top <= line) current = s.ID;
    }
    if (current === this.activeSection) return;
    this.activeSection = current;
    this.zone.run(() => this.cdr.detectChanges());
    this.scrollTocLinkIntoView(current);
  }

  private scrollTocLinkIntoView(id: string | null) {
    if (!id || !this.mqDesktop?.matches) return;
    const toc = this.host.nativeElement.querySelector<HTMLElement>('.ltoc');
    const link = toc?.querySelector<HTMLElement>(`a[href="#${id}"]`);
    if (!toc || !link) return;
    const r = link.getBoundingClientRect();
    const t = toc.getBoundingClientRect();
    if (r.top < t.top + 60 || r.bottom > t.bottom - 60) toc.scrollTop += r.top - t.top - toc.clientHeight / 3;
  }

  // ---------- Structured data (rendered on the server for crawlers) ----------

  private url(page: string): string {
    const path = this.route(page).join('/').replace(/^\/+/, '');
    return `${SITE}/${path ? path + '/' : ''}`;
  }

  private addStructuredData() {
    if (!this.page) return;
    const title = this.translate.instant(this.ns + 'TITLE');
    if (!title || title === this.ns + 'TITLE') return; // translations not loaded yet; runs again on language change
    this.document.getElementById(SCHEMA_ID)?.remove();

    const pageUrl = this.url(ROUTE_KEYS[this.page]);
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          name: title,
          inLanguage: this.languageService.getCurrentLanguage() === 'es' ? 'es-US' : 'en-US',
          isPartOf: { '@id': SITE + '/#website' },
          about: { '@id': SITE + '/#agency' },
          breadcrumb: { '@id': pageUrl + '#breadcrumb' },
          datePublished: EFFECTIVE_ISO,
          dateModified: UPDATED_ISO,
        },
        {
          '@type': 'BreadcrumbList',
          '@id': pageUrl + '#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: this.translate.instant('LEGAL_PAGE.HOME'), item: this.url('home') },
            { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
          ],
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
