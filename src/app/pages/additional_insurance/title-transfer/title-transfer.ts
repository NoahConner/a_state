import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-title-transfer',
  standalone: false,
  templateUrl: './title-transfer.html',
  styleUrl: './title-transfer.scss',
})
export class TitleTransfer {

  constructor(public languageService: Language, private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'TITLE_TRANSFER.BANNER.CHIPS.REAL_ESTATE', icon: 'fas fa-car' },
    { name: 'TITLE_TRANSFER.BANNER.CHIPS.VEHICLE', icon: 'fas fa-house' },
    { name: 'TITLE_TRANSFER.BANNER.CHIPS.GIFT', icon: 'fas fa-building' },
    { name: 'TITLE_TRANSFER.BANNER.CHIPS.INHERITANCE', icon: 'fas fa-heart' },
    { name: 'TITLE_TRANSFER.BANNER.CHIPS.QUITCLAIM', icon: 'fas fa-notes-medical' },
    { name: 'TITLE_TRANSFER.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  impactFactorsKeys = [
    'TYPE_OF_TRANSFER',
    'BID_AMOUNT',
    'CREDIT_SCORE',
    'PROJECT_TYPE',
    'PUBLIC_VS_PRIVATE',
    'FINANCIAL_STRENGTH',
    'OUTSTANDING_LIENS',
    'TITLE_INSURANCE',
    'RECORDING_FEES',
    'STATE_TAXES'
  ];





  discountKeys = [
    'SIMULTANEOUS_RATE',
    'CREDIT',
    'FINANCIALS',
    'TRACK_RECORD',
    'CASH_RESERVES',
    'CLAIMS_HISTORY',
    'FILE_PROMPTLY',
    'START_SMALL',
    'LOCAL_SPECIALIST',
    'INDEPENDENT_AGENT'
  ];




  notCoveredKeys = [
    'POOR_WORKMANSHIP',
    'NON_PAYMENT_SUBS',
    'WORKER_INJURY',
    "THIRD_PARTY_DAMAGE",
    "EQUIPMENT_THEFT",
    "DESIGN_ERRORS",
    "FORCE_MAJEURE",
    "CHANGE_ORDERS",
    "CONTRACTOR_INSOLVENCY",
    "ENVIRONMENTAL"



  ];




  agentComparisonData = [
    'ACCESS_MULTIPLE',
    'SHOPS_LOWEST',
    'HANDLES_ALL_TYPES',
    'COUNTY_REQUIREMENTS',
    'COORDINATES',
    'BILINGUAL',
    'CLEARS_LIENS',
    'BUNDLES',
    'SUPPORTS_TRANSACTIONS',
    'GUIDES_HEIRS',
    'COST_TO_YOU',
    'LONG_TERM_SUPPORT'
  ];


  factorComparisonKeys = [
    'WHAT_IT_DOES',
    'TITLE_GUARANTEE',
    'REQUIRES_TITLE_SEARCH',
    'USED_IN_HOME_SALES',
    'USED_IN_DIVORCE',
    'USED_IN_INHERITANCE',
    'LENDER_APPROVAL',
    'TITLE_INSURANCE_RECOMMENDED',
    'FILING_REQUIRED',
    'LEGAL_COMPLEXITY',

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
