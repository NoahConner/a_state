/**
 * Per-office facts for the office pages that don't change with the language.
 * The office's text lives in OFFICE_PAGE.OFFICES.<key> in the translation files.
 * To move another office to this page: add it here and in the translations,
 * then point its two routes (English and Spanish) at OfficeDetail.
 */

export interface CoverageTile {
  /** Label key under OFFICE_PAGE.COMMON.COVERAGE.ITEMS */
  key: string;
  routeKey: string;
  icon: string;
}

export interface OfficeConfig {
  /** Key under OFFICE_PAGE.OFFICES */
  key: string;
  /** Id in OFFICES (header) and the URL slug */
  id: string;
  /** Short office name used for the lead's preferred_office and the schema name */
  name: string;
  phone: string;
  tel: string;
  rating: number;
  reviews: number;
  /** Google Maps embed; `{hl}` is replaced with the page language settings */
  mapEmbed: string;
  /** Google Maps place page (also used for "Read all reviews") */
  placeUrl: string;
  address: { street: string; city: string; region: string; postalCode: string };
  /** Neighborhood names, the same in both languages */
  hoods: string[];
  zips: string[];
  /** Index of the "Insurance made simple" card that spans the full width (the local one) */
  wideWhy: number;
  personal: CoverageTile[];
  business: CoverageTile[];
}

const PERSONAL: CoverageTile[] = [
  { key: 'auto', routeKey: 'autoInsurance', icon: 'i-car' },
  { key: 'home', routeKey: 'homeInsurance', icon: 'i-home' },
  { key: 'renters', routeKey: 'rentersInsurance', icon: 'i-building' },
  { key: 'flood', routeKey: 'floodInsurance', icon: 'i-storm' },
  { key: 'sr22', routeKey: 'sr22Insurance', icon: 'i-doc' },
  { key: 'life', routeKey: 'lifeInsurance', icon: 'i-heart' },
  { key: 'health', routeKey: 'healthInsurance', icon: 'i-health' },
  { key: 'finalExpense', routeKey: 'finalExpenseInsurance', icon: 'i-umbrella' },
  { key: 'medicare', routeKey: 'medicareSupplementInsurance', icon: 'i-plus' },
];

const BUSINESS: CoverageTile[] = [
  { key: 'commercial', routeKey: 'commercialInsurance', icon: 'i-briefcase' },
  { key: 'commercialAuto', routeKey: 'commercialAutoInsurance', icon: 'i-car' },
  { key: 'surety', routeKey: 'suretyBondInsurance', icon: 'i-shield' },
];

