import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-atv-utv-insurance',
  standalone: false,
  templateUrl: './atv-utv-insurance.html',
  styleUrl: './atv-utv-insurance.scss',
})
export class AtvAndUtvInsurance {
  optionalCoveragesChunks: any[][] = [];

  constructor(private translate: TranslateService) { }

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
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SEDAN', icon: 'fas fa-car' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SUV_CROSSOVER', icon: 'fas fa-house' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.TRUCK_PICKUP', icon: 'fas fa-building' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SPORTS_PERFORMANCE', icon: 'fas fa-heart' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.ELECTRIC_VEHICLE', icon: 'fas fa-notes-medical' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    "DRIVING_RECORD",
    "CREDIT_SCORE",
    "LOCATION",
    "AGE_EXPERIENCE",
    "GENDER",
    "MARITAL_STATUS",
    "VEHICLE_TYPE",
    "VEHICLE_CONDITION",
    "ANNUAL_MILEAGE",
    "INSURANCE_HISTORY",
    "CLAIMS_HISTORY",
    "COVERAGE_DEDUCTIBLE",
    "VEHICLE_USE",
    "SAFETY_FEATURES",
    "SR22"
  ]

  discountKeys = [
    'BUNDLING',
    'VEHICLE_SAFETY',
    'MULTI_CAR',
    'HOMEOWNER',
    'SAFE_DRIVER',
    'VEHICLE_USE',
    'GOOD_STUDENT',
    'MILITARY',
    'DEFENSIVE_DRIVING',
    'STUDENT_AWAY',
    'TELEMATICS',
    'LOYALTY',
    'PAID_FULL',
    'LOW_MILEAGE',
    'AUTO_PAY',
    'EARLY_SIGNING',
    'PAPERLESS',
    'SENIOR',
    'ANTI_THEFT',
    'GOOD_CREDIT',
    'NEW_VEHICLE'
  ];
  agentComparisonData = [
    "NUMBER_OF_COMPANIES",
    "PRICE_COMPARISON",
    "COVERAGE_OPTIONS",
    "HIGH_RISK",
    "SR22",
    "BAD_CREDIT",
    "VIOLATIONS",
    "CUSTOMIZATION",
    "LOYALTY",
    "RENEWAL_SHOPPING",
    "CLAIMS_ADVOCACY",
    "MULTI_VEHICLE",
    "SWITCHING",
    "BUNDLING",
    "LOCAL_KNOWLEDGE",
    "LANGUAGE_SUPPORT"
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
}
