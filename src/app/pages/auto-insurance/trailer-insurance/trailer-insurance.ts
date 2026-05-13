import { Language } from '../../../services/language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trailer-insurance',
  standalone: false,
  templateUrl: './trailer-insurance.html',
  styleUrl: './trailer-insurance.scss',
})
export class TrailerInsurance {
  optionalCoveragesChunks: any[][] = [];

  constructor(public languageService: Language, private translate: TranslateService) { }


  chips = [
    { name: 'TRAILER_INSURANCE.BANNER.CHIPS.UTILITY', icon: 'fas fa-car' },
    { name: 'TRAILER_INSURANCE.BANNER.CHIPS.ENCLOSED_CARGO', icon: 'fas fa-house' },
    { name: 'TRAILER_INSURANCE.BANNER.CHIPS.HORSE_LIVESTOCK', icon: 'fas fa-building' },
    { name: 'TRAILER_INSURANCE.BANNER.CHIPS.BOAT', icon: 'fas fa-heart' },
    { name: 'TRAILER_INSURANCE.BANNER.CHIPS.CONCESSION', icon: 'fas fa-notes-medical' },
    { name: 'TRAILER_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  impactFactorsKeys = [
    "TRAILER_TYPE_CATEGORY",
    "TRAILER_AGE_CONDITION",
    "TRAILER_VALUE_REPLACEMENT",
    "TRAILER_LENGTH_SIZE",
    "INTENDED_USE",
    "CARGO_TYPE_VALUE",
    "PRIMARY_STORAGE",
    "ANNUAL_MILEAGE_USAGE",
    "TOWING_VEHICLE",
    "OWNER_AGE_EXPERIENCE",
    "DRIVING_RECORD",
    "CLAIMS_HISTORY",
    "COVERAGE_LEVEL_DEDUCTIBLE",
    "SECURITY_FEATURES",
    "INSURANCE_HISTORY",
    "NUMBER_TRAILERS",
    "COMMERCIAL_PERSONAL_USE",
    "CREDIT_SCORE",
    "GEOGRAPHIC_CLIMATE",
    "DETACHMENT_STORAGE_FREQUENCY",
    "SEASONAL_USE"
  ];

  discountKeys = [
    "BUNDLING",
    "MULTI_TRAILER",
    "CLAIM_FREE",
    "PAID_FULL",
    "AUTO_PAY",
    "PAPERLESS",
    "LOYALTY",
    "SECURED_STORAGE",
    "ANTI_THEFT",
    "LOW_MILEAGE",
    "LAY_UP",
    "COMMERCIAL_FLEET",
    "NEW_TRAILER",
    "HIGH_DEDUCTIBLE",
    "MILITARY_OCCUPATION",
    "ASSOCIATION_MEMBER",
    "CONTINUOUS_COVERAGE",
    "SAFETY_EQUIPMENT",
    "AGRICULTURAL_USE",
    "EARLY_SIGNING"
  ];
  agentComparisonData = [
    "NUMBER_OF_CARRIERS",
    "PRICE_COMPARISON",
    "TRAILER_TYPES_COVERED",
    "COMMERCIAL_TRAILER",
    "AGRICULTURAL_TRAILER",
    "HORSE_LIVESTOCK",
    "DETACHED_TRAILER",
    "CARGO_CONTENTS",
    "HIGH_VALUE_TRAILERS",
    "FLEET_MULTI_TRAILER",
    "COVERAGE_CUSTOMIZATION",
    "LOYALTY",
    "RENEWAL_SHOPPING",
    "CLAIMS_ADVOCACY",
    "SEASONAL_OPTIONS",
    "MULTI_POLICY",
    "SWITCHING_CARRIERS",
    "LOCAL_KNOWLEDGE",
    "MULTILINGUAL_SUPPORT"
  ];
  vehicleInsuranceTypes = [
    "UTILITY_TRAILERS",
    "ENCLOSED_CARGO_TRAILERS",
    "FLATBED_TRAILERS",
    "GOOSENECK_TRAILERS",
    "FIFTH_WHEEL_TRAILERS",
    "HORSE_LIVESTOCK_TRAILERS",
    "BOAT_TRAILERS",
    "CAR_HAULER_TRAILERS",
    "DUMP_TRAILERS",
    "REEFER_TRAILERS",
    "LOWBOY_TRAILERS",
    "TRAVEL_TRAILERS_CAMPERS",
    "TAG_ALONG_TRAILERS",
    "MOTORCYCLE_TRAILERS",
    "ATV_UTV_TRAILERS",
    "FOOD_CONCESSION_TRAILERS",
    "LANDSCAPE_TRAILERS",
    "CONSTRUCTION_EQUIPMENT_TRAILERS",
    "OILFIELD_PIPELINE_TRAILERS",
    "TILT_TRAILERS",
    "POLE_TRAILERS",
    "LOGGING_TRAILERS",
    "BELLY_DUMP_TRAILERS",
    "LIVESTOCK_CATTLE_TRAILERS",
    "CUSTOM_SPECIALTY_TRAILERS"
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
