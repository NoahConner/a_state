import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-medicare-supplement-insurance',
  standalone: false,
  templateUrl: './medicare-supplement-insurance.html',
  styleUrl: './medicare-supplement-insurance.scss',
})
export class MedicareSupplementInsurance {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'MEDICARE_SUPPLEMENT_INSURANCE.BANNER.CHIPS.GROUP_HMO', icon: 'fas fa-car' },
    { name: 'MEDICARE_SUPPLEMENT_INSURANCE.BANNER.CHIPS.GROUP_PPO', icon: 'fas fa-house' },
    { name: 'MEDICARE_SUPPLEMENT_INSURANCE.BANNER.CHIPS.HRA', icon: 'fas fa-building' },
    { name: 'MEDICARE_SUPPLEMENT_INSURANCE.BANNER.CHIPS.SELF_FUNDED', icon: 'fas fa-heart' },
    { name: 'MEDICARE_SUPPLEMENT_INSURANCE.BANNER.CHIPS.QSEHRA', icon: 'fas fa-notes-medical' },
    { name: 'MEDICARE_SUPPLEMENT_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    'GENDER',
    'TOBACCO',
    'PLAN_TYPE',
    'CARRIER',
    'PRICING_METHOD',
    'LOCATION',
    'ENROLLMENT_TIMING',
    'HEALTH_HISTORY',
    'PART_B_DATE',
    'HOUSEHOLD_DISCOUNT',
    'HIGH_DEDUCTIBLE'
  ];

 


  discountKeys = [
    'OPEN_ENROLLMENT',
    'PLAN_GN',
    'HIGH_DEDUCTIBLE',
    'HOUSEHOLD',
    'TOBACCO',
    'COMMUNITY_RATED',
    'COMPARE_CARRIERS',
    'ENROLL_AT_65',
    'ANNUAL_REVIEW',
    'PART_D'
  ];




  notCoveredKeys = [
    'PRESCRIPTION_DRUG',
    'DENTAL',
    'VISION',
    'HEARING',
    'LONG_TERM_CARE',
    'PRIVATE_NURSING',
    'COSMETIC',
    'MEDICARE_ADVANTAGE',
    'NON_MEDICARE_CARE',
    'PART_D_PREMIUMS'
  ];

  
  agentComparisonData = [
      'CARRIER_ACCESS',
      'QUOTE_COMPARISON',
      'UNBIASED_ADVICE',
      'PLAN_OPTIONS',
      'PRICING_METHOD',
      'HOUSEHOLD_DISCOUNT',
      'ENROLLMENT_GUIDANCE',
      'SWITCHING_SUPPORT',
      'ONGOING_REVIEW',
      'PRICE',
      'BEST_FOR'
  ];

 

  factorComparisonKeys = [
    'HOW_IT_WORKS',
    'NETWORK_FLEXIBILITY',
    'MONTHLY_PREMIUM',
    'OUT_OF_POCKET',
    'PRESCRIPTION_DRUG',
    'DENTAL_VISION',
    'REFERRALS',
    'COVERAGE_AREA',
    'PRE_AUTHORIZATION',
    'STANDARDIZATION',
    'BEST_FOR'
  ];




  industryCoverageKeys = [
    'CONSTRUCTION_TRADES',
    'TRANSPORTATION_LOGISTICS',
    'FOOD_HOSPITALITY',
    'HEALTHCARE_MEDICAL',
    'PROFESSIONAL_SERVICES',
    'RETAIL_ECOMMERCE',
    'AUTOMOTIVE_VEHICLE',
    'REAL_ESTATE_PROPERTY',
    'PERSONAL_CARE_BEAUTY',
    'EDUCATION_CHILDCARE',
    'ENTERTAINMENT_EVENTS',
    'FITNESS_WELLNESS',
    'LANDSCAPING_AGRICULTURE',
    'CLEANING_MAINTENANCE',
    'TECHNOLOGY_MEDIA',
    'NONPROFIT_SOCIAL'
  ];


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
