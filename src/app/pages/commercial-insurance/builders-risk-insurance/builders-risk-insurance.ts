import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-builders-risk-insurance',
  standalone: false,
  templateUrl: './builders-risk-insurance.html',
  styleUrl: './builders-risk-insurance.scss',
})
export class BuildersRiskInsurance {


  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'BUILDERS_RISK_INSURANCE.BANNER.CHIPS.NEW_HOME_CONSTRUCTION', icon: 'fas fa-car' },
    { name: 'BUILDERS_RISK_INSURANCE.BANNER.CHIPS.COMMERCIAL_CONSTRUCTION', icon: 'fas fa-house' },
    { name: 'BUILDERS_RISK_INSURANCE.BANNER.CHIPS.RENOVATION_REMODELING', icon: 'fas fa-building' },
    { name: 'BUILDERS_RISK_INSURANCE.BANNER.CHIPS.INSTALLATION', icon: 'fas fa-heart' },
    { name: 'BUILDERS_RISK_INSURANCE.BANNER.CHIPS.VACANT_LAND_LOT', icon: 'fas fa-notes-medical' },
    { name: 'BUILDERS_RISK_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];


  impactFactorsKeys = [
    'PROJECT_TYPE',
    'PROJECT_VALUE',
    'MATERIALS_USED',
    'LOCATION',
    'TIMELINE',
    'CONTRACTOR_EXPERIENCE',
    'CLAIMS_HISTORY',
    'SECURITY',
    'COVERAGE_DEDUCTIBLE',
    'FIRE_PROXIMITY'
  ];



  discountKeys = [
    'SECURITY_CAMERAS',
    'FIRE_MATERIALS',
    'EXPERIENCED_CONTRACTORS',
    'CLAIMS_HISTORY',
    'SAFETY_PLAN',
    'MATERIAL_STORAGE',
    'ON_TIME_COMPLETION',
    'HIGHER_DEDUCTIBLE',
    'BUNDLING',
    'INDEPENDENT_AGENT'
  ];




  notCoveredKeys = [
    'EMPLOYEE_THEFT',
    'MECHANICAL_BREAKDOWN',
    'FAULTY_WORKMANSHIP',
    'EARTHQUAKE',
    'FLOOD_DAMAGE',
    'TOOLS_EQUIPMENT',
    'BODILY_INJURY',
    'COMPLETED_STRUCTURES',
    'WAR_GOVERNMENT',
    'NORMAL_WEAR_TEAR'
  ];


  agentComparisonData = [
    'CARRIERS',
    'QUOTE_COMPARISON',
    'COVERAGE_OPTIONS',
    'PRICING',
    'PROJECT_FLEXIBILITY',
    'HARD_TO_PLACE',
    'CUSTOMIZATION',
    'CLAIMS_ADVOCACY',
    'RENEWALS',
    'MARKET_KNOWLEDGE'
  ];



  bopVsGlComparisonData = [
    'WHAT_IT_COVERS',
    'WHO_IT_PROTECTS',
    'CLAIM_EXAMPLES',
    'DEFENSE_COSTS',
    'COVERAGE_PERIOD',
    'MATERIALS_COVERAGE',
    'EQUIPMENT_COVERAGE',
    'THIRD_PARTY_INJURIES',
    'REQUIRED_BY_LENDERS',
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
