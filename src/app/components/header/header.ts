import { Component, DestroyRef, ElementRef, HostListener, Inject, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { Language } from '../../services/language';
import { routeTranslations } from '../../app-routing-module';

/** A link without `routeKey` has no page yet and is shown as plain text. */
export type NavLink = { routeKey?: string; labelKey: string };
/** `routeKey` is the group's own page; groups without one have a plain (unlinked) heading. */
export type NavGroup = { routeKey?: string; titleKey: string; links: NavLink[] };
/** `mapUrl` opens the office on Google Maps; `directionsUrl` opens directions to it. */
export type Office = { id: string; name: string; street: string; city: string; phone: string; tel: string; mapUrl: string; directionsUrl: string };

const L = 'SITE_NAV.LINKS.';

/**
 * Insurance groups shared by the desktop mega menu and the mobile drawer, in the order of the
 * "Header and Footer" sheet. Items without a page yet (Windstorm & hail, Inland marine,
 * Commercial umbrella, Umbrella, Identity theft protection) are listed without a link.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    routeKey: 'autoInsurance',
    titleKey: 'SITE_NAV.GROUPS.AUTO',
    links: [
      { routeKey: 'carInsurance', labelKey: L + 'CAR' },
      { routeKey: 'sr22Insurance', labelKey: L + 'SR22' },
      { routeKey: 'motorcycleInsurance', labelKey: L + 'MOTORCYCLE' },
      { routeKey: 'rideshareInsurance', labelKey: L + 'RIDESHARE' },
      { routeKey: 'mexicanCarInsurance', labelKey: L + 'MEXICO' },
      { routeKey: 'boatInsurance', labelKey: L + 'BOAT' },
      { routeKey: 'rvInsurance', labelKey: L + 'RV' },
      { routeKey: 'classicCarInsurance', labelKey: L + 'CLASSIC_CAR' },
      { routeKey: 'atvAndUtvInsurance', labelKey: L + 'ATV_UTV' },
      { routeKey: 'trailerInsurance', labelKey: L + 'TRAILER' },
    ],
  },
  {
    titleKey: 'SITE_NAV.GROUPS.HOME',
    links: [
      { routeKey: 'homeInsurance', labelKey: L + 'HOMEOWNERS' },
      { routeKey: 'rentersInsurance', labelKey: L + 'RENTERS' },
      { routeKey: 'floodInsurance', labelKey: L + 'FLOOD' },
      { labelKey: L + 'WINDSTORM_HAIL' },
      { routeKey: 'condoInsurance', labelKey: L + 'CONDO' },
      { routeKey: 'landlordInsurance', labelKey: L + 'LANDLORD' },
      { routeKey: 'manufacturedMobileHomeInsurance', labelKey: L + 'MOBILE_HOME' },
      { routeKey: 'earthquakeInsurance', labelKey: L + 'EARTHQUAKE' },
    ],
  },
  {
    routeKey: 'commercialInsurance',
    titleKey: 'SITE_NAV.GROUPS.BUSINESS',
    links: [
      { routeKey: 'generalLiabilityInsurance', labelKey: L + 'GENERAL_LIABILITY' },
      { routeKey: 'workersCompensationInsurance', labelKey: L + 'WORKERS_COMP' },
      { routeKey: 'commercialAutoInsurance', labelKey: L + 'COMMERCIAL_AUTO' },
      { routeKey: 'businessOwnerInsurance', labelKey: L + 'BOP' },
      { routeKey: 'commercialPropertyInsurance', labelKey: L + 'COMMERCIAL_PROPERTY' },
      { routeKey: 'professionalLiabilityInsurance', labelKey: L + 'PROFESSIONAL_LIABILITY' },
      { routeKey: 'cyberLiabilityInsurance', labelKey: L + 'CYBER' },
      { routeKey: 'employmentPracticesLiabilityInsurance', labelKey: L + 'EPLI' },
      { routeKey: 'buildersRiskInsurance', labelKey: L + 'BUILDERS_RISK' },
      { labelKey: L + 'INLAND_MARINE' },
      { labelKey: L + 'COMMERCIAL_UMBRELLA' },
    ],
  },
  {
    routeKey: 'lifeInsurance',
    titleKey: 'SITE_NAV.GROUPS.LIFE',
    links: [
      { routeKey: 'termLifeInsurance', labelKey: L + 'TERM_LIFE' },
      { routeKey: 'wholeLifeInsurance', labelKey: L + 'WHOLE_LIFE' },
      { routeKey: 'universalLifeInsurance', labelKey: L + 'UNIVERSAL_LIFE' },
      { routeKey: 'finalExpenseInsurance', labelKey: L + 'FINAL_EXPENSE' },
      { routeKey: 'groupLifeInsurance', labelKey: L + 'GROUP_LIFE' },
      { routeKey: 'variableLifeInsurance', labelKey: L + 'VARIABLE_LIFE' },
    ],
  },
  {
    routeKey: 'healthInsurance',
    titleKey: 'SITE_NAV.GROUPS.HEALTH',
    links: [
      { routeKey: 'individualHealthInsurance', labelKey: L + 'INDIVIDUAL' },
      { routeKey: 'familyHealthInsurance', labelKey: L + 'FAMILY' },
      { routeKey: 'acaMarketplacePlansInsurance', labelKey: L + 'ACA' },
      { routeKey: 'smallBusinessHealthInsurance', labelKey: L + 'SMALL_BUSINESS_GROUP' },
      { routeKey: 'medicareSupplementInsurance', labelKey: L + 'MEDICARE' },
      { routeKey: 'shortTermHealthInsurance', labelKey: L + 'SHORT_TERM' },
      { routeKey: 'dentalVisionInsurance', labelKey: L + 'DENTAL_VISION' },
      { routeKey: 'travelHealthInsurance', labelKey: L + 'TRAVEL_HEALTH' },
    ],
  },
  {
    titleKey: 'SITE_NAV.GROUPS.BONDS',
    links: [
      { routeKey: 'suretyBondInsurance', labelKey: L + 'SURETY_BONDS' },
      { routeKey: 'performanceBondsPaymentBonds', labelKey: L + 'CONTRACT_BONDS' },
      { routeKey: 'commercialSuretyBonds', labelKey: L + 'COMMERCIAL_BONDS' },
      { labelKey: L + 'UMBRELLA' },
      { routeKey: 'petInsurance', labelKey: L + 'PET' },
      { labelKey: L + 'IDENTITY_THEFT' },
      { routeKey: 'titleInsurance', labelKey: L + 'TITLE' },
    ],
  },
];

export const OFFICES: Office[] = [
  {
    id: '707-shotwell-st-a-houston-tx-77020', name: 'Shotwell', street: '707 Shotwell St, Suite A', city: 'Houston, TX 77020',
    phone: '(281) 749-1900', tel: '+12817491900',
    mapUrl: 'https://maps.app.goo.gl/3yoEc7gXFuw8LyPv6',
    directionsUrl: 'https://www.google.com/maps/dir//A-State+Insurance,+707+Shotwell+St+a,+Houston,+TX+77020,+United+States/@29.7761569,-95.313911,17z/data=!4m16!1m7!3m6!1s0x8640b94e64abe0e5:0xbcbe087a2f223041!2sA-State+Insurance!8m2!3d29.7761007!4d-95.3113357!16s%2Fg%2F11f6551bq8!4m7!1m0!1m5!1m1!1s0x8640b94e64abe0e5:0xbcbe087a2f223041!2m2!1d-95.3113357!2d29.7761007?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: '11503-southwest-fwy-b-houston-tx-77031', name: 'Southwest Fwy', street: '11503 Southwest Fwy, Suite B', city: 'Houston, TX 77031',
    phone: '(281) 506-4200', tel: '+12815064200',
    mapUrl: 'https://maps.app.goo.gl/oH5KCuta4nn7abMY9',
    directionsUrl: 'https://www.google.com/maps/dir//A-State+Insurance,+11503+Southwest+Fwy+B,+Houston,+TX+77031,+United+States/@29.6533537,-95.5678314,17z/data=!4m16!1m7!3m6!1s0x8640e742e1e45833:0x1013137366abdc82!2sA-State+Insurance!8m2!3d29.6532517!4d-95.5654155!16s%2Fg%2F11g2xg58g5!4m7!1m0!1m5!1m1!1s0x8640e742e1e45833:0x1013137366abdc82!2m2!1d-95.5654155!2d29.6532517?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: '10547-s-post-oak-rd-houston-tx-77035', name: 'Post Oak', street: '10547 S Post Oak Rd', city: 'Houston, TX 77035',
    phone: '(281) 406-1900', tel: '+12814061900',
    mapUrl: 'https://maps.app.goo.gl/MAbDwTLuTRNMPBrSA',
    directionsUrl: 'https://www.google.com/maps/dir//A-State+Insurance,+10547+S+Post+Oak+Rd,+Houston,+TX+77035,+United+States/@29.66628,-95.4653412,17z/data=!4m16!1m7!3m6!1s0x8640ebc87cb9e9cb:0x189839a7af3d6bdb!2sA-State+Insurance!8m2!3d29.66628!4d-95.4627609!16s%2Fg%2F11fsmn16xm!4m7!1m0!1m5!1m1!1s0x8640ebc87cb9e9cb:0x189839a7af3d6bdb!2m2!1d-95.4627609!2d29.66628?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: '5712-antoine-dr-houston-tx-77091', name: 'Antoine', street: '5712 Antoine Dr', city: 'Houston, TX 77091',
    phone: '(713) 263-9800', tel: '+17132639800',
    mapUrl: 'https://maps.app.goo.gl/cRWTB37f6emACzkCA',
    directionsUrl: 'https://www.google.com/maps/dir//A-State+Insurance,+5712+Antoine+Dr,+Houston,+TX+77091,+United+States/@29.8483849,-95.475385,16z/data=!4m16!1m7!3m6!1s0x8640c608c61ef783:0xe3848480e5c382fd!2sA-State+Insurance!8m2!3d29.8483865!4d-95.4728116!16s%2Fg%2F1tgqjt8j!4m7!1m0!1m5!1m1!1s0x8640c608c61ef783:0xe3848480e5c382fd!2m2!1d-95.4728116!2d29.8483865?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: '5206-airline-dr-g-houston-tx-77022', name: 'Airline', street: '5206 Airline Dr, Suite G', city: 'Houston, TX 77022',
    phone: '(281) 504-7444', tel: '+12815047444',
    mapUrl: 'https://maps.app.goo.gl/wJS36746W1P3XZCfA',
    directionsUrl: 'https://www.google.com/maps/dir//A-State+Insurance,+5206+Airline+Dr+g,+Houston,+TX+77022,+United+States/@29.8423603,-95.386512,17z/data=!4m16!1m7!3m6!1s0x8640b9c87d8b4ba5:0x9f74c0c87f80aa47!2sA-State+Insurance!8m2!3d29.842283!4d-95.3837829!16s%2Fg%2F11scsjf5kd!4m7!1m0!1m5!1m1!1s0x8640b9c87d8b4ba5:0x9f74c0c87f80aa47!2m2!1d-95.3837829!2d29.842283?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D',
  },
];

/** Localized router commands for a route key, or for an office detail page. */
export function buildRoute(languageService: Language, page: string, officeId?: string): string[] {
  const lang = languageService.getCurrentLanguage() || 'en';
  if (page === 'home') {
    return lang === 'en' ? ['/'] : ['/', lang];
  }
  let slug = routeTranslations[page]?.[lang] || routeTranslations[page]?.['en'];
  if (!slug) return ['/'];
  if (officeId) slug = slug.replace(':id', officeId);
  const segments = slug.split('/');
  return lang === 'en' ? ['/', ...segments] : ['/', lang, ...segments];
}

type Panel = 'insurance' | 'locations' | 'lang' | null;

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly groups = NAV_GROUPS;
  readonly offices = OFFICES;

  openPanel: Panel = null;
  drawerOpen = false;
  isStuck = false;

  private readonly isBrowser: boolean;
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private lastFocus: HTMLElement | null = null;

  constructor(
    public languageService: Language,
    router: Router,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => {
        this.openPanel = null;
        this.setDrawer(false, false);
      });
  }

  get currentLang(): 'en' | 'es' {
    return (this.languageService.getCurrentLanguage() as 'en' | 'es') || 'en';
  }

  route(page: string, officeId?: string): string[] {
    return buildRoute(this.languageService, page, officeId);
  }

  togglePanel(panel: Exclude<Panel, null>, event?: Event) {
    event?.stopPropagation();
    this.openPanel = this.openPanel === panel ? null : panel;
    if (panel === 'lang' && this.openPanel === 'lang' && this.isBrowser) {
      setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>('#lang-menu a')?.focus());
    }
  }

  selectLang(lang: 'en' | 'es') {
    this.openPanel = null;
    this.setDrawer(false, false);
    this.languageService.setLanguage(lang);
  }

  onLangMenuKeydown(event: KeyboardEvent) {
    const items = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('#lang-menu a'));
    const i = items.indexOf(this.document.activeElement as HTMLElement);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    }
  }

  openDrawer() {
    this.setDrawer(true, false);
  }

  closeDrawer() {
    this.setDrawer(false, true);
  }

  private setDrawer(open: boolean, restoreFocus: boolean) {
    if (this.drawerOpen === open) return;
    this.drawerOpen = open;
    if (!this.isBrowser) return;
    this.document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      this.lastFocus = this.document.activeElement as HTMLElement;
      setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>('.drawer .head .icon-btn')?.focus());
    } else if (restoreFocus) {
      this.lastFocus?.focus();
    }
  }

  /** Keep keyboard focus inside the open drawer. */
  onDrawerKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>('.drawer a, .drawer button, .drawer summary'),
    ).filter((el) => el.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (!this.openPanel || !target) return;
    if (target.closest('.has-mega') || target.closest('.lang')) return;
    this.openPanel = null;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.openPanel) {
      const panel = this.openPanel;
      this.openPanel = null;
      const trigger = panel === 'lang' ? '#lang-btn' : `[aria-controls="mega-${panel === 'insurance' ? 'ins' : 'loc'}"]`;
      this.host.nativeElement.querySelector<HTMLElement>(trigger)?.focus();
    }
    if (this.drawerOpen) this.closeDrawer();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isStuck = window.scrollY > 8;
  }

  @HostListener('window:resize')
  onResize() {
    if (this.drawerOpen && window.matchMedia('(min-width:1024px)').matches) this.setDrawer(false, false);
  }
}
