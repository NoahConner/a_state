import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-performance-bonds-payment-bonds',
  standalone: false,
  templateUrl: './performance-bonds-payment-bonds.html',
  styleUrl: './performance-bonds-payment-bonds.scss',
})
export class PerformanceBondsPaymentBonds {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'ACA_MARKETPLACE.BANNER.CHIPS.BRONZE', icon: 'fas fa-car' },
    { name: 'ACA_MARKETPLACE.BANNER.CHIPS.SILVER', icon: 'fas fa-house' },
    { name: 'ACA_MARKETPLACE.BANNER.CHIPS.GOLD', icon: 'fas fa-building' },
    { name: 'ACA_MARKETPLACE.BANNER.CHIPS.PLATINUM', icon: 'fas fa-heart' },
    { name: 'ACA_MARKETPLACE.BANNER.CHIPS.CATASTROPHIC', icon: 'fas fa-notes-medical' },
    { name: 'ACA_MARKETPLACE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  ageRates = [
    { age: 30, men: "$489.60", women: "$589.21" },
    { age: 40, men: "$695.60", women: "$820.63" },
    { age: 50, men: "$1,036.40", women: "$1,228.79" },
    { age: 60, men: "$1,606.71", women: "$1,969.73" },
    { age: 70, men: "$2,804.58", women: "$3,371.75" }
  ];



  impactFactorsKeys = [
    'AGE',
    'INCOME',
    'HOUSEHOLD_SIZE',
    'METAL_TIER',
    'PLAN_TYPE',
    'TOBACCO',
    'COUNTY',
    'ENROLLED_COUNT',
    'AVAILABLE_CARRIERS',
    'INCOME_CHANGES'
  ];


  discountKeys = [
    'REPORT_INCOME',
    'SILVER_PLAN',
    'ADD_DEPENDENTS',
    'SUBSIDY_CLIFF',
    'HMO_EPO',
    'HIGH_DEDUCTIBLE',
    'PREVENTIVE_CARE',
    'UPDATE_APP',
    'COMPARE_CARRIERS',
    'INDEPENDENT_AGENT'
  ];



  notCoveredKeys = [
    'ADULT_DENTAL_VISION',
    'COSMETIC',
    'LONG_TERM_CARE',
    'WEIGHT_LOSS',
    'INFERTILITY',
    'HEARING_AIDS',
    'ALTERNATIVE_MEDICINE',
    'OUT_OF_NETWORK',
    'TRANSPORTATION',
    'EXPERIMENTAL'
  ];


  agentComparisonData = [
    'COMPARES_CARRIERS',
    'SHOPS_TIERS',
    'SUBSIDY_ASSIST',
    'CSR_EXPLAIN',
    'LOWEST_PREMIUM',
    'BILINGUAL',
    'LOCAL_EXPERTISE',
    'SPECIAL_ENROLLMENT',
    'ONGOING_SUPPORT',
    'COVERAGE_GAP',
    'INCOME_CHANGE_UPDATE',
    'COST_TO_YOU',
  ];



  factorComparisonKeys = [
    'WHO_FOR',
    'PREMIUM_SUBSIDY',
    'PRE_EXISTING',
    'ESSENTIAL_BENEFITS',
    'COST_REDUCTION',
    'ENROLLMENT',
    'EMPLOYER_CONTRIBUTION',
    'DRUG_COVERAGE',
    'MENTAL_HEALTH',
    'TEXAS_AVAILABILITY'
  ];



  ratesKeys = [
    'BRONZE',
    'SILVER',
    'GOLD',
  ]


  switchSteps = [
    'STEP_1',
    'STEP_2',
    'STEP_3',
  ];

  faqList = [
    'FAQ1',
    'FAQ2',
  ];

}
