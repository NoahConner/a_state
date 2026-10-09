import { Language } from '../../../services/language';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pet-insurance',
  standalone: false,
  templateUrl: './pet-insurance.html',
  styleUrl: './pet-insurance.scss',
})
export class PetInsurance {

  constructor(public languageService: Language, private translate: TranslateService) { }


  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  chips = [
    { name: 'PET_INSURANCE.BANNER.CHIPS.ACCIDENT_ONLY', icon: 'fas fa-car' },
    { name: 'PET_INSURANCE.BANNER.CHIPS.ACCIDENT_ILLNESS', icon: 'fas fa-house' },
    { name: 'PET_INSURANCE.BANNER.CHIPS.COMPREHENSIVE', icon: 'fas fa-building' },
    { name: 'PET_INSURANCE.BANNER.CHIPS.WELLNESS', icon: 'fas fa-heart' },
    { name: 'PET_INSURANCE.BANNER.CHIPS.LIFETIME', icon: 'fas fa-notes-medical' },
    { name: 'PET_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];




  impactFactorsKeys = [
    'SPECIES',
    'BREED',
    'AGE',
    'LOCATION',
    'PLAN_TYPE',
    'DEDUCTIBLE',
    'REIMBURSEMENT',
    'COVERAGE_LIMIT',
    'PRE_EXISTING',
    'WELLNESS'
  ];

  


  discountKeys = [
    'ENROLL_EARLY',
    'HIGHER_DEDUCTIBLE',
    'REIMBURSEMENT_80',
    'SKIP_WELLNESS',
    'COMPARE_CARRIERS',
    'ANNUAL_DEDUCTIBLE',
    'BUNDLE',
    'REVIEW_ANNUALLY',
    'PREVENTIVE_CARE',
    'INDEPENDENT_AGENT'
  ];
 

  notCoveredKeys = [
    'PRE_EXISTING',
    'ROUTINE_CARE',
    'COSMETIC',
    'BREEDING',
    'GROOMING',
    'PARASITES',
    'EXPERIMENTAL',
    'BEHAVIORAL',
    'DENTAL_CLEANING',
    'NEGLECT'



  ];





  agentComparisonData = [
      'COMPARES_CARRIERS',
      'SHOPS_RATE',
      'REIMBURSEMENT',
      'BREED_RISKS',
      'BUNDLES',
      'BILINGUAL',
      'LOCAL_EXPERTISE',
      'PLAN_COMPARISON',
      'CLAIM_SUPPORT',
      'AGING_REVIEW',
      'COST',
      'LONG_TERM'
  ];


  ratesCompanyKeys = [
    'ASPCA',
    'SPOT',
    'PRUDENT_PET',
    'LEMONADE',
    'HEALTHY_PAWS',
    'PETS_BEST',
    'PUMPKIN'
  ];

  dogsBreedRate = [
    'AFFENPINSCHER',
    'AFGHAN_HOUND',
    'AIREDALE_TERRIER',
    'AKITA',
    'ALASKAN_HUSKY',
    'ALASKAN_MALAMUTE',
    'AMERICAN_BULLDOG',
    'AMERICAN_BULLY',
    'AMERICAN_ESKIMO',
    'AMERICAN_FOXHOUND',
    'AMERICAN_HAIRLESS_TERRIER',
    'AMERICAN_STAFFORDSHIRE_TERRIER',
    'AUSTRALIAN_CATTLE_DOG',
    'AUSTRALIAN_KELPIE',
    'AUSTRALIAN_SHEPHERD',
    'AUSTRALIAN_SILKY_TERRIER',
    'AUSTRALIAN_TERRIER',
    'BASENJI',
    'BASSET_FAUVE_DE_BRETAGNE',
    'BASSET_HOUND',
    'BEAGLE',
    'BEARDED_COLLIE',
    'BELGIAN_SHEPHERD_MALINOIS',
    'BERNESE_MOUNTAIN_DOG',
    'BICHON_FRISE',
    'BLOODHOUND',
    'BORDER_COLLIE',
    'BORDER_TERRIER',
    'BORZOI',
    'BOSTON_TERRIER',
    'BOXER',
    'BRACCO_ITALIANO',
    'BRIARD',
    'BRUSSELS_GRIFFON',
    'BULL_MASTIFF',
    'BULL_TERRIER',
    'CAIRN_TERRIER',
    'CANE_CORSO',
    'CAUCASIAN_SHEPHERD_DOG',
    'CAVACHON',
    'CAVALIER_KING_CHARLES_SPANIEL',
    'CAVAPOO',
    'CENTRAL_ASIAN_SHEPHERD_DOG',
    'CHIHUAHUA',
    'CHOW_CHOW',
    'CLUMBER_SPANIEL',
    'COCKAPOO',
    'COCKER_SPANIEL',
    'COLLIE',
    'CORGI',
    'COTON_DE_TULEAR',
    'DACHSHUND',
    'DALMATIAN',
    'DINGO',
    'DOBERMAN_PINSCHER',
    'DOGUE_DE_BORDEAUX',
    'ENGLISH_BULLDOG',
    'ENGLISH_FOXHOUND',
    'ENGLISH_MASTIFF',
    'ENGLISH_POINTER',
    'ENGLISH_SETTER',
    'ENGLISH_SPRINGER_SPANIEL',
    'ENGLISH_TOY_TERRIER',
    'ESTRELA_MOUNTAIN_DOG',
    'FIELD_SPANIEL',
    'FINNISH_LAPPHUND',
    'FOX_TERRIER',
    'FOXHOUND',
    'FRENCH_BULLDOG',
    'GERMAN_PINSCHER',
    'GERMAN_SHEPHERD',
    'GERMAN_SHORTHAIRED_POINTER',
    'GERMAN_SPITZ',
    'GOLDEN_RETRIEVER',
    'GOLDENDOODLE',
    'GORDON_SETTER',
    'GREAT_DANE',
    'GREAT_PYRENEES',
    'GREYHOUND',
    'GROODLE',
    'HARRIER',
    'HAVANESE',
    'HUNGARIAN_VIZSLA',
    'HUSKY',
    'ICELANDIC_SHEEPDOG',
    'IRISH_SETTER',
    'IRISH_TERRIER',
    'ITALIAN_GREYHOUND',
    'ITALIAN_SPINONE',
    'JACK_RUSSELL_TERRIER',
    'JAPANESE_CHIN',
    'JAPANESE_SPITZ',
    'KANGAL_SHEPHERD_DOG',
    'KEESHOND',
    'KOMONDOR',
    'LABRADOODLE',
    'LABRADOR_RETRIEVER',
    'LHASA_APSO',
    'LURCHER',
    'MALTESE',
    'MALTIPOO',
    'MINIATURE_BULL_TERRIER',
    'MINIATURE_DACHSHUND',
    'MINIATURE_FOX_TERRIER',
    'MINIATURE_PINSCHER',
    'MINIATURE_POODLE',
    'MINIATURE_SCHNAUZER',
    'MORKIE',
    'NEWFOUNDLAND',
    'NORFOLK_TERRIER',
    'NORWEGIAN_ELKHOUND',
    'NORWICH_TERRIER',
    'OLD_ENGLISH_SHEEPDOG',
    'OLDE_ENGLISH_BULLDOGGE',
    'PAPILLON',
    'PEKINGESE',
    'PEMBROKE_WELSH_CORGI',
    'PERUVIAN_HAIRLESS_DOG',
    'PETIT_BASSET_GRIFFON_VENDEEN',
    'PITBULL',
    'POINTER',
    'POMERANIAN',
    'PORTUGUESE_WATER_DOG',
    'PUG',
    'PUGGLE',
    'PULI',
    'RHODESIAN_RIDGEBACK',
    'ROTTWEILER',
    'ROUGH_COLLIE',
    'SAINT_BERNARD',
    'SALUKI',
    'SAMOYED',
    'SCHNOODLE',
    'SCOTTISH_DEERHOUND',
    'SCOTTISH_TERRIER',
    'SHAR_PEI',
    'SHETLAND_SHEEPDOG',
    'SHIBA_INU',
    'SHIH_TZU',
    'SIBERIAN_HUSKY',
    'SMOOTH_COLLIE',
    'SOFT_COATED_WHEATEN_TERRIER',
    'STAFFORDSHIRE_BULL_TERRIER',
    'STANDARD_POODLE',
    'STANDARD_SCHNAUZER',
    'TIBETAN_MASTIFF',
    'TIBETAN_TERRIER',
    'TOY_POODLE',
    'VIZSLA',
    'WEIMARANER',
    'WELSH_CORGI_CARDIGAN',
    'WELSH_SPRINGER_SPANIEL',
    'WELSH_TERRIER',
    'WEST_HIGHLAND_WHITE_TERRIER',
    'WHIPPET',
    'WIRE_FOX_TERRIER',
    'YORKSHIRE_TERRIER'
];

  catBreedRate = [
    'ABYSSINIAN',
    'AUSTRALIAN_MIST',
    'BALINESE',
    'BENGAL',
    'BIRMAN',
    'BOMBAY',
    'BRITISH_LONGHAIR',
    'BRITISH_SHORTHAIR',
    'BURMESE',
    'CHINCHILLA',
    'CORNISH_REX',
    'DEVON_REX',
    'DOMESTIC_SHORTHAIR',
    'EXOTIC_SHORTHAIR',
    'HIMALAYAN',
    'MAINE_COON',
    'MUNCHKIN',
    'NORWEGIAN_FOREST_CAT',
    'PERSIAN',
    'RAGDOLL',
    'RUSSIAN_BLUE',
    'SAVANNAH',
    'SCOTTISH_FOLD',
    'SERENGETI',
    'SIAMESE',
    'SIBERIAN',
    'SNOWSHOE',
    'SPHYNX',
    'TONKINESE'
];

ageBreedRate = [
    'UNDER_1',
    'AGE_1',
    'AGE_2',
    'AGE_3',
    'AGE_4',
    'AGE_5',
    'AGE_6',
    'AGE_7',
    'AGE_8',
    'AGE_9',
    'AGE_10',
    'AGE_11',
    'AGE_12',
    'AGE_13',
    'AGE_14',
    'AGE_15',
    'AGE_16',
    'AGE_17',
    'AGE_18',
    'AGE_19',
    'AGE_20'
];

 
  factorComparisonKeys = [
    'ACCIDENTS_EMERGENCIES',
    'ILLNESSES_CHRONIC',
    'ROUTINE_PREVENTIVE',
    'MONTHLY_COST',
    'REQUIRES_REPAYMENT',
    'PRE_EXISTING_COVERED',
    'COVERAGE_LIMIT',
    'WAITING_PERIOD',
    'BEST_FOR',
    'PEACE_OF_MIND'
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
