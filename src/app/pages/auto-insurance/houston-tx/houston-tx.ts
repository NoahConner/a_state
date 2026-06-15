import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../../../services/language';

@Component({
  selector: 'app-houston-tx',
  standalone: false,
  templateUrl: './houston-tx.html',
  styleUrl: './houston-tx.scss',
})
export class HoustonTx {
  constructor(
    public languageService: Language,
    private router: Router,
  ) {}


    chips = [
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.PERSONAL_CAR',  image: '/assets/images/houston-tx/car.png', routeKey: 'carInsurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.COMMERCIAL_AUTO', image: '/assets/images/houston-tx/truck.png', routeKey: 'commercialAutoInsurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.SR22', image: '/assets/images/houston-tx/plane.png', routeKey: 'sr22Insurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RIDESHARE', image: '/assets/images/houston-tx/taxi.png', routeKey: 'rideshareInsurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RV_MOTORHOME', image: '/assets/images/houston-tx/truck-1.png', routeKey: 'rvInsurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.OTHER', image: '/assets/images/houston-tx/shield with cross.png', routeKey: 'getAutoQuote' },
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
