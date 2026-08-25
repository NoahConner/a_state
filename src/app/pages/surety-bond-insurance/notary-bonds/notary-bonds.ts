import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notary-bonds',
  standalone: false,
  templateUrl: './notary-bonds.html',
  styleUrl: './notary-bonds.scss',
})
export class NotaryBonds {
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
    { name: 'NOTARY_BONDS.BANNER.CHIPS.TRADITIONAL', icon: 'fas fa-car' },
    { name: 'NOTARY_BONDS.BANNER.CHIPS.ENOTARY', icon: 'fas fa-house' },
    { name: 'NOTARY_BONDS.BANNER.CHIPS.RON', icon: 'fas fa-building' },
    { name: 'NOTARY_BONDS.BANNER.CHIPS.NOTARY_EANDO', icon: 'fas fa-heart' },
    { name: 'NOTARY_BONDS.BANNER.CHIPS.MOBILE_NOTARY', icon: 'fas fa-notes-medical' },
    { name: 'NOTARY_BONDS.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  impactFactorsKeys = [
      'BOND_AMOUNT',
      'TERM_LENGTH',
      'COMMISSION_TYPE',
      'EANDO_BUNDLED',
      'CLAIMS_HISTORY',
      'DOCUMENT_VOLUME',
      'LOAN_SIGNING',
      'UNDERWRITING',
      'COUNTY_REGION',
      'STANDALONE_VS_PACKAGE'
  ];

  discountKeys = [
    'COMPLETE_APPLICATION',
    'RIGHT_AMOUNT',
    'BUNDLE',
    'COMPARE_CARRIERS',
    'FOUR_YEAR_TERM',
    'CLEAN_RECORD',
    'INDEPENDENT_AGENT',
    'APPLY_ONLINE',
    'RENEW_EARLY',
    'SPECIALIST'
  ];

  notCoveredKeys = [
    'INTENTIONAL_FRAUD',
    'PERSONAL_PROTECTION',
    'LEGAL_DEFENSE',
    'EXCEED_BOND_AMOUNT',
    'CLAIMS_EXCEEDING',
    'BUSINESS_LOSSES',
    'CYBER_ERRORS',
    'IDENTITY_THEFT',
    'EXPIRED_BOND',
    'OUTSIDE_AUTHORITY' 
  ];



  agentComparisonData = [
    'ACCESS_MULTIPLE',
    'SHOPS_LOWEST',
    'BUNDLES_EANDO',
    'TEXAS_REQUIREMENTS',
    'SAME_DAY',
    'BILINGUAL',
    'ALL_COMMISSIONS',
    'LOAN_SIGNING',
    'RENEWAL_REMINDERS',
    'COST_TO_YOU',
    'LOCAL_EXPERTISE',
    'LONG_TERM'
  ];


  factorComparisonKeys = [
    'WHO_PROTECTS',
    'REQUIRED_BY_LAW',
    'COVERS_ERRORS',
    'COVERS_MISCONDUCT',
    'LEGAL_DEFENSE',
    'PAYS_CLAIMS_DIRECTLY',
    'REIMBURSES_SURETY',
    'COVERAGE_AMOUNT',
    'ANNUAL_COST',
    'RECOMMENDED_FOR',
    'COVERS_RON',
    'BEST_FOR'
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
