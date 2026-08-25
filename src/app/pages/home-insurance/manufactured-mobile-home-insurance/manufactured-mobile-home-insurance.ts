import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-manufactured-mobile-home-insurance',
  standalone: false,
  templateUrl: './manufactured-mobile-home-insurance.html',
  styleUrl: './manufactured-mobile-home-insurance.scss',
})
export class ManufacturedMobileHomeInsurance {
  termsAccepted = false;
  termsAccepted2 = false;
  constructor(public languageService: Language) {}



  chips = [
    { name: 'MANUFACTURED_HOME_INSURANCE.BANNER.CHIPS.SINGLE_WIDE', icon: 'fas fa-car' },
    { name: 'MANUFACTURED_HOME_INSURANCE.BANNER.CHIPS.DOUBLE_WIDE', icon: 'fas fa-house' },
    { name: 'MANUFACTURED_HOME_INSURANCE.BANNER.CHIPS.TRIPLE_WIDE', icon: 'fas fa-building' },
    { name: 'MANUFACTURED_HOME_INSURANCE.BANNER.CHIPS.MODULAR', icon: 'fas fa-heart' },
    { name: 'MANUFACTURED_HOME_INSURANCE.BANNER.CHIPS.PARK_MODEL', icon: 'fas fa-notes-medical' },
    { name: 'MANUFACTURED_HOME_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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




  impactFactorsKeys = [
    'LOCATION',
    'AGE',
    'SIZE',
    'CONSTRUCTION',
    'HUD_COMPLIANCE',
    'FOUNDATION',
    'LAND_OWNERSHIP',
    'COAST_PROXIMITY',
    'WINDSTORM_RISK',
    'CRIME_RATE',
    'FIRE_STATION_DISTANCE',
    'FIRE_FEATURES',
    'SECURITY_FEATURES',
    'TIE_DOWNS',
    'ROOF_CONDITION',
    'COVERAGE_AMOUNT',
    'DEDUCTIBLE',
    'CLAIMS_HISTORY',
    'CREDIT_SCORE',
    'RENTAL_STATUS',
    'PARK_STATUS',
    'BUNDLING',
    'CARRIER',
    'RESIDENCY_TYPE',
    'TRIP_COLLISION_RISK'
  ];




  discountKeys = [
    'BUNDLING',
    'CLAIM_FREE',
    'LOYALTY',
    'NEW_HOME',
    'NEW_ROOF',
    'PERMANENT_FOUNDATION',
    'STORM_TIE_DOWNS',
    'WIND_MITIGATION',
    'SECURITY_SYSTEM',
    'SMOKE_DETECTOR',
    'SPRINKLER_SYSTEM',
    'DEADBOLT',
    'GATED_COMMUNITY',
    'NON_SMOKER',
    'GOOD_CREDIT',
    'PAPERLESS',
    'AUTO_PAY',
    'PAID_FULL',
    'HIGH_DEDUCTIBLE',
    'SENIOR_DISCOUNT',
    'HUD_COMPLIANT',
    'HOME_INSPECTION',
    'LAND_OWNERSHIP',
    'PRIMARY_RESIDENCE',
    'UPGRADES'
  ];



  notCoveredKeys = [
    'FLOOD_DAMAGE',
    'EARTHQUAKE_DAMAGE',
    'PEST_DAMAGE',
    'WEAR_TEAR',
    'MOLD_MILDEW',
    'INTENTIONAL_DAMAGE',
    'VACANT_DAMAGE',
    'BUSINESS_PROPERTY',
    'VEHICLE_DAMAGE',
    'PET_DAMAGE',
    'SINKHOLES',
    'POWER_OUTAGE',
    'WAR_NUCLEAR',
    'GOVERNMENT_SEIZURE',
    'LANDSLIDE',
    'SEWER_BACKUP',
    'HIGH_VALUE_LIMITS',
    'TRANSPORT_DAMAGE',
    'NON_HUD',
    'BUSINESS_USE'
  ];





  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'MH_OPTIONS',
    'WIDE_COVERAGE',
    'HUD_COVERAGE',
    'TRIP_COLLISION',
    'FOUNDATION_OPTIONS',
    'LAND_COVERAGE',
    'WINDSTORM',
    'FLOOD',
    'BILINGUAL',
    'PRICE_COMPETITIVENESS',
    'LOYALTY',
    'SWITCHING',
    'DISCOUNT_AVAILABILITY',
    'CLAIMS',
    'LOCAL_KNOWLEDGE',
    'CUSTOMIZATION'
  ];



  mobileHomeVsManufactured = [
    'OFFICIAL_TERM',
    'TIME_PERIOD',
    'BUILDING_STANDARD',
    'CONSTRUCTION_QUALITY',
    'ENERGY_EFFICIENCY',
    'SAFETY_STANDARDS',
    'FOUNDATION',
    'MOBILITY',
    'FINANCING_OPTIONS',
    'INSURANCE_OPTIONS',
    'RESALE_VALUE',
    'LIFESPAN',
    'COMMON_LOCATIONS',
    'LEGAL_CLASSIFICATION',
    'AVERAGE_SIZE'
  ];






  switchSteps = [
    'STEP_1',
    'STEP_2',
    'STEP_3',
  ];




  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
