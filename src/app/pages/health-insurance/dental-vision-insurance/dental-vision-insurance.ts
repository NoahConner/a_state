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
    { name: 'DENTAL_VISION_INSURANCE.BANNER.CHIPS.DHMO', icon: 'fas fa-car' },
    { name: 'DENTAL_VISION_INSURANCE.BANNER.CHIPS.DPPO', icon: 'fas fa-house' },
    { name: 'DENTAL_VISION_INSURANCE.BANNER.CHIPS.DENTAL_INDEMNITY', icon: 'fas fa-building' },
    { name: 'DENTAL_VISION_INSURANCE.BANNER.CHIPS.VHMO', icon: 'fas fa-heart' },
    { name: 'DENTAL_VISION_INSURANCE.BANNER.CHIPS.VPPO', icon: 'fas fa-notes-medical' },
    { name: 'DENTAL_VISION_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    'FAMILY_MEMBERS',
    'PLAN_TYPE',
    'ANNUAL_MAX',
    'DEDUCTIBLE',
    'WAITING_PERIOD',
    'ORTHODONTIC',
    'LOCATION',
    'STANDALONE',
    'VISION_FREQUENCY',
    'NETWORK_SIZE',
    'EMPLOYER_VS_INDIVIDUAL'
  ];

 


  discountKeys = [
   'BUNDLE',
    'DHMO',
    'DEDUCTIBLE',
    'RIDERS',
    'OPEN_ENROLLMENT',
    'DISCOUNT_PLAN',
    'ANNUAL_MAX',
    'COMPARE',
    'FAMILY',
    'REVIEW'
  ];


  notCoveredKeys = [
    'COSMETIC_DENTAL',
    'DENTAL_IMPLANTS',
    'PRE_EXISTING_DENTAL',
    'EXPERIMENTAL_DENTAL',
    'NEGLECT_INJURIES',
    'LASIK',
    'NON_PRESCRIPTION_SUNGLASSES',
    'COSMETIC_CONTACTS',
    'VISION_THERAPY',
    'TWO_PAIRS_GLASSES'
  ];


  agentComparisonData = [
    'CARRIER_ACCESS',
    'QUOTE_COMPARISON',
    'UNBIASED_ADVICE',
    'PLAN_OPTIONS',
    'BUNDLING',
    'ORTHODONTIC',
    'NETWORK',
    'WAITING_PERIOD',
    'ONGOING_REVIEW',
    'PRICE',
    'BEST_FOR'
  ];

 
  factorComparisonKeys = [
    'HOW_IT_WORKS',
    'FLEXIBILITY',
    'COVERAGE_DEPTH',
    'ANNUAL_MAX',
    'NETWORK',
    'ORTHODONTIC',
    'PREMIUM',
    'PORTABILITY',
    'CARRIER_CHOICE',
    'WAITING_PERIODS',
    'BEST_FOR',
    'IDEAL_BUYER'
  ];

  dentalPlanRates = [
    'INDIVIDUAL',
    'FAMILY',
    'DHMO',
    'PPO'
  ]

 

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
