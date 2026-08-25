import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-final-expense-insurance',
  standalone: false,
  templateUrl: './final-expense-insurance.html',
  styleUrl: './final-expense-insurance.scss',
})
export class FinalExpenseInsurance {
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
    { name: 'FINAL_EXPENSES_INSURANCE.BANNER.CHIPS.SIMPLIFIED_ISSUE', icon: 'fas fa-car' },
    { name: 'FINAL_EXPENSES_INSURANCE.BANNER.CHIPS.GUARANTEED_ISSUE', icon: 'fas fa-house' },
    { name: 'FINAL_EXPENSES_INSURANCE.BANNER.CHIPS.PRE_NEED', icon: 'fas fa-building' },
    { name: 'FINAL_EXPENSES_INSURANCE.BANNER.CHIPS.MODIFIED_BENEFIT', icon: 'fas fa-heart' },
    { name: 'FINAL_EXPENSES_INSURANCE.BANNER.CHIPS.LEVEL_BENEFIT', icon: 'fas fa-notes-medical' },
    { name: 'FINAL_EXPENSES_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  serviceRates = [
    {
      serviceType: "Burial Service",
      cost: "$7,912"
    },
    {
      serviceType: "Direct Burial (No Service)",
      cost: "$5,204"
    },
    {
      serviceType: "Cremation Service",
      cost: "$5,890"
    },
    {
      serviceType: "Direct Cremation (No Service)",
      cost: "$2,117"
    }
  ];



  ageRates = [
    { age: 40, fiveThousand: "$12", tenThousand: "$21", twentyFiveThousand: "$47" },
    { age: 45, fiveThousand: "$13", tenThousand: "$23", twentyFiveThousand: "$52" },
    { age: 50, fiveThousand: "$14", tenThousand: "$24", twentyFiveThousand: "$55" },
    { age: 55, fiveThousand: "$15", tenThousand: "$28", twentyFiveThousand: "$64" },
    { age: 60, fiveThousand: "$18", tenThousand: "$33", twentyFiveThousand: "$76" },
    { age: 65, fiveThousand: "$22", tenThousand: "$41", twentyFiveThousand: "$97" },
    { age: 70, fiveThousand: "$28", tenThousand: "$53", twentyFiveThousand: "$127" },
    { age: 75, fiveThousand: "$37", tenThousand: "$71", twentyFiveThousand: "$172" },
    { age: 80, fiveThousand: "$50", tenThousand: "$98", twentyFiveThousand: "$241" },
    { age: 85, fiveThousand: "$68", tenThousand: "$136", twentyFiveThousand: "$335" },
    { age: 86, fiveThousand: "$87", tenThousand: "$171", twentyFiveThousand: "$423" },
    { age: 87, fiveThousand: "$105", tenThousand: "$206", twentyFiveThousand: "$510" },
    { age: 88, fiveThousand: "$121", tenThousand: "$241", twentyFiveThousand: "$596" },
    { age: 89, fiveThousand: "$131", tenThousand: "$260", twentyFiveThousand: "$651" },
    { age: 90, fiveThousand: "$150", tenThousand: "$300", twentyFiveThousand: "N/A" }
  ]
  ageMaleRates = [
    { age: 40, fiveThousand: "$14", tenThousand: "$25", twentyFiveThousand: "$57" },
    { age: 45, fiveThousand: "$15", tenThousand: "$27", twentyFiveThousand: "$63" },
    { age: 50, fiveThousand: "$17", tenThousand: "$31", twentyFiveThousand: "$71" },
    { age: 55, fiveThousand: "$20", tenThousand: "$36", twentyFiveThousand: "$84" },
    { age: 60, fiveThousand: "$23", tenThousand: "$43", twentyFiveThousand: "$103" },
    { age: 65, fiveThousand: "$29", tenThousand: "$54", twentyFiveThousand: "$130" },
    { age: 70, fiveThousand: "$37", tenThousand: "$70", twentyFiveThousand: "$169" },
    { age: 75, fiveThousand: "$50", tenThousand: "$97", twentyFiveThousand: "$238" },
    { age: 80, fiveThousand: "$69", tenThousand: "$135", twentyFiveThousand: "$332" },
    { age: 85, fiveThousand: "$95", tenThousand: "$178", twentyFiveThousand: "$440" },
    { age: 86, fiveThousand: "$120", tenThousand: "$236", twentyFiveThousand: "$585" },
    { age: 87, fiveThousand: "$140", tenThousand: "$277", twentyFiveThousand: "$686" },
    { age: 88, fiveThousand: "$160", tenThousand: "$317", twentyFiveThousand: "$788" },
    { age: 89, fiveThousand: "$181", tenThousand: "$357", twentyFiveThousand: "$888" },
    { age: 90, fiveThousand: "$177", tenThousand: "$354", twentyFiveThousand: "N/A" }

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
    "COVERAGE_AMOUNT",
    "POLICY_TYPE",
    "MEDICAL_EXAM",
    "WAITING_PERIOD",
    "PRESCRIPTIONS",
    "HOSPITALIZATION",
    "LOCATION"
  ];


  discountKeys = [
    "EARLY_PURCHASE",
    "NON_SMOKER",
    "RIGHT_COVERAGE",
    "POLICY_TYPE",
    "HEALTH_IMPROVEMENT",
    "PAYMENT_MODE",
    "COMPARE_CARRIERS",
    "NO_EXTRA_RIDERS",
    "LOCK_RATE"
  ];



  notCoveredKeys = [
    "SUICIDE",
    "FRAUD",
    "ILLEGAL_ACTIVITIES",
    "SUBSTANCE_ABUSE",
    "WAR",
    "GRADED_BENEFIT",
    "PRE_EXISTING",
    "HIGH_RISK",
    "LONG_TERM_CARE",
    "INCOME_REPLACEMENT"
  ]



  agentComparisonData = [
    'CARRIER_ACCESS',
    'QUOTE_COMPARISON',
    'UNBIASED_ADVICE',
    'POLICY_OPTIONS',
    'PRE_EXISTING',
    'GUARANTEED',
    'WAITING_PERIOD',
    'COVERAGE_FLEX',
    'ONGOING_SUPPORT',
    'PRICE',
    'BEST_FOR'
  ];


  factorComparisonKeys = [
    "COVERAGE_DURATION",
    "PRIMARY_PURPOSE",
    "COVERAGE_AMOUNT",
    "PREMIUM_COST",
    "MEDICAL_EXAM_REQUIRED",
    "APPROVAL_DIFFICULTY",
    "CASH_VALUE",
    "DEATH_BENEFIT",
    "IDEAL_AGE_RANGE",
    "PRE_EXISTING_CONDITIONS",
    "BEST_FOR",
    "IDEAL_BUYER_PROFILE"
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
