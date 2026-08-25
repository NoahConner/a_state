import { Language } from '../../../services/language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-motorcycle-insurance',
  standalone: false,
  templateUrl: './motorcycle-insurance.html',
  styleUrl: './motorcycle-insurance.scss',
})
export class MotorcycleInsurance {
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
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SEDAN', icon: 'fas fa-car' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SUV_CROSSOVER', icon: 'fas fa-house' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.TRUCK_PICKUP', icon: 'fas fa-building' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.SPORTS_PERFORMANCE', icon: 'fas fa-heart' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.ELECTRIC_VEHICLE', icon: 'fas fa-notes-medical' },
    { name: 'CAR_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { city: "Houston", monthly: "$52", percent_from_average: "+17%" },
    { city: "San Antonio", monthly: "$51", percent_from_average: "+14%" },
    { city: "Dallas", monthly: "$46", percent_from_average: "+4%" },
    { city: "Austin", monthly: "$44", percent_from_average: "-2%" },
    { city: "Fort Worth", monthly: "$45", percent_from_average: "+1%" },
    { city: "El Paso", monthly: "$44", percent_from_average: "-2%" },
    { city: "Corpus Christi", monthly: "$43", percent_from_average: "-4%" },
    { city: "Plano", monthly: "$40", percent_from_average: "-11%" },
    { city: "Lubbock", monthly: "$40", percent_from_average: "-11%" },
    { city: "Frisco", monthly: "$40", percent_from_average: "-11%" }
  ];

  companyRates = [
    { company: "<a href='https://www.dairylandinsurance.com/' target='_blank'>Dairyland</a>", monthly: "$22" },
    { company: "<a href='https://www.progressive.com/' target='_blank'>Progressive</a>", monthly: "$26" },
    { company: "<a href='https://www.harley-davidson.com/ap/en/index.html' target='_blank'>Harley-Davidson</a>", monthly: "$27" },
    { company: "<a href='https://www.allstate.com/' target='_blank'>Allstate</a>", monthly: "$46" },
    { company: "<a href='https://www.geico.com/' target='_blank'>Geico</a>", monthly: "$63" },
    { company: "<a href='https://www.nationwide.com/' target='_blank'>Nationwide</a>", monthly: "$84" }
  ]


  notCoveredKeys = [
    "INTENTIONAL_DAMAGE",
    "WEAR_TEAR",
    "RACING",
    "NO_LICENSE",
    "PERSONAL_BELONGINGS",
    "LIABILITY_ONLY",
    "FLOOD_WEATHER",
    "THEFT",
    "UNLISTED_RIDERS",
    "BUSINESS_USE",
    "OUT_OF_COUNTRY",
    "GAP",
    "DUI",
    "CUSTOM_PARTS"
  ];

  coverageComparison = [
    { category: "Minimum Liability Coverage", monthly: "$12", annual: "$124" },
    { category: "Full Coverage", monthly: "$71", annual: "$851" }
  ];

  impactFactorsKeys = [
    'AGE_EXPERIENCE',
    'RIDING_RECORD',
    'CREDIT_SCORE',
    'LOCATION',
    'BIKE_MAKE_MODEL',
    'BIKE_AGE_CONDITION',
    'ENGINE_HP',
    'BIKE_TYPE',
    'ANNUAL_MILEAGE',
    'SEASONAL_USE',
    'STORAGE',
    'SECURITY_FEATURES',
    'M_LICENSE',
    'SAFETY_COURSE',
    'COVERAGE_DEDUCTIBLE',
    'CLAIMS_HISTORY',
    'CUSTOM_PARTS',
    'INSURANCE_HISTORY'
  ]

  discountKeys = [
    'BUNDLING',
    'MULTI_MOTORCYCLE',
    'SAFE_RIDER',
    'SAFETY_COURSE',
    'M_LICENSE',
    'EXPERIENCED_RIDER',
    'MATURE_RIDER',
    'ANTI_THEFT',
    'PAID_FULL',
    'AUTO_PAY',
    'PAPERLESS',
    'LOYALTY',
    'LOW_MILEAGE',
    'GARAGE_STORAGE',
    'MILITARY_OCCUPATION',
    'ASSOCIATION_MEMBER',
    'LAY_UP',
    'NEW_BIKE'
  ];
  agentComparisonData = [
    'NUMBER_OF_CARRIERS',
    'PRICE_COMPARISON',
    'MOTORCYCLE_TYPES',
    'HIGH_RISK',
    'SR22',
    'CUSTOM_PARTS',
    'HIGH_CC_COVERAGE',
    'NEW_INEXPERIENCED',
    'SEASONAL_OPTIONS',
    'COVERAGE_CUSTOMIZATION',
    'LOYALTY',
    'RENEWAL_SHOPPING',
    'CLAIMS_ADVOCACY',
    'MULTI_MOTORCYCLE',
    'BUNDLING',
    'SWITCHING_CARRIERS',
    'LOCAL_KNOWLEDGE',
    'MULTILINGUAL_SUPPORT'
  ];

  vehicleInsuranceTypes = [
    'CRUISERS',
    'SPORTBIKES',
    'TOURING',
    'STANDARD',
    'DIRT_OFFROAD',
    'DUAL_SPORT',
    'SCOOTERS_MOPEDS',
    'TRIKES',
    'CUSTOM_CHOPPER',
    'CLASSIC_VINTAGE',
    'ELECTRIC',
    'SIDECARS'
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

  ];

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
