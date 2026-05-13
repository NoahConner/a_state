import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-commercial-surety-bonds',
  standalone: false,
  templateUrl: './commercial-surety-bonds.html',
  styleUrl: './commercial-surety-bonds.scss',
})
export class CommercialSuretyBonds {

  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'COMMERCIAL_SURETY_BONDS.BANNER.CHIPS.LICENSE_PERMIT', icon: 'fas fa-car' },
    { name: 'COMMERCIAL_SURETY_BONDS.BANNER.CHIPS.COURT', icon: 'fas fa-house' },
    { name: 'COMMERCIAL_SURETY_BONDS.BANNER.CHIPS.FIDELITY', icon: 'fas fa-building' },
    { name: 'COMMERCIAL_SURETY_BONDS.BANNER.CHIPS.FINANCIAL_GUARANTEE', icon: 'fas fa-heart' },
    { name: 'COMMERCIAL_SURETY_BONDS.BANNER.CHIPS.PUBLIC_OFFICIAL', icon: 'fas fa-notes-medical' },
    { name: 'COMMERCIAL_SURETY_BONDS.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  impactFactorsKeys = [
    'BOND_TYPE',
    'CREDIT_SCORE',
    'FINANCIAL_STRENGTH',
    'EXPERIENCE',
    'INDUSTRY_RISK',
    'CLAIMS_HISTORY',
    'LICENSING_REQUIREMENTS',
    'ACTIVE_BONDS',
    'BOND_TERM',
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
    'PROPERTY_DAMAGE',
    'WORKER_INJURY',
    'THIRD_PARTY_BODILY_INJURY',
    'PROFESSIONAL_ERRORS',
    'CYBER_ATTACKS',
    'NATURAL_DISASTERS',
    'CRIMINAL_ACTS',
    'EXCEEDING_BOND_LIMITS',
    'UNRELATED_LOSSES',
    'EXPIRED_CANCELLATION'
  ];



  agentComparisonData = [
    'ACCESS_MULTIPLE',
    'SHOPS_LOWEST',
    'IMPERFECT_CREDIT',
    'LICENSING_REQUIREMENTS',
    'HANDLES_ALL_TYPES',
    'BILINGUAL',
    'LOCAL_EXPERTISE',
    'CLAIMS_COMPLIANCE',
    'MANAGES_MULTIPLE',
    'GROWTH_REVIEW',
    'COST_TO_YOU',
    'LONG_TERM'
  ];


  factorComparisonKeys = [
    'WHO_PROTECTS',
    'REQUIRED_BY_LAW',
    'COVERS_THIRD_PARTY_LOSSES',
    'COVERS_PROPERTY_DAMAGE',
    'COVERS_EMPLOYEE_DISHONESTY',
    'COVERS_PROFESSIONAL_ERRORS',
    'COVERS_BODILY_INJURY',
    'PREMIUM_REFUNDED',
    'MUST_REPAY_CLAIM',
    'COST_TYPE'
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
