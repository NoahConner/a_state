import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-performance-bonds-payment-bonds',
  standalone: false,
  templateUrl: './performance-bonds-payment-bonds.html',
  styleUrl: './performance-bonds-payment-bonds.scss',
})
export class PerformanceBondsPaymentBonds {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'BOND_MARKETPLACE.BANNER.CHIPS.FEDERAL', icon: 'fas fa-car' },
    { name: 'BOND_MARKETPLACE.BANNER.CHIPS.STATE_MUNICIPAL', icon: 'fas fa-house' },
    { name: 'BOND_MARKETPLACE.BANNER.CHIPS.SUBDIVISION', icon: 'fas fa-building' },
    { name: 'BOND_MARKETPLACE.BANNER.CHIPS.SITE_IMPROVEMENT', icon: 'fas fa-heart' },
    { name: 'BOND_MARKETPLACE.BANNER.CHIPS.SUPPLY_MATERIAL', icon: 'fas fa-notes-medical' },
    { name: 'BOND_MARKETPLACE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];


  impactFactorsKeys = [
    'CONTRACT_SIZE',
    'CREDIT_SCORE',
    'EXPERIENCE',
    'FINANCIAL_STRENGTH',
    'PROJECT_TYPE',
    'PUBLIC_VS_PRIVATE',
    'CLAIMS_HISTORY',
    'LIQUIDITY',
    'COMPLEXITY',
    'UNDERWRITING'
  ];

 
  discountKeys = [
'CREDIT',
'FINANCIALS',
'TRACK_RECORD',
'CASH_RESERVES',
'CLAIMS_HISTORY',
'RELATIONSHIP',
'LICENSE',
'INDEPENDENT_AGENT',
'BUNDLE',
'SPECIALIST'
  ];


  notCoveredKeys = [
    'NEGLIGENCE',
    'WORKER_INJURY',
    'THIRD_PARTY_DAMAGE',
    'THEFT',
    'DESIGN_ERRORS',
    'CHANGE_ORDERS',
    'FORCE_MAJEURE',
    'ENVIRONMENTAL',
    'DELAY_PENALTIES',
    'SUBCONTRACTOR_DISPUTES'
  ];

  
  agentComparisonData = [
    'ACCESS_MULTIPLE',
    'SHOPS_LOWEST',
    'IMPERFECT_CREDIT',
    'LITTLE_MILLER',
    'LARGE_PROJECTS',
    'BILINGUAL',
    'LOCAL_EXPERTISE',
    'CLAIMS_SUPPORT',
    'BID_TO_FINAL',
    'CAPACITY_REVIEW',
    'COST_TO_YOU',
    'LONG_TERM'
  ];

  factorComparisonKeys = [
  'WHO_PROTECTS',
  'WHEN_REQUIRED',
  'GUARANTEES',
  'PUBLIC_PROJECTS',
  'PRIVATE_PROJECTS',
  'TRIGGERED_BY',
  'COVERAGE_DURATION',
  'COST_RANGE',
  'LITTLE_MILLER',
  'ISSUED_BY'
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

}
