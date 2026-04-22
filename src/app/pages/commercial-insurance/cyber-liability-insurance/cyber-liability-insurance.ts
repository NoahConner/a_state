import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cyber-liability-insurance',
  standalone: false,
  templateUrl: './cyber-liability-insurance.html',
  styleUrl: './cyber-liability-insurance.scss',
})
export class CyberLiabilityInsurance {


  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'CYBER_LIABILITY_INSURANCE.BANNER.CHIPS.DATA_BREACH', icon: 'fas fa-car' },
    { name: 'CYBER_LIABILITY_INSURANCE.BANNER.CHIPS.RANSOMWARE', icon: 'fas fa-house' },
    { name: 'CYBER_LIABILITY_INSURANCE.BANNER.CHIPS.BUSINESS_INTERRUPTION', icon: 'fas fa-building' },
    { name: 'CYBER_LIABILITY_INSURANCE.BANNER.CHIPS.NETWORK_SECURITY', icon: 'fas fa-heart' },
    { name: 'CYBER_LIABILITY_INSURANCE.BANNER.CHIPS.MEDIA_LIABILITY', icon: 'fas fa-notes-medical' },
    { name: 'CYBER_LIABILITY_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];


  impactFactorsKeys = [
    'DATA_VOLUME',
    'INDUSTRY_TYPE',
    'BUSINESS_SIZE',
    'CLAIMS_HISTORY',
    'CYBERSECURITY',
    'TRAINING',
    'MFA',
    'THIRD_PARTY_ACCESS',
    'COVERAGE_LIMIT',
    'REMOTE_WORK'
  ];


  discountKeys = [
    'MFA',
    'EDR',
    'EMPLOYEE_TRAINING',
    'SOFTWARE_UPDATES',
    'DATA_ENCRYPTION',
    'INCIDENT_RESPONSE',
    'DATA_BACKUPS',
    'ACCESS_CONTROL',
    'BUNDLING',
    'HIGHER_DEDUCTIBLE',
    'INDEPENDENT_AGENT',
    'CLAIMS_HISTORY'
  ];



  notCoveredKeys = [
    'PRIOR_KNOWN_INCIDENTS',
    'BODILY_INJURY_PROPERTY_DAMAGE',
    'INTENTIONAL_ACTS',
    'HARDWARE_INFRASTRUCTURE',
    'INTELLECTUAL_PROPERTY',
    'CYBER_WARFARE',
    'UNSECURED_SYSTEMS',
    'THIRD_PARTY_VENDORS',
    'REPUTATIONAL_DAMAGE',
    'INSIDER_FRAUD'
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
    'CYBER_MARKET_KNOWLEDGE'
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


  firstVsThirdPartyComparisonData = [
    'WHAT_IT_COVERS',
    'WHO_IT_PROTECTS',
    'CLAIM_EXAMPLES',
    'DEFENSE_COSTS',
    'NOTIFICATION_COSTS',
    'REGULATORY_FINES',
    'BUSINESS_INTERRUPTION',
    'CRISIS_MANAGEMENT',
    'CREDIT_MONITORING',
    'WHO_NEEDS_IT'
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
