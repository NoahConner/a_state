import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-commercial-property-insurance',
  standalone: false,
  templateUrl: './commercial-property-insurance.html',
  styleUrl: './commercial-property-insurance.scss',
})
export class CommercialPropertyInsurance {
  termsAccepted = false;
  termsAccepted2 = false;


  constructor(public languageService: Language, private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'COMMERCIAL_PROPERTY_INSURANCE.BANNER.CHIPS.BUILDING_STRUCTURE', icon: 'fas fa-car' },
    { name: 'COMMERCIAL_PROPERTY_INSURANCE.BANNER.CHIPS.BUSINESS_PERSONAL_PROPERTY', icon: 'fas fa-house' },
    { name: 'COMMERCIAL_PROPERTY_INSURANCE.BANNER.CHIPS.BUSINESS_INTERRUPTION', icon: 'fas fa-building' },
    { name: 'COMMERCIAL_PROPERTY_INSURANCE.BANNER.CHIPS.INLAND_MARINE', icon: 'fas fa-heart' },
    { name: 'COMMERCIAL_PROPERTY_INSURANCE.BANNER.CHIPS.EQUIPMENT_BREAKDOWN', icon: 'fas fa-notes-medical' },
    { name: 'COMMERCIAL_PROPERTY_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];




  impactFactorsKeys = [
    "BUSINESS_TYPE",
    "LOCATION",
    "BUILDING_AGE",
    "PROPERTY_SIZE",
    "CONSTRUCTION_TYPE",
    "ROOF_CONDITION",
    "NUMBER_OF_LOCATIONS",
    "OWNERSHIP_STATUS",
    "FLOOD_ZONE",
    "WEATHER_RISK",
    "CRIME_RATE",
    "FIRE_DISTANCE",
    "FIRE_PROTECTION",
    "SECURITY_FEATURES",
    "PROPERTY_VALUE",
    "HAZARDOUS_MATERIALS",
    "RESTAURANT_RISK",
    "VACANCY_STATUS",
    "TENANT_RISK",
    "BUSINESS_INTERRUPTION",
    "COVERAGE_TYPE",
    "DEDUCTIBLE",
    "CLAIMS_HISTORY",
    "BUNDLING",
    "CARRIER"
  ];

  discountKeys = [
    "MULTI_POLICY",
    "BOP_BUNDLE",
    "CLAIMS_FREE",
    "LOYALTY",
    "NEW_BUILDING",
    "NEW_ROOF",
    "RECENTLY_RENOVATED",
    "FIRE_RESISTIVE",
    "SPRINKLER_SYSTEM",
    "FIRE_ALARM",
    "SECURITY_SYSTEM",
    "DEADBOLT_ACCESS",
    "GATED_PROPERTY",
    "WIND_MITIGATION",
    "IMPACT_RESISTANT_ROOF",
    "FIRE_STATION_DISTANCE",
    "HIGHER_DEDUCTIBLE",
    "AGREED_VALUE",
    "PAY_IN_FULL",
    "AUTO_PAY",
    "PAPERLESS_BILLING",
    "EARLY_RENEWAL",
    "GOOD_CREDIT",
    "MULTIPLE_LOCATIONS",
    "INDUSTRY_ASSOCIATION"
  ];



  notCoveredKeys = [
    "FLOOD_DAMAGE",
    "EARTHQUAKE_DAMAGE",
    "WEAR_AND_TEAR",
    "PEST_INFESTATION",
    "EMPLOYEE_THEFT",
    "CYBER_ATTACKS",
    "VEHICLES",
    "BODILY_INJURY",
    "PROFESSIONAL_ERRORS",
    "INTENTIONAL_DAMAGE",
    "MOLD_DAMAGE",
    "POLLUTION",
    "GOVERNMENT_ACTION",
    "WAR_TERRORISM",
    "NUCLEAR_HAZARD",
    "UTILITY_FAILURE",
    "VACANT_PROPERTY",
    "OUTDOOR_PROPERTY",
    "DOCUMENTS",
    "NON_PHYSICAL_INTERRUPTIONS"
  ];
  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'INDUSTRY_OPTIONS',
    'RESTAURANT_COVERAGE',
    'RETAIL_COVERAGE',
    'WAREHOUSE_COVERAGE',
    'OFFICE_COVERAGE',
    'CONTRACTOR_TRADES',
    'BUSINESS_INTERRUPTION',
    'EQUIPMENT_BREAKDOWN',
    'INLAND_MARINE',
    'TENANT_IMPROVEMENTS',
    'VACANT_PROPERTY',
    'FLOOD_BUNDLE',
    'BOP_BUNDLE',
    'WIND_HAIL',
    'COVERAGE_TYPE_KNOWLEDGE',
    'AGREED_VALUE',
    'IMPACT_ROOF_DISCOUNT',
    'BILINGUAL',
    'PRICE',
    'LOYALTY',
    'SWITCHING',
    'DISCOUNTS',
    'CLAIMS',
    'LOCAL_KNOWLEDGE',
    'CUSTOMIZATION'
  ];



  industryCoverageKeys = [
    'CONSTRUCTION_TRADES',
    'TRANSPORTATION_LOGISTICS',
    'FOOD_HOSPITALITY',
    'HEALTHCARE_MEDICAL',
    'PROFESSIONAL_SERVICES',
    'RETAIL_ECOMMERCE',
    'AUTOMOTIVE_VEHICLE',
    'REAL_ESTATE_PROPERTY',
    'PERSONAL_CARE_BEAUTY',
    'EDUCATION_CHILDCARE',
    'ENTERTAINMENT_EVENTS',
    'FITNESS_WELLNESS',
    'LANDSCAPING_AGRICULTURE',
    'CLEANING_MAINTENANCE',
    'TECHNOLOGY_MEDIA',
    'NONPROFIT_SOCIAL'
  ];


  switchSteps = [
    'STEP_1',
    'STEP_2',
    'STEP_3',
  ];

  faqList = [
    'FAQ1',
    'FAQ2',
  ];


  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
