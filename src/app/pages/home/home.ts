import { Language } from '../../services/language';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(
    public languageService: Language,
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
  selectedChip: string | null = null;
  fullName = '';
  phone = '';

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }

  selectChip(chipName: string) {
    this.selectedChip = chipName;
  }

  goToSelectedQuote() {
    const selected = this.chips.find((chip) => chip.name === this.selectedChip);
    if (!selected) {
      return;
    }

    const queryParams: Record<string, string> = {};
    const trimmedName = this.fullName.trim();
    const trimmedPhone = this.phone.trim();

    if (trimmedName) {
      queryParams['fullName'] = trimmedName;
    }

    if (trimmedPhone) {
      queryParams['phone'] = trimmedPhone;
    }

    this.router.navigate(this.getRoute(selected.routeKey), { queryParams });
  }
}
