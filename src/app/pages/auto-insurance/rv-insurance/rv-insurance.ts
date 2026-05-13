import { Language } from '../../../services/language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rv-insurance',
  standalone: false,
  templateUrl: './rv-insurance.html',
  styleUrl: './rv-insurance.scss',
})
export class RvInsurance {
  optionalCoveragesChunks: any[][] = [];

  constructor(public languageService: Language, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadOptionalCoverages();
    });
    this.loadOptionalCoverages();
  }

  loadOptionalCoverages() {
    this.translate.get('AUTO_INSURANCE.COVERAGES.OPTIONAL.LIST').subscribe((list: any[]) => {
      if (Array.isArray(list)) {
        this.optionalCoveragesChunks = this.chunkArray(list, 3);
      }
    });
  }

  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'RV_INSURANCE.BANNER.CHIPS.CLASS_A_MOTORHOME', icon: 'fas fa-car' },
    { name: 'RV_INSURANCE.BANNER.CHIPS.CLASS_B_MOTORHOME', icon: 'fas fa-house' },
    { name: 'RV_INSURANCE.BANNER.CHIPS.CLASS_C_MOTORHOME', icon: 'fas fa-building' },
    { name: 'RV_INSURANCE.BANNER.CHIPS.TRAVEL_TRAILER', icon: 'fas fa-heart' },
    { name: 'RV_INSURANCE.BANNER.CHIPS.FIFTH_WHEEL_TRAILER', icon: 'fas fa-notes-medical' },
    { name: 'RV_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  impactFactorsKeys = [
    'RV_TYPE_CLASS',
    'RV_AGE_CONDITION',
    'RV_VALUE',
    'RV_SIZE',
    'ENGINE_POWER',
    'USAGE_TYPE',
    'ANNUAL_MILEAGE',
    'STORAGE',
    'TRAVEL_AREA',
    'DRIVER_PROFILE',
    'DRIVING_RECORD',
    'CLAIMS_HISTORY',
    'COVERAGE_LEVEL',
    'POLICY_TYPE',
    'CUSTOM_EQUIPMENT',
    'SECURITY_FEATURES',
    'INSURANCE_HISTORY',
    'CREDIT_SCORE',
    'MEXICO_COVERAGE',
    'SEASONAL_USE'
  ];

  discountKeys = [
    'BUNDLING',
    'MULTI_RV',
    'SAFE_DRIVER',
    'SAFETY_COURSE',
    'EXPERIENCED_OWNER',
    'CLAIM_FREE',
    'PAID_FULL',
    'AUTO_PAY',
    'PAPERLESS',
    'LOYALTY',
    'LAY_UP',
    'GARAGE_STORAGE',
    'ANTI_THEFT',
    'ASSOCIATION_MEMBER',
    'FULL_TIMER',
    'NEW_RV',
    'MILITARY_OCCUPATION',
    'HIGH_DEDUCTIBLE',
    'CONTINUOUS_INSURANCE',
    'SAFETY_EQUIPMENT'
  ];
  agentComparisonData = [
    'NUMBER_OF_CARRIERS',
    'PRICE_COMPARISON',
    'RV_TYPES_COVERED',
    'FULL_TIMER',
    'HIGH_RISK',
    'HIGH_VALUE',
    'STORM_COVERAGE',
    'MEXICO_COVERAGE',
    'PEST_COVERAGE',
    'COVERAGE_CUSTOMIZATION',
    'LOYALTY',
    'RENEWAL_SHOPPING',
    'CLAIMS_ADVOCACY',
    'SEASONAL_OPTIONS',
    'MULTI_POLICY',
    'SWITCHING_CARRIERS',
    'LOCAL_KNOWLEDGE',
    'MULTILINGUAL_SUPPORT'
  ]

  vehicleInsuranceTypes = [
    "CRUISERS",
    "SPORTBIKES",
    "TOURING",
    "STANDARD",
    "DIRT_OFFROAD",
    "DUAL_SPORT",
    "SCOOTERS_MOPEDS",
    "TRIKES",
    "CUSTOM_CHOPPER",
    "CLASSIC_VINTAGE",
    "ELECTRIC",
    "SIDECARS",
    "CLASS_A",
    "CLASS_B",
    "CLASS_C",
    "TRAVEL_TRAILERS",
    "FIFTH_WHEEL",
    "TOY_HAULERS",
    "POP_UP",
    "TEARDROP",
    "TRUCK_CAMPERS",
    "EXPANDABLE_TRAILERS",
    "PARK_MODEL",
    "DIESEL_PUSHERS",
    "SUPER_C",
    "CONVERTED_BUS",
    "ELECTRIC_RV"
  ]


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

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
