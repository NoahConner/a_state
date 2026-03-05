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
  { path: 'get-custom-quote', component: GetCustomQuote },
  { path: 'get-home-quote', component: GetHomeQuote },
  { path: 'get-commercial-quote', component: GetCommercialQuote },
  { path: 'get-auto-quote', component: GetAutoQuote },
  { path: 'get-life-quote', component: GetLifeQuote },
  { path: 'get-health-quote', component: GetHealthQuote },
  { path: 'get-surety-quote', component: GetSuretyQuote },


  




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
      { path: 'solicitar-cotizacion', component: GetAQuote },
      { path: 'obtener-cotizacion-personalizada', component: GetCustomQuote },
      { path: 'obtener-cotizacion-auto', component: GetAutoQuote },
      { path: 'obtener-cotizacion-casa', component: GetHomeQuote },
      { path: 'obtener-cotizacion-comercial', component: GetCommercialQuote },
      { path: 'obtener-cotizacion-vida', component: GetLifeQuote },
      { path: 'obtener-cotizacion-salud', component: GetHealthQuote },
      { path: 'obtener-cotizacion-surety', component: GetSuretyQuote },
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
    es: 'solicitar-cotizacion',
  },
  getCustomQuote: {
    en: 'get-custom-quote',
    es: 'obtener-cotizacion-personalizada',
  },
  getAutoQuote: {
    en: 'get-auto-quote',
    es: 'obtener-cotizacion-auto',
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
    en: 'get-home-quote',
    es: 'obtener-cotizacion-casa',
  },
  getCommercialQuote: {
    en: 'get-commercial-quote',
    es: 'obtener-cotizacion-comercial',
  },
  getLifeQuote: {
    en: 'get-life-quote',
    es: 'obtener-cotizacion-vida',
  },
  getHealthQuote: {
    en: 'get-health-quote',
    es: 'obtener-cotizacion-salud',
  },
  getSuretyQuote: {
    en: 'get-surety-quote',
    es: 'obtener-cotizacion-surety',
  },

};