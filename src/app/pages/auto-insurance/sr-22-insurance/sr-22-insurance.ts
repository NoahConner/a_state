import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sr-22-insurance',
  standalone: false,
  templateUrl: './sr-22-insurance.html',
  styleUrl: './sr-22-insurance.scss',
})
export class Sr22Insurance {
  optionalCoveragesChunks: any[][] = [];
  companyRates: any[] = [];
  violationRates: any[] = [];
  sr22VsFr44Data: any[] = [];


  constructor(private translate: TranslateService) { }

  ngOnInit() {
    const data = this.translate.instant('SR22_INSURANCE.RATES.COMPANY_RATES.LIST');

    this.companyRates = data.map((item: any) => ({
      company: item.COMPANY,
      liability: item.LIABILITY_ONLY,
      full: item.FULL_COVERAGE
    }));

    const violationData = this.translate.instant('SR22_INSURANCE.RATES.VIOLATION_RATES.LIST');

    this.violationRates = violationData.map((item: any) => ({
      violation: item.VIOLATION,
      liability: item.MIN_COVERAGE,
      full: item.FULL_COVERAGE
    }));

    const sr22VsFr44Data = this.translate.instant('SR22_INSURANCE.RATES.SR22_VS_FR44.LIST');

    this.sr22VsFr44Data = sr22VsFr44Data.map((item: any) => ({
      feature: item.FEATURE,
      sr22: item.SR22,
      fr44: item.FR44
    }));

    console.log('>', this.sr22VsFr44Data)
  }



  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'SR22_INSURANCE.BANNER.CHIPS.OWNER', icon: 'fas fa-car' },
    { name: 'SR22_INSURANCE.BANNER.CHIPS.NON_OWNER', icon: 'fas fa-house' },
    { name: 'SR22_INSURANCE.BANNER.CHIPS.DUI_DWI', icon: 'fas fa-building' },
    { name: 'SR22_INSURANCE.BANNER.CHIPS.UNINSURED_ACCIDENT', icon: 'fas fa-heart' },
    { name: 'SR22_INSURANCE.BANNER.CHIPS.LICENSE_REINSTATEMENT', icon: 'fas fa-notes-medical' },
    { name: 'SR22_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];




  averageRates = [
    { city: 'Houston', price: '$128' },
    { city: 'San Antonio', price: '$117' },
    { city: 'Dallas', price: '$121' },
    { city: 'Austin', price: '$103' },
    { city: 'Fort Worth', price: '$109' },
    { city: 'El Paso', price: '$101' },
    { city: 'Arlington', price: '$113' },
    { city: 'Corpus Christi', price: '$112' },
    { city: 'Plano', price: '$111' },
    { city: 'Lubbock', price: '$94' },
  ];




  impactFactorsKeys = [
    "TYPE_SEVERITY_VIOLATION",
    "NUMBER_OF_VIOLATIONS",
    "TIME_SINCE_VIOLATION",
    "DUI_DWI_VS_OTHER",
    "AGE_EXPERIENCE",
    "CREDIT_SCORE",
    "LOCATION_ZIP",
    "VEHICLE_TYPE",
    "COVERAGE_LEVEL",
    "INSURANCE_LAPSES",
    "PRIOR_SR22_HISTORY",
    "ANNUAL_MILEAGE",
    "GENDER",
    "MARITAL_STATUS",
    "INSURANCE_CARRIER",
    "FILING_TYPE",
    "CONTINUOUS_COVERAGE"
  ]



  discountKeys = [
    'SHOP_MULTIPLE_CARRIERS',
    'AUTOPAY_SETUP',
    'CONTINUOUS_COVERAGE',
    'HIGHER_DEDUCTIBLE',
    'LOW_MILEAGE',
    'CREDIT_IMPROVEMENT',
    'DEFENSIVE_DRIVING',
    'NO_ADDITIONAL_VIOLATIONS',
    'MINIMUM_COVERAGE',
    'ANNUAL_PAYMENT',
    'COVERAGE_OPTIMIZATION',
    'LOW_MILEAGE_DISCOUNT',
    'REQUOTE_EVERY_6_MONTHS',
    'BUNDLE_POLICIES',
    'MAINTAIN_SR22_PERIOD'
  ];


  agentComparisonData = [
    "NUMBER_OF_CARRIERS",
    "PRICE_COMPARISON",
    "SR22_ELIGIBILITY",
    "HIGH_RISK_APPROVAL",
    "NON_OWNER_SR22",
    "SR22_FILING_SPEED",
    "RATE_SHOPPING",
    "LAPSE_PREVENTION",
    "COVERAGE_CUSTOMIZATION",
    "CARRIER_RELATIONSHIPS",
    "MULTIPLE_VIOLATIONS",
    "DUI_DWI_SUPPORT",
    "FR44_TRANSITION",
    "LOYALTY",
    "CLAIMS_ADVOCACY",
    "SWITCHING_CARRIERS",
    "LOCAL_TEXAS_EXPERTISE",
    "MULTILINGUAL_SUPPORT"
  ];



  needsSR22 = [
    "WHAT_IT_IS",
    "IS_IT_POLICY",
    "WHO_REQUIRES_IT",
    "WHO_NEEDS_IT",
    "FILING_WITH_STATE",
    "COST_IMPACT",
    "COVERAGE_PROVIDED",
    "DURATION_REQUIREMENT",
    "LAPSE_CONSEQUENCES",
    "WHO_FILES_IT",
    "NON_OWNER_OPTION",
    "REMOVAL_PROCESS"
  ];



  vehicleInsuranceTypes = [
    "OWNER_SR22",
    "NON_OWNER_SR22",
    "OPERATOR_SR22",
    "ELECTRONIC_SR22",
    "PAPER_SR22"
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
    'FAQ5',
    'FAQ6',
    'FAQ7',
    'FAQ8',
  ];
}
