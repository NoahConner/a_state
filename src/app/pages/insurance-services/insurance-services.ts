import { Language } from '../../services/language';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-services',
  standalone: false,
  templateUrl: './insurance-services.html',
  styleUrl: './insurance-services.scss',
})
export class InsuranceServices {
  readonly bannerForm = this.createQuoteFormState();
  readonly coveredForm = this.createQuoteFormState();

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {}

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

  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', icon: 'fas fa-car', image: '/assets/images/home/car.png', routeKey: 'getAutoQuote' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-house', image: '/assets/images/home/home.png', routeKey: 'getHomeQuote' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-building', image: '/assets/images/home/shop.png', routeKey: 'getCommercialQuote' },
    { name: 'HOME.BANNER.CHIPS.LIFE', icon: 'fas fa-heart', image: '/assets/images/home/heart.png', routeKey: 'getLifeQuote' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', icon: 'fas fa-notes-medical', image: '/assets/images/home/medical-cross.png', routeKey: 'getHealthQuote' },
    { name: 'HOME.BANNER.CHIPS.SURETY', icon: 'fas fa-file-contract', image: '/assets/images/home/other.png', routeKey: 'getSuretyQuote' },
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
