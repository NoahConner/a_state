import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-term-life-insurance',
  standalone: false,
  templateUrl: './term-life-insurance.html',
  styleUrl: './term-life-insurance.scss',
})
export class TermLifeInsurance {
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
    { name: 'TERM_LIFE_INSURANCE.BANNER.CHIPS.LEVEL', icon: 'fas fa-car' },
    { name: 'TERM_LIFE_INSURANCE.BANNER.CHIPS.RETURN_OF_PREMIUM', icon: 'fas fa-house' },
    { name: 'TERM_LIFE_INSURANCE.BANNER.CHIPS.CONVERTIBLE', icon: 'fas fa-building' },
    { name: 'TERM_LIFE_INSURANCE.BANNER.CHIPS.DECREASING', icon: 'fas fa-heart' },
    { name: 'TERM_LIFE_INSURANCE.BANNER.CHIPS.RENEWABLE', icon: 'fas fa-notes-medical' },
    { name: 'TERM_LIFE_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  nonSmokerRates = [
    { age: 20, men: "$212", women: "$176" },
    { age: 30, men: "$215", women: "$184" },
    { age: 40, men: "$330", women: "$280" },
    { age: 50, men: "$815", women: "$640" },
    { age: 60, men: "$2,342", women: "$1,650" },
    { age: 70, men: "$9,702", women: "$7,785" }
  ]


  smokerRates = [
    { age: 20, men: "$749", women: "$554" },
    { age: 30, men: "$795", women: "$645" },
    { age: 40, men: "$1,482", women: "$1,175" },
    { age: 50, men: "$3,495", women: "$2,560" },
    { age: 60, men: "$8,435", women: "$6,002" },
    { age: 65, men: "$13,160", women: "$9,809" }
  ]

  nonSmokerRiskRates = [
    { ageGender: "Woman, 20", preferredPlus: "$176", preferred: "$211", standard: "$318" },
    { ageGender: "Woman, 30", preferredPlus: "$185", preferred: "$215", standard: "$329" },
    { ageGender: "Woman, 40", preferredPlus: "$280", preferred: "$341", standard: "$495" },
    { ageGender: "Woman, 50", preferredPlus: "$640", preferred: "$756", standard: "$1,135" },
    { ageGender: "Woman, 60", preferredPlus: "$1,649", preferred: "$1,885", standard: "$2,975" },
    { ageGender: "Woman, 70", preferredPlus: "$8,008", preferred: "$8,940", standard: "$11,084" },
    { ageGender: "Man, 20", preferredPlus: "$213", preferred: "$244", standard: "$375" },
    { ageGender: "Man, 30", preferredPlus: "$215", preferred: "$275", standard: "$400" },
    { ageGender: "Man, 40", preferredPlus: "$331", preferred: "$411", standard: "$641" },
    { ageGender: "Man, 50", preferredPlus: "$816", preferred: "$975", standard: "$1,501" },
    { ageGender: "Man, 60", preferredPlus: "$2,347", preferred: "$2,647", standard: "$4,196" },
    { ageGender: "Man, 70", preferredPlus: "$9,703", preferred: "$11,015", standard: "$14,885" }
  ]

  smokerRiskRates = [
    { ageGender: "Woman, 20", preferred: "$554", standard: "$661" },
    { ageGender: "Woman, 30", preferred: "$645", standard: "$808" },
    { ageGender: "Woman, 40", preferred: "$1,176", standard: "$1,420" },
    { ageGender: "Woman, 50", preferred: "$2,561", standard: "$3,390" },
    { ageGender: "Woman, 60", preferred: "$9,942", standard: "$7,427" },
    { ageGender: "Woman, 65+", preferred: "$9,655", standard: "$12,555" },
    { ageGender: "Man, 20", preferred: "$751", standard: "$791" },
    { ageGender: "Man, 30", preferred: "$796", standard: "$976" },
    { ageGender: "Man, 40", preferred: "$1,482", standard: "$2,061" },
    { ageGender: "Man, 50", preferred: "$3,495", standard: "$4,366" },
    { ageGender: "Man, 60", preferred: "$8,454", standard: "$10,946" },
    { ageGender: "Man, 65+", preferred: "$13,136", standard: "$15,000" }
  ]

  termLengthRates = [
    { termLength: "Non-Smoker, 10 years", men: "$201", women: "$175" },
    { termLength: "Non-Smoker, 20 years", men: "$331", women: "$281" },
    { termLength: "Non-Smoker, 30 years", men: "$580", women: "$256" },
    { termLength: "Smoker, 10 years", men: "$894", women: "$720" },
    { termLength: "Smoker, 20 years", men: "$1,481", women: "$1,175" },
    { termLength: "Smoker, 30 years", men: "$2,475", women: "$1,751" }
  ]



  impactFactorsKeys = [
    "AGE",
    "GENDER",
    "HEALTH_HISTORY",
    "TOBACCO_USE",
    "BMI",
    "FAMILY_HISTORY",
    "OCCUPATION",
    "HOBBIES",
    "COVERAGE_AMOUNT",
    "TERM_LENGTH",
    "POLICY_TYPE",
    "DRIVING_RECORD"
  ];


  discountKeys = [
    'EARLY_PURCHASE',
    'NON_SMOKER',
    'RIGHT_COVERAGE',
    'TERM_LENGTH',
    'PAYMENT_MODE',
    'HEALTH_IMPROVEMENT',
    'MEDICAL_EXAM',
    'COMPARE_CARRIERS',
    'DRIVING_RECORD',
    'NO_EXTRA_RIDERS'
  ];


  notCoveredKeys = [
    'SUICIDE',
    'FRAUD',
    'ILLEGAL_ACTIVITIES',
    'HIGH_RISK_HOBBIES',
    'AVIATION',
    'POLICY_EXPIRATION',
    'POLICY_LAPSE',
    'SUBSTANCE_ABUSE',
    'WAR',
    'PRE_EXISTING',
  ]



  agentComparisonData = [
    'CARRIER_ACCESS',
    'QUOTE_COMPARISON',
    'UNBIASED_ADVICE',
    'TERM_LENGTH_OPTIONS',
    'NO_EXAM_OPTIONS',
    'HIGH_RISK_HELP',
    'CONVERTIBILITY',
    'ONGOING_SUPPORT',
    'PRICE',
    'BEST_FOR'
  ];

  factorComparisonKeys = [
    'COVERAGE_DURATION',
    'PREMIUM_COST',
    'CASH_VALUE',
    'DEATH_BENEFIT',
    'PREMIUM_FLEXIBILITY',
    'POLICY_COMPLEXITY',
    'CONVERTIBILITY',
    'BEST_FOR',
    'AVAILABILITY_IN_TEXAS',
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


  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
