import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landlord-insurance',
  standalone: false,
  templateUrl: './landlord-insurance.html',
  styleUrl: './landlord-insurance.scss',
})
export class LandlordInsurance {


  chips = [
    { name: 'LANDLORD_INSURANCE.BANNER.CHIPS.SINGLE_FAMILY', icon: 'fas fa-car' },
    { name: 'LANDLORD_INSURANCE.BANNER.CHIPS.MULTI_FAMILY', icon: 'fas fa-house' },
    { name: 'LANDLORD_INSURANCE.BANNER.CHIPS.SHORT_TERM_RENTAL', icon: 'fas fa-building' },
    { name: 'LANDLORD_INSURANCE.BANNER.CHIPS.CONDO', icon: 'fas fa-heart' },
    { name: 'LANDLORD_INSURANCE.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-notes-medical' },
    { name: 'LANDLORD_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    'PROPERTY_AGE',
    'PROPERTY_TYPE',
    'UNIT_COUNT',
    'CONSTRUCTION',
    'ROOF_CONDITION',
    'COAST_PROXIMITY',
    'WINDSTORM_RISK',
    'CRIME_RATE',
    'FIRE_STATION_DISTANCE',
    'FIRE_FEATURES',
    'SECURITY_FEATURES',
    'COVERAGE_AMOUNT',
    'DEDUCTIBLE',
    'CLAIMS_HISTORY',
    'CREDIT_SCORE',
    'TENANT_TYPE',
    'FURNISHED_STATUS',
    'OCCUPANCY_STATUS',
    'PORTFOLIO_SIZE',
    'PET_POLICY',
    'SMOKING_POLICY',
    'RENTAL_INCOME',
    'BUNDLING',
    'CARRIER'
  ];





  discountKeys = [
    'BUNDLING',
    'MULTI_PROPERTY',
    'CLAIM_FREE',
    'LOYALTY',
    'NEW_PROPERTY',
    'NEW_ROOF',
    'RENOVATED',
    'WIND_MITIGATION',
    'SECURITY_SYSTEM',
    'SMOKE_DETECTOR',
    'SPRINKLER_SYSTEM',
    'DEADBOLT',
    'GATED',
    'NON_SMOKER_POLICY',
    'GOOD_CREDIT',
    'PAPERLESS',
    'AUTO_PAY',
    'PAID_FULL',
    'HIGH_DEDUCTIBLE',
    'LONG_TERM_TENANT',
    'TENANT_RENTERS_INSURANCE',
    'PROPERTY_MANAGEMENT',
    'HOME_INSPECTION',
    'PROXIMITY_DISCOUNT',
    'EXPERIENCED_LANDLORD'
  ];



  notCoveredKeys = [
    'TENANT_BELONGINGS',
    'FLOOD_DAMAGE',
    'EARTHQUAKE_DAMAGE',
    'PEST_DAMAGE',
    'WEAR_TEAR',
    'MOLD_MILDEW',
    'INTENTIONAL_DAMAGE_LANDLORD',
    'VACANT_PROPERTY',
    'SHORT_TERM_RENTAL_EXCLUSION',
    'BUSINESS_PROPERTY',
    'VEHICLE_DAMAGE',
    'TENANT_DAMAGE',
    'SINKHOLES',
    'POWER_OUTAGE',
    'WAR_NUCLEAR',
    'GOVERNMENT_SEIZURE',
    'LANDSLIDE',
    'SEWER_BACKUP',
    'HIGH_VALUE_LIMITS',
    'RENTAL_INCOME_NON_PAYMENT'
  ];


  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'LANDLORD_OPTIONS',
    'PROPERTY_TYPE_COVERAGE',
    'SHORT_TERM_COVERAGE',
    'VACANT_COVERAGE',
    'RENTAL_INCOME_COVERAGE',
    'MULTI_PROPERTY',
    'TENANT_DAMAGE',
    'WINDSTORM',
    'FLOOD',
    'EVICTION',
    'BILINGUAL',
    'PRICE_COMPETITIVENESS',
    'LOYALTY',
    'SWITCHING',
    'DISCOUNT_AVAILABILITY',
    'CLAIMS',
    'LOCAL_KNOWLEDGE',
    'CUSTOMIZATION'
  ];





  switchSteps = [
    'STEP_1',
    'STEP_2',
    'STEP_3',
  ];



}
