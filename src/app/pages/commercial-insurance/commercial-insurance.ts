import { Language } from '../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-commercial-insurance',
  standalone: false,
  templateUrl: './commercial-insurance.html',
  styleUrl: './commercial-insurance.scss',
})
export class CommercialInsurance implements OnInit {
  optionalCoveragesChunks: any[][] = [];
  shopEveryCards: any[][] = [];


  constructor(public languageService: Language, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadOptionalCoverages();
      this.loadShopEveryCards();
    });
    this.loadOptionalCoverages();
    this.loadShopEveryCards();
  }

  loadOptionalCoverages() {
    this.translate.get('COMMERCIAL_INSURANCE.COVERAGES.OPTIONAL.LIST').subscribe((list: any[]) => {
      if (Array.isArray(list)) {
        this.optionalCoveragesChunks = this.chunkArray(list, 3);
      }
    });
  }


  loadShopEveryCards() {
    this.translate.get('COMMERCIAL_INSURANCE.SHOP_EVERY.LIST').subscribe((list: any) => {
      if (list && typeof list === 'object') {
        const cardsArray: any[] = Object.keys(list).map(key => ({
          key,
          title: list[key].TITLE,
          description: list[key].DESCRIPTION,
          icon: this.getIconForKey(key),
          route: list[key].ROUTE
        }));
        this.shopEveryCards = this.chunkArray(cardsArray, 2); // 2 cards per row
      }
    });
  }

  // Map JSON keys to icons
  getIconForKey(key: string): string {
    const icons: any = {
      PROFESSIONAL_LIABILITY: '/assets/images/commercial-insurance/liability_license.png',
      GENERAL_LIABILITY: '/assets/images/commercial-insurance/general_liability.png',
      WORKERS_COMPENSATION: '/assets/images/commercial-insurance/workers.png',
      COMMERCIAL_PROPERTY: '/assets/images/commercial-insurance/property.png',
      COMMERCIAL_AUTO: '/assets/images/commercial-insurance/c_i_auto.png',
      BUSINESS_OWNER_POLICY: '/assets/images/commercial-insurance/bop.png',
      EPLI: '/assets/images/commercial-insurance/epl.png',
      CYBER_LIABILITY: '/assets/images/commercial-insurance/cyber.png',
      BUILDERS_RISK: '/assets/images/commercial-insurance/builders.png',
      D_O_LIABILITY: '/assets/images/commercial-insurance/do.png'
    };
    return icons[key] || '/assets/images/default.png';
  }

  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'COMMERCIAL_INSURANCE.BANNER.CHIPS.GENERAL_LIABILITY', icon: 'fas fa-car' },
    { name: 'COMMERCIAL_INSURANCE.BANNER.CHIPS.BUSINESS_OWNERS', icon: 'fas fa-house' },
    { name: 'COMMERCIAL_INSURANCE.BANNER.CHIPS.COMMERCIAL_AUTO', icon: 'fas fa-building' },
    { name: 'COMMERCIAL_INSURANCE.BANNER.CHIPS.WORKERS_COMPENSATION', icon: 'fas fa-heart' },
    { name: 'COMMERCIAL_INSURANCE.BANNER.CHIPS.PROFESSIONAL_LIABILITY', icon: 'fas fa-notes-medical' },
    { name: 'COMMERCIAL_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { business_type: "All Businesses with Employees", coverage: "Workers Compensation", required_by: "Texas Law" },
    { business_type: "Contractors & Tradespeople", coverage: "General Liability", required_by: "Client / Contract" },
    { business_type: "Business Vehicles", coverage: "Commercial Auto", required_by: "Texas Law" },
    { business_type: "Healthcare Professionals", coverage: "Professional Liability / E&O", required_by: "Licensing Board" },
    { business_type: "Restaurants & Retail", coverage: "General Liability", required_by: "Lease / Contract" },
    { business_type: "Trucking & Fleet Operators", coverage: "Commercial Auto + Cargo", required_by: "Federal / State Law" },
    { business_type: "Businesses with Commercial Lease", coverage: "General Liability", required_by: "Lease Agreement" },
    { business_type: "Government Contract Holders", coverage: "General Liability + Workers Comp", required_by: "Contract Requirement" }
  ];
  companyRates = [
    { company: "<a href='https://www.thehartford.com/' rel='nofollow' target='_blank'>The Hartford</a>", rate: "$85" },
    { company: "<a href='https://www.thimble.com/' rel='nofollow' target='_blank'>Thimble</a>", rate: "$94" },
    { company: "<a href='https://www.simplybusiness.com/' rel='nofollow' target='_blank'>Simply Business</a>", rate: "$98" },
    { company: "<a href='https://www.progressivecommercial.com/' rel='nofollow' target='_blank'>Progressive Commercial</a>", rate: "$100" },
    { company: "<a href='https://www.nextinsurance.com/' rel='nofollow' target='_blank'>ERGO NEXT</a>", rate: "$101" },
    { company: "<a href='https://www.nationwide.com/' rel='nofollow' target='_blank'>Nationwide</a>", rate: "$102" },
    { company: "<a href='https://www.coverdash.com' rel='nofollow' target='_blank'>Coverdash</a>", rate: "$102" },
    { company: "<a href='https://www.biberk.com' rel='nofollow' target='_blank'>biBERK</a>", rate: "$105" },
    { company: "<a href='https://www.hiscox.com' rel='nofollow' target='_blank'>Hiscox</a>", rate: "$109" },
    { company: "<a href='https://www.chubb.com' rel='nofollow' target='_blank'>Chubb</a>", rate: "$118" }
  ];




  impactFactorsKeys = [
    'INDUSTRY',
    'BUSINESS_SIZE',
    'REVENUE_PAYROLL',
    'YEARS_IN_BUSINESS',
    'LOCATION',
    'CLAIMS_HISTORY',
    'COVERAGE',
    'DEDUCTIBLE',
    'VEHICLES',
    'PROPERTY_VALUE',
    'CREDIT_SCORE',
    'CONTRACTUAL_REQUIREMENTS',
    'SAFETY_PROTOCOLS',
    'SUBCONTRACTORS',
    'LICENSES_CERTIFICATIONS',
    'CYBER_RISK',
    'INSURANCE_HISTORY'
  ];
  discountKeys = [
    'BUNDLING',
    'BOP_BUNDLE',
    'CLAIM_FREE',
    'PAID_FULL',
    'AUTO_PAY',
    'PAPERLESS',
    'SAFETY_TRAINING',
    'SECURITY_SYSTEM',
    'YEARS_IN_BUSINESS',
    'INDUSTRY_ASSOCIATION',
    'MULTIPLE_VEHICLES',
    'HIGH_DEDUCTIBLE',
    'LOYALTY',
    'GREEN_BUSINESS',
    'LICENSE_CERTIFICATION',
    'EARLY_SIGNING',
    'LOW_MILEAGE',
    'BACKGROUND_CHECK',
    'DRUG_FREE',
    'CYBERSECURITY'
  ];
  notCoveredKeys = [
    'THIRD_PARTY_LIABILITY',
    'BUSINESS_PROPERTY',
    'BUSINESS_VEHICLES',
    'EMPLOYEE_INJURIES',
    'PROFESSIONAL_LIABILITY',
    'CYBER_SECURITY',
    'BUSINESS_INTERRUPTION',
    'LEGAL_COSTS',
    'CONTRACTOR_EQUIPMENT',
    'PRODUCT_LIABILITY',
    'HIRED_NON_OWNED_AUTO',
    'UMBRELLA_LIABILITY'
  ];
  agentComparisonData = [
    'CARRIERS',
    'PRICE_COMPARISON',
    'INDUSTRY_COVERAGE',
    'HIGH_RISK',
    'CUSTOMIZATION',
    'WORKERS_COMP',
    'COMMERCIAL_AUTO',
    'GENERAL_LIABILITY',
    'BOP',
    'CYBER_LIABILITY',
    'LOYALTY',
    'RENEWAL',
    'CLAIMS',
    'MULTI_POLICY',
    'SWITCHING',
    'LOCAL',
    'MULTILINGUAL'
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
