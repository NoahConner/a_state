import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-universal-life-insurance',
  standalone: false,
  templateUrl: './universal-life-insurance.html',
  styleUrl: './universal-life-insurance.scss',
})
export class UniversalLifeInsurance {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'UNIVERSAL_LIFE_INSURANCE.BANNER.CHIPS.GUARANTEED', icon: 'fas fa-car' },
    { name: 'UNIVERSAL_LIFE_INSURANCE.BANNER.CHIPS.INDEXED', icon: 'fas fa-house' },
    { name: 'UNIVERSAL_LIFE_INSURANCE.BANNER.CHIPS.VARIABLE', icon: 'fas fa-building' },
    { name: 'UNIVERSAL_LIFE_INSURANCE.BANNER.CHIPS.FIXED', icon: 'fas fa-heart' },
    { name: 'UNIVERSAL_LIFE_INSURANCE.BANNER.CHIPS.SURVIVORSHIP', icon: 'fas fa-notes-medical' },
    { name: 'UNIVERSAL_LIFE_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];




  ageRates = [
    { age: 30, men: "$489.60", women: "$589.21" },
    { age: 40, men: "$695.60", women: "$820.63" },
    { age: 50, men: "$1,036.40", women: "$1,228.79" },
    { age: 60, men: "$1,606.71", women: "$1,969.73" },
    { age: 70, men: "$2,804.58", women: "$3,371.75" }
  ];



  impactFactorsKeys = [
    "AGE",
    "GENDER",
    "HEALTH_HISTORY",
    "TOBACCO_USE",
    "BMI",
    "FAMILY_HISTORY",
    "COVERAGE_AMOUNT",
    "POLICY_TYPE",
    "PREMIUM_FLEXIBILITY",
    "OCCUPATION",
    "HOBBIES",
    "CASH_VALUE_STRATEGY"
  ];


  discountKeys = [
    'EARLY_PURCHASE',
    'NON_SMOKER',
    'RIGHT_COVERAGE',
    'PREMIUM_FLEXIBILITY',
    'HEALTH_IMPROVEMENT',
    'MEDICAL_EXAM',
    'CASH_VALUE_STRATEGY',
    'COMPARE_CARRIERS',
    'DRIVING_RECORD',
    'REMOVE_RIDERS'
  ];




  notCoveredKeys = [
    'SUICIDE',
    'FRAUD',
    'ILLEGAL_ACTIVITIES',
    'HIGH_RISK',
    'AVIATION',
    'SUBSTANCE_ABUSE',
    'WAR',
    'PRE_EXISTING',
    'POLICY_LAPSE',
    'MARKET_LOSSES'
  ];


  agentComparisonData = [
    'CARRIER_ACCESS',
    'QUOTE_COMPARISON',
    'UNBIASED_ADVICE',
    'POLICY_OPTIONS',
    'CASH_VALUE_STRATEGY',
    'INDEX_INVESTMENT_OPTIONS',
    'HARD_TO_INSURE',
    'PREMIUM_FLEXIBILITY',
    'ONGOING_SUPPORT',
    'PRICE',
    'BEST_FOR'
  ];

  factorComparisonKeys = [
    'COVERAGE_DURATION',
    'PREMIUM_FLEXIBILITY',
    'DEATH_BENEFIT_FLEXIBILITY',
    'CASH_VALUE_ACCUMULATION',
    'CASH_VALUE_GROWTH_RATE',
    'DIVIDEND_ELIGIBILITY',
    'POLICY_LOANS',
    'RISK_LEVEL',
    'POLICY_COMPLEXITY',
    'RISK_OF_LAPSE',
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
