import { Language } from '../../../services/language';
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


  constructor(public languageService: Language, private translate: TranslateService) { }

  // ngOnInit() {
  //   const data = this.translate.instant('SR22_INSURANCE.RATES.COMPANY_RATES.LIST');

  //   this.companyRates = data.map((item: any) => ({
  //     company: item.COMPANY,
  //     liability: itemLIABILITY_ONLY
  //     full: itemfull  //   }));

  //   const violationData = this.translate.instant('SR22_INSURANCE.RATES.VIOLATION_RATES.LIST');

  //   this.violationRates = violationData.map((item: any) => ({
  //    violation: item.VIOLATION,
  //     liability: item.MIN_COVERAGE,
  //     full: itemfull  //   }));

  //   const sr22VsFr44Data = this.translate.instant('SR22_INSURANCE.RATES.SR22_VS_FR44.LIST');

  //   this.sr22VsFr44Data = sr22VsFr44Data.map((item: any) => ({
  //     feature: item.FEATURE,
  //     sr22: item.SR22,
  //     fr44: item.FR44
  //   }));

  //   console.log('>', this.sr22VsFr44Data)
  // }



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

  companyRates = [
    { company: "<a href='https://www.statefarm.com/' class='inline-link' target='_blank'>State Farm</a>", liability: "$63/month", full: "$111/month" },
    { company: "<a href='https://mileauto.com/' class='inline-link' target='_blank'>Mile Auto</a>", liability: "$82/month", full: "$174/month" },
    { company: "<a href='https://www.allstate.com/' class='inline-link' target='_blank'>Allstate</a>", liability: "$89/month", full: "$158/month" },
    { company: "<a href='https://www.progressive.com/' class='inline-link' target='_blank'>Progressive</a>", liability: "$90/month", full: "$171/month" },
    { company: "<a href='https://www.geico.com/' class='inline-link' target='_blank'>GEICO</a>", liability: "$104/month", full: "$199/month" },
    { company: "<a href='https://www.usaa.com/?akredirect=true' class='inline-link' target='_blank'>USAA</a>", liability: "$112/month", full: "$198/month" },
    { company: "<a href='https://www.mercuryinsurance.com/' class='inline-link' target='_blank'>Mercury</a>", liability: "$122/month", full: "$188/month" },
    { company: "<a href='https://www.firstacceptance.com/' class='inline-link' target='_blank'>First Acceptance</a>", liability: "$127/month", full: "$301/month" },
    { company: "<a href='https://www.alinsco.com/' class='inline-link' target='_blank'>Alinsco</a>", liability: "$129/month", full: "$259/month" },
    { company: "<a href='https://lonestarfunds.com/' class='inline-link' target='_blank'>Lone Star</a>", liability: "$129/month", full: "$320/month" },
    { company: "<a href='https://freedomgeneral.com/' class='inline-link' target='_blank'>Freedom National</a>", liability: "$132/month", full: "$344/month" },
    { company: "<a href='https://www.dairylandinsurance.com/' class='inline-link' target='_blank'>Dairyland</a>", liability: "$132/month", full: "$354/month" },
    { company: "<a href='https://www.joinroot.com/' class='inline-link' target='_blank'>Root</a>", liability: "$134/month", full: "$231/month" },
    { company: "<a href='https://www.commonwealthcasualty.com/' class='inline-link' target='_blank'>Commonwealth Casualty</a>", liability: "$134/month", full: "$315/month" },
    { company: "<a href='https://www.thegeneral.com/' class='inline-link' target='_blank'>The General</a>", liability: "$136/month", full: "$263/month" },
    { company: "<a href='https://www.bristolwest.com/' class='inline-link' target='_blank'>Bristol West</a>", liability: "$138/month", full: "$276/month" },
    { company: "<a href='https://www.gainsco.com/' class='inline-link' target='_blank'>GAINSCO</a>", liability: "$139/month", full: "$279/month" },
    { company: "<a href='https://www.mendota-insurance.com/' class='inline-link' target='_blank'>Mendota</a>", liability: "$139/month", full: "$284/month" },
    { company: "<a href='https://www.covercube.com/' class='inline-link' target='_blank'>Covercube</a>", liability: "$142/month", full: "$336/month" },
    { company: "<a href='https://www.nationwide.com/' class='inline-link' target='_blank'>Nationwide</a>", liability: "$142/month", full: "$250/month" },
    { company: "<a href='https://www.assuranceamerica.com/' class='inline-link' target='_blank'>AssuranceAmerica</a>", liability: "$149/month", full: "$301/month" },
    { company: "<a href='https://www.clearcover.com/' class='inline-link' target='_blank'>Clearcover</a>", liability: "$150/month", full: "$244/month" },
    { company: "<a href='https://www.suncostins.com/' class='inline-link' target='_blank'>Sun Coast</a>", liability: "$152/month", full: "$289/month" },
    { company: "<a href='https://www.safeco.com/' class='inline-link' target='_blank'>Safeco</a>", liability: "$155/month", full: "$238/month" },
    { company: "<a href='https://www.nationalgeneral.com/' class='inline-link' target='_blank'>National General</a>", liability: "$160/month", full: "$273/month" },
    { company: "<a href='https://www.directauto.com/' class='inline-link' target='_blank'>Direct Auto</a>", liability: "$161/month", full: "$245/month" },
    { company: "<a href='https://www.ridewithloop.com/' class='inline-link' target='_blank'>Loop</a>", liability: "$162/month", full: "$305/month" },
    { company: "<a href='https://www.elephant.co.uk/' class='inline-link' target='_blank'>Elephant</a>", liability: "$165/month", full: "$261/month" },
    { company: "<a href='https://trexis.com/' class='inline-link' target='_blank'>Trexis One</a>", liability: "$176/month", full: "$367/month" },
    { company: "<a href='https://www.chubb.com/us-en/' class='inline-link' target='_blank'>Chubb</a>", liability: "$192/month", full: "$337/month" },
    { company: "<a href='https://www.21st.com/' class='inline-link' target='_blank'>21st Century</a>", liability: "$222/month", full: "$390/month" },
    { company: "<a href='https://www.libertymutual.com/' class='inline-link' target='_blank'>Liberty Mutual</a>", liability: "$289/month", full: "$376/month" }
  ];

  violationRates = [
    {
      violation: "Drivers With Multiple Speeding Tickets",
      liability: "$64/month",
      full: "$134/month"
    },
    {
      violation: "Drivers With Other Violations",
      liability: "$80/month",
      full: "$162/month"
    },
    {
      violation: "Senior Drivers With a Suspension",
      liability: "$104/month",
      full: "$205/month"
    },
    {
      violation: "Drivers With Racing Violation",
      liability: "$106/month",
      full: "$213/month"
    },
    {
      violation: "Drivers With Hit-And-Run Accident",
      liability: "$107/month",
      full: "$215/month"
    },
    {
      violation: "Most Drivers Needing SR-22",
      liability: "$108/month",
      full: "$217/month"
    },
    {
      violation: "Young Drivers With a Suspension",
      liability: "$121/month",
      full: "$253/month"
    }
  ];

  sr22VsFr44Data = [
    {
      feature: "Drivers With Multiple Speeding Tickets",
      sr22: "$64/month",
      fr44: "$134/month"
    },
    {
      feature: "Drivers With Other Violations",
      sr22: "$80/month",
      fr44: "$162/month"
    },
    {
      feature: "Senior Drivers With a Suspension",
      sr22: "$104/month",
      fr44: "$205/month"
    },
    {
      feature: "Drivers With Racing Violation",
      sr22: "$106/month",
      fr44: "$213/month"
    },
    {
      feature: "Drivers With Hit-And-Run Accident",
      sr22: "$107/month",
      fr44: "$215/month"
    },
    {
      feature: "Most Drivers Needing SR-22",
      sr22: "$108/month",
      fr44: "$217/month"
    },
    {
      feature: "Young Drivers With a Suspension",
      sr22: "$121/month",
      fr44: "$253/month"
    }
  ]


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

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
