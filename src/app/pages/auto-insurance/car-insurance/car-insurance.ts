import { Language } from '../../../services/language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-car-insurance',
  standalone: false,
  templateUrl: './car-insurance.html',
  styleUrl: './car-insurance.scss',
})
export class CarInsurance {
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
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SEDAN', icon: 'fas fa-car' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SUV_CROSSOVER', icon: 'fas fa-house' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.TRUCK_PICKUP', icon: 'fas fa-building' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SPORTS_PERFORMANCE', icon: 'fas fa-heart' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.ELECTRIC_VEHICLE', icon: 'fas fa-notes-medical' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  citiesRate = [
    { city: "Houston", monthly: "$270", annual: "$3,240" },
    { city: "San Antonio", monthly: "$218", annual: "$2,616" },
    { city: "Dallas", monthly: "$238", annual: "$2,856" },
    { city: "Austin", monthly: "$209", annual: "$2,508" },
    { city: "Fort Worth", monthly: "$210", annual: "$2,520" },
    { city: "El Paso", monthly: "$191", annual: "$2,292" },
    { city: "Arlington", monthly: "$215", annual: "$2,580" },
    { city: "Corpus Christi", monthly: "$201", annual: "$2,412" },
    { city: "Plano", monthly: "$206", annual: "$2,472" },
    { city: "Lubbock", monthly: "$209", annual: "$2,508" }
  ];

  notCoveredKeys = [
    "INTENTIONAL_DAMAGE",
    "WEAR_TEAR",
    "PERSONAL_BELONGINGS",
    "RIDESHARE",
    "BUSINESS_USE",
    "RACING",
    "FLOOD_WEATHER",
    "THEFT",
    "NO_LICENSE",
    "MEDICAL_LIMITS",
    "LIABILITY_ONLY",
    "UNLISTED_DRIVERS",
    "OUT_OF_COUNTRY",
    "GAP"
  ];

  carRates = [
    {
      company: "<a href='https://www.statefarm.com/' target='_blank' rel='nofollow'>State Farm</a>",
      minCoverageMonthly: "$41",
      fullCoverageMonthly: "$93",
      minCoverageAnnual: "$497",
      fullCoverageAnnual: "$1,118"
    },
    {
      company: "<a href='https://www.geico.com/' target='_blank' rel='nofollow'>Geico</a>",
      minCoverageMonthly: "$54",
      fullCoverageMonthly: "$112",
      minCoverageAnnual: "$651",
      fullCoverageAnnual: "$1,341"
    },
    {
      company: "<a href='https://www.mercuryinsurance.com/' target='_blank' rel='nofollow'>Mercury Insurance</a>",
      minCoverageMonthly: "$54",
      fullCoverageMonthly: "$133",
      minCoverageAnnual: "$648",
      fullCoverageAnnual: "$1,594"
    },
    {
      company: "<a href='https://www.aaa.com/' target='_blank' rel='nofollow'>AAA</a>",
      minCoverageMonthly: "$63",
      fullCoverageMonthly: "$126",
      minCoverageAnnual: "$762",
      fullCoverageAnnual: "$1,513"
    },
    {
      company: "<a href='https://www.germaniainsurance.com/' target='_blank' rel='nofollow'>Germania Insurance</a>",
      minCoverageMonthly: "$72",
      fullCoverageMonthly: "$143",
      minCoverageAnnual: "$868",
      fullCoverageAnnual: "$1,715"
    },
    {
      company: "<a href='https://www.progressive.com/' target='_blank' rel='nofollow'>Progressive</a>",
      minCoverageMonthly: "$87",
      fullCoverageMonthly: "$149",
      minCoverageAnnual: "$1,048",
      fullCoverageAnnual: "$1,783"
    }
  ];


  vehiclesMake = [
    {
      model: "Ford F-150",
      minCoverageMonthly: "$100",
      minCoverageAnnual: "$1,204",
      fullCoverageMonthly: "$205",
      fullCoverageAnnual: "$2,457"
    },
    {
      model: "Honda Civic",
      minCoverageMonthly: "$103",
      minCoverageAnnual: "$1,237",
      fullCoverageMonthly: "$211",
      fullCoverageAnnual: "$2,538"
    },
    {
      model: "Honda Accord",
      minCoverageMonthly: "$107",
      minCoverageAnnual: "$1,280",
      fullCoverageMonthly: "$219",
      fullCoverageAnnual: "$2,625"
    },
    {
      model: "Toyota Prius",
      minCoverageMonthly: "$110",
      minCoverageAnnual: "$1,325",
      fullCoverageMonthly: "$226",
      fullCoverageAnnual: "$2,715"
    },
    {
      model: "Toyota Camry",
      minCoverageMonthly: "$111",
      minCoverageAnnual: "$1,334",
      fullCoverageMonthly: "$228",
      fullCoverageAnnual: "$2,733"
    },
    {
      model: "Toyota RAV4",
      minCoverageMonthly: "$113",
      minCoverageAnnual: "$1,361",
      fullCoverageMonthly: "$233",
      fullCoverageAnnual: "$2,791"
    },
    {
      model: "Tesla Model 3",
      minCoverageMonthly: "$125",
      minCoverageAnnual: "$1,501",
      fullCoverageMonthly: "$255",
      fullCoverageAnnual: "$3,064"
    },
    {
      model: "Tesla Model Y",
      minCoverageMonthly: "$146",
      minCoverageAnnual: "$1,751",
      fullCoverageMonthly: "$297",
      fullCoverageAnnual: "$3,565"
    }
  ]

  driverProfileRates = [
    { profile: 'Clean Record', quote: '$178' },
    { profile: 'With Accident', quote: '$246' },
    { profile: 'With Speeding Ticket', quote: '$236' },
    { profile: 'With DUI', quote: '$282' },
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

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
