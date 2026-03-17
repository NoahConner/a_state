import { Component } from '@angular/core';

@Component({
  selector: 'app-auto-insurance',
  standalone: false,
  templateUrl: './auto-insurance.html',
  styleUrl: './auto-insurance.scss',
})
export class AutoInsurance {
  chips = [
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.PERSONAL_CAR', icon: 'fas fa-car' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.COMMERCIAL_AUTO', icon: 'fas fa-house' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RIDESHARE', icon: 'fas fa-building' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.SR22', icon: 'fas fa-heart' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RV_MOTORHOME', icon: 'fas fa-notes-medical' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

}
