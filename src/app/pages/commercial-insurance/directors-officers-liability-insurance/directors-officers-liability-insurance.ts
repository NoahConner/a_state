import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-directors-officers-liability-insurance',
  standalone: false,
  templateUrl: './directors-officers-liability-insurance.html',
  styleUrl: './directors-officers-liability-insurance.scss',
})
export class DirectorsOfficersLiabilityInsurance {


  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'DIRECTORS_&_OFFICERS_INSURANCE.BANNER.CHIPS.PERSONAL_PROTECTION', icon: 'fas fa-car' },
    { name: 'DIRECTORS_&_OFFICERS_INSURANCE.BANNER.CHIPS.CORPORATE_REIMBURSEMENT', icon: 'fas fa-house' },
    { name: 'DIRECTORS_&_OFFICERS_INSURANCE.BANNER.CHIPS.ENTITY_SECURITIES', icon: 'fas fa-building' },
    { name: 'DIRECTORS_&_OFFICERS_INSURANCE.BANNER.CHIPS.EPL', icon: 'fas fa-heart' },
    { name: 'DIRECTORS_&_OFFICERS_INSURANCE.BANNER.CHIPS.FIDUCIARY', icon: 'fas fa-notes-medical' },
    { name: 'DIRECTORS_&_OFFICERS_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  impactFactorsKeys = [
    'COMPANY_SIZE_REVENUE',
    'INDUSTRY_RISK',
    'CLAIMS_HISTORY',
    'FINANCIAL_HEALTH',
    'NUMBER_OF_EXECUTIVES',
    'BUSINESS_STRUCTURE',
    'GOVERNANCE',
    'M_A_ACTIVITY',
    'COVERAGE_DEDUCTIBLES',
    'COMPLIANCE_HISTORY'
  ];



  discountKeys = [
'GOVERNANCE',
'FINANCIAL_RECORDS',
'RISK_COMMITTEE',
'CLAIMS_HISTORY',
'WHISTLEBLOWER_POLICY',
'BOARD_TRAINING',
'EXPERIENCED_DIRECTORS',
'HIGHER_DEDUCTIBLE',
'BUNDLING',
'INDEPENDENT_AGENT'
  ];

 


  notCoveredKeys = [
    'FRAUD_CRIMINAL',
    'BODILY_INJURY_PROPERTY',
    'PRIOR_KNOWN',
    'POLLUTION',
    'ILLEGAL_PROFIT',
    'ERISA',
    'INSURED_VS_INSURED',
    'PENSION',
    'CONTRACTUAL',
    'WAR_TERRORISM'
  ];



  agentComparisonData = [
'CARRIERS',
'QUOTE_COMPARISON',
'COVERAGE_OPTIONS',
'PRICING',
'INDUSTRY_EXPERTISE',
'HARD_TO_PLACE',
'CUSTOMIZATION',
'CLAIMS_ADVOCACY',
'RENEWALS',
'NONPROFIT_PRIVATE_KNOWLEDGE'



  ];

   
  bopVsGlComparisonData = [
    "WHAT_IT_COVERS",
    "WHO_IT_PROTECTS",
    "CLAIM_EXAMPLES",
    "DEFENSE_COSTS",
    "PERSONAL_ASSET_PROTECTION",
    'FINANCIAL_LOSSES',
    'PHYSICAL_INJURIES',
    'WHO_CAN_SUE',
    'REQUIRED_BY_LAW',
    'WHO_NEEDS_IT'



  ];



  firstVsThirdPartyComparisonData = [
    'WHAT_IT_COVERS',
    'WHO_IT_PROTECTS',
    'WHEN_IT_APPLIES',
    'PERSONAL_ASSET_PROTECTION',
    'WHO_CAN_SUE',
    'DEFENSE_COSTS',
    'COMMON_CLAIMANTS',
    'PUBLIC_COMPANIES',
    'NONPROFITS',
    'WHO_NEEDS_IT'
  ];

  doSideData = [
    'UNDER_10M',
    'TEN_TO_FIFTY_M',
    'FIFTY_TO_HUNDRED_M',
    'OVER_100M',
    'PUBLIC_COMPANIES'
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
