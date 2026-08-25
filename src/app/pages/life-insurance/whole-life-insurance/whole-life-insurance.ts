import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-whole-life-insurance',
  standalone: false,
  templateUrl: './whole-life-insurance.html',
  styleUrl: './whole-life-insurance.scss',
})
export class WholeLifeInsurance {
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
    { name: 'WHOLE_LIFE_INSURANCE.BANNER.CHIPS.TRADITIONAL', icon: 'fas fa-car' },
    { name: 'WHOLE_LIFE_INSURANCE.BANNER.CHIPS.GUARANTEED_ISSUE', icon: 'fas fa-house' },
    { name: 'WHOLE_LIFE_INSURANCE.BANNER.CHIPS.PARTICIPATING', icon: 'fas fa-building' },
    { name: 'WHOLE_LIFE_INSURANCE.BANNER.CHIPS.SINGLE_PREMIUM', icon: 'fas fa-heart' },
    { name: 'WHOLE_LIFE_INSURANCE.BANNER.CHIPS.LIMITED_PAY', icon: 'fas fa-notes-medical' },
    { name: 'WHOLE_LIFE_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  ageRates = [
    { age: 20, men: "$2,548", women: "$2,260" },
    { age: 30, men: "$3,662", women: "$3,292" },
    { age: 40, men: "$5,524", women: "$4,967" },
    { age: 50, men: "$8,749", women: "$7,782" },
    { age: 60, men: "$14,517", women: "$12,670" },
    { age: 70, men: "$24,797", women: "$21,766" }
  ]

  ageSmokerRates = [
    { age: 20, men: "$3,325", women: "$2,973" },
    { age: 30, men: "$4,923", women: "$4,492" },
    { age: 40, men: "$7,533", women: "$6,915" },
    { age: 50, men: "$12,371", women: "$11,068" },
    { age: 60, men: "$21,107", women: "$18,427" },
    { age: 70, men: "$34,922", women: "$31,798" }
  ]


