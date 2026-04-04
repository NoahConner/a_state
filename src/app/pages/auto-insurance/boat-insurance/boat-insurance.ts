import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-boat-insurance',
  standalone: false,
  templateUrl: './boat-insurance.html',
  styleUrl: './boat-insurance.scss',
})
export class BoatInsurance {
  optionalCoveragesChunks: any[][] = [];

  constructor(private translate: TranslateService) { }




  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'BOAT_INSURANCE.BANNER.CHIPS.FISHING', icon: 'fas fa-car' },
    { name: 'BOAT_INSURANCE.BANNER.CHIPS.PWC', icon: 'fas fa-house' },
    { name: 'BOAT_INSURANCE.BANNER.CHIPS.PONTOON', icon: 'fas fa-building' },
    { name: 'BOAT_INSURANCE.BANNER.CHIPS.BOWRIDER_RUNABOUT', icon: 'fas fa-heart' },
    { name: 'BOAT_INSURANCE.BANNER.CHIPS.SAILBOATS', icon: 'fas fa-notes-medical' },
    { name: 'BOAT_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];


  impactFactorsKeys = [
    "BOAT_TYPE_CATEGORY",
    "BOAT_AGE_CONDITION",
    "BOAT_VALUE_REPLACEMENT",
    "ENGINE_HP",
    "BOAT_LENGTH_SIZE",
    "OPERATING_AREA",
    "OPERATOR_AGE_EXPERIENCE",
    "SAFETY_COURSE",
    "CLAIMS_HISTORY",
    "STORAGE_LOCATION",
    "ANNUAL_USAGE",
    "NAVIGATION_LIMITS",
    "ANTI_THEFT_SAFETY",
    "COVERAGE_DEDUCTIBLE",
    "INSURANCE_HISTORY",
    "TRAILER_INCLUDED",
    "SEASONAL_USE",
    "CREDIT_SCORE"
  ];



  discountKeys = [
    "BUNDLING",
    "SAFETY_COURSE",
    "EXPERIENCED_BOATER",
    "CLAIM_FREE",
    "PAID_FULL",
    "AUTO_PAY",
    "PAPERLESS",
    "LOYALTY",
    "LAY_UP",
    "COAST_GUARD_EQUIPMENT",
    "ANTI_THEFT",
    "GARAGE_STORAGE",
    "MULTI_BOAT",
    "DIESEL_ENGINE",
    "NEW_BOAT",
    "MILITARY_OCCUPATION",
    "ASSOCIATION_MEMBER",
    "HIGH_DEDUCTIBLE"
  ];


  agentComparisonData = [
    "NUMBER_OF_CARRIERS",
    "PRICE_COMPARISON",
    "BOAT_TYPES",
    "HIGH_RISK",
    "OFFSHORE_COASTAL",
    "HURRICANE_STORM",
    "FISHING_EQUIPMENT",
    "CUSTOM_HIGH_VALUE",
    "PWC_JET_SKI",
    "COVERAGE_CUSTOMIZATION",
    "LOYALTY",
    "RENEWAL_SHOPPING",
    "CLAIMS_ADVOCACY",
    "SEASONAL_OPTIONS",
    "MULTI_POLICY_BUNDLING",
    "SWITCHING_CARRIERS",
    "LOCAL_KNOWLEDGE",
    "MULTILINGUAL_SUPPORT"
  ];

  vehicleInsuranceTypes = [
    "FISHING_BOATS",
    "PWC_JET_SKIS",
    "PONTOON",
    "BOWRIDER_RUNABOUT",
    "SAILBOATS_CATAMARANS",
    "OFFSHORE_SPORT_FISHING",
    "CENTER_CONSOLE",
    "DECK_BOATS",
    "SKI_WAKEBOARD",
    "HOUSEBOATS",
    "JON_FLAT_BOTTOM",
    "INFLATABLE_RIB",
    "KAYAKS_CANOES",
    "ELECTRIC_BOATS",
    "AIRBOATS"
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
