import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Language } from '../../services/language';
import { OFFICES, buildRoute } from '../header/header';

type FooterLink = { routeKey: string; labelKey: string };

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  readonly offices = OFFICES;
  readonly year = new Date().getFullYear();

  readonly insuranceLinks: FooterLink[] = [
    { routeKey: 'autoInsurance', labelKey: 'SITE_FOOTER.LINKS.AUTO' },
    { routeKey: 'homeInsurance', labelKey: 'SITE_FOOTER.LINKS.HOME' },
    { routeKey: 'commercialInsurance', labelKey: 'SITE_FOOTER.LINKS.BUSINESS' },
    { routeKey: 'lifeInsurance', labelKey: 'SITE_FOOTER.LINKS.LIFE' },
    { routeKey: 'healthInsurance', labelKey: 'SITE_FOOTER.LINKS.HEALTH' },
    { routeKey: 'suretyBondInsurance', labelKey: 'SITE_FOOTER.LINKS.BONDS' },
  ];

  readonly companyLinks: FooterLink[] = [
    { routeKey: 'about', labelKey: 'SITE_NAV.ABOUT' },
    { routeKey: 'careers', labelKey: 'SITE_FOOTER.CAREERS' },
    { routeKey: 'contact', labelKey: 'SITE_NAV.CONTACT' },
  ];

  /** Columns are accordions on phones and always open from 768px. Rendered open on the server. */
  columnsOpen = true;
  isDesktop = true;

  private readonly isBrowser: boolean;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    public languageService: Language,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;
    const mq = window.matchMedia('(min-width:768px)');
    const sync = () => {
      this.isDesktop = mq.matches;
      this.columnsOpen = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    this.destroyRef.onDestroy(() => mq.removeEventListener('change', sync));
  }

  route(page: string, officeId?: string): string[] {
    return buildRoute(this.languageService, page, officeId);
  }

  /** On desktop the column headings are not toggles. */
  onSummaryClick(event: Event) {
    if (this.isDesktop) event.preventDefault();
  }}