  industryRates = [
    { industry: "Accountants", monthly: "$21", annual: "$247" },
    { industry: "Ad Agency", monthly: "$16", annual: "$193" },
    { industry: "Auto Repair", monthly: "$153", annual: "$1,830" },
    { industry: "Automotive", monthly: "$119", annual: "$1,422" },
    { industry: "Bakery", monthly: "$54", annual: "$646" },
    { industry: "Barber", monthly: "$14", annual: "$168" },
    { industry: "Beauty Salon", monthly: "$15", annual: "$176" },
    { industry: "Bounce House", monthly: "$40", annual: "$483" },
    { industry: "Candle", monthly: "$41", annual: "$487" },
    { industry: "Cannabis", monthly: "$84", annual: "$1,013" },
    { industry: "Catering", monthly: "$74", annual: "$891" },
    { industry: "Cleaning", monthly: "$49", annual: "$591" },
    { industry: "Coffee Shop", monthly: "$47", annual: "$566" },
    { industry: "Computer Programming", monthly: "$28", annual: "$342" },
    { industry: "Computer Repair", monthly: "$24", annual: "$291" },
    { industry: "Construction", monthly: "$181", annual: "$2,167" },
    { industry: "Consulting", monthly: "$31", annual: "$368" },
    { industry: "Contractor", monthly: "$167", annual: "$2,001" },
    { industry: "Courier", monthly: "$230", annual: "$2,755" },
    { industry: "DJ", monthly: "$14", annual: "$171" },
    { industry: "Daycare", monthly: "$13", annual: "$162" },
    { industry: "Dental", monthly: "$11", annual: "$134" },
    { industry: "Dog Grooming", monthly: "$65", annual: "$780" },
    { industry: "Drone", monthly: "$27", annual: "$324" },
    { industry: "Ecommerce", monthly: "$22", annual: "$262" },
    { industry: "Electrical", monthly: "$58", annual: "$701" },
    { industry: "Engineering", monthly: "$38", annual: "$459" },
    { industry: "Excavation", monthly: "$107", annual: "$1,283" },
    { industry: "Florist", monthly: "$62", annual: "$744" },
    { industry: "Food", monthly: "$43", annual: "$511" },
    { industry: "Food Truck", monthly: "$46", annual: "$552" },
    { industry: "Funeral Home", monthly: "$27", annual: "$325" },
    { industry: "Gardening", monthly: "$47", annual: "$566" },
    { industry: "HVAC", monthly: "$64", annual: "$762" },
    { industry: "Handyman", monthly: "$94", annual: "$1,126" },
    { industry: "Home-based", monthly: "$10", annual: "$121" },
    { industry: "Hospitality", monthly: "$70", annual: "$836" },
    { industry: "Janitorial", monthly: "$49", annual: "$589" },
    { industry: "Jewelry", monthly: "$30", annual: "$364" },
    { industry: "Junk Removal", monthly: "$141", annual: "$1,687" },
    { industry: "Lawn/Landscaping", monthly: "$38", annual: "$456" },
    { industry: "Lawyers", monthly: "$53", annual: "$636" },
    { industry: "Manufacturing", monthly: "$60", annual: "$715" },
    { industry: "Marine", monthly: "$152", annual: "$1,822" },
    { industry: "Massage", monthly: "$15", annual: "$176" },
    { industry: "Mortgage Broker", monthly: "$14", annual: "$167" },
    { industry: "Moving", monthly: "$262", annual: "$3,141" },
    { industry: "Nonprofit", monthly: "$32", annual: "$382" },
    { industry: "Painting", monthly: "$142", annual: "$1,698" },
    { industry: "Party Rental", monthly: "$37", annual: "$442" },
    { industry: "Personal Training", monthly: "$25", annual: "$302" },
    { industry: "Pest Control", monthly: "$71", annual: "$854" },
    { industry: "Pet", monthly: "$31", annual: "$373" },
    { industry: "Pharmacy", monthly: "$6", annual: "$77" },
    { industry: "Photography", monthly: "$17", annual: "$207" },
    { industry: "Physical Therapy", monthly: "$7", annual: "$84" },
    { industry: "Plumbing", monthly: "$65", annual: "$777" },
    { industry: "Pressure Washing", monthly: "$85", annual: "$1,024" },
    { industry: "Real Estate", monthly: "$30", annual: "$364" },
    { industry: "Restaurant", monthly: "$63", annual: "$758" },
    { industry: "Retail", monthly: "$35", annual: "$424" },
    { industry: "Roofing", monthly: "$851", annual: "$10,206" },
    { industry: "Security", monthly: "$52", annual: "$628" },
    { industry: "Snack Bars", monthly: "$44", annual: "$524" },
    { industry: "Software", monthly: "$27", annual: "$318" },
    { industry: "Spa/Wellness", monthly: "$18", annual: "$211" },
    { industry: "Speech Therapist", monthly: "$6", annual: "$73" },
    { industry: "Startup", monthly: "$13", annual: "$159" },
    { industry: "Tech/IT", monthly: "$28", annual: "$331" },
    { industry: "Transportation", monthly: "$231", annual: "$2,776" },
    { industry: "Travel", monthly: "$7", annual: "$85" },
    { industry: "Tree Service", monthly: "$222", annual: "$2,662" },
    { industry: "Trucking", monthly: "$271", annual: "$3,248" },
    { industry: "Tutoring", monthly: "$10", annual: "$120" },
    { industry: "Veterinary", monthly: "$20", annual: "$237" },
    { industry: "Wedding Planning", monthly: "$29", annual: "$342" },
    { industry: "Welding", monthly: "$118", annual: "$1,418" },
    { industry: "Wholesale", monthly: "$40", annual: "$485" },
    { industry: "Window Cleaning", monthly: "$211", annual: "$2,535" }
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
    "OCCUPATION",
    "HOBBIES",
    "PAYMENT_STRUCTURE",
    "DRIVING_RECORD"
  ];


  discountKeys = [
    "EARLY_PURCHASE",
    "NON_SMOKER",
    "RIGHT_COVERAGE",
    "PAYMENT_STRUCTURE",
    "HEALTH_IMPROVEMENT",
    "MEDICAL_EXAM",
    "PARTICIPATING_POLICY",
    "COMPARE_CARRIERS",
    "DRIVING_RECORD",
    "REMOVE_RIDERS"
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
    'INVESTMENT'
  ];


  agentComparisonData = [
    'CARRIER_ACCESS',
    'QUOTE_COMPARISON',
    'UNBIASED_ADVICE',
    'POLICY_OPTIONS',
    'DIVIDEND_OPTIONS',
    'GUARANTEED_ISSUE',
    'CASH_VALUE',
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
    'DIVIDEND_ELIGIBILITY',
    'POLICY_LOANS',
    'POLICY_COMPLEXITY',
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


  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
