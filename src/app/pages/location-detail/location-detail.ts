import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../services/language';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';
import { getSeoPageMeta, resolveSeoLanguageFromUrl } from '../../services/seo-meta';
import { buildCanonicalUrl } from '../../services/seo-url';
import { LANGUAGE_FLAGS } from '../our-locations/our-locations';

const ICONS = '/assets/images/location-detail';

// Laid out row by row, three per row, as in the design.
const COVERAGE_GROUPS = [
  [
    { name: 'AUTO', route: 'autoInsurance', icons: [`${ICONS}/cov-auto.svg`], size: [49.46, 39.18] },
    // The design stacks two figures for SR-22.
    {
      name: 'SR22',
      route: 'sr22Insurance',
      icons: [`${ICONS}/cov-sr22.svg`, `${ICONS}/cov-sr22.svg`],
      size: [55.83, 55.83],
    },
    { name: 'HOME', route: 'homeInsurance', icons: [`${ICONS}/cov-home.svg`], size: [49.46, 49.46] },
    { name: 'RENTERS', route: 'rentersInsurance', icons: [`${ICONS}/cov-renters.svg`], size: [65, 64] },
    { name: 'COMMERCIAL', route: 'commercialInsurance', icons: [`${ICONS}/cov-commercial.svg`], size: [64, 64] },
    { name: 'FLOOD', route: 'floodInsurance', icons: [`${ICONS}/cov-flood.png`], size: [45, 45] },
  ],
  [
    { name: 'LIFE', route: 'lifeInsurance', icons: [`${ICONS}/cov-life.png`], size: [48, 48] },
    { name: 'HEALTH', route: 'healthInsurance', icons: [`${ICONS}/cov-health.png`], size: [48, 48] },
    { name: 'FINAL_EXPENSE', route: 'finalExpenseInsurance', icons: [`${ICONS}/cov-final-expense.png`], size: [59, 59] },
    { name: 'MEDICARE', route: 'medicareSupplementInsurance', icons: [`${ICONS}/cov-medicare.png`], size: [48, 48] },
    { name: 'SURETY', route: 'suretyBondInsurance', icons: [`${ICONS}/cov-surety.png`], size: [48, 48] },
    { name: 'COMMERCIAL_AUTO', route: 'commercialAutoInsurance', icons: [`${ICONS}/cov-commercial-auto.png`], size: [59, 59] },
  ],
];

// Same order as LOCATION_DETAIL.FORM.INSURANCE_TYPES.
const QUOTE_ROUTES = [
  'getAutoQuote',
  'getHomeQuote',
  'getCommercialQuote',
  'getLifeQuote',
  'getHealthQuote',
  'getSuretyQuote',
];

const HERO_GRADIENT =
  'linear-gradient(180deg, #1a1a1a 0%, rgba(39, 0, 0, 0.79) 45.673%, rgba(96, 9, 9, 0.59) 100%)';

const BRAND_NAMES = ['A-State Insurance', 'Seguros A-State'];

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.html',
  styleUrls: ['./location-detail.scss'],
  standalone: false,
})
export class LocationDetail implements OnInit {
  location: any;
  smsConsentAccepted = false;

  readonly coverageGroups = COVERAGE_GROUPS;
  defaultPoints: string[] = [];

  quoteForm = this.createQuoteForm();
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    public languageService: Language,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnInit(): void {
    this.applySeoFallback();
    const currentLang = this.languageService.getCurrentLanguage();
    this.getLocationDetail(currentLang);
    this.languageService.getLanguageChange().subscribe((lang: any) => {
      this.applySeoFallback();
      this.getLocationDetail(lang.lang);
    });

    this.translate.stream('LOCATION_DETAIL.POINTS').subscribe((points) => {
      this.defaultPoints = Array.isArray(points) ? points : [];
    });
  }

  get points(): string[] {
    return this.location?.detailPage?.session2?.points || this.defaultPoints;
  }

  // Neighborhood chips are tinted row by row: pink, grey, rose.
  neighborhoodTint(index: number): number {
    return Math.floor(index / 5) % 3;
  }

