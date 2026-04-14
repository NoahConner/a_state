import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { InsuranceServices } from './pages/insurance-services/insurance-services';
import { About } from './pages/about/about';
import { Privacy } from './pages/privacy/privacy';
import { Terms } from './pages/terms/terms';
import { Careers } from './pages/careers/careers';
import { Thankyou } from './pages/thank-you/thank-you';
import { OurLocations } from './pages/our-locations/our-locations';
import { LocationDetail } from './pages/location-detail/location-detail';
import { GetAQuote } from './pages/get-a-quote/get-a-quote';
import { GetCustomQuote } from './pages/get-custom-quote/get-custom-quote';
import { GetAutoQuote } from './pages/get-auto-quote/get-auto-quote';
import { GetHomeQuote } from './pages/get-home-quote/get-home-quote';
import { GetCommercialQuote } from './pages/get-commercial-quote/get-commercial-quote';
import { GetLifeQuote } from './pages/get-life-quote/get-life-quote';
import { GetHealthQuote } from './pages/get-health-quote/get-health-quote';
import { GetSuretyQuote } from './pages/get-surety-quote/get-surety-quote';
import { AutoInsurance } from './pages/auto-insurance/auto-insurance';
import { HomeInsurance } from './pages/home-insurance/home-insurance';
import { CommercialInsurance } from './pages/commercial-insurance/commercial-insurance';
import { LifeInsurance } from './pages/life-insurance/life-insurance';
import { HealthInsurance } from './pages/health-insurance/health-insurance';
import { SuretyBondInsurance } from './pages/surety-bond-insurance/surety-bond-insurance';
import { CarInsurance } from './pages/auto-insurance/car-insurance/car-insurance';
import { MotorcycleInsurance } from './pages/auto-insurance/motor-insurance/motorcycle-insurance';
import { BoatInsurance } from './pages/auto-insurance/boat-insurance/boat-insurance';
import { RvInsurance } from './pages/auto-insurance/rv-insurance/rv-insurance';
import { ClassicCarInsurance } from './pages/auto-insurance/classic-car-insurance/classic-car-insurance';
import { Sr22Insurance } from './pages/auto-insurance/sr-22-insurance/sr-22-insurance';
import { AtvAndUtvInsurance } from './pages/auto-insurance/atv-utv-insurance/atv-utv-insurance';
import { TrailerInsurance } from './pages/auto-insurance/trailer-insurance/trailer-insurance';
import { MexicanCarInsurance } from './pages/auto-insurance/mexican-car-insurance/mexican-car-insurance';
import { RideshareInsurance } from './pages/auto-insurance/rideshare-insurance/rideshare-insurance';
import { RentersInsurance } from './pages/home-insurance/renters-insurance/renters-insurance';

