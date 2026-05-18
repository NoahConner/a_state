import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-general-liability-insurance',
  standalone: false,
  templateUrl: './general-liability-insurance.html',
  styleUrl: './general-liability-insurance.scss',
})
export class GeneralLiabilityInsurance {


  constructor(public languageService: Language, private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'GENERAL_LIABILITY_INSURANCE.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-car' },
    { name: 'GENERAL_LIABILITY_INSURANCE.BANNER.CHIPS.CONTRACTOR', icon: 'fas fa-house' },
    { name: 'GENERAL_LIABILITY_INSURANCE.BANNER.CHIPS.PRODUCT', icon: 'fas fa-building' },
    { name: 'GENERAL_LIABILITY_INSURANCE.BANNER.CHIPS.PREMISES', icon: 'fas fa-heart' },
    { name: 'GENERAL_LIABILITY_INSURANCE.BANNER.CHIPS.LIQUOR', icon: 'fas fa-notes-medical' },
    { name: 'GENERAL_LIABILITY_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

 companyRates = [
  { 
    company: "<a href='https://www.thehartford.com/' rel='nofollow' class='inline-link' target='_blank'>The Hartford</a>", 
    monthly: "$103", 
    annual: "$1,238" 
  },
  { 
    company: "<a href='https://www.nextinsurance.com/' rel='nofollow' class='inline-link' target='_blank'>ERGO NEXT</a>", 
    monthly: "$106", 
    annual: "$1,273" 
  },
  { 
    company: "<a href='https://www.biberk.com/' rel='nofollow' class='inline-link' target='_blank'>biBERK</a>", 
    monthly: "$111", 
    annual: "$1,330" 
  },
  { 
    company: "<a href='https://www.thimble.com/' rel='nofollow' class='inline-link' target='_blank'>Thimble</a>", 
    monthly: "$112", 
    annual: "$1,342" 
  },
  { 
    company: "<a href='https://www.simplybusiness.co.uk/' rel='nofollow' class='inline-link' target='_blank'>Simply Business</a>", 
    monthly: "$120", 
    annual: "$1,437" 
  },
  { 
    company: "<a href='https://www.coverdash.com/' rel='nofollow' class='inline-link' target='_blank'>Coverdash</a>", 
    monthly: "$127", 
    annual: "$1,523" 
  },
  { 
    company: "<a href='https://www.progressivecommercial.com/' rel='nofollow' class='inline-link' target='_blank'>Progressive Commercial</a>", 
    monthly: "$129", 
    annual: "$1,552" 
  },
  { 
    company: "<a href='https://www.nationwide.com/' rel='nofollow' class='inline-link' target='_blank'>Nationwide</a>", 
    monthly: "$136", 
    annual: "$1,626" 
  },
  { 
    company: "<a href='https://www.hiscox.com/' rel='nofollow' class='inline-link' target='_blank'>Hiscox</a>", 
    monthly: "$137", 
    annual: "$1,644" 
  },
  { 
    company: "<a href='https://www.chubb.com/' rel='nofollow' class='inline-link' target='_blank'>Chubb</a>", 
    monthly: "$138", 
    annual: "$1,650" 
  }
];
  industryRates = [
    { industry: "Agriculture & Natural Resources", monthly: "$99", annual: "$1,185" },
    { industry: "Arts, Media & Entertainment", monthly: "$37", annual: "$450" },
    { industry: "Beauty, Body & Wellness Services", monthly: "$42", annual: "$508" },
    { industry: "Childcare Services", monthly: "$125", annual: "$1,499" },
    { industry: "Cleaning Services", monthly: "$98", annual: "$1,179" },
    { industry: "Construction & Contracting", monthly: "$343", annual: "$4,111" },
    { industry: "Consulting Services", monthly: "$33", annual: "$391" },
    { industry: "Education", monthly: "$49", annual: "$586" },
    { industry: "Financial Services", monthly: "$42", annual: "$499" },
    { industry: "Fitness Services", monthly: "$104", annual: "$1,248" },
    { industry: "Food & Beverage", monthly: "$124", annual: "$1,493" },
    { industry: "Healthcare & Medical", monthly: "$209", annual: "$2,511" },
    { industry: "Hospitality, Travel & Tourism", monthly: "$106", annual: "$1,275" },
    { industry: "Manufacturing", monthly: "$69", annual: "$823" },
    { industry: "Marketing & Communications", monthly: "$32", annual: "$383" },
    { industry: "Nonprofit & Associations", monthly: "$56", annual: "$671" },
    { industry: "Other Professional Services", monthly: "$74", annual: "$893" },
    { industry: "Pet Care Services", monthly: "$89", annual: "$1,073" },
    { industry: "Real Estate & Property Services", monthly: "$48", annual: "$577" },
    { industry: "Recreation & Sports", monthly: "$73", annual: "$871" },
    { industry: "Repair & Maintenance", monthly: "$74", annual: "$892" },
    { industry: "Retail & Product Rental", monthly: "$110", annual: "$1,315" },
    { industry: "Tech/IT", monthly: "$27", annual: "$327" },
    { industry: "Transportation & Logistics", monthly: "$84", annual: "$1,003" },
    { industry: "Wholesale & Distribution", monthly: "$105", annual: "$1,266" }
  ];




  impactFactorsKeys = [
    'INDUSTRY_TYPE',
    'BUSINESS_SIZE',
    'EMPLOYEES',
    'EXPERIENCE',
    'LOCATION',
    'LOCATIONS_COUNT',
    'LEASE_OR_OWN',
    'PREMISES_SIZE',
    'REVENUE_PAYROLL',
    'SERVICES_TYPE',
    'PRODUCTS',
    'ALCOHOL',
    'SUBCONTRACTORS',
    'SUBCONTRACTOR_REQUIREMENTS',
    'CLAIMS_HISTORY',
    'CREDIT_SCORE',
    'COVERAGE_LIMIT',
    'DEDUCTIBLE',
    'BOP_POLICY',
    'RISK_MANAGEMENT',
    'OSHA',
    'OFFSITE_WORK',
    'HAZARDOUS',
    'VEHICLES',
    'BUNDLING'
  ];
  discountKeys = [
    'BUNDLING',
    'BOP_BUNDLE',
    'CLAIMS_FREE',
    'LOYALTY',
    'NEW_BUSINESS',
    'SAFETY_TRAINING',
    'OSHA',
    'SAFETY_MANUAL',
    'SECURITY_SYSTEM',
    'SLIP_PREVENTION',
    'BACKGROUND_CHECKS',
    'SUBCONTRACTOR_CERT',
    'HIGH_DEDUCTIBLE',
    'LOWER_LIMIT',
    'PAY_IN_FULL',
    'AUTO_PAY',
    'PAPERLESS',
    'EARLY_RENEWAL',
    'GOOD_CREDIT',
    'EXPERIENCE',
    'INDUSTRY_ASSOCIATION',
    'DRUG_FREE',
    'NON_SMOKING',
    'LIMITED_OPERATIONS',
    'ANNUAL_REVIEW'
  ];
  notCoveredKeys = [
    'PROFESSIONAL_ERRORS',
    'EMPLOYEE_INJURIES',
    'EMPLOYMENT_DISPUTES',
    'CYBER_ATTACKS',
    'AUTO_ACCIDENTS',
    'OWN_PROPERTY',
    'INTENTIONAL_ACTS',
    'CONTRACTUAL',
    'POLLUTION',
    'PRODUCT_RECALL',
    'EXECUTIVE_DECISIONS',
    'LIQUOR',
    'MEDICAL_ADVICE',
    'CLIENT_PROPERTY',
    'WAR',
    'NUCLEAR',
    'PUNITIVE',
    'POLICY_PERIOD',
    'OWNER_INJURY',
    'UNDERGROUND'
  ];
  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'INDUSTRY_OPTIONS',
    'CONTRACTOR_CONSTRUCTION',
    'RETAIL',
    'RESTAURANT_FOOD',
    'HOME_BASED',
    'PRODUCT_LIABILITY',
    'LIQUOR_LIABILITY',
    'PREMISES_LIABILITY',
    'BOP_BUNDLE',
    'UMBRELLA',
    'INLAND_MARINE',
    'POLLUTION',
    'COVERAGE_LIMITS',
    'DEDUCTIBLE',
    'SUBCONTRACTOR',
    'OSHA_DISCOUNT',
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
