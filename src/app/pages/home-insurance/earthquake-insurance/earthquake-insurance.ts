import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-earthquake-insurance',
  standalone: false,
  templateUrl: './earthquake-insurance.html',
  styleUrl: './earthquake-insurance.scss',
})
export class EarthquakeInsurance {
  constructor(public languageService: Language) {}



  chips = [
    { name: 'EARTHQUAKE_INSURANCE.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-car' },
    { name: 'EARTHQUAKE_INSURANCE.BANNER.CHIPS.RENTERS', icon: 'fas fa-house' },
    { name: 'EARTHQUAKE_INSURANCE.BANNER.CHIPS.CONDO', icon: 'fas fa-building' },
    { name: 'EARTHQUAKE_INSURANCE.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-heart' },
    { name: 'EARTHQUAKE_INSURANCE.BANNER.CHIPS.INDUCED_SEISMICITY', icon: 'fas fa-notes-medical' },
    { name: 'EARTHQUAKE_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
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
    'FAULT_PROXIMITY',
    'OIL_GAS_PROXIMITY',
    'INDUCED_RISK',
    'SEISMIC_ZONE',
    'HOME_AGE',
    'CONSTRUCTION_TYPE',
    'FOUNDATION_TYPE',
    'STORIES',
    'SOIL_TYPE',
    'ROOF_CONDITION',
    'CHIMNEY_PRESENCE',
    'COVERAGE_AMOUNT',
    'DEDUCTIBLE',
    'PERSONAL_PROPERTY_LIMIT',
    'LOSS_OF_USE_LIMIT',
    'CLAIMS_HISTORY',
    'CREDIT_SCORE',
    'PLUMBING_AGE',
    'SEISMIC_RETROFIT',
    'FOUNDATION_BOLTED',
    'UTILITIES_SECURED',
    'RESIDENCY_TYPE',
    'BUNDLING',
    'CARRIER'
  ];




  discountKeys = [
    'SEISMIC_RETROFIT',
    'FOUNDATION_BOLTING',
    'CRIPPLE_WALL',
    'SOFT_STORY',
    'SECURED_UTILITIES',
    'GAS_SHUTOFF',
    'REINFORCED_CHIMNEY',
    'WOOD_FRAME',
    'NEW_CONSTRUCTION',
    'HOME_INSPECTION',
    'HIGH_DEDUCTIBLE',
    'BUNDLING',
    'CLAIM_FREE',
    'LOYALTY',
    'NEW_ROOF',
    'UPDATED_UTILITIES',
    'SINGLE_STORY',
    'GOOD_CREDIT',
    'PAPERLESS',
    'AUTO_PAY',
    'PAID_FULL',
    'PRIMARY_RESIDENCE',
    'EARLY_RENEWAL',
    'NON_MASONRY',
    'PREPAREDNESS_KIT'
  ];



  notCoveredKeys = [
    'FLOOD_AFTER_EARTHQUAKE',
    'FIRE_AFTER_EARTHQUAKE',
    'VEHICLES',
    'LANDSCAPING',
    'WEAR_TEAR',
    'PRE_EXISTING_DAMAGE',
    'MOLD_MILDEW',
    'BUSINESS_INTERRUPTION',
    'CURRENCY_VALUABLES',
    'POOLS_SPAS',
    'FENCES_WALLS',
    'BELOW_DEDUCTIBLE',
    'GROUND_SETTLEMENT',
    'SINKHOLES',
    'GOVERNMENT_SEIZURE',
    'WAR_NUCLEAR',
    'INTENTIONAL_DAMAGE',
    'WAITING_PERIOD',
    'INDUCED_SEISMICITY_EXCLUSION',
    'DETACHED_STRUCTURES'
  ];



  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'POLICY_TYPES',
    'INDUCED_COVERAGE',
    'WEST_TEXAS',
    'OIL_GAS_KNOWLEDGE',
    'RETROFIT_KNOWLEDGE',
    'FOUNDATION_OPTIONS',
    'MASONRY_OPTIONS',
    'LOSS_OF_USE',
    'CODE_UPGRADE',
    'COMMERCIAL',
    'RENTERS',
    'DEDUCTIBLE_OPTIONS',
    'FLOOD_BUNDLE',
    'HOMEOWNERS_BUNDLE',
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




  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
