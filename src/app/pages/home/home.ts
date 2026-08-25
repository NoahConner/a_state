import { Language } from '../../services/language';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  termsAccepted = false;
  termsAccepted2 = false;
  readonly bannerForm = this.createQuoteFormState();
  readonly coveredForm = this.createQuoteFormState();

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {}

  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', icon: 'fas fa-car', routeKey: 'getAutoQuote' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-house', routeKey: 'getHomeQuote' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-building', routeKey: 'getCommercialQuote' },
    { name: 'HOME.BANNER.CHIPS.LIFE', icon: 'fas fa-heart', routeKey: 'getLifeQuote' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', icon: 'fas fa-notes-medical', routeKey: 'getHealthQuote' },
    { name: 'HOME.BANNER.CHIPS.SURETY', icon: 'fas fa-file-contract', routeKey: 'getSuretyQuote' },
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