export const OFFICE_PAGES: OfficeConfig[] = [
  {
    key: 'antoine',
    id: '5712-antoine-dr-houston-tx-77091',
    name: 'Antoine',
    phone: '(713) 263-9800',
    tel: '+17132639800',
    rating: 4.9,
    reviews: 43,
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.550757815734!2d-95.47539188819269!3d29.84838647491884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c608c61ef783%3A0xe3848480e5c382fd!2sA-State%20Insurance!5e0!3m2!{hl}!4v1791917821705!5m2!{hl}',
    placeUrl: 'https://www.google.com/maps?cid=16394374232680923901',
    address: { street: '5712 Antoine Dr', city: 'Houston', region: 'TX', postalCode: '77091' },
    hoods: ['Greater Inwood', 'Inwood Forest', 'Candlelight Plaza', 'Acres Homes', 'Oak Forest', 'Central Northwest', 'Highland Heights', 'Carverdale'],
    zips: ['77091', '77088', '77092', '77018'],
    wideWhy: 2,
    personal: PERSONAL,
    business: BUSINESS,
  },
  {
    key: 'postOak',
    id: '10547-s-post-oak-rd-houston-tx-77035',
    name: 'Post Oak',
    phone: '(281) 406-1900',
    tel: '+12814061900',
    rating: 4.7,
    reviews: 31,
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.8447209615224!2d-95.46534118819837!3d29.666279975012447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640ebc87cb9e9cb%3A0x189839a7af3d6bdb!2sA-State%20Insurance!5e0!3m2!{hl}!4v1791917047536!5m2!{hl}',
    placeUrl: 'https://www.google.com/maps?cid=1772229845732649947',
    address: { street: '10547 S Post Oak Rd', city: 'Houston', region: 'TX', postalCode: '77035' },
    hoods: ['Westbury', 'Willow Meadows', 'Willowbend', 'Post Oak Manor', 'Brays Oaks', 'Meyerland', 'Fondren Southwest', 'Central Southwest'],
    zips: ['77035', '77096', '77071', '77045'],
    wideWhy: 2,
    personal: PERSONAL,
    business: BUSINESS,
  },
  {
    key: 'southwest',
    id: '11503-southwest-fwy-b-houston-tx-77031',
    name: 'Southwest',
    phone: '(281) 506-4200',
    tel: '+12815064200',
    rating: 4.4,
    reviews: 32,
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.2901491753355!2d-95.56783138819877!3d29.65335367501906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e742e1e45833%3A0x1013137366abdc82!2sA-State%20Insurance!5e0!3m2!{hl}!4v1791916005564!5m2!{hl}',
    placeUrl: 'https://www.google.com/maps?cid=1158290915529055362',
    address: { street: '11503 Southwest Fwy, Suite B', city: 'Houston', region: 'TX', postalCode: '77031' },
    hoods: ['Fondren Southwest', 'Brays Oaks', 'Alief', 'Westwood', 'Braeburn', 'Sharpstown', 'Meadows Place', 'Stafford', 'Missouri City'],
    zips: ['77031', '77099', '77071', '77072', '77477'],
    wideWhy: 2,
    personal: PERSONAL,
    business: BUSINESS,
  },
  {
    key: 'shotwell',
    id: '707-shotwell-st-a-houston-tx-77020',
    name: 'Shotwell',
    phone: '(281) 749-1900',
    tel: '+12817491900',
    rating: 4.8,
    reviews: 121,
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.0513431557292!2d-95.31391098819493!3d29.77615687495578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b94e64abe0e5%3A0xbcbe087a2f223041!2sA-State%20Insurance!5e0!3m2!{hl}!4v1791915117476!5m2!{hl}',
    placeUrl: 'https://www.google.com/maps?cid=13600317245575278657',
    address: { street: '707 Shotwell St, Suite A', city: 'Houston', region: 'TX', postalCode: '77020' },
    hoods: ['Denver Harbor', 'Magnolia Park', 'Pleasantville', 'Fifth Ward', 'Kashmere Gardens', 'Second Ward', 'Clinton Park', 'East End'],
    zips: ['77020', '77011', '77029', '77026'],
    wideWhy: 2,
    personal: PERSONAL,
    business: BUSINESS,
  },
  {
    key: 'airline',
    id: '5206-airline-dr-g-houston-tx-77022',
    name: 'Airline',
    phone: '(281) 504-7444',
    tel: '+12815047444',
    rating: 5.0,
    reviews: 30,
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.762273479627!2d-95.38636318819287!3d29.8422829749219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b9c87d8b4ba5%3A0x9f74c0c87f80aa47!2sA-State%20Insurance!5e0!3m2!{hl}!4v1791918550181!5m2!{hl}',
    placeUrl: 'https://www.google.com/maps?cid=11490020516694108743',
    address: { street: '5206 Airline Dr, Suite G', city: 'Houston', region: 'TX', postalCode: '77022' },
    hoods: ['Northside-Northline', 'Independence Heights', 'Lindale Park', 'Brooke Smith', 'Sunset Heights', 'Melrose Park', 'Near Northside'],
    zips: ['77022', '77009', '77076', '77018'],
    wideWhy: 2,
    personal: PERSONAL,
    business: BUSINESS,
  },
];
