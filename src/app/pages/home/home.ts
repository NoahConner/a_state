import { Language } from '../../services/language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
  ) {}

  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', icon: 'fas fa-car', routeKey: 'getAutoQuote' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-house', routeKey: 'getHomeQuote' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-building', routeKey: 'getCommercialQuote' },
    { name: 'HOME.BANNER.CHIPS.LIFE', icon: 'fas fa-heart', routeKey: 'getLifeQuote' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', icon: 'fas fa-notes-medical', routeKey: 'getHealthQuote' },
    { name: 'HOME.BANNER.CHIPS.SURETY', icon: 'fas fa-file-contract', routeKey: 'getSuretyQuote' },
  ];
  selectedChip: string | null = null;
  fullName = '';
  phone = '';
  isSubmitting = false;

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }

  selectChip(chipName: string) {
    this.selectedChip = chipName;
  }

  async goToSelectedQuote() {
    if (this.isSubmitting) {
      return;
    }

    const selected = this.chips.find((chip) => chip.name === this.selectedChip);
    if (!selected) {
      return;
    }

    this.isSubmitting = true;

    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: this.translate.instant(selected.name),
        full_name: this.fullName,
        phone_number: this.phone,
      });

      if (!isSubmitted) {
        return;
      }

      this.selectedChip = null;
      this.fullName = '';
      this.phone = '';
    } finally {
      this.isSubmitting = false;
    }
  }
}
