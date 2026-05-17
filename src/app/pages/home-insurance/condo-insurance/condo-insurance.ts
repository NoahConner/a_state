import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-condo-insurance',
  standalone: false,
  templateUrl: './condo-insurance.html',
  styleUrl: './condo-insurance.scss',
})
export class CondoInsurance {
  constructor(public languageService: Language) {}



  chips = [
    { name: 'CONDO_INSURANCE.BANNER.CHIPS.HIGH_RISE', icon: 'fas fa-car' },
    { name: 'CONDO_INSURANCE.BANNER.CHIPS.LOW_RISE', icon: 'fas fa-house' },
    { name: 'CONDO_INSURANCE.BANNER.CHIPS.TOWNHOUSE', icon: 'fas fa-building' },
    { name: 'CONDO_INSURANCE.BANNER.CHIPS.LOFT', icon: 'fas fa-heart' },
    { name: 'CONDO_INSURANCE.BANNER.CHIPS.WATERFRONT', icon: 'fas fa-notes-medical' },
    { name: 'CONDO_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];


  rates = [
    { city: 'Houston', monthly: '$106', annual: '$1,277' },
    { city: 'San Antonio', monthly: '$77', annual: '$926' },
    { city: 'Dallas', monthly: '$91', annual: '$1,092' },
    { city: 'Austin', monthly: '$69', annual: '$830' },
    { city: 'Fort Worth', monthly: '$82', annual: '$980' },
    { city: 'El Paso', monthly: '$65', annual: '$779' },
    { city: 'Arlington', monthly: '$84', annual: '$1,005' },
    { city: 'Corpus Christi', monthly: '$128', annual: '$1,541' },
    { city: 'Plano', monthly: '$86', annual: '$1,026' },
    { city: 'Lubbock', monthly: '$77', annual: '$923' },
  ];

  companyRates = [
    { carrier: '<a href="https://www.farmers.com/" rel="nofollow">Farmers</a>', monthly: '$52', annual: '$619' },
    { carrier: '<a href="https://www.allstate.com/" rel="nofollow">Allstate</a>', monthly: '$67', annual: '$808' },
    { carrier: '<a href="https://www.insurancequotede.com/" rel="nofollow">AllstateState Farm</a>', monthly: '$73', annual: '$874' },
    { carrier: '<a href="https://www.nationwide.com/" rel="nofollow">Nationwide</a>', monthly: '$100', annual: '$1,203' },
    { carrier: '<a href="https://www.progressive.com/" rel="nofollow">Progressive</a>', monthly: '$119', annual: '$1,427' },
    { carrier: '<a href="https://www.usaa.com/?akredirect=true" rel="nofollow">USAA</a>', monthly: '$95', annual: '$1,137' }
  ];
  impactFactorsKeys = [
    'LOCATION',
    'BUILDING_AGE',
    'COVERAGE_AMOUNT',
    'DEDUCTIBLE',
    'CONSTRUCTION_TYPE',
    'FLOOR_LEVEL',
    'PROXIMITY_COAST',
    'CRIME_RATE',
    'CLAIMS_HISTORY',
    'CREDIT_SCORE',
    'SECURITY_FEATURES',
    'FIRE_PROTECTION',
    'HOA_POLICY',
    'PERSONAL_PROPERTY_VALUE',
    'INTERIOR_UPGRADES',
    'PET_OWNERSHIP',
    'RENTAL_UNIT',
    'BUNDLING',
    'HOMEOWNER_EXPERIENCE',
    'INSURANCE_CARRIER'
  ];



  discountKeys = [
    'BUNDLING',
    'CLAIM_FREE',
    'LOYALTY',
    'NEW_CONDO_OWNER',
    'NEW_BUILDING',
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
    'HOA_MEMBER',
    'NEW_ROOF',
    'STORM_SHUTTERS'
  ];


  notCoveredKeys = [
    'FLOOD_DAMAGE',
    'EARTHQUAKE_DAMAGE',
    'PEST_DAMAGE',
    'WEAR_TEAR',
    'MOLD_MILDEW',
    'COMMON_AREAS',
    'INTENTIONAL_DAMAGE',
    'BUSINESS_PROPERTY',
    'GOVERNMENT_SEIZURE',
    'WAR_NUCLEAR',
    'HIGH_VALUE_LIMITS',
    'VEHICLE_DAMAGE',
    'PET_DAMAGE',
    'SINKHOLES',
    'POWER_OUTAGE'
  ];


  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'CONDO_OPTIONS',
    'WALLS_IN_COVERAGE',
    'HOA_REVIEW',
    'FLOOD_WINDSTORM',
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
