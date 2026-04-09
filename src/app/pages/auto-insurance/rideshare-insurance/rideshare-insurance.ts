import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rideshare-insurance',
  standalone: false,
  templateUrl: './rideshare-insurance.html',
  styleUrl: './rideshare-insurance.scss',
})
export class RideshareInsurance {
  optionalCoveragesChunks: any[][] = [];

  constructor(private translate: TranslateService) { }


  chips = [
    { name: 'RIDESHARE_INSURANCE.BANNER.CHIPS.UBER', icon: 'fas fa-car' },
    { name: 'RIDESHARE_INSURANCE.BANNER.CHIPS.LYFT', icon: 'fas fa-house' },
    { name: 'RIDESHARE_INSURANCE.BANNER.CHIPS.DELIVERY', icon: 'fas fa-building' },
    { name: 'RIDESHARE_INSURANCE.BANNER.CHIPS.SR22', icon: 'fas fa-heart' },
    { name: 'RIDESHARE_INSURANCE.BANNER.CHIPS.MULTI_PLATFORM', icon: 'fas fa-notes-medical' },
    { name: 'RIDESHARE_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  impactFactorsKeys = [
  "RIDESHARE_PLATFORM_TYPE",
  "DRIVING_RECORD",
  "AGE_EXPERIENCE",
  "VEHICLE_TYPE",
  "VEHICLE_CONDITION",
  "MILEAGE_USAGE",
  "HOURS_DRIVEN",
  "LOCATION",
  "COVERAGE_DEDUCTIBLE",
  "PERSONAL_POLICY_TYPE",
  "SR22_REQUIREMENT",
  "CLAIMS_HISTORY",
  "CREDIT_SCORE",
  "INSURANCE_HISTORY",
  "MULTI_PLATFORM",
  "VEHICLE_USE_TYPE",
  "GENDER",
  "MARITAL_STATUS"
];

 discountKeys = [
  "BUNDLING",
  "SAFE_DRIVER",
  "DEFENSIVE_DRIVING",
  "TELEMATICS",
  "PAID_FULL",
  "AUTO_PAY",
  "PAPERLESS",
  "LOYALTY",
  "LOW_MILEAGE",
  "ANTI_THEFT",
  "SAFETY_FEATURES",
  "NEW_VEHICLE",
  "MILITARY_OCCUPATION",
  "GOOD_CREDIT",
  "EARLY_SIGNING",
  "MULTI_VEHICLE",
  "PLATFORM_RECORD",
  "CONTINUOUS_COVERAGE"
];
 agentComparisonData = [
  "NUMBER_OF_CARRIERS",
  "PRICE_COMPARISON",
  "PLATFORM_COVERAGE",
  "PERIOD_1_GAP",
  "MULTI_PLATFORM",
  "DELIVERY_DRIVER",
  "SR22_DRIVERS",
  "HIGH_MILEAGE",
  "PART_TIME",
  "TELEMATICS",
  "PLATFORM_SAFETY",
  "COVERAGE_CUSTOMIZATION",
  "LOYALTY",
  "RENEWAL_SHOPPING",
  "CLAIMS_ADVOCACY",
  "SWITCHING_CARRIERS",
  "LOCAL_KNOWLEDGE",
  "MULTILINGUAL_SUPPORT"
];


  switchSteps = [
    'STEP_1',
    'STEP_2',
    'STEP_3',
  ];

  faqList = [
    'FAQ1',
    'FAQ2',
    'FAQ3',
    'FAQ4',
    'FAQ5',
    'FAQ6',
    'FAQ7',
    'FAQ8',
  ];
}
