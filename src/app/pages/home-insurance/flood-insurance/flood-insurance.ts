import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flood-insurance',
  standalone: false,
  templateUrl: './flood-insurance.html',
  styleUrl: './flood-insurance.scss',
})
export class FloodInsurance {



  chips = [
    { name: 'FLOOD_INSURANCE.BANNER.CHIPS.NFIP', icon: 'fas fa-car' },
    { name: 'FLOOD_INSURANCE.BANNER.CHIPS.PRIVATE', icon: 'fas fa-house' },
    { name: 'FLOOD_INSURANCE.BANNER.CHIPS.EXCESS', icon: 'fas fa-building' },
    { name: 'FLOOD_INSURANCE.BANNER.CHIPS.PREFERRED_RISK', icon: 'fas fa-heart' },
    { name: 'FLOOD_INSURANCE.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-notes-medical' },
    { name: 'FLOOD_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  rates = [
    {
      policy: 'Building limit',
      basic: '$250,000',
      standard: '$1 million',
      premium: '$1.5 million'
    },
    {
      policy: 'Contents limit',
      basic: '$100,000',
      standard: '$250,000',
      premium: '$750,000'
    },
    {
      policy: 'Loss of use',
      basic: 'Not available',
      standard: 'Available',
      premium: 'Available'
    },
    {
      policy: 'Non-loan waiting period',
      basic: '30 days',
      standard: 'None',
      premium: 'Seven days'
    }
  ];
  cityRates = [
    { city: 'Houston', monthly: '$821' },
    { city: 'San Antonio', monthly: '$847' },
    { city: 'Dallas', monthly: '$622' },
    { city: 'Austin', monthly: '$601' },
    { city: 'El Paso', monthly: '$586' },
    { city: 'Plano', monthly: '$749' },
    { city: 'Lubbock', monthly: '$795' }
  ];

  floodZoneRates = [
    {
      risk: 'High risk',
      monthly: '$85',
      annual: '$1,021'
    },
    {
      risk: 'Low and moderate risk',
      monthly: '$56',
      annual: '$671'
    },
    {
      risk: 'State average',
      monthly: '$65',
      annual: '$783'
    }
  ];

  impactFactorsKeys = [
    'FLOOD_ZONE',
    'ELEVATION',
    'ELEVATION_CERT',
    'LOCATION',
    'HOME_AGE',
    'FOUNDATION',
    'FLOORS',
    'FIRST_FLOOR_HEIGHT',
    'WATER_PROXIMITY',
    'GULF_PROXIMITY',
    'FEMA_MAP',
    'COVERAGE_AMOUNT',
    'DEDUCTIBLE',
    'NFIP_VS_PRIVATE',
    'CONTENTS_LIMIT',
    'RESIDENCY_TYPE',
    'PROPERTY_TYPE',
    'CLAIMS_HISTORY',
    'MITIGATION',
    'NFIP_COMMUNITY',
    'CRS_SCORE',
    'BASEMENT',
    'ROOF_AGE',
    'OPENINGS_BELOW',
    'UTILITIES_ELEVATED'
  ];

  discountKeys = [
    'ELEVATION_CERT',
    'ELEVATE_HOME',
    'CRS_DISCOUNT',
    'MITIGATION',
    'FLOOD_VENTS',
    'ELEVATED_UTILITIES',
    'HIGH_DEDUCTIBLE',
    'BUNDLING',
    'CLAIM_FREE',
    'PRIVATE_POLICY',
    'PREFERRED_RISK',
    'NEW_CONSTRUCTION',
    'BASEMENT_ELIMINATION',
    'DRY_FLOODPROOFING',
    'WET_FLOODPROOFING',
    'BREAKAWAY_WALL',
    'SUMP_PUMP',
    'BACKFLOW_VALVE',
    'PAID_FULL',
    'AUTO_PAY',
    'PAPERLESS',
    'EARLY_RENEWAL',
    'ICC_COVERAGE',
    'FEMA_GRANT',
    'LOCAL_MITIGATION'
  ];

  notCoveredKeys = [
    'MOISTURE_MOLD',
    'CURRENCY_VALUABLES',
    'OUTDOOR_PROPERTY',
    'LIVING_EXPENSES',
    'BUSINESS_INTERRUPTION',
    'VEHICLES',
    'LANDSCAPING',
    'DECKS_PATIOS',
    'FENCES_WALLS',
    'SEPTIC_SYSTEMS',
    'FINANCIAL_LOSSES',
    'SEWER_BACKUP',
    'EARTHQUAKE_LANDSLIDE',
    'GRADUAL_WATER',
    'TEMPORARY_HOUSING',
    'UNDERGROUND_STRUCTURES',
    'BASEMENT_CONTENTS',
    'WIND_DRIVEN_RAIN',
    'PRE_EXISTING_DAMAGE',
    'WAITING_PERIOD'
  ];



  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'NFIP_PRIVATE',
    'EXCESS',
    'HIGH_VALUE',
    'ZONE_EXPERTISE',
    'ELEVATION_ASSIST',
    'CRS_KNOWLEDGE',
    'CONTENTS_OPTIONS',
    'BASEMENT_OPTIONS',
    'ALE_OPTIONS',
    'BUSINESS_INTERRUPTION',
    'WAITING_PERIOD',
    'WINDSTORM_BUNDLE',
    'BILINGUAL',
    'PRICE_COMPETITIVENESS',
    'LOYALTY',
    'SWITCHING',
    'DISCOUNT_AVAILABILITY',
    'CLAIMS',
    'LOCAL_KNOWLEDGE',
    'CUSTOMIZATION'
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
