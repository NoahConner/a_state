import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-travel-health-insurance',
  standalone: false,
  templateUrl: './travel-health-insurance.html',
  styleUrl: './travel-health-insurance.scss',
})
export class TravelHealthInsurance {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'TRAVEL_HEALTH_INSURANCE.BANNER.CHIPS.SINGLE_TRIP', icon: 'fas fa-car' },
    { name: 'TRAVEL_HEALTH_INSURANCE.BANNER.CHIPS.MULTI_TRIP', icon: 'fas fa-house' },
    { name: 'TRAVEL_HEALTH_INSURANCE.BANNER.CHIPS.LONG_STAY', icon: 'fas fa-building' },
    { name: 'TRAVEL_HEALTH_INSURANCE.BANNER.CHIPS.GROUP', icon: 'fas fa-heart' },
    { name: 'TRAVEL_HEALTH_INSURANCE.BANNER.CHIPS.MEDICAL_EVACUATION', icon: 'fas fa-notes-medical' },
    { name: 'TRAVEL_HEALTH_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    'DESTINATION',
    'TRIP_DURATION',
    'COVERAGE_AMOUNT',
    'PRE_EXISTING',
    'PLAN_TYPE',
    'NUMBER_OF_TRAVELERS',
    'ADVENTURE',
    'EVACUATION_LIMIT',
    'FREQUENCY',
    'HOME_COVERAGE_GAPS',
    'DEDUCTIBLE'
  ];


  discountKeys = [
    'BUY_EARLY',
    'ANNUAL_MULTI_TRIP',
    'RIGHT_COVERAGE',
    'HIGHER_DEDUCTIBLE',
    'MEDICAL_ONLY',
    'COMPARE_CARRIERS',
    'LOWER_RISK',
    'REMOVE_ADVENTURE',
    'GROUP_PLAN',
    'CHECK_EXISTING'
  ];




  notCoveredKeys = [
    'NON_EMERGENCY',
    'PRE_EXISTING',
    'HIGH_RISK',
    'DRUG_ALCOHOL',
    'MENTAL_HEALTH',
    'COSMETIC',
    'MATERNITY',
    'SANCTIONED_COUNTRIES',
    'EXPIRED_POLICY',
    'MEDICAL_TOURISM'
  ];

 
  agentComparisonData = [
      'CARRIER_ACCESS',
      'QUOTE_COMPARISON',
      'UNBIASED_ADVICE',
      'PLAN_OPTIONS',
      'DESTINATION_COMPARISON',
      'PRE_EXISTING',
      'EVACUATION',
      'GROUP_OPTIONS',
      'ONGOING_SUPPORT',
      'PRICE',
      'BEST_FOR'
  ];
 

  factorComparisonKeys = [
   'PRIMARY_PURPOSE',
    'MEDICAL_COVERAGE',
    'TRIP_CANCELLATION',
    'TRIP_INTERRUPTION',
    'BAGGAGE_LOSS',
    'MEDICAL_EVACUATION',
    'PRE_EXISTING',
    'COVERAGE_DURATION',
    'COST',
    'BEST_FOR',
    'IDEAL_BUYER',
    'TEXAS_RELEVANCE'
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
