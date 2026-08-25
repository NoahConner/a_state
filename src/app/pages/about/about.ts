import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../services/language';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  termsAccepted = false;
  readonly coveredForm = this.createQuoteFormState();

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {}

  heroBadges = [
    { image: '/assets/images/about/id.png', labelKey: 'ABOUT.HERO.BADGES.LICENSED' },
    { image: '/assets/images/about/feedback.png', labelKey: 'ABOUT.HERO.BADGES.INDEPENDENT' },
    { image: '/assets/images/about/hola.png', labelKey: 'ABOUT.HERO.BADGES.SPANISH' },
    { image: '/assets/images/about/letter.png', labelKey: 'ABOUT.HERO.BADGES.CARRIERS' },
  ];

  storyCards = [
    {
      image: '/assets/images/about/trust-section/company-history.png',
      titleKey: 'ABOUT.TRUSTED_INSURANCE.CARD1.TITLE',
      descKey: 'ABOUT.TRUSTED_INSURANCE.CARD1.DESC',
    },
    {
      image: '/assets/images/about/trust-section/mission.png',
      titleKey: 'ABOUT.TRUSTED_INSURANCE.CARD2.TITLE',
      descKey: 'ABOUT.TRUSTED_INSURANCE.CARD2.DESC',
    },
    {
      image: '/assets/images/about/trust-section/clients-served.png',
      titleKey: 'ABOUT.TRUSTED_INSURANCE.CARD3.TITLE',
      descKey: 'ABOUT.TRUSTED_INSURANCE.CARD3.DESC',
    },
    {
      image: '/assets/images/about/trust-section/why-founded.png',
      titleKey: 'ABOUT.TRUSTED_INSURANCE.CARD4.TITLE',
      descKey: 'ABOUT.TRUSTED_INSURANCE.CARD4.DESC',
    },
    {
      image: '/assets/images/about/trust-section/independent-difference.png',
      titleKey: 'ABOUT.TRUSTED_INSURANCE.CARD5.TITLE',
      descKey: 'ABOUT.TRUSTED_INSURANCE.CARD5.DESC',
    },
    {
      image: '/assets/images/about/trust-section/texas-identity.png',
      titleKey: 'ABOUT.TRUSTED_INSURANCE.CARD6.TITLE',
      descKey: 'ABOUT.TRUSTED_INSURANCE.CARD6.DESC',
    },
  ];

  readonly numbersArrowIcon = '/assets/images/about/number-section/arrow.png';

  numberRows = [
    {
      image: '/assets/images/about/number-section/year-founded.png',
      labelKey: 'ABOUT.BY_THE_NUMBERS.ROW1.LABEL',
      valueKey: 'ABOUT.BY_THE_NUMBERS.ROW1.VALUE',
    },
    {
      image: '/assets/images/about/number-section/carriers.png',
      labelKey: 'ABOUT.BY_THE_NUMBERS.ROW2.LABEL',
      valueKey: 'ABOUT.BY_THE_NUMBERS.ROW2.VALUE',
    },
    {
      image: '/assets/images/about/number-section/clients-served.png',
      labelKey: 'ABOUT.BY_THE_NUMBERS.ROW3.LABEL',
      valueKey: 'ABOUT.BY_THE_NUMBERS.ROW3.VALUE',
    },
    {
      image: '/assets/images/about/number-section/google-rating.png',
      labelKey: 'ABOUT.BY_THE_NUMBERS.ROW4.LABEL',
      valueKey: 'ABOUT.BY_THE_NUMBERS.ROW4.VALUE',
    },
    {
      image: '/assets/images/about/number-section/licensed-agents.png',
      labelKey: 'ABOUT.BY_THE_NUMBERS.ROW5.LABEL',
      valueKey: 'ABOUT.BY_THE_NUMBERS.ROW5.VALUE',
    },
    {
      image: '/assets/images/about/number-section/map.png',
      labelKey: 'ABOUT.BY_THE_NUMBERS.ROW6.LABEL',
      valueKey: 'ABOUT.BY_THE_NUMBERS.ROW6.VALUE',
    },
    {
      image: '/assets/images/about/number-section/language.png',
      labelKey: 'ABOUT.BY_THE_NUMBERS.ROW7.LABEL',
      valueKey: 'ABOUT.BY_THE_NUMBERS.ROW7.VALUE',
    },
  ];

  readonly quoteOpenIcon = '/assets/images/about/vision/1.png';
  readonly quoteCloseIcon = '/assets/images/about/vision/2.png';

  valueCards = [
    {
      titleKey: 'ABOUT.MISSION_VISION.VALUES.CARD1.TITLE',
      descKey: 'ABOUT.MISSION_VISION.VALUES.CARD1.DESC',
    },
    {
      titleKey: 'ABOUT.MISSION_VISION.VALUES.CARD2.TITLE',
      descKey: 'ABOUT.MISSION_VISION.VALUES.CARD2.DESC',
    },
    {
      titleKey: 'ABOUT.MISSION_VISION.VALUES.CARD3.TITLE',
      descKey: 'ABOUT.MISSION_VISION.VALUES.CARD3.DESC',
    },
    {
      titleKey: 'ABOUT.MISSION_VISION.VALUES.CARD4.TITLE',
      descKey: 'ABOUT.MISSION_VISION.VALUES.CARD4.DESC',
    },
    {
      titleKey: 'ABOUT.MISSION_VISION.VALUES.CARD5.TITLE',
      descKey: 'ABOUT.MISSION_VISION.VALUES.CARD5.DESC',
    },
  ];

  featureHighlights: FeatureHighlight[] = [
    { icon: 'fa-building', titleKey: 'HOME.WHY_CHOOSE.CARD7.TITLE' },
    { icon: 'fa-id-card', titleKey: 'HOME.WHY_CHOOSE.CARD1.TITLE' },
    { icon: 'fa-users', titleKey: 'HOME.WHY_CHOOSE.CARD2.TITLE' },
    { textKey: 'HOME.WHY_CHOOSE.CARD3.STAT', titleKey: 'HOME.WHY_CHOOSE.CARD3.TITLE' },
    { icon: 'fa-box-open', titleKey: 'HOME.WHY_CHOOSE.CARD4.TITLE' },
    { icon: 'fa-map-marker-alt', titleKey: 'HOME.WHY_CHOOSE.CARD5.TITLE' },
    { icon: 'fa-headset', titleKey: 'HOME.WHY_CHOOSE.CARD6.TITLE' },
    { icon: 'fa-user', titleKey: 'HOME.WHY_CHOOSE.CARD8.TITLE' },
  ];

  solutionCards = [
    {
      image: '/assets/images/about/solutions/auto.png',
      routeKey: 'autoInsurance',
      titleKey: 'HOME.INSURANCE_SOLUTIONS.AUTO.TITLE',
      descKey: 'ABOUT.SOLUTIONS.AUTO.DESC',
    },
    {
      image: '/assets/images/about/solutions/house.png',
      routeKey: 'homeInsurance',
      titleKey: 'HOME.INSURANCE_SOLUTIONS.HOME.TITLE',
      descKey: 'ABOUT.SOLUTIONS.HOME.DESC',
    },
    {
      image: '/assets/images/about/solutions/commercial.png',
      routeKey: 'commercialInsurance',
      titleKey: 'HOME.INSURANCE_SOLUTIONS.COMMERCIAL.TITLE',
      descKey: 'ABOUT.SOLUTIONS.COMMERCIAL.DESC',
    },
    {
      image: '/assets/images/about/solutions/life.png',
      routeKey: 'lifeInsurance',
      titleKey: 'HOME.INSURANCE_SOLUTIONS.LIFE.TITLE',
      descKey: 'ABOUT.SOLUTIONS.LIFE.DESC',
    },
    {
      image: '/assets/images/about/solutions/health.png',
      routeKey: 'healthInsurance',
      titleKey: 'HOME.INSURANCE_SOLUTIONS.HEALTH.TITLE',
      descKey: 'ABOUT.SOLUTIONS.HEALTH.DESC',
    },
    {
      image: '/assets/images/about/solutions/surety.png',
      routeKey: 'suretyBondInsurance',
      titleKey: 'HOME.INSURANCE_SOLUTIONS.SURETY.TITLE',
      descKey: 'ABOUT.SOLUTIONS.SURETY.DESC',
    },
  ];

  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', image: '/assets/images/home/car.png', routeKey: 'getAutoQuote' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', image: '/assets/images/home/home.png', routeKey: 'getHomeQuote' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', image: '/assets/images/home/shop.png', routeKey: 'getCommercialQuote' },
    { name: 'HOME.BANNER.CHIPS.LIFE', image: '/assets/images/home/heart.png', routeKey: 'getLifeQuote' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', image: '/assets/images/home/medical-cross.png', routeKey: 'getHealthQuote' },
    { name: 'HOME.BANNER.CHIPS.SURETY', image: '/assets/images/home/other.png', routeKey: 'getSuretyQuote' },
  ];

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }

  selectChip(form: QuoteFormState, chipName: string) {
    form.selectedChip = chipName;
  }

  async goToSelectedQuote(form: QuoteFormState) {
    if (form.isSubmitting) {
      return;
    }

    const selected = this.chips.find((chip) => chip.name === form.selectedChip);
    if (!selected) {
      return;
    }

    form.isSubmitting = true;

    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: this.translate.instant(selected.name),
        full_name: form.fullName,
        phone_number: form.phone,
      });

      if (!isSubmitted) {
        return;
      }

      this.resetQuoteForm(form);
      await this.router.navigate(this.languageService.getRoute(selected.routeKey));
    } finally {
      form.isSubmitting = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  private resetQuoteForm(form: QuoteFormState) {
    form.selectedChip = null;
    form.fullName = '';
    form.phone = '';
    this.changeDetectorRef.detectChanges();
  }

  private createQuoteFormState(): QuoteFormState {
    return {
      selectedChip: null,
      fullName: '',
      phone: '',
      isSubmitting: false,
    };
  }
}

interface QuoteFormState {
  selectedChip: string | null;
  fullName: string;
  phone: string;
  isSubmitting: boolean;
}

interface FeatureHighlight {
  icon?: string;
  textKey?: string;
  titleKey: string;
}
