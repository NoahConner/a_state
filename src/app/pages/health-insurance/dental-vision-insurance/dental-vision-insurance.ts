import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dental-vision-insurance',
  standalone: false,
  templateUrl: './dental-vision-insurance.html',
  styleUrl: './dental-vision-insurance.scss',
})
export class DentalVisionInsurance {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'FAMILY_HEALTH_INSURANCE.BANNER.CHIPS.HMO', icon: 'fas fa-car' },
    { name: 'FAMILY_HEALTH_INSURANCE.BANNER.CHIPS.PPO', icon: 'fas fa-house' },
    { name: 'FAMILY_HEALTH_INSURANCE.BANNER.CHIPS.EPO', icon: 'fas fa-building' },
    { name: 'FAMILY_HEALTH_INSURANCE.BANNER.CHIPS.HDHP_HSA', icon: 'fas fa-heart' },
    { name: 'FAMILY_HEALTH_INSURANCE.BANNER.CHIPS.MEDICAID_CHIP', icon: 'fas fa-notes-medical' },
    { name: 'FAMILY_HEALTH_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];




  ageRates = [
    { age: 30, men: "$489.60", women: "$589.21" },
    { age: 40, men: "$695.60", women: "$820.63" },
    { age: 50, men: "$1,036.40", women: "$1,228.79" },
    { age: 60, men: "$1,606.71", women: "$1,969.73" },
    { age: 70, men: "$2,804.58", women: "$3,371.75" }
  ];



  impactFactorsKeys = [
    'FAMILY_SIZE',
    'AGE',
    'LOCATION',
    'TOBACCO_USE',
    'PLAN_TYPE',
    'METAL_TIER',
    'DEDUCTIBLE',
    'NETWORK_SIZE',
    'HOUSEHOLD_INCOME',
    'EMPLOYER_COVERAGE',
    'ENROLLMENT_PERIOD',
    'PRE_EXISTING'
  ];


  discountKeys = [
    'ACA_SUBSIDY',
    'HIGHER_DEDUCTIBLE',
    'HMO_EPO',
    'HSA',
    'QUIT_TOBACCO',
    'OPEN_ENROLLMENT',
    'CHIP_MEDICAID',
    'SINGLE_PLAN',
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
    'ADULT_CHILDREN_OVER_26'
  ];

  agentComparisonData = [
      'CARRIER_ACCESS',
      'QUOTE_COMPARISON',
      'UNBIASED_ADVICE',
      'PLAN_OPTIONS',
      'ACA_SUBSIDY_GUIDANCE',
      'CHIP_MEDICAID_GUIDANCE',
      'NETWORK_COMPARISON',
      'PEDIATRIC_COVERAGE',
      'ONGOING_SUPPORT',
      'PRICE',
      'BEST_FOR'
  ];


  factorComparisonKeys = [
    'WHO_COVERED',
    'PREMIUM_COST',
    'COST_PER_MEMBER',
    'DEDUCTIBLE',
    'OUT_OF_POCKET_MAX',
    'ACA_SUBSIDY',
    'DEPENDENT_COVERAGE',
    'PLAN_CUSTOMIZATION',
    'PEDIATRIC_BENEFITS',
    'NETWORK_FLEXIBILITY',
    'BEST_FOR',
    'IDEAL_BUYER_PROFILE'
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
