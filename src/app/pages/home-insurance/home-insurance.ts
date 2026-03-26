import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-insurance',
  standalone: false,
  templateUrl: './home-insurance.html',
  styleUrl: './home-insurance.scss',
})
export class HomeInsurance implements OnInit {
  optionalCoveragesChunks: any[][] = [];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadOptionalCoverages();
    });
    this.loadOptionalCoverages();
  }

  loadOptionalCoverages() {
    this.translate.get('HOME_INSURANCE.COVERAGES.OPTIONAL.LIST').subscribe((list: any[]) => {
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
    { name: 'HOME_INSURANCE.BANNER.CHIPS.STANDARD', icon: 'fas fa-car' },
    { name: 'HOME_INSURANCE.BANNER.CHIPS.COMPREHENSIVE', icon: 'fas fa-house' },
    { name: 'HOME_INSURANCE.BANNER.CHIPS.CONDO', icon: 'fas fa-building' },
    { name: 'HOME_INSURANCE.BANNER.CHIPS.RENTERS', icon: 'fas fa-heart' },
    { name: 'HOME_INSURANCE.BANNER.CHIPS.OLDER_HOME', icon: 'fas fa-notes-medical' },
    { name: 'HOME_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    { carrier: 'USAA', monthly: '$442' },
    { carrier: 'Framers', monthly: '$218' },
    { carrier: 'Travelers', monthly: '$329' },
    { carrier: 'Foremost', monthly: '$207' },
    { carrier: 'Nationwide', monthly: '$341' },
    { carrier: 'State Farm', monthly: '$167' },
    { carrier: 'Allstate', monthly: '$338' },
    { carrier: 'Chubb', monthly: '$515' }
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
    'LOCATION',
    'HOME_AGE',
    'HOME_SIZE',
    'ROOF',
    'REPLACEMENT_COST',
    'CLAIMS_HISTORY',
    'CREDIT_SCORE',
    'DEDUCTIBLE',
    'COVERAGE',
    'SECURITY',
    'POOL',
    'FIRE_STATION',
    'COASTAL',
    'MARITAL_STATUS',
    'INSURANCE_HISTORY'
  ];

  discountKeys = [
    'BUNDLING',
    'NEW_HOME',
    'NEW_ROOF',
    'CLAIM_FREE',
    'LOYALTY',
    'PAID_FULL',
    'AUTO_PAY',
    'PAPERLESS',
    'SECURITY_SYSTEM',
    'FIRE_SAFETY',
    'LOCKS',
    'GATED',
    'IMPACT_ROOF',
    'WIND_MITIGATION',
    'NON_SMOKER',
    'SENIOR',
    'MILITARY',
    'NEW_PURCHASE',
    'HIGH_DEDUCTIBLE'
  ];
  notCoveredKeys = [
    'FLOOD_DAMAGE',
    'EARTHQUAKE_DAMAGE',
    'SEWER_DRAIN_BACKUP',
    'NORMAL_WEAR_TEAR',
    'PEST_TERMITE_DAMAGE',
    'MOLD_ROT',
    'FOUNDATION_SETTLING_ISSUES',
    'POWER_OUTAGES_EQUIPMENT_BREAKDOWN',
    'HOME_BASED_BUSINESS_LIABILITY',
    'INTENTIONAL_DAMAGE'
  ];
  agentComparisonData = [
    'CARRIERS',
    'PRICE_COMPARISON',
    'COVERAGE_OPTIONS',
    'HIGH_RISK',
    'OLDER_HOME',
    'FLOOD_WIND',
    'LOYALTY',
    'RENEWAL',
    'CLAIMS',
    'CUSTOMIZATION',
    'BUNDLING',
    'SWITCHING',
    'LOCAL',
    'LANGUAGE'
  ];

  vehicleInsuranceTypes = [
    'RENTERS',
    'CONDO',
    'COMMERCIAL_PROPERTY',
    'MANUFACTURED_HOME',
    'LANDLORD',
    'FLOOD',
    'EARTHQUAKE',
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
  ];

}
