import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bid-bonds',
  standalone: false,
  templateUrl: './bid-bonds.html',
  styleUrl: './bid-bonds.scss',
})
export class BidBonds {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'BID_BONDS.BANNER.CHIPS.PUBLIC_CONSTRUCTION', icon: 'fas fa-car' },
    { name: 'BID_BONDS.BANNER.CHIPS.PRIVATE_CONSTRUCTION', icon: 'fas fa-house' },
    { name: 'BID_BONDS.BANNER.CHIPS.FEDERAL_PROJECT', icon: 'fas fa-building' },
    { name: 'BID_BONDS.BANNER.CHIPS.STATE_MUNICIPAL', icon: 'fas fa-heart' },
    { name: 'BID_BONDS.BANNER.CHIPS.SUBCONTRACTOR', icon: 'fas fa-notes-medical' },
    { name: 'BID_BONDS.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  


  impactFactorsKeys = [
    'BID_AMOUNT',
    'CREDIT_SCORE',
    'PROJECT_TYPE',
    'PUBLIC_VS_PRIVATE',
    'FINANCIAL_STRENGTH',
    'EXPERIENCE',
    'CLAIMS_HISTORY',
    'COMPLEXITY',
    'OUTSTANDING_BONDS',
    'UNDERWRITING'
  ];



  discountKeys = [
    'CREDIT',
    'FINANCIALS',
    'TRACK_RECORD',
    'CASH_RESERVES',
    'CLAIMS_HISTORY',
    'EARLY_RENEWAL',
    'BUNDLE',
    'INDEPENDENT_AGENT',
    'RELATIONSHIP',
    'SPECIALIST'
  ];

   
  notCoveredKeys = [
    'POOR_WORKMANSHIP',
    'NON_PAYMENT_SUBS',
    'WORKER_INJURY',
    'THIRD_PARTY_DAMAGE',
    'EQUIPMENT_THEFT',
    'DESIGN_ERRORS',
    'FORCE_MAJEURE',
    'CHANGE_ORDERS',
    'CONTRACTOR_INSOLVENCY',
    'ENVIRONMENTAL'
  ];

  


  agentComparisonData = [
    'ACCESS_MULTIPLE',
    'SHOPS_LOWEST',
    'IMPERFECT_CREDIT',
    'LITTLE_MILLER',
    'TIGHT_DEADLINES',
    'BILINGUAL',
    'LOCAL_EXPERTISE',
    'TRANSITION_BONDS',
    'ALL_PROJECT_TYPES',
    'GROWTH_REVIEW',
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
