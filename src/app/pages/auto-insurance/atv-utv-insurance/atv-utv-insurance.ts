import { Language } from '../../../services/language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-atv-utv-insurance',
  standalone: false,
  templateUrl: './atv-utv-insurance.html',
  styleUrl: './atv-utv-insurance.scss',
})
export class AtvAndUtvInsurance {
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
    { name: 'ATV_INSURANCE.BANNER.CHIPS.SPORT_ATV', icon: 'fas fa-car' },
    { name: 'ATV_INSURANCE.BANNER.CHIPS.SIDE_BY_SIDE_UTV', icon: 'fas fa-house' },
    { name: 'ATV_INSURANCE.BANNER.CHIPS.UTILITY_ATV', icon: 'fas fa-building' },
    { name: 'ATV_INSURANCE.BANNER.CHIPS.YOUTH_ATV', icon: 'fas fa-heart' },
    { name: 'ATV_INSURANCE.BANNER.CHIPS.GOLF_CART_LSV', icon: 'fas fa-notes-medical' },
    { name: 'ATV_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { carrier: '<a href="https://www.markel.com/" rel="nofollow">Markel</a>', monthly: '$61', annual: '$352' },
    { carrier: '<a href="https://www.geico.com/" rel="nofollow">Geico</a>', monthly: '$70', annual: '$421' },
    { carrier: '<a href="https://www.geico.com/" rel="nofollow">Progressive</a>', monthly: '$75', annual: '$188' },
    { carrier: '<a href="https://www.geico.com/" rel="nofollow">Dairyland</a>', monthly: '$106', annual: '$165' },
    { carrier: '<a href="https://www.geico.com/" rel="nofollow">Allstate</a>', monthly: '$126', annual: '$510' },
  ];

notCoveredKeys = [
  'STREET_USE',
  'RACING',
  'INTENTIONAL_DAMAGE',
  'WEAR_TEAR',
  'DUI',
  'UNLISTED_RIDERS',
  'PERSONAL_BELONGINGS',
  'RESTRICTED_LAND',
  'COMMERCIAL_USE',
  'YOUTH_RIDERS',
  'THEFT',
  'FLOOD_WEATHER',
  'TOWING_TRANSPORT',
  'MODIFICATIONS',
  'WAR_NUCLEAR'
]

  impactFactorsKeys = [
    "VEHICLE_TYPE",
    "MAKE_MODEL_ENGINE",
    "VEHICLE_AGE_CONDITION",
    "VEHICLE_VALUE",
    "USAGE_TYPE",
    "RIDING_LOCATION",
    "OPERATOR_AGE_EXPERIENCE",
    "RIDING_RECORD",
    "CLAIMS_HISTORY",
    "ANNUAL_USAGE",
    "STORAGE_SECURITY",
    "ANTI_THEFT_SAFETY",
    "COVERAGE_LEVEL",
    "NUMBER_OF_RIDERS",
    "YOUTH_RIDER_ENDORSEMENT",
    "CUSTOM_PARTS",
    "INSURANCE_HISTORY",
    "CREDIT_SCORE",
    "TRAIL_USAGE",
    "STREET_LEGAL_ENDORSEMENT"
  ];
  discountKeys = [
    "BUNDLING",
    "MULTI_VEHICLE",
    "SAFE_RIDER",
    "SAFETY_COURSE",
    "EXPERIENCED_RIDER",
    "CLAIM_FREE",
    "PAID_FULL",
    "AUTO_PAY",
    "PAPERLESS",
    "LOYALTY",
    "GARAGE_STORAGE",
    "ANTI_THEFT",
    "LOW_USAGE",
    "LAY_UP",
    "MILITARY_OCCUPATION",
    "ASSOCIATION_MEMBER",
    "YOUTH_SAFETY_COURSE",
    "NEW_VEHICLE",
    "HIGHER_DEDUCTIBLE",
    "RANCH_AGRICULTURAL_USE"
  ];
  agentComparisonData = [
    "NUMBER_OF_CARRIERS",
    "PRICE_COMPARISON",
    "VEHICLE_TYPES_COVERED",
    "AGRICULTURAL_USE",
    "STREET_LEGAL_COVERAGE",
    "YOUTH_RIDER_COVERAGE",
    "RACING_COMPETITION",
    "CUSTOM_MODIFIED_VEHICLES",
    "TRAIL_LIABILITY",
    "HIGH_RISK_RIDERS",
    "COVERAGE_CUSTOMIZATION",
    "LOYALTY",
    "RENEWAL_SHOPPING",
    "CLAIMS_ADVOCACY",
    "SEASONAL_OPTIONS",
    "MULTI_POLICY",
    "SWITCHING_CARRIERS",
    "LOCAL_KNOWLEDGE",
    "MULTILINGUAL_SUPPORT"
  ];

  vehicleInsuranceTypes = [
    "SPORT_ATV",
    "UTILITY_ATV",
    "YOUTH_ATV",
    "SIDE_BY_SIDE_UTV",
    "SPORT_UTV",
    "UTILITY_UTV",
    "GOLF_CART_LSV",
    "DUNE_BUGGY",
    "ROCK_CRAWLER",
    "ELECTRIC_ATV_UTV",
    "THREE_WHEELER",
    "AMPHIBIOUS_ATV",
    "FARM_RANCH_UTV",
    "RACING_ATV_UTV",
    "CUSTOM_MODIFIED_ATV"
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

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
