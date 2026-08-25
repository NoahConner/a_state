import { Language } from '../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-surety-bond-insurance',
  standalone: false,
  templateUrl: './surety-bond-insurance.html',
  styleUrl: './surety-bond-insurance.scss',
})
export class SuretyBondInsurance implements OnInit {
  termsAccepted = false;
  termsAccepted2 = false;
  optionalCoveragesChunks: any[][] = [];
  whoRequiresChunks: any[][] = [];


  constructor(public languageService: Language, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadOptionalCoverages();
    });
    this.loadOptionalCoverages();
  }

  loadOptionalCoverages() {
    this.translate.get('SURETY_INSURANCE.COVERAGES.OPTIONAL.LIST').subscribe((list: any[]) => {
      if (Array.isArray(list)) {
        this.optionalCoveragesChunks = this.chunkArray(list, 3);
      }
    });
    this.translate.get('SURETY_INSURANCE.COVERAGES.WHO_REQUIRES.LIST').subscribe((list: any[]) => {
      if (Array.isArray(list)) {
        this.whoRequiresChunks = this.chunkArray(list, 3);
      }
    });
  }




  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'SURETY_INSURANCE.BANNER.CHIPS.LICENSE_PERMIT', icon: 'fas fa-car' },
    { name: 'SURETY_INSURANCE.BANNER.CHIPS.CONTRACT_CONSTRUCTION', icon: 'fas fa-house' },
    { name: 'SURETY_INSURANCE.BANNER.CHIPS.COURT_PROBATE', icon: 'fas fa-building' },
    { name: 'SURETY_INSURANCE.BANNER.CHIPS.FIDELITY_EMPLOYEE', icon: 'fas fa-heart' },
    { name: 'SURETY_INSURANCE.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-notes-medical' },
    { name: 'SURETY_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { age: "21", bronze: "$332", silver: "$459", gold: "$409" },
    { age: "30", bronze: "$376", silver: "$521", gold: "$464" },
    { age: "40", bronze: "$424", silver: "$587", gold: "$523" },
    { age: "50", bronze: "$592", silver: "$820", gold: "$731" },
    { age: "60", bronze: "$900", silver: "$1,246", gold: "$1,110" }
  ];
  providerRates = [
    { company: "Christus Health Plan", monthly: "$553", annual: "$6,636" },
    { company: "Sendero Health Plans", monthly: "$612", annual: "$7,344" },
    { company: "Community Health Choice", monthly: "$616", annual: "$7,392" },
    { company: "Imperial Insurance Companies", monthly: "$618", annual: "$7,416" },
    { company: "Community First", monthly: "$658", annual: "$7,896" },
    { company: "UnitedHealthcare", monthly: "$662", annual: "$7,944" },
    { company: "Wellcare Health", monthly: "$666", annual: "$7,992" }
  ];


  lawsKey = [
    'PROTECTION',
    'REPAYMENT',
    'PURPOSE',
    'RISK',
    'USE_CASES'
  ]

  impactFactorsKeys = [
    'PERSONAL_CREDIT',
    'BUSINESS_CREDIT',
    'EXPERIENCE',
    'FINANCIAL_STATEMENTS',
    'BOND_REQUIREMENTS',
    'INDUSTRY_TYPE',
    'CLAIMS_HISTORY',
    'LIQUID_ASSETS',
    'DEBT_LIABILITIES',
    'REVENUE_PROFITABILITY',
    'EMPLOYEE_COUNT',
    'LICENSING_STATUS',
    'PROJECT_COMPLEXITY',
    'PERSONAL_GUARANTEE',
    'COMPLIANCE_HISTORY',
  ];
  discountKeys = [
    'IMPROVE_CREDIT',
    'BUSINESS_CREDIT',
    'CLEAN_RECORD',
    'LIQUID_ASSETS',
    'REDUCE_DEBT',
    'AUDITED_FINANCIALS',
    'INDUSTRY_EXPERIENCE',
    'LICENSING_CERTIFICATION',
    'BUNDLING',
    'ANNUAL_PAYMENT',
    'AUTO_PAY',
    'PAPERLESS',
    'LOYALTY',
    'EARLY_RENEWAL',
    'INDEPENDENT_AGENT',

  ];
  notCoveredKeys = [
    'PREMIUM',
    'DEDUCTIBLE',
    'COPAY',
    'COINSURANCE',
    'OUT_OF_POCKET_MAX',
    'NETWORK',
    'HMO_VS_PPO',
    'OPEN_ENROLLMENT',
    'SUBSIDY',
    'HSA',
  ];
  agentComparisonData = [
    'MARKETS',
    'PRICE_COMPARISON',
    'BAD_CREDIT',
    'HIGH_RISK',
    'BOND_TYPES',
    'GUIDANCE',
    'OPTIMIZATION',
    'CLAIMS',
    'RENEWAL',
    'MANAGEMENT',
    'EXPERTISE',
    'COMPLIANCE',
    'FEDERAL_ACCESS',
    'LOYALTY',
    'SWITCHING',
    'LOCAL',
    'MULTILINGUAL'
  ];
  industryCoverageKeys = [
    'PERFORMANCE_PAYMENT',
    'COMMERCIAL',
    'BID_BONDS',
    'NOTARY',

  ]; switchSteps = [
    'STEP_1',
    'STEP_2',
    'STEP_3',
  ];

  faqList = [
    'FAQ1',
    'FAQ2',
    'FAQ3',
    'FAQ4',
  ];


  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
