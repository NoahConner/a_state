import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../services/language';
import { routeTranslations } from '../../app-routing-module';

type FooterLink = {
  routeKey: string;
  labelKey?: string;
};

type CityLink = {
  routeKey: string;
  label: string;
};

type InsuranceMenuSection = {
  TITLE?: string;
  ITEMS?: Array<{
    KEY: string;
    LABEL: string;
  }>;
};

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  constructor(
    public languageService: Language,
    private translate: TranslateService,
  ) {}

  personalInsuranceLinks: FooterLink[] = [
    { routeKey: 'carInsurance' },
    { routeKey: 'sr22Insurance' },
    { routeKey: 'homeInsurance', labelKey: 'HEADER.HOME_INSURANCE' },
    { routeKey: 'rentersInsurance' },
    { routeKey: 'floodInsurance' },
    { routeKey: 'healthInsurance', labelKey: 'HEADER.HEALTH_INSURANCE' },
    { routeKey: 'lifeInsurance', labelKey: 'HEADER.LIFE_INSURANCE' },
    { routeKey: 'medicareSupplementInsurance' },
  ];

  commercialInsuranceLinks: FooterLink[] = [
    { routeKey: 'generalLiabilityInsurance' },
    { routeKey: 'workersCompensationInsurance' },
    { routeKey: 'commercialAutoInsurance' },
    { routeKey: 'businessOwnerInsurance' },
    { routeKey: 'commercialPropertyInsurance' },
    { routeKey: 'professionalLiabilityInsurance' },
    { routeKey: 'cyberLiabilityInsurance' },
    { routeKey: 'buildersRiskInsurance' },
  ];

  companyLinks: FooterLink[] = [
    { routeKey: 'about', labelKey: 'HEADER.ABOUT' },
    { routeKey: 'insuranceServices', labelKey: 'HEADER.INSURANCE_SERVICES' },
    { routeKey: 'careers', labelKey: 'FOOTER.POLICIES.CAREERS' },
    { routeKey: 'ourLocations', labelKey: 'HEADER.OFFICE_LOCATOR' },
    { routeKey: 'contact', labelKey: 'HEADER.CONTACT' },
    { routeKey: 'getAQuote', labelKey: 'HEADER.GET_A_QUOTE' },
  ];

  // Rendered above the footer card as an 8-column grid; order matches the design.
  cityLinks: CityLink[] = [
    { routeKey: 'houstonTx', label: 'Houston' },
    { routeKey: 'sanAntonioTx', label: 'San Antonio' },
    { routeKey: 'dallasTx', label: 'Dallas' },
    { routeKey: 'austinTx', label: 'Austin' },
    { routeKey: 'fortWorthTx', label: 'Fort Worth' },
    { routeKey: 'elPasoTx', label: 'El Paso' },
    { routeKey: 'arlingtonTx', label: 'Arlington' },
    { routeKey: 'corpusChristiTx', label: 'Corpus Christi' },
    { routeKey: 'lubbockTx', label: 'Lubbock' },
    { routeKey: 'laredoTx', label: 'Laredo' },
    { routeKey: 'irvingTx', label: 'Irving' },
    { routeKey: 'garlandTx', label: 'Garland' },
    { routeKey: 'friscoTx', label: 'Frisco' },
    { routeKey: 'mckinneyTx', label: 'McKinney' },
    { routeKey: 'amarilloTx', label: 'Amarillo' },
    { routeKey: 'grandPrairieTx', label: 'Grand Prairie' },
    { routeKey: 'killeenTx', label: 'Killeen' },
    { routeKey: 'dentonTx', label: 'Denton' },
    { routeKey: 'pasadenaTx', label: 'Pasadena' },
    { routeKey: 'mesquiteTx', label: 'Mesquite' },
    { routeKey: 'mcallenTx', label: 'McAllen' },
    { routeKey: 'wacoTx', label: 'Waco' },
    { routeKey: 'planoTx', label: 'Plano' },
    { routeKey: 'brownsvilleTx', label: 'Brownsville' },
  ];

  socialLinks = [
    {
      icon: 'fa-brands fa-facebook-f',
      href: 'https://www.facebook.com/astateinsurancetx',
      label: 'Facebook',
    },
    {
      icon: 'fa-brands fa-instagram',
      href: 'https://www.instagram.com/astateinsurance/',
      label: 'Instagram',
    },
    {
      icon: 'fa-brands fa-youtube',
      href: 'https://www.youtube.com/@a-state-insurance',
      label: 'YouTube',
    },
    {
      icon: 'fa-brands fa-tiktok',
      href: 'https://www.tiktok.com/@astateinsurancetx',
      label: 'TikTok',
    },
    {
      icon: 'fa-brands fa-pinterest-p',
      href: 'https://www.pinterest.com/astateinsurance/',
      label: 'Pinterest',
    },
    {
      icon: 'fa-brands fa-snapchat-ghost',
      href: 'https://www.snapchat.com/@astateinsurance',
      label: 'Snapchat',
    },
    {
      icon: 'fa-brands fa-x-twitter',
      href: 'https://x.com/astateinsurance',
      label: 'X',
    },
    {
      icon: 'fa-brands fa-linkedin-in',
      href: null,
      label: 'LinkedIn',
    },
  ];

  get currentLang() {
    return this.languageService.getCurrentLanguage();
  }

  getLinkLabel(link: FooterLink): string {
    if (link.labelKey) {
      return this.translate.instant(link.labelKey);
    }

    const sections = this.translate.instant('FOOTER.INSURANCE_MENU') as InsuranceMenuSection[];

    if (Array.isArray(sections)) {
      for (const section of sections) {
        const item = section.ITEMS?.find((entry) => entry.KEY === link.routeKey);

        if (item?.LABEL) {
          return item.LABEL;
        }
      }
    }

    return link.routeKey;
  }

  getRoute(page: string): string[] {
    const lang = this.languageService.getCurrentLanguage();

    if (page === 'home') {
      return lang === 'en' ? ['/'] : ['/', lang];
    }

    const slug = routeTranslations[page]?.[lang] || routeTranslations[page]?.['en'];

    if (!slug) return ['/'];

    const segments = slug.split('/');

    return lang === 'en' ? ['/', ...segments] : ['/', lang, ...segments];
  }

  changeLang(lang: string) {
    this.languageService.setLanguage(lang);
  }

  trackByValue(_index: number, value: string): string {
    return value;
  }
}
