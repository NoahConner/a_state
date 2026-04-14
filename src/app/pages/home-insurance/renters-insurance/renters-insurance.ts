import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-renters-insurance',
  standalone: false,
  templateUrl: './renters-insurance.html',
  styleUrl: './renters-insurance.scss',
})
export class RentersInsurance implements OnInit {
  optionalCoveragesChunks: any[][] = [];
  typesOfHomeInsurance: any[] = [];
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadOptionalCoverages();
    });
    this.loadOptionalCoverages();
    this.loadTypesOfHomeInsurance();
  }

  loadOptionalCoverages() {
    this.translate.get('HOME_INSURANCE.COVERAGES.OPTIONAL.LIST').subscribe((list: any[]) => {
      if (Array.isArray(list)) {
        this.optionalCoveragesChunks = this.chunkArray(list, 3);
      }
    });
  }

  loadTypesOfHomeInsurance() {
    this.translate
      .get('HOME_INSURANCE.TYPES_HOME_INSURANCE.LIST')
      .subscribe((list: any[]) => {
        if (Array.isArray(list)) {
          this.typesOfHomeInsurance = list; // ✅ direct assign
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
    'BUILDING_TYPE',
    'PROPERTY_VALUE',
    'LIABILITY_LIMIT',
    'DEDUCTIBLE',
    'CREDIT_SCORE',
    'CLAIMS_HISTORY',
    'INSURANCE_HISTORY',
    'FIRE_STATION',
    'BUILDING_SECURITY',
    'SAFETY_DEVICES',
    'RESIDENTS',
    'SCHEDULED_PROPERTY',
    'PET_OWNERSHIP',
    'ROOMMATE',
    'PAYMENT_METHOD',
    'ADD_ONS',
    'FLOOD_RISK'
  ];

  discountKeys = [
    'BUNDLING',
    'CLAIM_FREE',
    'PAID_FULL',
    'AUTO_PAY',
    'PAPERLESS',
    'LOYALTY',
    'FIRE_SAFETY',
    'LOCKS',
    'SECURITY_SYSTEM',
    'GATED',
    'NEW_RENTER',
    'HIGH_DEDUCTIBLE',
    'MILITARY',
    'STUDENT',
    'GOOD_CREDIT',
    'NON_SMOKER',
    'EARLY_SIGNING',
    'CONTINUOUS_COVERAGE'
  ];
  notCoveredKeys = [
    'FLOOD_DAMAGE',
    'EARTHQUAKE_DAMAGE',
    'STRUCTURAL_DAMAGE',
    'ROOMMATE_BELONGINGS',
    'HIGH_VALUE_LIMITS',
    'PEST_DAMAGE',
    'MOLD_MILDEW',
    'WEAR_TEAR',
    'BUSINESS_PROPERTY',
    'VEHICLE_DAMAGE',
    'INTENTIONAL_DAMAGE',
    'POWER_OUTAGE',
    'SEWER_BACKUP',
    'WAR_NUCLEAR',
    'POLICY_LIMITS'
  ];

  agentComparisonData = [
    'CARRIERS',
    'PRICE_COMPARISON',
    'COVERAGE_OPTIONS',
    'HIGH_VALUE',
    'FLOOD',
    'PET',
    'ROOMMATE',
    'STUDENT',
    'IDENTITY',
    'BUSINESS',
    'BUNDLING',
    'CUSTOMIZATION',
    'LOYALTY',
    'RENEWAL',
    'CLAIMS',
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
