import { Language } from '../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auto-insurance',
  standalone: false,
  templateUrl: './auto-insurance.html',
  styleUrl: './auto-insurance.scss',
})
export class AutoInsurance implements OnInit {
  termsAccepted = false;
  termsAccepted2 = false;
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
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.PERSONAL_CAR', icon: 'fas fa-car' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.COMMERCIAL_AUTO', icon: 'fas fa-house' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RIDESHARE', icon: 'fas fa-building' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.SR22', icon: 'fas fa-heart' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RV_MOTORHOME', icon: 'fas fa-notes-medical' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    { company: '<a href="https://www.statefarm.com/" rel="nofollow">State Farm</a>', liability: '$57', full: '$201' },
    { company: '<a href="https://www.progressive.com/" rel="nofollow">Progressive</a>', liability: '$80', full: '$241' },
    { company: '<a href="https://www.allstate.com/" rel="nofollow">Allstate</a>', liability: '$81', full: '$243' },
    { company: '<a href="https://www.mileauto.com/" rel="nofollow">Mile Auto</a>', liability: '$74', full: '$157' },
    { company: '<a href="https://www.mercuryinsurance.com/" rel="nofollow">Mercury</a>', liability: '$102', full: '$171' },
    { company: '<a href="https://www.usaa.com/" rel="nofollow">USAA</a>', liability: '$102', full: '$180' },
    { company: '<a href="https://www.geico.com/" rel="nofollow">GEICO</a>', liability: '$95', full: '$181' },
    { company: '<a href="https://www.joinroot.com/" rel="nofollow">Root</a>', liability: '$121', full: '$209' },
    { company: '<a href="https://agents.libertymutual.com/" rel="nofollow">Safeco</a>', liability: '$141', full: '$216' },
    { company: '<a href="https://www.clearcover.com/" rel="nofollow">Clearcover</a>', liability: '$125', full: '$251' },
    { company: '<a href="https://www.directauto.com/" rel="nofollow">Direct Auto</a>', liability: '$146', full: '$224' },
    { company: '<a href="https://www.nationwide.com/" rel="nofollow">Nationwide</a>', liability: '$119', full: '$227' },
    { company: '<a href="https://www.alinsco.com/" rel="nofollow">Amica</a>', liability: '$118', full: '$235' },
    { company: '<a href="https://www.elephant.com/" rel="nofollow">Elephant</a>', liability: '$150', full: '$236' },
    { company: '<a href="https://www.thegeneral.com/" rel="nofollow">The General</a>', liability: '$125', full: '$239' },
    { company: '<a href="https://www.nationalgeneral.com/" rel="nofollow">National General</a>', liability: '$146', full: '$243' },
    { company: '<a href="https://www.bristolwest.com/" rel="nofollow">Bristol West</a>', liability: '$135', full: '$250' },
    { company: '<a href="https://www.gainsco.com/" rel="nofollow">GAINSCO</a>', liability: '$127', full: '$134' },
    { company: '<a href="https://www.mendota-insurance.com/" rel="nofollow">Mendota</a>', liability: '$136', full: '$257' },
    { company: '<a href="https://www.suncoastinsurance.com/" rel="nofollow">Sun Coast</a>', liability: '$138', full: '$261' },
    { company: '<a href="https://www.assuranceamerica.com/" rel="nofollow">AssuranceAmerica</a>', liability: '$135', full: '$275' },
    { company: '<a href="https://www.firstacceptance.com/" rel="nofollow">First Acceptance</a>', liability: '$121', full: '$209' },
    { company: '<a href="https://www.ridewithloop.com/" rel="nofollow">Loop</a>', liability: '$147', full: '$277' },
    { company: '<a href="https://www.commonwealthcasualty.com/" rel="nofollow">Commonwealth Casualty</a>', liability: '$132', full: '$288' },
    { company: '<a href="https://www.lonestarmga.com/" rel="nofollow">Lone Star</a>', liability: '$137', full: '$291' },
    { company: '<a href="https://www.covercube.com/" rel="nofollow">Covercube</a>', liability: '$127', full: '$300' },
    { company: '<a href="https://www.chubb.com/" rel="nofollow">Chubb</a>', liability: '$176', full: '$306' },
    { company: '<a href="https://freedomgeneral.com/" rel="nofollow">Freedom National</a>', liability: '$121', full: '$314' },
    { company: '<a href="https://trexis.com/" rel="nofollow">Texas One</a>', liability: '$156', full: '$357' },
    { company: '<a href="https://www.dairylandinsurance.com/" rel="nofollow">Dairyland</a>', liability: '$130', full: '$338' },
    { company: '<a href="https://www.libertymutual.com/" rel="nofollow">Liberty Mutual</a>', liability: '$112', full: '$341' },
    { company: '<a href="https://www.21st.com/" rel="nofollow">21st Century</a>', liability: '$101', full: '$354' },
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
    'DRIVING_RECORD',
    'INSURANCE_HISTORY',
    'CREDIT_SCORE',
    'CLAIMS_HISTORY',
    'LOCATION',
    'COVERAGE_DEDUCTIBLE',
    'AGE_EXPERIENCE',
    'MULTI_VEHICLE',
    'GENDER',
    'VEHICLE_USE',
    'MARITAL_STATUS',
    'GARAGING',
    'VEHICLE_TYPE',
    'SAFETY_FEATURES',
    'VEHICLE_CONDITION',
    'SR22',
    'ANNUAL_MILEAGE'
  ];

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
    'NUMBER_OF_COMPANIES',
    'COMPARE_RATES',
    'FLEXIBILITY',
    'GOAL',
    'CLAIMS_ASSISTANCE',
    'LANGUAGE_SUPPORT'
  ];

  vehicleInsuranceTypes = [
    'CAR',
    'MOTORCYCLE',
    'BOAT',
    'RV_MOTORHOME',
    'CLASSIC_CAR',
    'COMMERCIAL_AUTO',
    'SR22',
    'ATV_UTV',
    'MEXICAN_CAR',
    'RIDESHARE',
    'TRAILER'
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
  ];


  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
