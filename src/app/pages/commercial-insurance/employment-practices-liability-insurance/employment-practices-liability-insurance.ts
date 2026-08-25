import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employment-practices-liability-insurance',
  standalone: false,
  templateUrl: './employment-practices-liability-insurance.html',
  styleUrl: './employment-practices-liability-insurance.scss',
})
export class EmploymentPracticesLiabilityInsurance {
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
    { name: 'EMPLOYMENT_PRACTICES_LIABILITY_INSURANCE.BANNER.CHIPS.WRONGFUL_TERMINATION', icon: 'fas fa-car' },
    { name: 'EMPLOYMENT_PRACTICES_LIABILITY_INSURANCE.BANNER.CHIPS.SEXUAL_HARASSMENT', icon: 'fas fa-house' },
    { name: 'EMPLOYMENT_PRACTICES_LIABILITY_INSURANCE.BANNER.CHIPS.DISCRIMINATION', icon: 'fas fa-building' },
    { name: 'EMPLOYMENT_PRACTICES_LIABILITY_INSURANCE.BANNER.CHIPS.RETALIATION', icon: 'fas fa-heart' },
    { name: 'EMPLOYMENT_PRACTICES_LIABILITY_INSURANCE.BANNER.CHIPS.FAILURE_TO_PROMOTE', icon: 'fas fa-notes-medical' },
    { name: 'EMPLOYMENT_PRACTICES_LIABILITY_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  impactFactorsKeys = [
    "EMPLOYEES",
    "INDUSTRY_TYPE",
    "CLAIMS_HISTORY",
    "TURNOVER_RATE",
    "HR_POLICIES",
    "TRAINING",
    "EMPLOYEE_HANDBOOK",
    "DEDUCTIBLE",
    "COVERAGE_LIMIT",
    "LOCATION",
    "COMPLIANCE",
    "HIRING_PRACTICES"
  ];

  discountKeys = [
    'ANTI_HARASSMENT_POLICY',
    'EMPLOYEE_TRAINING',
    'EMPLOYEE_HANDBOOK',
    'COMPLAINT_PROCESS',
    'TURNOVER_REDUCTION',
    'BUNDLING',
    'HIGHER_DEDUCTIBLE',
    'INDEPENDENT_AGENT',
    'CLAIMS_HISTORY',
    'HR_SERVICES_PEO'
  ];


  notCoveredKeys = [
    'WAGE_HOUR',
    'BODILY_INJURY_PROPERTY_DAMAGE',
    'WORKERS_COMP',
    'ERISA',
    'CRIMINAL_ACTS',
    'PRIOR_KNOWN_CLAIMS',
    'WARN_ACT',
    'UNEMPLOYMENT',
    'LABOR_RELATIONS',
    'CONTRACTUAL_LIABILITY'
  ];


  agentComparisonData = [
    'CARRIERS',
    'QUOTE_COMPARISON',
    'COVERAGE_OPTIONS',
    'PRICING',
    'CONFLICT_OF_INTEREST',
    'HARD_TO_PLACE',
    'CUSTOMIZATION',
    'CLAIMS_ADVOCACY',
    'RENEWALS',
    'SWITCHING'
  ];



  bopVsGlComparisonData = [
    'WHAT_IT_COVERS',
    'WHO_IT_PROTECTS',
    'CLAIM_EXAMPLES',
    'DEFENSE_COSTS',
    'REQUIRED_BY_LAW',
    'HR_DISPUTES',
    'PHYSICAL_INJURY',
    'WHO_NEEDS_IT'
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
