import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-professional-liability-insurance',
  standalone: false,
  templateUrl: './professional-liability-insurance.html',
  styleUrl: './professional-liability-insurance.scss',
})
export class ProfessionalLiabilityInsurance {
  termsAccepted = false;
  termsAccepted2 = false;


  constructor(public languageService: Language, private translate: TranslateService) { }


  chips = [
    { name: 'PROFESSIONAL_LIABILITY_INSURANCE.BANNER.CHIPS.TECHNOLOGY', icon: 'fas fa-car' },
    { name: 'PROFESSIONAL_LIABILITY_INSURANCE.BANNER.CHIPS.MEDICAL', icon: 'fas fa-house' },
    { name: 'PROFESSIONAL_LIABILITY_INSURANCE.BANNER.CHIPS.REAL_ESTATE', icon: 'fas fa-building' },
    { name: 'PROFESSIONAL_LIABILITY_INSURANCE.BANNER.CHIPS.LEGAL_MALPRACTICE', icon: 'fas fa-heart' },
    { name: 'PROFESSIONAL_LIABILITY_INSURANCE.BANNER.CHIPS.FINANCIAL_SERVICES', icon: 'fas fa-notes-medical' },
    { name: 'PROFESSIONAL_LIABILITY_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { industry: "Accountants", monthly: "$148", annual: "$1,774" },
    { industry: "Ad Agency", monthly: "$100", annual: "$1,194" },
    { industry: "Auto Repair", monthly: "$82", annual: "$988" },
    { industry: "Automotive", monthly: "$77", annual: "$924" },
    { industry: "Bakery", monthly: "$52", annual: "$623" },
    { industry: "Barber", monthly: "$43", annual: "$516" },
    { industry: "Beauty Salon", monthly: "$50", annual: "$597" },
    { industry: "Bounce House", monthly: "$58", annual: "$696" },
    { industry: "Candle", monthly: "$42", annual: "$501" },
    { industry: "Cannabis", monthly: "$125", annual: "$1,497" },
    { industry: "Catering", monthly: "$80", annual: "$955" },
    { industry: "Cleaning", monthly: "$55", annual: "$656" },
    { industry: "Coffee Shop", monthly: "$61", annual: "$733" },
    { industry: "Computer Programming", monthly: "$106", annual: "$1,272" },
    { industry: "Computer Repair", monthly: "$63", annual: "$758" },
    { industry: "Construction", monthly: "$77", annual: "$928" },
    { industry: "Consulting", monthly: "$107", annual: "$1,287" },
    { industry: "Contractor", monthly: "$63", annual: "$758" },
    { industry: "Courier", monthly: "$51", annual: "$610" },
    { industry: "DJ", monthly: "$46", annual: "$550" },
    { industry: "Daycare", monthly: "$110", annual: "$1,319" },
    { industry: "Dental", monthly: "$85", annual: "$1,022" },
    { industry: "Dog Grooming", monthly: "$56", annual: "$667" },
    { industry: "Drone", monthly: "$106", annual: "$1,268" },
    { industry: "Ecommerce", monthly: "$62", annual: "$749" },
    { industry: "Electrical", monthly: "$64", annual: "$766" },
    { industry: "Engineering", monthly: "$105", annual: "$1,256" },
    { industry: "Excavation", monthly: "$68", annual: "$822" },
    { industry: "Florist", monthly: "$38", annual: "$457" },
    { industry: "Food", monthly: "$110", annual: "$1,320" },
    { industry: "Food Truck", monthly: "$61", annual: "$727" },
    { industry: "Funeral Home", monthly: "$81", annual: "$976" },
    { industry: "Gardening", monthly: "$40", annual: "$485" },
    { industry: "HVAC", monthly: "$83", annual: "$991" },
    { industry: "Handyman", monthly: "$56", annual: "$674" },
    { industry: "Home-based business", monthly: "$39", annual: "$462" },
    { industry: "Hospitality", monthly: "$75", annual: "$905" },
    { industry: "Janitorial", monthly: "$51", annual: "$617" },
    { industry: "Jewelry", monthly: "$63", annual: "$751" },
    { industry: "Junk Removal", monthly: "$68", annual: "$810" },
    { industry: "Lawn/Landscaping", monthly: "$51", annual: "$617" },
    { industry: "Lawyers", monthly: "$146", annual: "$1,756" },
    { industry: "Manufacturing", monthly: "$60", annual: "$719" },
    { industry: "Marine", monthly: "$89", annual: "$1,070" },
    { industry: "Massage", monthly: "$107", annual: "$1,284" },
    { industry: "Mortgage Broker", monthly: "$167", annual: "$2,007" },
    { industry: "Moving", monthly: "$82", annual: "$979" },
    { industry: "Nonprofit", monthly: "$50", annual: "$597" },
    { industry: "Painting", monthly: "$64", annual: "$766" },
    { industry: "Party Rental", monthly: "$55", annual: "$663" },
    { industry: "Personal Training", monthly: "$70", annual: "$844" },
    { industry: "Pest Control", monthly: "$95", annual: "$1,138" },
    { industry: "Pet", monthly: "$45", annual: "$543" },
    { industry: "Pharmacy", monthly: "$57", annual: "$680" },
    { industry: "Photography", monthly: "$63", annual: "$761" },
    { industry: "Physical Therapy", monthly: "$96", annual: "$1,150" },
    { industry: "Plumbing", monthly: "$92", annual: "$1,100" },
    { industry: "Pressure Washing", monthly: "$57", annual: "$686" },
    { industry: "Real Estate", monthly: "$129", annual: "$1,546" },
    { industry: "Restaurant", monthly: "$81", annual: "$977" },
    { industry: "Retail", monthly: "$56", annual: "$675" },
    { industry: "Roofing", monthly: "$98", annual: "$1,180" },
    { industry: "Security", monthly: "$100", annual: "$1,201" },
    { industry: "Snack Bars", monthly: "$47", annual: "$566" },
    { industry: "Software", monthly: "$97", annual: "$1,159" },
    { industry: "Spa/Wellness", monthly: "$110", annual: "$1,325" },
    { industry: "Speech Therapist", monthly: "$100", annual: "$1,196" },
    { industry: "Startup", monthly: "$73", annual: "$873" },
    { industry: "Tech/IT", monthly: "$98", annual: "$1,173" },
    { industry: "Transportation", monthly: "$95", annual: "$1,144" },
    { industry: "Travel", monthly: "$97", annual: "$1,164" },
    { industry: "Tree Service", monthly: "$75", annual: "$906" },
    { industry: "Trucking", monthly: "$114", annual: "$1,364" },
    { industry: "Tutoring", monthly: "$60", annual: "$720" },
    { industry: "Veterinary", monthly: "$118", annual: "$1,410" },
    { industry: "Wedding Planning", monthly: "$77", annual: "$926" },
    { industry: "Welding", monthly: "$78", annual: "$931" },
    { industry: "Wholesale", monthly: "$61", annual: "$733" },
    { industry: "Window Cleaning", monthly: "$63", annual: "$751" }
  ];
  
 companyRates = [
  { 
    company: "<a href='https://www.nextinsurance.com/' rel='nofollow' target='_blank'>ERGO NEXT</a>", 
    rate: "$73" 
  },
  { 
    company: "<a href='https://www.thehartford.com/' rel='nofollow' target='_blank'>The Hartford</a>", 
    rate: "$72" 
  },
  { 
    company: "<a href='https://www.simplybusiness.com/business-insurance/' rel='nofollow' target='_blank'>Simply Business</a>", 
    rate: "$77" 
  },
  { 
    company: "<a href='https://www.coverdash.com/' rel='nofollow' target='_blank'>Coverdash</a>", 
    rate: "$78" 
  },
  { 
    company: "<a href='https://www.nationwide.com/' rel='nofollow' target='_blank'>Nationwide</a>", 
    rate: "$83" 
  },
  { 
    company: "<a href='https://www.biberk.com/' rel='nofollow' target='_blank'>biBERK</a>", 
    rate: "$80" 
  },
  { 
    company: "<a href='https://www.progressivecommercial.com/' rel='nofollow' target='_blank'>Progressive Commercial</a>", 
    rate: "$76" 
  },
  { 
    company: "<a href='https://www.hiscox.com/' rel='nofollow' target='_blank'>Hiscox</a>", 
    rate: "$78" 
  },
  { 
    company: "<a href='https://www.chubb.com/' rel='nofollow' target='_blank'>Chubb</a>", 
    rate: "$89" 
  },
  { 
    company: "<a href='https://www.thimble.com/' rel='nofollow' target='_blank'>Thimble</a>", 
    rate: "$76" 
  }
];




  impactFactorsKeys = [
    'INDUSTRY_TYPE',
    'BUSINESS_SIZE',
    'SUBCONTRACTORS',
    'EXPERIENCE',
    'CERTIFICATIONS',
    'LOCATION',
    'LOCATIONS_COUNT',
    'REVENUE',
    'SERVICES_TYPE',
    'SERVICE_COMPLEXITY',
    'CLIENT_TYPE',
    'CONTRACT_SIZE',
    'GOVERNMENT_CLIENTS',
    'CLAIMS_HISTORY',
    'CREDIT_SCORE',
    'COVERAGE_LIMIT',
    'DEDUCTIBLE',
    'POLICY_TYPE',
    'RETROACTIVE_DATE',
    'CONTRACTORS',
    'RISK_MANAGEMENT',
    'WRITTEN_CONTRACTS',
    'MULTIPLE_POLICIES',
    'EDUCATION',
    'INSURANCE_CARRIER'
  ];

  discountKeys = [
    'BUNDLING',
    'CLAIMS_FREE',
    'LOYALTY',
    'NEW_BUSINESS',
    'RISK_MANAGEMENT',
    'PROFESSIONAL_ASSOCIATION',
    'CERTIFICATIONS',
    'CONTINUING_EDUCATION',
    'WRITTEN_CONTRACTS',
    'CLIENT_SCREENING',
    'QUALITY_CONTROL',
    'HIGH_DEDUCTIBLE',
    'LOWER_LIMIT',
    'PAY_IN_FULL',
    'AUTO_PAY',
    'PAPERLESS',
    'EARLY_RENEWAL',
    'GOOD_CREDIT',
    'SMALL_BUSINESS',
    'CYBER_SECURITY',
    'SUBCONTRACTOR_AGREEMENTS',
    'LIMITED_SCOPE',
    'CLAIMS_TRAINING'
  ];
  notCoveredKeys = [
    'BODILY_INJURY',
    'FRAUD',
    'CRIMINAL_ACTS',
    'EMPLOYMENT_DISPUTES',
    'WORKER_INJURIES',
    'CYBER_ATTACKS',
    'PATENT',
    'ASSET_DAMAGE',
    'PUNITIVE',
    'POLICY_PERIOD',
    'UNREPORTED',
    'CONTRACT',
    'BANKRUPTCY',
    'WAR',
    'NUCLEAR',
    'FINES',
    'PRIOR_CLAIMS',
    'POLLUTION',
    'PRODUCT',
    'ILLEGAL_PROFIT'
  ];
  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'INDUSTRY_OPTIONS',
    'TECH_EO',
    'MEDICAL_MALPRACTICE',
    'REAL_ESTATE_EO',
    'LEGAL_MALPRACTICE',
    'FINANCIAL_SERVICES',
    'PRIOR_ACTS',
    'POLICY_TYPE',
    'SUBCONTRACTORS',
    'CYBER_LIABILITY',
    'DEFENSE_COST',
    'COVERAGE_LIMITS',
    'DEDUCTIBLE',
    'RISK_SUPPORT',
    'ASSOCIATION_DISCOUNT',
    'BILINGUAL',
    'PRICE',
    'LOYALTY',
    'SWITCHING',
    'DISCOUNTS',
    'CLAIMS',
    'LOCAL_KNOWLEDGE',
    'CUSTOMIZATION'
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