  async submitQuote() {
    if (this.isSubmitting) {
      return;
    }

    const typeIndex = this.quoteForm.insuranceType;
    const types: string[] = this.translate.instant('LOCATION_DETAIL.FORM.INSURANCE_TYPES');
    this.isSubmitting = true;

    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: typeIndex === null ? '' : types[typeIndex],
        full_name: this.quoteForm.fullName,
        phone_number: this.quoteForm.phone,
      });

      if (!isSubmitted) {
        return;
      }

      this.quoteForm = this.createQuoteForm();
      this.smsConsentAccepted = false;
      await this.router.navigate(this.languageService.getRoute(QUOTE_ROUTES[typeIndex!]));
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private createQuoteForm() {
    return {
      fullName: '',
      phone: '',
      insuranceType: null as number | null,
      language: '',
      bestTime: '',
      contactMethod: '',
    };
  }

  // Splits "Sunday: Closed" so the day can be bold and the status regular.
  private splitClosedDay(text = '') {
    const at = text.indexOf(':');
    return at === -1 ? { day: '', status: text } : { day: text.slice(0, at + 1), status: text.slice(at + 1) };
  }

  // Some Figma hero images already carry the red tint; the rest get the gradient on top.
  private heroBackground(detailPage: any): string | null {
    const image = detailPage?.heroImage;
    if (!image) {
      return null;
    }
    return detailPage.heroImageTinted ? `url('${image}')` : `${HERO_GRADIENT}, url('${image}')`;
  }

  // The design links the brand name in the intro to the home page.
  private splitIntro(text = '') {
    const brand = BRAND_NAMES.find((name) => text.includes(name));
    if (!brand) {
      return { before: text, brand: '', after: '' };
    }
    const at = text.indexOf(brand);
    return { before: text.slice(0, at), brand, after: text.slice(at + brand.length) };
  }

  getLocationDetail(lang: any) {
    this.http.get<any[]>('/assets/locations.json').subscribe({
      next: (locations) => {
        const locationList = locations?.[lang] || [];
        const id = this.resolveLocationId();
        const found =
          locationList.find((loc: any) => loc.id === id) ||
          locationList.find((loc: any) => loc.id === `${id}-es`) ||
          locationList.find((loc: any) => loc.id === id?.replace(/-es$/, ''));

        if (!found) {
          this.location = null;
          console.warn(`Location not found for id: ${id} and language: ${lang}`);
          this.cdr.detectChanges();
          return;
        }

        this.location = {
          ...found,
          mapUrl: this.sanitizer.bypassSecurityTrustResourceUrl(found.mapEmbedUrl),
          phoneDigits: (found.detailPage?.session1?.contact?.phone || found.phone || '').replace(/\D/g, ''),
          closedDay: this.splitClosedDay(found.detailPage?.session1?.contact?.closedDay),
          intro: this.splitIntro(found.detailPage?.session2?.intro),
          heroBackground: this.heroBackground(found.detailPage),
          languageItems: (found.languages || []).map((language: string) => ({
            label: language,
            flag: LANGUAGE_FLAGS[language],
          })),
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private resolveLocationId(): string {
    const routeParamId = this.route.snapshot.paramMap.get('id');
    if (routeParamId) {
      return routeParamId;
    }

    const cleanUrl = this.router.url.split('?')[0].split('#')[0];
    const segments = cleanUrl.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  }

  private applySeoFallback(): void {
    const url = this.router.url;
    const lang = resolveSeoLanguageFromUrl(url);
    const locationId = this.resolveLocationId();
    const pageMeta = getSeoPageMeta(`location_${locationId}`, lang);

    if (this.document?.documentElement) {
      this.document.documentElement.lang = lang;
    }

    const canonicalUrl = buildCanonicalUrl(url);
    let canonicalLink = this.document.querySelector('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);
    this.metaService.updateTag(
      { property: 'og:url', content: canonicalUrl },
      'property="og:url"',
    );

    if (!pageMeta?.title) {
      return;
    }

    this.titleService.setTitle(pageMeta.title);
    this.metaService.updateTag(
      { property: 'og:title', content: pageMeta.title },
      'property="og:title"',
    );

    if (pageMeta.description) {
      this.metaService.updateTag(
        { name: 'description', content: pageMeta.description },
        'name="description"',
      );
      this.metaService.updateTag(
        { property: 'og:description', content: pageMeta.description },
        'property="og:description"',
      );
    }

    if (pageMeta.keywords) {
      this.metaService.updateTag(
        { name: 'keywords', content: pageMeta.keywords },
        'name="keywords"',
      );
    }
  }

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }

  get homeRoute(): string {
    return this.languageService.getCurrentLanguage() === 'es' ? '/es' : '/';
  }
}
