import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employer-group-health-insurance',
  standalone: false,
  templateUrl: './employer-group-health-insurance.html',
  styleUrl: './employer-group-health-insurance.scss',
})
export class EmployerGroupHealthInsurance {
  termsAccepted = false;
  termsAccepted2 = false;

  constructor(public languageService: Language, private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'EMPLOYER_GROUP_HEALTH_INSURANCE.BANNER.CHIPS.GROUP_PPO', icon: 'fas fa-car' },
    { name: 'EMPLOYER_GROUP_HEALTH_INSURANCE.BANNER.CHIPS.GROUP_HMO', icon: 'fas fa-house' },
    { name: 'EMPLOYER_GROUP_HEALTH_INSURANCE.BANNER.CHIPS.SELF_FUNDED', icon: 'fas fa-building' },
    { name: 'EMPLOYER_GROUP_HEALTH_INSURANCE.BANNER.CHIPS.LEVEL_FUNDED', icon: 'fas fa-heart' },
    { name: 'EMPLOYER_GROUP_HEALTH_INSURANCE.BANNER.CHIPS.GROUP_HDHP_HSA', icon: 'fas fa-notes-medical' },
    { name: 'EMPLOYER_GROUP_HEALTH_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
  'PARTICIPATION_RATE',
  'WELLNESS',
  'HIGHER_DEDUCTIBLE',
  'SELF_LEVEL_FUNDED',
  'ICHRA',
  'QUIT_TOBACCO',
  'BUNDLE',
  'NEGOTIATE_RENEWAL',
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
    'ACA_COMPLIANCE',
    'SELF_FUNDED',
    'LEVEL_FUNDED',
    'COBRA_SUPPORT',
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


  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
