import { Language } from '../../../services/language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mexican-car-insurance',
  standalone: false,
  templateUrl: './mexican-car-insurance.html',
  styleUrl: './mexican-car-insurance.scss',
})
export class MexicanCarInsurance {
  termsAccepted = false;
  termsAccepted2 = false;
  optionalCoveragesChunks: any[][] = [];

  constructor(public languageService: Language, private translate: TranslateService) { }




  chips = [
    { name: 'MEXICAN_INSURANCE.BANNER.CHIPS.LIABILITY', icon: 'fas fa-car' },
    { name: 'MEXICAN_INSURANCE.BANNER.CHIPS.FULL_COVERAGE', icon: 'fas fa-house' },
    { name: 'MEXICAN_INSURANCE.BANNER.CHIPS.SHORT_TERM', icon: 'fas fa-building' },
    { name: 'MEXICAN_INSURANCE.BANNER.CHIPS.ANNUAL', icon: 'fas fa-heart' },
    { name: 'MEXICAN_INSURANCE.BANNER.CHIPS.LEGAL_ASSISTANCE_BAIL', icon: 'fas fa-notes-medical' },
    { name: 'MEXICAN_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    {
      coverageValue: '$15,000',
      periodDays: '3 days',
      liability: '~$11/day ($34)',
      damageToOwnVehicle: '~$17/day ($51)',
      sixMonths: '~$1.61/day($294)',
      yearDamage: '~$1.09/day ($401)',
    },

    {
      coverageValue: '$15,000',
      periodDays: '10 days',
      liability: '~$8/day ($81)',
      damageToOwnVehicle: '~$14/day ($138)',
      sixMonths: '~$1.61/day($294)',
      yearDamage: '~$1.09/day ($401)',
    }

  ];


  impactFactorsKeys = [
    "TRIP_DURATION",
    "DESTINATION",
    "VEHICLE_MAKE_MODEL_YEAR",
    "VEHICLE_VALUE_REPLACEMENT",
    "COVERAGE_LEVEL",
    "DEDUCTIBLE_AMOUNT",
    "DRIVER_AGE_EXPERIENCE",
    "DRIVING_RECORD",
    "NUMBER_OF_DRIVERS",
    "VEHICLE_TYPE",
    "DISTANCE_IN_MEXICO",
    "FREQUENCY_OF_TRAVEL",
    "CLAIMS_HISTORY",
    "US_INSURANCE_HISTORY",
    "SEASON_TRAVEL_PERIOD",
    "BORDER_CROSSING_LOCATION",
    "COVERAGE_ADDONS",
    "INSURANCE_COMPANY_SELECTED"
  ];

  discountKeys = [
    "ANNUAL_POLICY",
    "MULTI_VEHICLE",
    "PAID_FULL",
    "AUTO_PAY",
    "PAPERLESS",
    "LOYALTY",
    "EARLY_PURCHASE",
    "CLEAN_DRIVING_RECORD",
    "EXPERIENCED_DRIVER",
    "HIGHER_DEDUCTIBLE",
    "LIABILITY_ONLY",
    "MULTI_DRIVER",
    "BUNDLE_US_AUTO",
    "FREQUENT_TRAVELER",
    "MILITARY_OCCUPATION",
    "ASSOCIATION_MEMBER",
    "LOW_VEHICLE_VALUE",
    "EARLY_RENEWAL"
  ];

  agentComparisonData = [
    "NUMBER_OF_CARRIERS",
    "PRICE_COMPARISON",
    "POLICY_DURATION_OPTIONS",
    "DESTINATION_COVERAGE",
    "HIGH_RISK_ZONES",
    "LEGAL_ASSISTANCE",
    "ANNUAL_POLICY_SAVINGS",
    "RV_MOTORHOME_COVERAGE",
    "MOTORCYCLE_COVERAGE",
    "COMMERCIAL_VEHICLE",
    "CLAIMS_SUPPORT",
    "BILINGUAL_ASSISTANCE",
    "COVERAGE_CUSTOMIZATION",
    "LOYALTY",
    "RATE_SHOPPING_RENEWAL",
    "SWITCHING_CARRIERS",
    "LOCAL_KNOWLEDGE",
    "MULTILINGUAL_SUPPORT"
  ];

  vehicleInsuranceTypes = [
    "PERSONAL_CARS_SEDANS",
    "TRUCKS_PICKUPS",
    "SUVS_CROSSOVERS",
    "MINIVANS_PASSENGER_VANS",
    "MOTORCYCLES_SCOOTERS",
    "RVS_MOTORHOMES",
    "TRAVEL_TRAILERS_FIFTH_WHEELS",
    "COMMERCIAL_TRUCKS_VANS",
    "CLASSIC_VINTAGE_CARS",
    "ELECTRIC_HYBRID_VEHICLES",
    "LUXURY_HIGH_VALUE_VEHICLES",
    "LEASED_FINANCED_VEHICLES",
    "RENTAL_VEHICLES",
    "ATV_UTV_OFFROAD",
    "BUS_CHARTER_VEHICLES"
  ];

  notCoveredKeys = [
    'BEYOND_TERRITORY',
    'RACING',
    'INTENTIONAL_DAMAGE',
    'WEAR_TEAR',
    'DUI',
    'UNLISTED_DRIVERS',
    'PERSONAL_BELONGINGS',
    'COMMERCIAL_USE',
    'UNPAVED_ROADS',
    'PRE_EXISTING_DAMAGE',
    'UNLISTED_VEHICLES',
    'WAR_CIVIL_UNREST',
    'HIGH_RISK_ZONES',
    'POLICY_LAPSE',
    'US_SIDE_ACCIDENTS',
  ]

  switchSteps = [
    'STEP_1',
    'STEP_2',
    'STEP_3',
  ];



  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
