import { Language } from '../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-health-insurance',
  standalone: false,
  templateUrl: './health-insurance.html',
  styleUrl: './health-insurance.scss',
})
export class HealthInsurance implements OnInit {
  optionalCoveragesChunks: any[][] = [];


  constructor(public languageService: Language, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadOptionalCoverages();
    });
    this.loadOptionalCoverages();
  }

  loadOptionalCoverages() {
    this.translate.get('HEALTH_INSURANCE.COVERAGES.OPTIONAL.LIST').subscribe((list: any[]) => {
      if (Array.isArray(list)) {
        this.optionalCoveragesChunks = this.chunkArray(list, 3);
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
    { name: 'HEALTH_INSURANCE.BANNER.CHIPS.INDIVIDUAL_FAMILY', icon: 'fas fa-car' },
    { name: 'HEALTH_INSURANCE.BANNER.CHIPS.MEDICARE_SUPPLEMENT', icon: 'fas fa-house' },
    { name: 'HEALTH_INSURANCE.BANNER.CHIPS.SHORT_TERM', icon: 'fas fa-building' },
    { name: 'HEALTH_INSURANCE.BANNER.CHIPS.DENTAL_VISION', icon: 'fas fa-heart' },
    { name: 'HEALTH_INSURANCE.BANNER.CHIPS.GROUP_EMPLOYER', icon: 'fas fa-notes-medical' },
    { name: 'HEALTH_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { age: "21", bronze: "$332", silver: "$459", gold: "$409" },
    { age: "30", bronze: "$376", silver: "$521", gold: "$464" },
    { age: "40", bronze: "$424", silver: "$587", gold: "$523" },
    { age: "50", bronze: "$592", silver: "$820", gold: "$731" },
    { age: "60", bronze: "$900", silver: "$1,246", gold: "$1,110" }
  ];
  providerRates = [
    { company: "<a href='https://www.christushealthplan.org/' target='_blank' rel='nofollow'>Christus Health Plan</a>", monthly: "$553", annual: "$6,636" },
    { company: "<a href='https://senderohealth.com/' target='_blank' rel='nofollow'>Sendero Health Plans</a>", monthly: "$612", annual: "$7,344" },
    { company: "<a href='https://www.communityhealthchoice.org/' target='_blank' rel='nofollow'>Community Health Choice</a>", monthly: "$616", annual: "$7,392" },
    { company: "<a href='https://exchange.imperialhealthplan.com/texas/' target='_blank' rel='nofollow'>Imperial Insurance Companies</a>", monthly: "$618", annual: "$7,416" },
    { company: "<a href='https://communityfirsthealthplans.com/' target='_blank' rel='nofollow'>Community First</a>", monthly: "$658", annual: "$7,896" },
    { company: "<a href='https://www.uhc.com/' target='_blank' rel='nofollow'>UnitedHealthcare</a>", monthly: "$662", annual: "$7,944" },
    { company: "<a href='https://www.wellcare.com/' target='_blank' rel='nofollow'>Wellcare Health</a>", monthly: "$666", annual: "$7,992" }
  ];



  impactFactorsKeys = [
    'AGE',
    'LOCATION',
    'TOBACCO_USE',
    'PLAN_TYPE',
    'COVERAGE_LEVEL',
    'DEDUCTIBLE',
    'FAMILY_SIZE',
    'INCOME',
    'EMPLOYER',
    'HEALTH_STATUS',
    'PRE_EXISTING',
    'NETWORK',
    'ADDONS',
    'START_DATE',
    'INSURANCE_HISTORY',
  ];
  discountKeys = [
    'ACA_SUBSIDY',
    'CSR',
    'MEDICAID_CHIP',
    'EMPLOYER_CONTRIBUTION',
    'HSA_SAVINGS',
    'FSA_SAVINGS',
    'TOBACCO_FREE',
    'ANNUAL_PAYMENT',
    'AUTO_PAY',
    'PAPERLESS',
    'BUNDLING',
    'HIGH_DEDUCTIBLE',
    'WELLNESS',
    'STUDENT',
    'GROUP_ASSOCIATION',
    'LOYALTY',
    'EARLY_ENROLLMENT',
    'TELEMEDICINE'
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
    'CARRIERS',
    'PRICE_COMPARISON',
    'PLAN_TYPES',
    'SUBSIDY_ACA',
    'MEDICARE_OPTIONS',
    'SHORT_TERM_PLANS',
    'DENTAL_VISION',
    'LOW_INCOME_MEDICAID',
    'HIGH_RISK',
    'PRE_EXISTING',
    'NETWORK',
    'LOYALTY',
    'RENEWAL',
    'CLAIMS',
    'OPEN_ENROLLMENT',
    'SWITCHING',
    'LOCAL',
    'MULTILINGUAL'
  ];
  industryCoverageKeys = [
    'INDIVIDUAL',
    'FAMILY',
    'SMALL_BUSINESS',
    'EMPLOYER_GROUP',
    'TRAVEL',
    'MEDICARE_SUPP',
    'SHORT_TERM',
    'DENTAL_VISION',
    'ACA_MARKETPLACE'
  ];
  switchSteps = [
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