const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full', data: { metaPage: 'home' } },
  { path: 'contact-us', component: Contact },
  { path: 'insurance-services', component: InsuranceServices },
  { path: 'about-us', component: About },
  { path: 'privacy-policy', component: Privacy },
  { path: 'terms-and-conditions', component: Terms },
  { path: 'careers', component: Careers },
  { path: 'thank-you', component: Thankyou },
  { path: 'our-locations', component: OurLocations, runGuardsAndResolvers: 'always' },
  { path: 'our-locations/:id', component: LocationDetail, runGuardsAndResolvers: 'always' },
  { path: 'get-a-quote', component: GetAQuote },
  { path: 'request-a-custom-quote', component: GetCustomQuote },
  { path: 'auto-insurance/quote', component: GetAutoQuote },
  { path: 'homeowners-insurance/quote', component: GetHomeQuote },
  { path: 'commercial-insurance/quote', component: GetCommercialQuote },
  { path: 'life-insurance/quote', component: GetLifeQuote },
  { path: 'health-insurance/quote', component: GetHealthQuote },
  { path: 'surety-bonds/quote', component: GetSuretyQuote },
  // { path: 'auto-insurance', component: AutoInsurance },
  // { path: 'homeowners-insurance', component: HomeInsurance },
  { path: 'commercial-insurance', component: CommercialInsurance },
  { path: 'life-insurance', component: LifeInsurance },
  { path: 'health-insurance', component: HealthInsurance },
  { path: 'surety-bonds', component: SuretyBondInsurance },
  {
    path: 'auto-insurance',
    children: [
      { path: '', component: AutoInsurance },
      { path: 'car-insurance', component: CarInsurance },
      { path: 'motorcycle-insurance', component: MotorcycleInsurance },
      { path: 'boat-insurance', component: BoatInsurance },
      { path: 'rv-motorhome-insurance', component: RvInsurance },
      { path: 'classic-car-insurance', component: ClassicCarInsurance },
      { path: 'sr-22-insurance', component: Sr22Insurance },
      { path: 'atv-utv-insurance', component: AtvAndUtvInsurance },
      { path: 'trailer-insurance', component: TrailerInsurance },
      { path: 'mexican-car-insurance', component: MexicanCarInsurance },
      { path: 'rideshare-insurance', component: RideshareInsurance },
    ]
  },

  {
    path: 'homeowners-insurance',
    children: [
      { path: '', component: HomeInsurance },
      { path: 'renters-insurance', component: RentersInsurance },

    ]
  },








  // { path: 'our-locations-detail/:id', component: LocationDetail },

  // Spanish
  {
    path: 'es',
    children: [
      { path: 'contacto', component: Contact },
      { path: 'servicios-de-seguros', component: InsuranceServices },
      { path: 'sobre-nosotros', component: About },
      { path: 'politica-de-privacidad', component: Privacy },
      { path: 'terminos-y-condiciones', component: Terms },
      { path: 'carreras', component: Careers },
      { path: 'gracias', component: Thankyou },
      { path: 'obtener-una-cotizacion', component: GetAQuote },
      { path: 'solicitar-una-cotizacion-personalizada', component: GetCustomQuote },
      { path: 'seguros-de-auto/cotizacion', component: GetAutoQuote },
      { path: 'seguros-de-vivienda/cotizacion', component: GetHomeQuote },
      { path: 'seguros-comerciales/cotizacion', component: GetCommercialQuote },
      { path: 'seguros-de-vida/cotizacion', component: GetLifeQuote },
      { path: 'seguros-de-salud/cotizacion', component: GetHealthQuote },
      { path: 'fianzas/cotizacion', component: GetSuretyQuote },
      {
        path: 'seguros-de-auto',
        children: [
          { path: '', component: AutoInsurance },
          { path: 'seguro-de-carro', component: CarInsurance },
          { path: 'seguro-de-motocicleta', component: MotorcycleInsurance },
          { path: 'seguro-de-barco', component: BoatInsurance },
          { path: 'seguro-de-rv-y-motorhome', component: RvInsurance },
          { path: 'seguro-de-auto-clasico', component: ClassicCarInsurance },
          { path: 'seguro-de-sr-22', component: Sr22Insurance },
          { path: 'seguro-de-atv-utv', component: AtvAndUtvInsurance },
          { path: 'seguro-de-trailer', component: TrailerInsurance },
          { path: 'seguro-de-carro-mexicano', component: MexicanCarInsurance },
          { path: 'seguro-de-rideshare', component: RideshareInsurance },
        ]
      },
      {
        path: 'seguros-de-vivienda',
        children: [
          { path: '', component: HomeInsurance },
          { path: 'seguro-de-renters', component: RentersInsurance },
        ]
      },
      { path: 'seguros-comerciales', component: CommercialInsurance },
      { path: 'seguros-de-vida', component: LifeInsurance },
      { path: 'seguros-de-salud', component: HealthInsurance },
      { path: 'fianzas', component: SuretyBondInsurance },
      { path: 'nuestras-ubicaciones', component: OurLocations, runGuardsAndResolvers: 'always' },
      { path: 'nuestras-ubicaciones/:id', component: LocationDetail, runGuardsAndResolvers: 'always' },
    ],
  },

  // Wildcard must always be last
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routeTranslations: Record<string, Record<string, string>> = {
  contact: {
    en: 'contact-us',
    es: 'contacto',
  },
  about: {
    en: 'about-us',
    es: 'sobre-nosotros',
  },
  insuranceServices: {
    en: 'insurance-services',
    es: 'servicios-de-seguros',
  },
  privacyPolicy: {
    en: 'privacy-policy',
    es: 'politica-de-privacidad',
  },
  termsAndConditions: {
    en: 'terms-and-conditions',
    es: 'terminos-y-condiciones',
  },

  careers: {
    en: 'careers',
    es: 'carreras',
  },

  thankyou: {
    en: 'thank-you',
    es: 'gracias',
  },
  getAQuote: {
    en: 'get-a-quote',
    es: 'obtener-una-cotizacion',
  },
  requestACustomQuote: {
    en: 'request-a-custom-quote',
    es: 'solicitar-una-cotizacion-personalizada',
  },
  getAutoQuote: {
    en: 'auto-insurance/quote',
    es: 'seguros-de-auto/cotizacion',
  },
  ourLocations: {
    en: 'our-locations',
    es: 'nuestras-ubicaciones',
  },
  "ourLocations/:id": {
    en: 'our-locations/:id',
    es: 'nuestras-ubicaciones/:id',
  },
  getHomeQuote: {
    en: 'homeowners-insurance/quote',
    es: 'seguros-de-vivienda/cotizacion',
  },
  getCommercialQuote: {
    en: 'commercial-insurance/quote',
    es: 'seguros-comerciales/cotizacion',
  },
  getLifeQuote: {
    en: 'life-insurance/quote',
    es: 'seguros-de-vida/cotizacion',
  },
  getHealthQuote: {
    en: 'health-insurance/quote',
    es: 'seguros-de-salud/cotizacion',
  },
  getSuretyQuote: {
    en: 'surety-bonds/quote',
    es: 'fianzas/cotizacion'
  },
  autoInsurance: {
    en: 'auto-insurance',
    es: 'seguros-de-auto'
  },
  homeInsurance: {
    en: 'homeowners-insurance',
    es: 'seguros-de-vivienda'
  },
  commercialInsurance: {
    en: 'commercial-insurance',
    es: 'seguros-comerciales'
  },
  lifeInsurance: {
    en: 'life-insurance',
    es: 'seguros-de-vida'
  },
  healthInsurance: {
    en: 'health-insurance',
    es: 'seguros-de-salud'
  },
  suretyBondInsurance: {
    en: 'surety-bonds',
    es: 'fianzas'
  },
  carInsurance: {
    en: 'auto-insurance/car-insurance',
    es: 'seguros-de-auto/seguro-de-carro'
  },
  motorcycleInsurance: {
    en: 'auto-insurance/motorcycle-insurance',
    es: 'seguros-de-auto/seguro-de-motocicleta'
  },
  boatInsurance: {
    en: 'auto-insurance/boat-insurance',
    es: 'seguros-de-auto/seguro-de-barco'
  },
  rvInsurance: {
    en: 'auto-insurance/rv-motorhome-insurance',
    es: 'seguros-de-auto/seguro-de-rv-y-motorhome'
  },
  classicCarInsurance: {
    en: 'auto-insurance/classic-car-insurance',
    es: 'seguros-de-auto/seguro-de-auto-clasico'
  },
  sr22Insurance: {
    en: 'auto-insurance/sr-22-insurance',
    es: 'seguros-de-auto/seguro-de-sr-22'
  },
  atvAndUtvInsurance: {
    en: 'auto-insurance/atv-utv-insurance',
    es: 'seguros-de-auto/seguro-de-atv-utv'
  },
  trailerInsurance: {
    en: 'auto-insurance/trailer-insurance',
    es: 'seguros-de-auto/seguro-de-trailer'
  },
  mexicanCarInsurance: {
    en: 'auto-insurance/mexican-car-insurance',
    es: 'seguros-de-auto/seguro-de-carro-mexicano'
  },
  rideshareInsurance: {
    en: 'auto-insurance/rideshare-insurance',
    es: 'seguros-de-auto/seguro-de-rideshare'
  },
  rentersInsurance: {
    en: 'homeowners-insurance/renters-insurance',
    es: 'seguros-de-vivienda/seguro-de-renters'
  }
};