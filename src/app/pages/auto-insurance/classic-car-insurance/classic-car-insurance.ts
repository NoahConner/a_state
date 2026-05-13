import { Language } from '../../../services/language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-classic-car-insurance',
  standalone: false,
  templateUrl: './classic-car-insurance.html',
  styleUrl: './classic-car-insurance.scss',
})
export class ClassicCarInsurance {
  optionalCoveragesChunks: any[][] = [];

  constructor(public languageService: Language, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadOptionalCoverages();
    });
    this.loadOptionalCoverages();
  }

  loadOptionalCoverages() {
    this.translate.get('AUTO_INSURANCE.COVERAGES.OPTIONAL.LIST').subscribe((list: any[]) => {
      if (Array.isArray(list)) {
        this.optionalCoveragesChunks = this.chunkArray(list, 3);
      }
    });
  }

  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'CLASSIC_CAR_INSURANCE.BANNER.CHIPS.MUSCLE', icon: 'fas fa-car' },
    { name: 'CLASSIC_CAR_INSURANCE.BANNER.CHIPS.VINTAGE', icon: 'fas fa-house' },
    { name: 'CLASSIC_CAR_INSURANCE.BANNER.CHIPS.CLASSIC_TRUCKS_PICKUPS', icon: 'fas fa-building' },
    { name: 'CLASSIC_CAR_INSURANCE.BANNER.CHIPS.CLASSIC_SPORTS_EXOTICS', icon: 'fas fa-heart' },
    { name: 'CLASSIC_CAR_INSURANCE.BANNER.CHIPS.HOT_RODS_CUSTOM', icon: 'fas fa-notes-medical' },
    { name: 'CLASSIC_CAR_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { city: 'Houston', monthly: '$265', annual: '$3,153' },
    { city: 'San Antonio', monthly: '$232', annual: '$2,782' },
    { city: 'Dallas', monthly: '$262', annual: '$3,146' },
    { city: 'Austin', monthly: '$218', annual: '$2,616' },
    { city: 'Fort Worth', monthly: '$229', annual: '$2,750' },
    { city: 'El Paso', monthly: '$220', annual: '$2,646' },
    { city: 'Arlington', monthly: '$237', annual: '$2,839' },
    { city: 'Corpus Christi', monthly: '$221', annual: '$2,657' },
    { city: 'Plano', monthly: '$224', annual: '$2,688' },
    { city: 'Lubbock', monthly: '$216', annual: '$2,592' },
  ];

  companyRates = [
    { company: 'State Farm', liability: '$57', full: '$201' },
    { company: 'Progressive', liability: '$80', full: '$241' },
    { company: 'Allstate', liability: '$81', full: '$243' },
    { company: 'Mile Auto', liability: '$74', full: '$157' },
    { company: 'Mercury', liability: '$102', full: '$171' },
    { company: 'USAA', liability: '$102', full: '$180' },
    { company: 'GEICO', liability: '$95', full: '$181' },
    { company: 'Root', liability: '$121', full: '$209' },
    { company: 'Safeco', liability: '$141', full: '$216' },
    { company: 'Clearcover', liability: '$125', full: '$251' },
    { company: 'Direct Auto', liability: '$146', full: '$224' },
    { company: 'Nationwide', liability: '$119', full: '$227' },
    { company: 'Amica', liability: '$118', full: '$235' },
    { company: 'Elephant', liability: '$150', full: '$236' },
    { company: 'The General', liability: '$125', full: '$239' },
    { company: 'National General', liability: '$146', full: '$243' },
    { company: 'Bristol West', liability: '$135', full: '$250' },
    { company: 'GAINSCO', liability: '$127', full: '$134' },
    { company: 'Mendota', liability: '$136', full: '$257' },
    { company: 'Sun Coast', liability: '$138', full: '$261' },
    { company: 'AssuranceAmerica', liability: '$135', full: '$275' },
    { company: 'First Acceptance', liability: '$121', full: '$209' },
    { company: 'Loop', liability: '$147', full: '$277' },
    { company: 'Commonwealth Casualty', liability: '$132', full: '$288' },
    { company: 'Lone Star', liability: '$137', full: '$291' },
    { company: 'Covercube', liability: '$127', full: '$300' },
    { company: 'Chubb', liability: '$176', full: '$306' },
    { company: 'Freedom National', liability: '$121', full: '$314' },
    { company: 'Texas One', liability: '$156', full: '$357' },
    { company: 'Dairyland', liability: '$130', full: '$338' },
    { company: 'Liberty Mutual', liability: '$112', full: '$341' },
    { company: '21st Century', liability: '$101', full: '$354' },
  ];

  cheapestVehicles = [
    { make: 'Honda', price: '$161' },
    { make: 'Acura', price: '$167' },
    { make: 'Subaru', price: '$168' },
    { make: 'Hyundai', price: '$180' },
    { make: 'Ford', price: '$185' },
    { make: 'Toyota', price: '$185' },
  ];

  expensiveVehicles = [
    { make: 'Maserati', price: '$411' },
    { make: 'Lotus', price: '$444' },
    { make: 'Lamborghini', price: '$502' },
    { make: 'Aston Martin', price: '$548' },
    { make: 'Ferrari', price: '$913' },
  ];

  driverRates = [
    { profile: 'Clean Record', quote: '$178', comparison: 'Baseline' },
    { profile: 'With Accident', quote: '$246', comparison: '+38%' },
    { profile: 'With Speeding Ticket', quote: '$236', comparison: '+33%' },
    { profile: 'With DUI', quote: '$282', comparison: '+58%' },
  ];

  coverageComparison = [
    { feature: 'Meets Texas legal requirements', min: '✓ Yes', full: '✓ Yes' },
    { feature: 'Covers your car repairs', min: '✗ No', full: '✓ Yes' },
    { feature: 'Covers weather damage', min: '✗ No', full: '✓ Yes' },
    { feature: 'Covers theft & vandalism', min: '✗ No', full: '✓ Yes' },
    { feature: 'Covers your medical bills', min: '✗ No', full: '— With PIP/MedPay' },
    { feature: 'Required by lenders', min: '✗ No', full: '✓ Yes' },
    { feature: 'Monthly cost', min: '$ Lower', full: '$$ Higher' },
  ];

  impactFactorsKeys = [
    "AGREED_VALUE",
    "VEHICLE_AGE_ERA",
    "MAKE_MODEL_RARITY",
    "CONDITION_RESTORATION",
    "ANNUAL_MILEAGE",
    "USAGE_STORAGE",
    "OPERATOR_AGE_EXPERIENCE",
    "DRIVING_RECORD",
    "CLAIMS_HISTORY",
    "MULTIPLE_VEHICLES",
    "COVERAGE_DEDUCTIBLE",
    "MODIFICATIONS_CUSTOM_PARTS",
    "SHOW_EXHIBITION",
    "GEO_LOCATION",
    "INSURANCE_HISTORY",
    "CLUB_MEMBERSHIP",
    "APPRAISAL_DOCUMENTATION"
  ];

  discountKeys = [
    "MULTI_VEHICLE",
    "MULTI_POLICY",
    "SECURE_STORAGE",
    "LOW_MILEAGE",
    "CLAIM_FREE",
    "PAID_FULL",
    "AUTO_PAY",
    "PAPERLESS",
    "LOYALTY",
    "CLUB_MEMBERSHIP",
    "AGREED_VALUE_APPRAISAL",
    "ANTI_THEFT",
    "EXPERIENCED_COLLECTOR",
    "MULTI_YEAR_POLICY",
    "VEHICLE_SAFETY",
    "MILITARY_OCCUPATION",
    "EARLY_SIGNING",
    "RESTORATION_COMPLETION"
  ];

  agentComparisonData = [
    "NUMBER_OF_COMPANIES",
    "PRICE_COMPARISON",
    "AGREED_VALUE_EXPERTISE",
    "CLASSIC_CAR_TYPES",
    "CUSTOM_HOT_ROD_COVERAGE",
    "RESTORATION_COVERAGE",
    "AGREED_VALUE_APPRAISAL",
    "INFLATION_GUARD",
    "CAR_SHOW_EXHIBITION",
    "HIGH_VALUE_CLASSICS",
    "MULTI_CLASSIC_DISCOUNTS",
    "CLUB_ASSOCIATION_DISCOUNTS",
    "LOYALTY_TO_YOU",
    "RATE_SHOPPING_RENEWAL",
    "CLAIMS_ADVOCACY",
    "SWITCHING_CARRIERS",
    "LOCAL_KNOWLEDGE",
    "MULTILINGUAL_SUPPORT"
  ];

  classicCarData = [
    "VALUATION_METHOD",
    "PAYOUT_AFTER_TOTAL_LOSS",
    "USAGE_RESTRICTIONS",
    "ANNUAL_MILEAGE",
    "PARTS_REPLACEMENT",
    "STORAGE_REQUIREMENTS",
    "PREMIUM_COST",
    "VEHICLE_AGE_ELIGIBILITY",
    "RESTORATION_COVERAGE",
    "CAR_SHOW_COVERAGE",
    "SPARE_PARTS_COVERAGE",
    "INFLATION_GUARD"
  ];

  agreedValueData = [
    "HOW_VALUE_IS_SET",
    "PAYOUT_AFTER_TOTAL_LOSS",
    "DEPRECIATION_APPLIED",
    "WHO_BENEFITS_MOST",
    "BEST_FOR",
    "PREMIUM_COST",
    "PAYOUT_PREDICTABILITY",
    "NEGOTIATION_AFTER_CLAIM",
    "INFLATION_PROTECTION",
    "PARTS_RESTORATION",
    "RECOMMENDED_FOR_CLASSIC_CARS"
  ];

  vehicleInsuranceTypes = [
    "SEDANS",
    "SUVS_CROSSOVERS",
    "TRUCKS_PICKUPS",
    "SPORTS_PERFORMANCE",
    "EVS",
    "HYBRIDS",
    "MINIVANS_VANS",
    "MODIFIED_CUSTOM",
    "CLASSIC_CAR",
    "COMMERCIAL_AUTO",
    "SR22"
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
