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

  tableOfContents = [
    'Lorem Ipsum is simply dummy text of the printing.',
    'Lorem Ipsum is simply dummy text of the printing.',
    'Lorem Ipsum is simply dummy text of the printing.',
    'Lorem Ipsum is simply dummy text of the printing.',
    'Lorem Ipsum is simply dummy text of the printing.',
    'Lorem Ipsum is simply dummy text of the printing.',
    'Lorem Ipsum is simply dummy text of the printing.',
  ];

  monthlyRates = [
    { company: 'Texas Farm Bureau', minimum: '$40', fullCoverage: '$97' },
    { company: 'USAA', minimum: '$50', fullCoverage: '$130' },
    { company: 'State Farm', minimum: '$51', fullCoverage: '$124' },
    { company: 'Geico', minimum: '$81', fullCoverage: '$182' },
    { company: 'Progressive', minimum: '$105', fullCoverage: '$266' },
    { company: 'Allstate', minimum: '$106', fullCoverage: '$267' },
  ];

  compareRateColumns = ['Houston', 'Texas Average', 'National Average'];

  compareRates = [
    { label: 'Minimum Coverage', values: ['$157/mo', '$111/mo', '$98/mo'], highlighted: false },
    { label: 'Full Coverage', values: ['$270/mo', '$207/mo', '$187/mo'], highlighted: true },
  ];

  zipRateRows = [
    { zipCode: '77015', neighborhood: 'Northshore', monthlyRate: '$296', highlighted: false },
    { zipCode: '77095', neighborhood: 'Copperfield', monthlyRate: '$299', highlighted: true },
    { zipCode: '77077', neighborhood: 'Energy Corridor', monthlyRate: '$302', highlighted: false },
    { zipCode: '77084', neighborhood: 'Bear Creek', monthlyRate: '$306', highlighted: true },
    { zipCode: '77089', neighborhood: 'Sagemont', monthlyRate: '$306', highlighted: false },
    { zipCode: '77083', neighborhood: 'Mission Bend', monthlyRate: '$308', highlighted: true },
    { zipCode: '77082', neighborhood: 'West Oaks', monthlyRate: '$312', highlighted: false },
    { zipCode: '77072', neighborhood: 'Alief', monthlyRate: '$316', highlighted: true },
    { zipCode: '77044', neighborhood: 'Summerwood', monthlyRate: '$316', highlighted: false },
    { zipCode: '77036', neighborhood: 'Sharpstown', monthlyRate: '$317', highlighted: true },
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
