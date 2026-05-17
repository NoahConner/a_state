import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-renters-insurance',
  standalone: false,
  templateUrl: './renters-insurance.html',
  styleUrl: './renters-insurance.scss',
})
export class RentersInsurance {
  constructor(public languageService: Language) {}




  chips = [
    { name: 'RENTERS_INSURANCE.BANNER.CHIPS.PERSONAL_PROPERTY', icon: 'fas fa-car' },
    { name: 'RENTERS_INSURANCE.BANNER.CHIPS.LIABILITY', icon: 'fas fa-house' },
    { name: 'RENTERS_INSURANCE.BANNER.CHIPS.ADDITIONAL_LIVING_EXPENSES', icon: 'fas fa-building' },
    { name: 'RENTERS_INSURANCE.BANNER.CHIPS.SCHEDULED_PROPERTY', icon: 'fas fa-heart' },
    { name: 'RENTERS_INSURANCE.BANNER.CHIPS.UMBRELLA', icon: 'fas fa-notes-medical' },
    { name: 'RENTERS_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  rates = [
    { city: 'Houston', monthly: '$20', annual: '$241' },
    { city: 'San Antonio', monthly: '$18', annual: '$217' },
    { city: 'Dallas', monthly: '$18', annual: '$211' },
    { city: 'Austin', monthly: '$14', annual: '$168' },
    { city: 'Fort Worth', monthly: '$17', annual: '$208' },
    { city: 'El Paso', monthly: '$17', annual: '$206' },
    { city: 'Arlington', monthly: '$17', annual: '$208' },
    { city: 'Corpus Christi', monthly: '$19', annual: '$228' },
    { city: 'Plano', monthly: '$14', annual: '$163' },
    { city: 'Lubbock', monthly: '$21', annual: '$249' },
  ];
  companyRates = [
    { carrier: '<a href="https://www.usaa.com/" rel="nofollow">USAA</a>', monthly: '$121' },
    { carrier: '<a href="https://www.statefarm.com/" rel="nofollow">State Farm', monthly: '$143' },
    { carrier: '<a href="https://www.lemonade.com/" rel="nofollow">Lemonade', monthly: '$155' },
    { carrier: '<a href="https://www.mercuryinsurance.com/" rel="nofollow">Mercury', monthly: '$167' },
    { carrier: '<a href="https://www.progressive.com/" rel="nofollow">Progressive</a>', monthly: '$177' },
    { carrier: '<a href="https://www.travelers.com/" rel="nofollow">Travelers</a>', monthly: '$204' }
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


  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
