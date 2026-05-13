import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-business-owner-insurance',
  standalone: false,
  templateUrl: './business-owner-insurance.html',
  styleUrl: './business-owner-insurance.scss',
})
export class BusinessOwnerInsurance {


  constructor(public languageService: Language, private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'BUSINESS_OWNER_POLICY_INSURANCE.BANNER.CHIPS.STANDARD', icon: 'fas fa-car' },
    { name: 'BUSINESS_OWNER_POLICY_INSURANCE.BANNER.CHIPS.EMPLOYER_LIABILITY', icon: 'fas fa-house' },
    { name: 'BUSINESS_OWNER_POLICY_INSURANCE.BANNER.CHIPS.OCCUPATIONAL_ACCIDENT', icon: 'fas fa-building' },
    { name: 'BUSINESS_OWNER_POLICY_INSURANCE.BANNER.CHIPS.CONSTRUCTION', icon: 'fas fa-heart' },
    { name: 'BUSINESS_OWNER_POLICY_INSURANCE.BANNER.CHIPS.PEO', icon: 'fas fa-notes-medical' },
    { name: 'BUSINESS_OWNER_POLICY_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];




  companyRates = [
    { company: "The Hartford", annual: "$1,019" },
    { company: "Progressive", annual: "$1,351" },
    { company: "Huckleberry", annual: "$864" },
    { company: "Thimble", annual: "$725" }
  ];
  industryRates = [
    { industry: "Home-based consultant or freelancer", annual: "$500 – $750" },
    { industry: "Professional office (accountant, real estate, insurance)", annual: "$600 – $1,000" },
    { industry: "Retail boutique or gift shop", annual: "$800 – $1,400" },
    { industry: "Restaurant or café (light service)", annual: "$1,200 – $2,200" },
    { industry: "Salon, spa, or fitness studio", annual: "$750 – $1,500" },
    { industry: "IT firm or tech startup (leased office)", annual: "$600 – $1,100" },
    { industry: "Auto repair or service shop", annual: "$1,500 – $3,000+" }
  ];


  impactFactorsKeys = [
    "INDUSTRY_TYPE",
    "BUSINESS_SIZE",
    "EMPLOYEES",
    "EXPERIENCE",
    "LOCATION",
    "LOCATIONS_COUNT",
    "PREMISES_SIZE",
    "OWN_LEASE",
    "BUILDING_AGE",
    "CONSTRUCTION_TYPE",
    "ROOF_CONDITION",
    "PRODUCT_SERVICE",
    "PRODUCT_SALES",
    "ALCOHOL",
    "HAZARDOUS",
    "PROPERTY_VALUE",
    "SECURITY",
    "FIRE_PROTECTION",
    "CLAIMS_HISTORY",
    "CREDIT",
    "COVERAGE_LIMIT",
    "DEDUCTIBLE",
    "SUBCONTRACTORS",
    "BUNDLING",
    "CARRIER"
  ];

  discountKeys = [
    "BUNDLING",
    "CLAIMS_FREE",
    "LOYALTY",
    "NEW_BUSINESS",
    "NEW_BUILDING",
    "NEW_ROOF",
    "RENOVATED_BUILDING",
    "FIRE_RESISTIVE",
    "SPRINKLER",
    "FIRE_ALARM",
    "SECURITY_SYSTEM",
    "ACCESS_CONTROL",
    "WIND_MITIGATION",
    "IMPACT_ROOF",
    "SAFETY_TRAINING",
    "SLIP_FALL",
    "BACKGROUND_CHECK",
    "HIGHER_DEDUCTIBLE",
    "PAY_IN_FULL",
    "AUTO_PAY",
    "PAPERLESS",
    "EARLY_RENEWAL",
    "CREDIT_SCORE",
    "INDUSTRY_ASSOCIATION",
    "POLICY_REVIEW"
  ];


  notCoveredKeys = [
    'PROFESSIONAL_ERRORS',
    'EMPLOYEE_INJURIES',
    'EMPLOYMENT_DISPUTES',
    'CYBER_RISKS',
    'COMMERCIAL_AUTO',
    'FLOOD_DAMAGE',
    'EARTHQUAKE_DAMAGE',
    'DIRECTORS_OFFICERS',
    'EMPLOYEE_BENEFITS',
    'INTENTIONAL_ACTS',
    'POLLUTION',
    'LIQUOR_LIABILITY',
    'TOOLS_OFF_PREMISES',
    'HIGH_RISK_BUSINESSES',
    'PRODUCT_RECALL',
    'PUNITIVE_DAMAGES',
    'WAR_TERRORISM',
    'NUCLEAR',
    'GOVERNMENT_ACTION',
    'EXCEEDING_LIMITS'
  ];

  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'INDUSTRY_OPTIONS',
    'RETAIL',
    'RESTAURANT',
    'OFFICE',
    'CONTRACTOR',
    'TECH',
    'BUSINESS_INTERRUPTION',
    'EQUIPMENT_BREAKDOWN',
    'CYBER',
    'LIQUOR',
    'INLAND_MARINE',
    'UMBRELLA',
    'EMPLOYEE_DISHONESTY',
    'MONEY_SECURITIES',
    'ELIGIBILITY',
    'LIMIT_FLEXIBILITY',
    'DEDUCTIBLE_FLEXIBILITY',
    'BILINGUAL',
    'PRICE',
    'LOYALTY',
    'SWITCHING',
    'DISCOUNTS',
    'CLAIMS_ADVOCACY',
    'LOCAL_KNOWLEDGE',
    'CUSTOMIZATION'
  ];


  bopVsGlComparisonData = [
    'WHAT_IT_IS',
    'DESIGNED_FOR',
    'GL_COVERAGE',
    'PROPERTY_COVERAGE',
    'BUSINESS_INTERRUPTION',
    'EQUIPMENT_BREAKDOWN',
    'EMPLOYEE_DISHONESTY',
    'MONEY_SECURITIES',
    'BODILY_INJURY',
    'PROPERTY_DAMAGE',
    'PERSONAL_AD_INJURY',
    'PRODUCTS_COMPLETED',
    'TENANT_LEGAL',
    'BUILDING_STRUCTURE',
    'BUSINESS_PERSONAL_PROPERTY',
    'INVENTORY_STOCK',
    'CYBER_LIABILITY',
    'COST_VS_SEPARATE',
    'FLEXIBILITY',
    'ELIGIBILITY',
    'BEST_FOR',
    'ADD_ON_OPTIONS',
    'WORKERS_COMP',
    'COMMERCIAL_AUTO',
    'PROFESSIONAL_LIABILITY'
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
