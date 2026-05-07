import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-small-business-health-insurance',
  standalone: false,
  templateUrl: './small-business-health-insurance.html',
  styleUrl: './small-business-health-insurance.scss',
})
export class SmallBusinessHealthInsurance {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'SMALL_BUSINESS_HEALTH_INSURANCE.BANNER.CHIPS.GROUP_HMO', icon: 'fas fa-car' },
    { name: 'SMALL_BUSINESS_HEALTH_INSURANCE.BANNER.CHIPS.GROUP_PPO', icon: 'fas fa-house' },
    { name: 'SMALL_BUSINESS_HEALTH_INSURANCE.BANNER.CHIPS.HRA', icon: 'fas fa-building' },
    { name: 'SMALL_BUSINESS_HEALTH_INSURANCE.BANNER.CHIPS.SELF_FUNDED', icon: 'fas fa-heart' },
    { name: 'SMALL_BUSINESS_HEALTH_INSURANCE.BANNER.CHIPS.QSEHRA', icon: 'fas fa-notes-medical' },
    { name: 'SMALL_BUSINESS_HEALTH_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

 


  ageRates = [
    { age: 30, men: "$489.60", women: "$589.21" },
    { age: 40, men: "$695.60", women: "$820.63" },
    { age: 50, men: "$1,036.40", women: "$1,228.79" },
    { age: 60, men: "$1,606.71", women: "$1,969.73" },
    { age: 70, men: "$2,804.58", women: "$3,371.75" }
  ];



  impactFactorsKeys = [
    'EMPLOYEE_COUNT',
    'AGE',
    'GENDER',
    'INDUSTRY',
    'PLAN_TYPE',
    'METAL_TIER',
    'DEDUCTIBLE',
    'TOBACCO_USE',
    'LOCATION',
    'DEPENDENT_COVERAGE',
    'PARTICIPATION_RATE',
    'CLAIMS_HISTORY'
  ];


  discountKeys = [
    'TAX_CREDIT',
    'PARTICIPATION_RATE',
    'HIGHER_DEDUCTIBLE',
    'HRA_QSEHRA',
    'WELLNESS',
    'QUIT_TOBACCO',
    'BUNDLE',
    'LEVEL_FUNDED',
    'COMPARE_CARRIERS',
    'ANNUAL_REVIEW'
  ];

 




  notCoveredKeys = [
    'COSMETIC',
    'EXPERIMENTAL',
    'LONG_TERM_CARE',
    'ADULT_DENTAL_VISION',
    'HEARING_AIDS',
    'OUT_OF_NETWORK',
    'PRE_START_DATE',
    'WEIGHT_LOSS',
    'ALTERNATIVE_MEDICINE',
    'NON_EMPLOYEES'
  ];

  agentComparisonData = [
      'CARRIER_ACCESS',
      'QUOTE_COMPARISON',
      'UNBIASED_ADVICE',
      'PLAN_OPTIONS',
      'TAX_CREDIT_GUIDANCE',
      'SHOP_ACCESS',
      'PARTICIPATION_SUPPORT',
      'LEVEL_FUNDED',
      'ONGOING_SUPPORT',
      'PRICE',
      'BEST_FOR'
  ];


  factorComparisonKeys = [
    'WHO_PURCHASES',
    'WHO_COVERED',
    'PREMIUM_COST',
    'UNDERWRITING',
    'ACA_SUBSIDY',
    'PLAN_SELECTION',
    'PORTABILITY',
    'MINIMUM_PARTICIPATION',
    'NETWORK_FLEXIBILITY',
    'DEPENDENT_COVERAGE',
    'TAX_ADVANTAGES',
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
