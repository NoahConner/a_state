import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-short-term-health-insurance',
  standalone: false,
  templateUrl: './short-term-health-insurance.html',
  styleUrl: './short-term-health-insurance.scss',
})
export class ShortTermHealthInsurance {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'SHORT_TERM_HEALTH_INSURANCE.BANNER.CHIPS.FIXED_INDEMNITY', icon: 'fas fa-car' },
    { name: 'SHORT_TERM_HEALTH_INSURANCE.BANNER.CHIPS.DEDUCTIBLE_BASED', icon: 'fas fa-house' },
    { name: 'SHORT_TERM_HEALTH_INSURANCE.BANNER.CHIPS.RENEWABLE', icon: 'fas fa-building' },
    { name: 'SHORT_TERM_HEALTH_INSURANCE.BANNER.CHIPS.MULTI_MONTH', icon: 'fas fa-heart' },
    { name: 'SHORT_TERM_HEALTH_INSURANCE.BANNER.CHIPS.CATASTROPHIC', icon: 'fas fa-notes-medical' },
    { name: 'SHORT_TERM_HEALTH_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    'HEALTH_HISTORY',
    'COVERAGE_AMOUNT',
    'DEDUCTIBLE',
    'PLAN_TYPE',
    'COVERAGE_DURATION',
    'NUMBER_OF_PEOPLE',
    'LOCATION',
    'COINSURANCE',
    'RIDERS'
  ];


  discountKeys = [
 'COVERAGE_DURATION',
  'HIGHER_DEDUCTIBLE',
  'QUIT_TOBACCO',
  'CATASTROPHIC',
  'REMOVE_RIDERS',
  'COMPARE_CARRIERS',
  'HIGHER_COINSURANCE',
  'CHECK_ACA_SUBSIDY',
  'BUNDLE',
  'RENEW_EARLY'
  ];



  notCoveredKeys = [
    'PRE_EXISTING',
    'MATERNITY',
    'MENTAL_HEALTH',
    'PREVENTIVE',
    'PRESCRIPTION',
    'PEDIATRIC',
    'ACA_BENEFITS',
    'COSMETIC',
    'EXPERIMENTAL',
    'EXPIRATION'
  ];



  agentComparisonData = [
    'CARRIER_ACCESS',
    'QUOTE_COMPARISON',
    'UNBIASED_ADVICE',
    'PLAN_OPTIONS',
    'COVERAGE_DURATION',
    'PREE_EXISTING_GUIDANCE',
    'ACA_COMPARISON',
    'RENEWAL_SUPPORT',
    'ONGOING_SUPPORT',
    'PRICE',
    'BEST_FOR'
  ];

   
  factorComparisonKeys = [
      'COVERAGE_DURATION',
      'PRE_EXISTING',
      'PREMIUM_COST',
      'ACA_SUBSIDY',
      'ESSENTIAL_BENEFITS',
      'MATERNITY',
      'MENTAL_HEALTH',
      'PRESCRIPTION_DRUG',
      'ENROLLMENT_PERIOD',
      'UNDERWRITING',
      'NETWORK_FLEXIBILITY',
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
