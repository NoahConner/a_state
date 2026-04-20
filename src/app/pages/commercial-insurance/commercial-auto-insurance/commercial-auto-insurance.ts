import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-commercial-auto-insurance',
  standalone: false,
  templateUrl: './commercial-auto-insurance.html',
  styleUrl: './commercial-auto-insurance.scss',
})
export class CommercialAutoInsurance {


  constructor(private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'COMMERCIAL_AUTO_INSURANCE.BANNER.CHIPS.COMMERCIAL_LIABILITY', icon: 'fas fa-car' },
    { name: 'COMMERCIAL_AUTO_INSURANCE.BANNER.CHIPS.COMMERCIAL_TRUCK', icon: 'fas fa-house' },
    { name: 'COMMERCIAL_AUTO_INSURANCE.BANNER.CHIPS.DELIVERY_VEHICLE', icon: 'fas fa-building' },
    { name: 'COMMERCIAL_AUTO_INSURANCE.BANNER.CHIPS.FLEET', icon: 'fas fa-heart' },
    { name: 'COMMERCIAL_AUTO_INSURANCE.BANNER.CHIPS.NON_OWNED_AND_HIRED_AUTO', icon: 'fas fa-notes-medical' },
    { name: 'COMMERCIAL_AUTO_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];



  impactFactorsKeys = [
    "BUSINESS_TYPE",
    "VEHICLE_TYPE",
    "VEHICLE_SIZE",
    "VEHICLE_AGE",
    "FLEET_SIZE",
    "PRIMARY_USE",
    "RADIUS_OF_OPERATION",
    "PASSENGER_OR_CARGO",
    "CARGO_TYPE",
    "HAZARDOUS_MATERIALS",
    "NUMBER_OF_DRIVERS",
    "DRIVER_AGE_EXPERIENCE",
    "DRIVER_MVR",
    "DRIVER_CLAIMS_HISTORY",
    "CDL_LICENSE",
    "HIRED_NON_OWNED",
    "ANNUAL_MILEAGE",
    "GARAGING_LOCATION",
    "COVERAGE_LIMITS",
    "DEDUCTIBLE",
    "PRIOR_CLAIMS",
    "CREDIT_SCORE",
    "SAFETY_TECHNOLOGY",
    "BUNDLING",
    "CARRIER"
  ];


  discountKeys = [
    "MULTI_POLICY",
    "FLEET_DISCOUNT",
    "CLAIMS_FREE",
    "LOYALTY",
    "NEW_VEHICLE",
    "ANTI_THEFT",
    "GPS_FLEET",
    "DASHCAM",
    "TELEMATICS",
    "CDL_DISCOUNT",
    "SAFETY_TRAINING",
    "DEFENSIVE_DRIVING",
    "CLEAN_MVR",
    "EXPERIENCED_DRIVER",
    "PRE_EMPLOYMENT_SCREENING",
    "DRUG_ALCOHOL_TESTING",
    "DOT_COMPLIANCE",
    "HIGHER_DEDUCTIBLE",
    "PAY_IN_FULL",
    "AUTO_PAY",
    "PAPERLESS_BILLING",
    "EARLY_RENEWAL",
    "GOOD_CREDIT",
    "GARAGING_LOCATION",
    "ANNUAL_MILEAGE"
  ];




  notCoveredKeys = [
    "PERSONAL_USE",
    "EMPLOYEE_PERSONAL_VEHICLES",
    "INTENTIONAL_DAMAGE",
    "WEAR_AND_TEAR",
    "MECHANICAL_BREAKDOWN",
    "CARGO_DAMAGE",
    "POLLUTION",
    "RACING_STUNTS",
    "UNAUTHORIZED_DRIVERS",
    "EXCLUDED_DRIVERS",
    "OUTSIDE_TERRITORY",
    "RIDESHARE",
    "UMBRELLA_EXCESS",
    "EMPLOYEE_INJURIES",
    "IMPROPER_LOADING",
    "NUCLEAR_WAR",
    "GOVERNMENT_SEIZURE",
    "UNLISTED_VEHICLES",
    "NEWLY_ACQUIRED_VEHICLES",
    "FAMILY_NON_BUSINESS_USE"
  ];

  agentComparisonData = [
    'CARRIERS',
    'SHOP_RATE',
    'INDUSTRY_OPTIONS',
    'TRUCKING_COVERAGE',
    'DELIVERY_COVERAGE',
    'FOOD_TRUCK',
    'RIDESHARE',
    'FLEET',
    'NON_OWNED',
    'CARGO',
    'TRAILER',
    'HAZMAT',
    'DOWNTIME',
    'GAP',
    'DOT',
    'CDL',
    'TELEMATICS',
    'DASHCAM',
    'MVR',
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

}
