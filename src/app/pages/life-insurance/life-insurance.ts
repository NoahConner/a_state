import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-life-insurance',
  standalone: false,
  templateUrl: './life-insurance.html',
  styleUrl: './life-insurance.scss',
})
export class LifeInsurance implements OnInit {
  optionalCoveragesChunks: any[][] = [];


  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadOptionalCoverages();
    });
    this.loadOptionalCoverages();
  }

  loadOptionalCoverages() {
    this.translate.get('LIFE_INSURANCE.COVERAGES.OPTIONAL.LIST').subscribe((list: any[]) => {
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
    { name: 'LIFE_INSURANCE.BANNER.CHIPS.TERM_LIFE', icon: 'fas fa-car' },
    { name: 'LIFE_INSURANCE.BANNER.CHIPS.WHOLE_LIFE', icon: 'fas fa-house' },
    { name: 'LIFE_INSURANCE.BANNER.CHIPS.UNIVERSAL_LIFE', icon: 'fas fa-building' },
    { name: 'LIFE_INSURANCE.BANNER.CHIPS.FINAL_EXPENSE', icon: 'fas fa-heart' },
    { name: 'LIFE_INSURANCE.BANNER.CHIPS.GROUP_LIFE', icon: 'fas fa-notes-medical' },
    { name: 'LIFE_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { age_group: "18–25", term_life: "$15 – $30", whole_life: "$60 – $90" },
    { age_group: "26–35", term_life: "$20 – $35", whole_life: "$70 – $110" },
    { age_group: "36–45", term_life: "$25 – $50", whole_life: "$90 – $150" },
    { age_group: "46–55", term_life: "$40 – $70", whole_life: "$130 – $200" },
    { age_group: "56–65", term_life: "$70 – $120", whole_life: "$200 – $300" },
    { age_group: "65+", term_life: "$100 – $150", whole_life: "$300 – $500" }
  ];
  companyRates = [
    { company: "Banner/Legal & General", female: "$101.11/yr", male: "$139.99/yr" },
    { company: "Symetra", female: "$101.13/yr", male: "$114.90/yr" },
    { company: "Pacific Life", female: "$101.80/yr", male: "$114.91/yr" },
    { company: "Corebridge Financial (formerly AIG)", female: "$101.90/yr", male: "$115.60/yr" },
    { company: "Penn Mutual", female: "$101.90/yr", male: "$115.63/yr" },
    { company: "Transamerica", female: "$102.50/yr", male: "$117.50/yr" },
    { company: "Protective", female: "$104.15/yr", male: "$115.85/yr" },
    { company: "Midland National", female: "$112.50/yr", male: "$125.00/yr" },
    { company: "SBLI", female: "$112.81/yr", male: "$131.38/yr" },
    { company: "Nationwide", female: "$132.50/yr", male: "$155.00/yr" }
  ];




  impactFactorsKeys = [
    'AGE',
    'GENDER',
    'HEALTH_HISTORY',
    'PRE_EXISTING_CONDITIONS',
    'FAMILY_MEDICAL_HISTORY',
    'TOBACCO_USE',
    'ALCOHOL_DRUG_USE',
    'BMI',
    'OCCUPATION',
    'HOBBIES',
    'DRIVING_RECORD',
    'CRIMINAL_HISTORY',
    'MENTAL_HEALTH',
    'POLICY_TYPE',
    'TERM_LENGTH',
    'DEDUCTIBLES_RIDERS',
    'CREDIT_HISTORY',
    'FOREIGN_TRAVEL',
  ];
  discountKeys = [
    'NON_SMOKER',
    'HEALTHY_BMI',
    'ANNUAL_PAYMENT',
    'AUTO_PAY',
    'PAPERLESS_BILLING',
    'MULTI_POLICY',
    'EARLY_PURCHASE',
    'LEVEL_PREMIUM',
    'NO_EXAM',
    'MILITARY_OCCUPATIONAL',
    'LOYALTY',
    'GOOD_DRIVING',
    'EMPLOYER_GROUP',
    'HEALTHY_LIFESTYLE',
    'EARLY_RENEWAL',
    'NON_DRINKER',
    'FAMILY_PLAN'
  ];
  notCoveredKeys = [
    'DEATH_BENEFIT',
    'INCOME_REPLACEMENT',
    'DEBT_PAYOFF',
    'EDUCATION',
    'FINAL_EXPENSES',
    'BUSINESS_PROTECTION',
    'ESTATE_PLANNING',
    'CASH_VALUE',
    'RETIREMENT',
    'CHARITABLE_GIVING'
  ];
  agentComparisonData = [
    'CARRIERS',
    'PRICE_COMPARISON',
    'POLICY_TYPES',
    'HIGH_RISK',
    'PRE_EXISTING',
    'TOBACCO',
    'FINAL_EXPENSE',
    'COVERAGE_AMOUNT',
    'LOYALTY',
    'RENEWAL',
    'CLAIMS',
    'POLICY_CUSTOMIZATION',
    'SWITCHING',
    'BUNDLING',
    'LOCAL',
    'MULTILINGUAL'
  ];

  industryCoverageKeys = [
    'TERM_LIFE',
    'WHOLE_LIFE',
    'UNIVERSAL_LIFE',
    'FINAL_EXPENSE',
    'VARIABLE_LIFE',
    'GROUP_LIFE',

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

}
