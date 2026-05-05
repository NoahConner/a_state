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
import { CondoInsurance } from './pages/home-insurance/condo-insurance/condo-insurance';
import { ManufacturedMobileHomeInsurance } from './pages/home-insurance/manufactured-mobile-home-insurance/manufactured-mobile-home-insurance';
import { LandlordInsurance } from './pages/home-insurance/landlord-insurance/landlord-insurance';
import { EarthquakeInsurance } from './pages/home-insurance/earthquake-insurance/earthquake-insurance';
import { FloodInsurance } from './pages/home-insurance/flood-insurance/flood-insurance';
import { ProfessionalLiabilityInsurance } from './pages/commercial-insurance/professional-liability-insurance/professional-liability-insurance';
import { GeneralLiabilityInsurance } from './pages/commercial-insurance/general-liability-insurance/general-liability-insurance';
import { WorkersCompensationInsurance } from './pages/commercial-insurance/workers-compensation-insurance/workers-compensation-insurance';
import { CommercialPropertyInsurance } from './pages/commercial-insurance/commercial-property-insurance/commercial-property-insurance';
import { CommercialAutoInsurance } from './pages/commercial-insurance/commercial-auto-insurance/commercial-auto-insurance';
import { BusinessOwnerInsurance } from './pages/commercial-insurance/business-owner-insurance/business-owner-insurance';
import { EmploymentPracticesLiabilityInsurance } from './pages/commercial-insurance/employment-practices-liability-insurance/employment-practices-liability-insurance';
import { CyberLiabilityInsurance } from './pages/commercial-insurance/cyber-liability-insurance/cyber-liability-insurance';
import { BuildersRiskInsurance } from './pages/commercial-insurance/builders-risk-insurance/builders-risk-insurance';
import { DirectorsOfficersLiabilityInsurance } from './pages/commercial-insurance/directors-officers-liability-insurance/directors-officers-liability-insurance';
import { WholeLifeInsurance } from './pages/life-insurance/whole-life-insurance/whole-life-insurance';
import { UniversalLifeInsurance } from './pages/life-insurance/universal-life-insurance/universal-life-insurance';
import path from 'path';
import { FinalExpenseInsurance } from './pages/life-insurance/final-expense-insurance/final-expense-insurance';
import { TermLifeInsurance } from './pages/life-insurance/term-life-insurance/term-life-insurance';
import { GroupLifeInsurance } from './pages/life-insurance/group-life-insurance/group-life-insurance';

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
  // { path: 'commercial-insurance', component: CommercialInsurance },

  { path: 'health-insurance', component: HealthInsurance },
  { path: 'surety-bonds', component: SuretyBondInsurance },
  {
    path: 'life-insurance',
    children: [
      { path: '', component: LifeInsurance },
      { path: 'whole-life-insurance', component: WholeLifeInsurance },
      { path: 'universal-life-insurance', component: UniversalLifeInsurance },
      { path: 'final-expense-insurance', component: FinalExpenseInsurance },
      { path: 'term-life-insurance', component: TermLifeInsurance },
      { path: 'group-life-insurance', component: GroupLifeInsurance },

    ]
  },
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
      { path: 'condo-insurance', component: CondoInsurance },
      { path: 'manufactured-mobile-home-insurance', component: ManufacturedMobileHomeInsurance },
      { path: 'landlord-insurance', component: LandlordInsurance },
      { path: 'earthquake-insurance', component: EarthquakeInsurance },
      { path: 'flood-insurance', component: FloodInsurance },

    ]
  },


  {
    path: 'commercial-insurance',
    children: [
      { path: '', component: CommercialInsurance },
      { path: 'professional-liability-insurance', component: ProfessionalLiabilityInsurance },
      { path: 'general-liability-insurance', component: GeneralLiabilityInsurance },
      { path: 'workers-compensation-insurance', component: WorkersCompensationInsurance },
      { path: 'commercial-property-insurance', component: CommercialPropertyInsurance },
      { path: 'commercial-auto-insurance', component: CommercialAutoInsurance },
      { path: 'business-owners-policy-bop', component: BusinessOwnerInsurance },
      { path: 'employment-practices-liability-insurance-epli', component: EmploymentPracticesLiabilityInsurance },
      { path: 'cyber-liability-insurance', component: CyberLiabilityInsurance },
      { path: 'builders-risk-construction-insurance', component: BuildersRiskInsurance },
      { path: 'directors-officers-liability-insurance-do', component: DirectorsOfficersLiabilityInsurance },

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
          { path: 'seguros-para-condominios', component: CondoInsurance },
          { path: 'seguros-para-casas-prefabricadas-y-mo', component: ManufacturedMobileHomeInsurance },
          { path: 'seguros-para-propietarios', component: LandlordInsurance },
          { path: 'seguros-contra-terremotos', component: EarthquakeInsurance },
          { path: 'seguro-de-flood', component: FloodInsurance },
        ]
      },
      {
        path: 'seguros-comerciales',
        children: [
          { path: '', component: CommercialInsurance },
          { path: 'seguro-de-responsabilidad-profesional', component: ProfessionalLiabilityInsurance },
          { path: 'seguro-de-responsabilidad-general', component: GeneralLiabilityInsurance },
          { path: 'seguro-de-compensacion-laboral', component: WorkersCompensationInsurance },
          { path: 'seguro-de-propiedad-comercial', component: CommercialPropertyInsurance },
          { path: 'seguro-de-auto-comercial', component: CommercialAutoInsurance },
          { path: 'seguro-de-propietarios-de-negocios-bop', component: BusinessOwnerInsurance },
          { path: 'seguro-de-responsabilidad-de-practicas-laborales-epli', component: EmploymentPracticesLiabilityInsurance },
          { path: 'seguro-de-responsabilidad-cibernetica', component: CyberLiabilityInsurance },
          { path: 'seguro-de-construccion-builders-risk', component: BuildersRiskInsurance },
          { path: 'seguro-de-responsabilidad-de-directores-y-oficiales-do', component: DirectorsOfficersLiabilityInsurance },
        ]
      },
      {
        path: 'seguros-de-vida',
        children: [
          { path: '', component: LifeInsurance },
          { path: 'seguro-de-vida-entero', component: WholeLifeInsurance },
          { path: 'seguro-de-vida-universal', component: UniversalLifeInsurance },
          { path: 'seguro-de-gastos-finales', component: FinalExpenseInsurance },
          { path: 'seguro-de-vida-a-término', component: TermLifeInsurance },
          { path: 'seguro-de-vida-grupal', component: GroupLifeInsurance },

        ]
      },
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
  },
  condoInsurance: {
    en: 'homeowners-insurance/condo-insurance',
    es: 'seguros-de-vivienda/seguros-para-condominios'
  },
  manufacturedMobileHomeInsurance: {
    en: 'homeowners-insurance/manufactured-mobile-home-insurance',
    es: 'seguros-de-vivienda/seguros-para-casas-prefabricadas-y-mo'
  },
  landlordInsurance: {
    en: 'homeowners-insurance/landlord-insurance',
    es: 'seguros-de-vivienda/seguros-para-propietarios'
  },
  earthquakeInsurance: {
    en: 'homeowners-insurance/earthquake-insurance',
    es: 'seguros-de-vivienda/seguros-contra-terremotos'
  },
  floodInsurance: {
    en: 'homeowners-insurance/flood-insurance',
    es: 'seguros-de-vivienda/seguro-de-flood'
  },
  professionalLiabilityInsurance: {
    en: 'commercial-insurance/professional-liability-insurance',
    es: 'seguros-comerciales/seguro-de-responsabilidad-profesional'
  },
  generalLiabilityInsurance: {
    en: 'commercial-insurance/general-liability-insurance',
    es: 'seguros-comerciales/seguro-de-responsabilidad-general'
  },
  workersCompensationInsurance: {
    en: 'commercial-insurance/workers-compensation-insurance',
    es: 'seguros-comerciales/seguro-de-compensacion-laboral'
  },
  commercialPropertyInsurance: {
    en: 'commercial-insurance/commercial-property-insurance',
    es: 'seguros-comerciales/seguro-de-propiedad-comercial'
  },
  commercialAutoInsurance: {
    en: 'commercial-insurance/commercial-auto-insurance',
    es: 'seguros-comerciales/seguro-de-auto-comercial'
  },
  businessOwnerInsurance: {
    en: 'commercial-insurance/business-owners-policy-bop',
    es: 'seguros-comerciales/seguro-de-propietarios-de-negocios-bop'
  },
  employmentPracticesLiabilityInsurance: {
    en: 'commercial-insurance/employment-practices-liability-insurance-epli',
    es: 'seguros-comerciales/seguro-de-responsabilidad-de-practicas-laborales-epli'
  },
  cyberLiabilityInsurance: {
    en: 'commercial-insurance/cyber-liability-insurance',
    es: 'seguros-comerciales/seguro-de-responsabilidad-cibernetica'
  },
  buildersRiskInsurance: {
    en: 'commercial-insurance/builders-risk-construction-insurance',
    es: 'seguros-comerciales/seguro-de-construccion-builders-risk'
  },
  directorsOfficersLiabilityInsurance: {
    en: 'commercial-insurance/directors-officers-liability-insurance-do',
    es: 'seguros-comerciales/seguro-de-responsabilidad-de-directores-y-oficiales-do'
  },
  wholeLifeInsurance: {
    en: 'life-insurance/whole-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-entero'
  },
  universalLifeInsurance: {
    en: 'life-insurance/universal-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-universal'
  },
  finalExpenseInsurance: {
    en: 'life-insurance/final-expense-insurance',
    es: 'seguros-de-vida/seguro-de-gastos-finales'
  },
  termLifeInsurance: {
    en: 'life-insurance/term-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-a-término'
  },
  groupLifeInsurance: {
    en: 'life-insurance/group-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-grupal'
  },
};