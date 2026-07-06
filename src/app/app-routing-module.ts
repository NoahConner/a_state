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
import { FamilyHealthInsurance } from './pages/health-insurance/family-health-insurance/family-health-insurance';
import { SmallBusinessHealthInsurance } from './pages/health-insurance/small-business-health-insurance/small-business-health-insurance';
import { MedicareSupplementInsurance } from './pages/health-insurance/medicare-supplement-insurance/medicare-supplement-insurance';
import { DentalVisionInsurance } from './pages/health-insurance/dental-vision-insurance/dental-vision-insurance';
import { ShortTermHealthInsurance } from './pages/health-insurance/short-term-health-insurance/short-term-health-insurance';
import { VariableLifeInsurance } from './pages/life-insurance/variable-life-insurance/variable-life-insurance';
import { IndividualHealthInsurance } from './pages/health-insurance/individual-health-insurance/individual-health-insurance';
import { EmployerGroupHealthInsurance } from './pages/health-insurance/employer-group-health-insurance/employer-group-health-insurance';
import { TravelHealthInsurance } from './pages/health-insurance/travel-health-insurance/travel-health-insurance';
import { AcaMarketplacePlansInsurance } from './pages/health-insurance/aca-marketplace-plans-insurance/aca-marketplace-plans-insurance';
import { PerformanceBondsPaymentBonds } from './pages/surety-bond-insurance/performance-bonds-payment-bonds/performance-bonds-payment-bonds';
import { BidBonds } from './pages/surety-bond-insurance/bid-bonds/bid-bonds';
import { NotaryBonds } from './pages/surety-bond-insurance/notary-bonds/notary-bonds';
import { CommercialSuretyBonds } from './pages/surety-bond-insurance/commercial-surety-bonds/commercial-surety-bonds';
import { TitleInsurance } from './pages/additional_insurance/title-insurance/title-insurance';
import { TitleTransfer } from './pages/additional_insurance/title-transfer/title-transfer';
import { PetInsurance } from './pages/additional_insurance/pet-insurance/pet-insurance';
import { HoustonTx } from './pages/auto-insurance/houston-tx/houston-tx';
import { SanAntonioTx } from './pages/auto-insurance/san-antonio-tx/san-antonio-tx';
import { DallasTx } from './pages/auto-insurance/dallas-tx/dallas-tx';
import { AustinTx } from './pages/auto-insurance/austin-tx/austin-tx';
import { FortWorthTx } from './pages/auto-insurance/fort-worth-tx/fort-worth-tx';
import { ElPasoTx } from './pages/auto-insurance/el-paso-tx/el-paso-tx';

const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full', data: { metaPage: 'home' } },
  { path: 'contact-us', component: Contact, data: { metaPage: 'contact' } },
  {
    path: 'insurance-services',
    component: InsuranceServices,
    data: { metaPage: 'insuranceServices' },
  },
  { path: 'about-us', component: About, data: { metaPage: 'about' } },
  { path: 'privacy-policy', component: Privacy, data: { metaPage: 'privacy' } },
  { path: 'terms-and-conditions', component: Terms, data: { metaPage: 'terms' } },
  { path: 'careers', component: Careers, data: { metaPage: 'careers' } },
  { path: 'thank-you', component: Thankyou },
  {
    path: 'our-locations',
    component: OurLocations,
    runGuardsAndResolvers: 'always',
    data: { metaPage: 'ourLocations' },
  },
  {
    path: 'our-locations/707-shotwell-st-a-houston-tx-77020',
    component: LocationDetail,
    runGuardsAndResolvers: 'always',
    data: { metaPage: 'location_707-shotwell-st-a-houston-tx-77020' },
  },
  {
    path: 'our-locations/11503-southwest-fwy-b-houston-tx-77031',
    component: LocationDetail,
    runGuardsAndResolvers: 'always',
    data: { metaPage: 'location_11503-southwest-fwy-b-houston-tx-77031' },
  },
  {
    path: 'our-locations/10547-s-post-oak-rd-houston-tx-77035',
    component: LocationDetail,
    runGuardsAndResolvers: 'always',
    data: { metaPage: 'location_10547-s-post-oak-rd-houston-tx-77035' },
  },
  {
    path: 'our-locations/5712-antoine-dr-houston-tx-77091',
    component: LocationDetail,
    runGuardsAndResolvers: 'always',
    data: { metaPage: 'location_5712-antoine-dr-houston-tx-77091' },
  },
  {
    path: 'our-locations/5206-airline-dr-g-houston-tx-77022',
    component: LocationDetail,
    runGuardsAndResolvers: 'always',
    data: { metaPage: 'location_5206-airline-dr-g-houston-tx-77022' },
  },
  { path: 'our-locations/:id', component: LocationDetail, runGuardsAndResolvers: 'always' },
  { path: 'get-a-quote', component: GetAQuote, data: { metaPage: 'getAQuote' } },
  {
    path: 'request-a-custom-quote',
    component: GetCustomQuote,
    data: { metaPage: 'getCustomQuote' },
  },
  { path: 'auto-insurance/quote', component: GetAutoQuote, data: { metaPage: 'getAutoQuote' } },
  {
    path: 'homeowners-insurance/quote',
    component: GetHomeQuote,
    data: { metaPage: 'getHomeQuote' },
  },
  {
    path: 'commercial-insurance/quote',
    component: GetCommercialQuote,
    data: { metaPage: 'getCommercialQuote' },
  },
  { path: 'life-insurance/quote', component: GetLifeQuote, data: { metaPage: 'getLifeQuote' } },
  {
    path: 'health-insurance/quote',
    component: GetHealthQuote,
    data: { metaPage: 'getHealthQuote' },
  },
  { path: 'surety-bonds/quote', component: GetSuretyQuote, data: { metaPage: 'getSuretyQuote' } },
  { path: 'title-insurance', component: TitleInsurance, data: { metaPage: 'titleInsurance' } },
  { path: 'title-transfer', component: TitleTransfer, data: { metaPage: 'titleTransfer' } },
  { path: 'pet-insurance', component: PetInsurance, data: { metaPage: 'petInsurance' } },
  // { path: 'auto-insurance', component: AutoInsurance },
  // { path: 'homeowners-insurance', component: HomeInsurance },
  // { path: 'commercial-insurance', component: CommercialInsurance },

  {
    path: 'health-insurance',
    children: [
      { path: '', component: HealthInsurance, data: { metaPage: 'healthInsurance' } },
      {
        path: 'family-health-insurance',
        component: FamilyHealthInsurance,
        data: { metaPage: 'familyHealthInsurance' },
      },
      {
        path: 'small-business-health-insurance',
        component: SmallBusinessHealthInsurance,
        data: { metaPage: 'smallBusinessHealthInsurance' },
      },
      {
        path: 'medicare-supplement-medigap-insurance',
        component: MedicareSupplementInsurance,
        data: { metaPage: 'medicareSupplementInsurance' },
      },
      {
        path: 'dental-vision-insurance',
        component: DentalVisionInsurance,
        data: { metaPage: 'dentalVisionInsurance' },
      },
      {
        path: 'short-term-health-insurance',
        component: ShortTermHealthInsurance,
        data: { metaPage: 'shortTermHealthInsurance' },
      },
      {
        path: 'individual-health-insurance',
        component: IndividualHealthInsurance,
        data: { metaPage: 'individualHealthInsurance' },
      },
      {
        path: 'employer-group-health-insurance',
        component: EmployerGroupHealthInsurance,
        data: { metaPage: 'employerGroupHealthInsurance' },
      },
      {
        path: 'travel-health-insurance',
        component: TravelHealthInsurance,
        data: { metaPage: 'travelHealthInsurance' },
      },
      {
        path: 'aca-marketplace-plans',
        component: AcaMarketplacePlansInsurance,
        data: { metaPage: 'acaMarketplacePlans' },
      },
    ],
  },

  {
    path: 'surety-bonds',
    children: [
      { path: '', component: SuretyBondInsurance, data: { metaPage: 'suretyBonds' } },
      {
        path: 'performance-bonds-payment-bonds',
        component: PerformanceBondsPaymentBonds,
        data: { metaPage: 'performanceBondsPaymentBonds' },
      },
      {
        path: 'commercial-surety-bonds',
        component: CommercialSuretyBonds,
        data: { metaPage: 'commercialSuretyBonds' },
      },
      { path: 'bid-bonds', component: BidBonds, data: { metaPage: 'bidBonds' } },
      { path: 'notary-bonds', component: NotaryBonds, data: { metaPage: 'notaryBonds' } },
    ],
  },

  {
    path: 'life-insurance',
    children: [
      { path: '', component: LifeInsurance, data: { metaPage: 'lifeInsurance' } },
      {
        path: 'whole-life-insurance',
        component: WholeLifeInsurance,
        data: { metaPage: 'wholeLifeInsurance' },
      },
      {
        path: 'universal-life-insurance',
        component: UniversalLifeInsurance,
        data: { metaPage: 'universalLifeInsurance' },
      },
      {
        path: 'final-expense-insurance',
        component: FinalExpenseInsurance,
        data: { metaPage: 'finalExpenseInsurance' },
      },
      {
        path: 'term-life-insurance',
        component: TermLifeInsurance,
        data: { metaPage: 'termLifeInsurance' },
      },
      {
        path: 'group-life-insurance',
        component: GroupLifeInsurance,
        data: { metaPage: 'groupLifeInsurance' },
      },
      {
        path: 'variable-life-insurance',
        component: VariableLifeInsurance,
        data: { metaPage: 'variableLifeInsurance' },
      },
    ],
  },
  {
    path: 'auto-insurance',
    children: [
      { path: '', component: AutoInsurance, data: { metaPage: 'autoInsurance' } },
      { path: 'car-insurance', component: CarInsurance, data: { metaPage: 'carInsurance' } },
      {
        path: 'motorcycle-insurance',
        component: MotorcycleInsurance,
        data: { metaPage: 'motorcycleInsurance' },
      },
      { path: 'boat-insurance', component: BoatInsurance, data: { metaPage: 'boatInsurance' } },
      { path: 'rv-motorhome-insurance', component: RvInsurance, data: { metaPage: 'rvInsurance' } },
      {
        path: 'classic-car-insurance',
        component: ClassicCarInsurance,
        data: { metaPage: 'classicCarInsurance' },
      },
      { path: 'sr-22-insurance', component: Sr22Insurance, data: { metaPage: 'sr22Insurance' } },
      {
        path: 'atv-utv-insurance',
        component: AtvAndUtvInsurance,
        data: { metaPage: 'atvAndUtvInsurance' },
      },
      {
        path: 'trailer-insurance',
        component: TrailerInsurance,
        data: { metaPage: 'trailerInsurance' },
      },
      {
        path: 'mexican-car-insurance',
        component: MexicanCarInsurance,
        data: { metaPage: 'mexicanCarInsurance' },
      },
      {
        path: 'rideshare-insurance',
        component: RideshareInsurance,
        data: { metaPage: 'rideshareInsurance' },
      },
      { path: 'houston-tx', component: HoustonTx, data: { metaPage: 'houstonTx' } },
      { path: 'san-antonio-tx', component: SanAntonioTx, data: { metaPage: 'sanAntonioTx' } },
      { path: 'dallas-tx', component: DallasTx, data: { metaPage: 'dallasTx' } },
      { path: 'austin-tx', component: AustinTx, data: { metaPage: 'austinTx' } },
      { path: 'fort-worth-tx', component: FortWorthTx, data: { metaPage: 'fortWorthTx' } },
      { path: 'el-paso-tx', component: ElPasoTx, data: { metaPage: 'elPasoTx' } },

    ],
  },

  {
    path: 'homeowners-insurance',
    children: [
      { path: '', component: HomeInsurance, data: { metaPage: 'homeInsurance' } },
      {
        path: 'renters-insurance',
        component: RentersInsurance,
        data: { metaPage: 'rentersInsurance' },
      },
      { path: 'condo-insurance', component: CondoInsurance, data: { metaPage: 'condoInsurance' } },
      {
        path: 'manufactured-mobile-home-insurance',
        component: ManufacturedMobileHomeInsurance,
        data: { metaPage: 'manufacturedMobileHomeInsurance' },
      },
      {
        path: 'landlord-insurance',
        component: LandlordInsurance,
        data: { metaPage: 'landlordInsurance' },
      },
      {
        path: 'earthquake-insurance',
        component: EarthquakeInsurance,
        data: { metaPage: 'earthquakeInsurance' },
      },
      { path: 'flood-insurance', component: FloodInsurance, data: { metaPage: 'floodInsurance' } },
    ],
  },

  {
    path: 'commercial-insurance',
    children: [
      { path: '', component: CommercialInsurance, data: { metaPage: 'commercialInsurance' } },
      {
        path: 'professional-liability-insurance',
        component: ProfessionalLiabilityInsurance,
        data: { metaPage: 'professionalLiabilityInsurance' },
      },
      {
        path: 'general-liability-insurance',
        component: GeneralLiabilityInsurance,
        data: { metaPage: 'generalLiabilityInsurance' },
      },
      {
        path: 'workers-compensation-insurance',
        component: WorkersCompensationInsurance,
        data: { metaPage: 'workersCompensationInsurance' },
      },
      {
        path: 'commercial-property-insurance',
        component: CommercialPropertyInsurance,
        data: { metaPage: 'commercialPropertyInsurance' },
      },
      {
        path: 'commercial-auto-insurance',
        component: CommercialAutoInsurance,
        data: { metaPage: 'commercialAutoInsurance' },
      },
      {
        path: 'business-owners-policy-bop',
        component: BusinessOwnerInsurance,
        data: { metaPage: 'businessOwnersPolicyBOP' },
      },
      {
        path: 'employment-practices-liability-insurance-epli',
        component: EmploymentPracticesLiabilityInsurance,
        data: { metaPage: 'employmentPracticesLiabilityInsuranceEPLI' },
      },
      {
        path: 'cyber-liability-insurance',
        component: CyberLiabilityInsurance,
        data: { metaPage: 'cyberLiabilityInsurance' },
      },
      {
        path: 'builders-risk-construction-insurance',
        component: BuildersRiskInsurance,
        data: { metaPage: 'buildersRiskConstructionInsurance' },
      },
      {
        path: 'directors-officers-liability-insurance-do',
        component: DirectorsOfficersLiabilityInsurance,
        data: { metaPage: 'directorsOfficersLiabilityInsuranceDO' },
      },
    ],
  },

  // { path: 'our-locations-detail/:id', component: LocationDetail },

  // Spanish
  {
    path: 'es',
    children: [
      { path: '', component: Home, pathMatch: 'full', data: { metaPage: 'home' } },
      { path: 'contacto', component: Contact, data: { metaPage: 'contact' } },
      {
        path: 'servicios-de-seguros',
        component: InsuranceServices,
        data: { metaPage: 'insuranceServices' },
      },
      { path: 'sobre-nosotros', component: About, data: { metaPage: 'about' } },
      { path: 'politica-de-privacidad', component: Privacy, data: { metaPage: 'privacy' } },
      { path: 'terminos-y-condiciones', component: Terms, data: { metaPage: 'terms' } },
      { path: 'carreras', component: Careers, data: { metaPage: 'careers' } },
      { path: 'gracias', component: Thankyou },

      { path: 'obtener-una-cotizacion', component: GetAQuote, data: { metaPage: 'getAQuote' } },
      {
        path: 'solicitar-una-cotizacion-personalizada',
        component: GetCustomQuote,
        data: { metaPage: 'getCustomQuote' },
      },
      {
        path: 'seguros-de-auto/cotizacion',
        component: GetAutoQuote,
        data: { metaPage: 'getAutoQuote' },
      },
      {
        path: 'seguros-de-vivienda/cotizacion',
        component: GetHomeQuote,
        data: { metaPage: 'getHomeQuote' },
      },
      {
        path: 'seguros-comerciales/cotizacion',
        component: GetCommercialQuote,
        data: { metaPage: 'getCommercialQuote' },
      },
      {
        path: 'seguros-de-vida/cotizacion',
        component: GetLifeQuote,
        data: { metaPage: 'getLifeQuote' },
      },
      {
        path: 'seguros-de-salud/cotizacion',
        component: GetHealthQuote,
        data: { metaPage: 'getHealthQuote' },
      },
      {
        path: 'fianzas/cotizacion',
        component: GetSuretyQuote,
        data: { metaPage: 'getSuretyQuote' },
      },

      {
        path: 'seguros-de-auto',
        children: [
          { path: '', component: AutoInsurance, data: { metaPage: 'autoInsurance' } },
          { path: 'seguro-de-carro', component: CarInsurance, data: { metaPage: 'carInsurance' } },
          {
            path: 'seguro-de-motocicleta',
            component: MotorcycleInsurance,
            data: { metaPage: 'motorcycleInsurance' },
          },
          { path: 'seguro-de-bote', component: BoatInsurance, data: { metaPage: 'boatInsurance' } },
          {
            path: 'seguro-de-rv-y-motorhome',
            component: RvInsurance,
            data: { metaPage: 'rvInsurance' },
          },
          {
            path: 'seguro-de-autos-clasicos',
            component: ClassicCarInsurance,
            data: { metaPage: 'classicCarInsurance' },
          },
          { path: 'seguro-sr-22', component: Sr22Insurance, data: { metaPage: 'sr22Insurance' } },
          {
            path: 'seguro-para-atv-y-utv',
            component: AtvAndUtvInsurance,
            data: { metaPage: 'atvAndUtvInsurance' },
          },
          {
            path: 'seguro-de-remolque',
            component: TrailerInsurance,
            data: { metaPage: 'trailerInsurance' },
          },
          {
            path: 'seguro-de-auto-en-mexico',
            component: MexicanCarInsurance,
            data: { metaPage: 'mexicanCarInsurance' },
          },
          {
            path: 'seguro-para-rideshare',
            component: RideshareInsurance,
            data: { metaPage: 'rideshareInsurance' },
          },
          { path: 'houston-tx', component: HoustonTx, data: { metaPage: 'houstonTx' } },
          { path: 'san-antonio-tx', component: SanAntonioTx, data: { metaPage: 'sanAntonioTx' } },
          { path: 'dallas-tx', component: DallasTx, data: { metaPage: 'dallasTx' } },
          { path: 'austin-tx', component: AustinTx, data: { metaPage: 'austinTx' } },
          { path: 'fort-worth-tx', component: FortWorthTx, data: { metaPage: 'fortWorthTx' } },
          { path: 'el-paso-tx', component: ElPasoTx, data: { metaPage: 'elPasoTx' } },


        ],
      },
      {
        path: 'seguros-de-vivienda',
        children: [
          { path: '', component: HomeInsurance, data: { metaPage: 'homeInsurance' } },
          {
            path: 'seguros-para-inquilinos',
            component: RentersInsurance,
            data: { metaPage: 'rentersInsurance' },
          },
          {
            path: 'seguros-para-condominios',
            component: CondoInsurance,
            data: { metaPage: 'condoInsurance' },
          },
          {
            path: 'seguros-para-casas-prefabricadas-y-movil',
            component: ManufacturedMobileHomeInsurance,
            data: { metaPage: 'manufacturedMobileHomeInsurance' },
          },
          {
            path: 'seguros-para-propietarios',
            component: LandlordInsurance,
            data: { metaPage: 'landlordInsurance' },
          },
          {
            path: 'seguros-contra-terremotos',
            component: EarthquakeInsurance,
            data: { metaPage: 'earthquakeInsurance' },
          },
          {
            path: 'seguros-contra-inundaciones',
            component: FloodInsurance,
            data: { metaPage: 'floodInsurance' },
          },
        ],
      },
      {
        path: 'seguros-comerciales',
        children: [
          { path: '', component: CommercialInsurance, data: { metaPage: 'commercialInsurance' } },
          {
            path: 'seguro-de-responsabilidad-profesional-eo',
            component: ProfessionalLiabilityInsurance,
            data: { metaPage: 'professionalLiabilityInsurance' },
          },
          {
            path: 'seguro-de-responsabilidad-general',
            component: GeneralLiabilityInsurance,
            data: { metaPage: 'generalLiabilityInsurance' },
          },
          {
            path: 'seguro-de-compensacion-laboral',
            component: WorkersCompensationInsurance,
            data: { metaPage: 'workersCompensationInsurance' },
          },
          {
            path: 'seguro-de-propiedad-comercial',
            component: CommercialPropertyInsurance,
            data: { metaPage: 'commercialPropertyInsurance' },
          },
          {
            path: 'seguro-de-auto-comercial',
            component: CommercialAutoInsurance,
            data: { metaPage: 'commercialAutoInsurance' },
          },
          {
            path: 'seguro-de-propietarios-de-negocios-bop',
            component: BusinessOwnerInsurance,
            data: { metaPage: 'businessOwnersPolicyBOP' },
          },
          {
            path: 'seguro-de-responsabilidad-de-practicas-laborales-epli',
            component: EmploymentPracticesLiabilityInsurance,
            data: { metaPage: 'employmentPracticesLiabilityInsuranceEPLI' },
          },
          {
            path: 'seguro-de-responsabilidad-cibernetica',
            component: CyberLiabilityInsurance,
            data: { metaPage: 'cyberLiabilityInsurance' },
          },
          {
            path: 'seguro-contra-riesgos-de-construccion',
            component: BuildersRiskInsurance,
            data: { metaPage: 'buildersRiskConstructionInsurance' },
          },
          {
            path: 'seguro-de-responsabilidad-directores-y-oficiales-do',
            component: DirectorsOfficersLiabilityInsurance,
            data: { metaPage: 'directorsOfficersLiabilityInsuranceDO' },
          },
        ],
      },
      {
        path: 'seguros-de-vida',
        children: [
          { path: '', component: LifeInsurance, data: { metaPage: 'lifeInsurance' } },
          {
            path: 'seguro-de-vida-entero',
            component: WholeLifeInsurance,
            data: { metaPage: 'wholeLifeInsurance' },
          },
          {
            path: 'seguro-de-vida-universal',
            component: UniversalLifeInsurance,
            data: { metaPage: 'universalLifeInsurance' },
          },
          {
            path: 'seguro-de-gastos-finales',
            component: FinalExpenseInsurance,
            data: { metaPage: 'finalExpenseInsurance' },
          },
          {
            path: 'seguro-de-vida-a-plazo',
            component: TermLifeInsurance,
            data: { metaPage: 'termLifeInsurance' },
          },
          {
            path: 'seguro-de-vida-grupal',
            component: GroupLifeInsurance,
            data: { metaPage: 'groupLifeInsurance' },
          },
          {
            path: 'seguro-de-vida-variable',
            component: VariableLifeInsurance,
            data: { metaPage: 'variableLifeInsurance' },
          },
        ],
      },
      {
        path: 'seguros-de-salud',
        children: [
          { path: '', component: HealthInsurance, data: { metaPage: 'healthInsurance' } },
          {
            path: 'seguro-de-salud-familiar',
            component: FamilyHealthInsurance,
            data: { metaPage: 'familyHealthInsurance' },
          },
          {
            path: 'seguro-de-salud-para-pequenos-negocios',
            component: SmallBusinessHealthInsurance,
            data: { metaPage: 'smallBusinessHealthInsurance' },
          },
          {
            path: 'seguro-medicare-suplementario-medigap',
            component: MedicareSupplementInsurance,
            data: { metaPage: 'medicareSupplementInsurance' },
          },
          {
            path: 'seguro-dental-y-de-vision',
            component: DentalVisionInsurance,
            data: { metaPage: 'dentalVisionInsurance' },
          },
          {
            path: 'seguro-de-salud-a-corto-plazo',
            component: ShortTermHealthInsurance,
            data: { metaPage: 'shortTermHealthInsurance' },
          },
          {
            path: 'seguro-de-salud-individual',
            component: IndividualHealthInsurance,
            data: { metaPage: 'individualHealthInsurance' },
          },
          {
            path: 'seguro-de-salud-para-empleadores-y-grupos',
            component: EmployerGroupHealthInsurance,
            data: { metaPage: 'employerGroupHealthInsurance' },
          },
          {
            path: 'seguro-de-salud-para-viajes',
            component: TravelHealthInsurance,
            data: { metaPage: 'travelHealthInsurance' },
          },
          {
            path: 'planes-aca-mercado-de-seguros',
            component: AcaMarketplacePlansInsurance,
            data: { metaPage: 'acaMarketplacePlans' },
          },
        ],
      },
      {
        path: 'fianzas',
        children: [
          { path: '', component: SuretyBondInsurance, data: { metaPage: 'suretyBonds' } },
          {
            path: 'fianzas-de-cumplimiento-y-pago',
            component: PerformanceBondsPaymentBonds,
            data: { metaPage: 'performanceBondsPaymentBonds' },
          },
          {
            path: 'fianzas-comerciales',
            component: CommercialSuretyBonds,
            data: { metaPage: 'commercialSuretyBonds' },
          },
          { path: 'fianzas-de-licitacion', component: BidBonds, data: { metaPage: 'bidBonds' } },
          { path: 'fianzas-notariales', component: NotaryBonds, data: { metaPage: 'notaryBonds' } },
        ],
      },
      {
        path: 'nuestras-ubicaciones',
        component: OurLocations,
        runGuardsAndResolvers: 'always',
        data: { metaPage: 'ourLocations' },
      },
      {
        path: 'nuestras-ubicaciones/707-shotwell-st-a-houston-tx-77020',
        component: LocationDetail,
        runGuardsAndResolvers: 'always',
        data: { metaPage: 'location_707-shotwell-st-a-houston-tx-77020' },
      },
      {
        path: 'nuestras-ubicaciones/11503-southwest-fwy-b-houston-tx-77031',
        component: LocationDetail,
        runGuardsAndResolvers: 'always',
        data: { metaPage: 'location_11503-southwest-fwy-b-houston-tx-77031' },
      },
      {
        path: 'nuestras-ubicaciones/10547-s-post-oak-rd-houston-tx-77035',
        component: LocationDetail,
        runGuardsAndResolvers: 'always',
        data: { metaPage: 'location_10547-s-post-oak-rd-houston-tx-77035' },
      },
      {
        path: 'nuestras-ubicaciones/5712-antoine-dr-houston-tx-77091',
        component: LocationDetail,
        runGuardsAndResolvers: 'always',
        data: { metaPage: 'location_5712-antoine-dr-houston-tx-77091' },
      },
      {
        path: 'nuestras-ubicaciones/5206-airline-dr-g-houston-tx-77022',
        component: LocationDetail,
        runGuardsAndResolvers: 'always',
        data: { metaPage: 'location_5206-airline-dr-g-houston-tx-77022' },
      },
      {
        path: 'nuestras-ubicaciones/:id',
        component: LocationDetail,
        runGuardsAndResolvers: 'always',
      },
      { path: 'seguro-de-titulo', component: TitleInsurance, data: { metaPage: 'titleInsurance' } },
      { path: 'traspaso-de-titulo', component: TitleTransfer, data: { metaPage: 'titleTransfer' } },
      { path: 'seguro-para-mascotas', component: PetInsurance, data: { metaPage: 'petInsurance' } },
    ],
  },

  // Wildcard must always be last
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

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
  'ourLocations/:id': {
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
    es: 'fianzas/cotizacion',
  },
  autoInsurance: {
    en: 'auto-insurance',
    es: 'seguros-de-auto',
  },
  homeInsurance: {
    en: 'homeowners-insurance',
    es: 'seguros-de-vivienda',
  },
  commercialInsurance: {
    en: 'commercial-insurance',
    es: 'seguros-comerciales',
  },
  lifeInsurance: {
    en: 'life-insurance',
    es: 'seguros-de-vida',
  },
  healthInsurance: {
    en: 'health-insurance',
    es: 'seguros-de-salud',
  },
  suretyBondInsurance: {
    en: 'surety-bonds',
    es: 'fianzas',
  },
  carInsurance: {
    en: 'auto-insurance/car-insurance',
    es: 'seguros-de-auto/seguro-de-carro',
  },
  motorcycleInsurance: {
    en: 'auto-insurance/motorcycle-insurance',
    es: 'seguros-de-auto/seguro-de-motocicleta',
  },
  boatInsurance: {
    en: 'auto-insurance/boat-insurance',
    es: 'seguros-de-auto/seguro-de-bote',
  },
  rvInsurance: {
    en: 'auto-insurance/rv-motorhome-insurance',
    es: 'seguros-de-auto/seguro-de-rv-y-motorhome',
  },
  classicCarInsurance: {
    en: 'auto-insurance/classic-car-insurance',
    es: 'seguros-de-auto/seguro-de-autos-clasicos',
  },
  sr22Insurance: {
    en: 'auto-insurance/sr-22-insurance',
    es: 'seguros-de-auto/seguro-sr-22',
  },
  atvAndUtvInsurance: {
    en: 'auto-insurance/atv-utv-insurance',
    es: 'seguros-de-auto/seguro-para-atv-y-utv',
  },
  trailerInsurance: {
    en: 'auto-insurance/trailer-insurance',
    es: 'seguros-de-auto/seguro-de-remolque',
  },
  mexicanCarInsurance: {
    en: 'auto-insurance/mexican-car-insurance',
    es: 'seguros-de-auto/seguro-de-auto-en-mexico',
  },
  rideshareInsurance: {
    en: 'auto-insurance/rideshare-insurance',
    es: 'seguros-de-auto/seguro-para-rideshare',
  },
  rentersInsurance: {
    en: 'homeowners-insurance/renters-insurance',
    es: 'seguros-de-vivienda/seguros-para-inquilinos',
  },
  condoInsurance: {
    en: 'homeowners-insurance/condo-insurance',
    es: 'seguros-de-vivienda/seguros-para-condominios',
  },
  manufacturedMobileHomeInsurance: {
    en: 'homeowners-insurance/manufactured-mobile-home-insurance',
    es: 'seguros-de-vivienda/seguros-para-casas-prefabricadas-y-movil',
  },
  landlordInsurance: {
    en: 'homeowners-insurance/landlord-insurance',
    es: 'seguros-de-vivienda/seguros-para-propietarios',
  },
  earthquakeInsurance: {
    en: 'homeowners-insurance/earthquake-insurance',
    es: 'seguros-de-vivienda/seguros-contra-terremotos',
  },
  floodInsurance: {
    en: 'homeowners-insurance/flood-insurance',
    es: 'seguros-de-vivienda/seguros-contra-inundaciones',
  },
  professionalLiabilityInsurance: {
    en: 'commercial-insurance/professional-liability-insurance',
    es: 'seguros-comerciales/seguro-de-responsabilidad-profesional-eo',
  },
  generalLiabilityInsurance: {
    en: 'commercial-insurance/general-liability-insurance',
    es: 'seguros-comerciales/seguro-de-responsabilidad-general',
  },
  workersCompensationInsurance: {
    en: 'commercial-insurance/workers-compensation-insurance',
    es: 'seguros-comerciales/seguro-de-compensacion-laboral',
  },
  commercialPropertyInsurance: {
    en: 'commercial-insurance/commercial-property-insurance',
    es: 'seguros-comerciales/seguro-de-propiedad-comercial',
  },
  commercialAutoInsurance: {
    en: 'commercial-insurance/commercial-auto-insurance',
    es: 'seguros-comerciales/seguro-de-auto-comercial',
  },
  businessOwnerInsurance: {
    en: 'commercial-insurance/business-owners-policy-bop',
    es: 'seguros-comerciales/seguro-de-propietarios-de-negocios-bop',
  },
  employmentPracticesLiabilityInsurance: {
    en: 'commercial-insurance/employment-practices-liability-insurance-epli',
    es: 'seguros-comerciales/seguro-de-responsabilidad-de-practicas-laborales-epli',
  },
  cyberLiabilityInsurance: {
    en: 'commercial-insurance/cyber-liability-insurance',
    es: 'seguros-comerciales/seguro-de-responsabilidad-cibernetica',
  },
  buildersRiskInsurance: {
    en: 'commercial-insurance/builders-risk-construction-insurance',
    es: 'seguros-comerciales/seguro-contra-riesgos-de-construccion',
  },
  directorsOfficersLiabilityInsurance: {
    en: 'commercial-insurance/directors-officers-liability-insurance-do',
    es: 'seguros-comerciales/seguro-de-responsabilidad-directores-y-oficiales-do',
  },
  wholeLifeInsurance: {
    en: 'life-insurance/whole-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-entero',
  },
  universalLifeInsurance: {
    en: 'life-insurance/universal-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-universal',
  },
  finalExpenseInsurance: {
    en: 'life-insurance/final-expense-insurance',
    es: 'seguros-de-vida/seguro-de-gastos-finales',
  },
  termLifeInsurance: {
    en: 'life-insurance/term-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-a-plazo',
  },
  groupLifeInsurance: {
    en: 'life-insurance/group-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-grupal',
  },
  familyHealthInsurance: {
    en: 'health-insurance/family-health-insurance',
    es: 'seguros-de-salud/seguro-de-salud-familiar',
  },
  smallBusinessHealthInsurance: {
    en: 'health-insurance/small-business-health-insurance',
    es: 'seguros-de-salud/seguro-de-salud-para-pequenos-negocios',
  },
  medicareSupplementInsurance: {
    en: 'health-insurance/medicare-supplement-medigap-insurance',
    es: 'seguros-de-salud/seguro-medicare-suplementario-medigap',
  },
  dentalVisionInsurance: {
    en: 'health-insurance/dental-vision-insurance',
    es: 'seguros-de-salud/seguro-dental-y-de-vision',
  },
  shortTermHealthInsurance: {
    en: 'health-insurance/short-term-health-insurance',
    es: 'seguros-de-salud/seguro-de-salud-a-corto-plazo',
  },
  variableLifeInsurance: {
    en: 'life-insurance/variable-life-insurance',
    es: 'seguros-de-vida/seguro-de-vida-variable',
  },
  individualHealthInsurance: {
    en: 'health-insurance/individual-health-insurance',
    es: 'seguros-de-salud/seguro-de-salud-individual',
  },
  employerGroupHealthInsurance: {
    en: 'health-insurance/employer-group-health-insurance',
    es: 'seguros-de-salud/seguro-de-salud-para-empleadores-y-grupos',
  },
  travelHealthInsurance: {
    en: 'health-insurance/travel-health-insurance',
    es: 'seguros-de-salud/seguro-de-salud-para-viajes',
  },
  acaMarketplacePlansInsurance: {
    en: 'health-insurance/aca-marketplace-plans',
    es: 'seguros-de-salud/planes-aca-mercado-de-seguros',
  },
  performanceBondsPaymentBonds: {
    en: 'surety-bonds/performance-bonds-payment-bonds',
    es: 'fianzas/fianzas-de-cumplimiento-y-pago',
  },
  commercialSuretyBonds: {
    en: 'surety-bonds/commercial-surety-bonds',
    es: 'fianzas/fianzas-comerciales',
  },
  bidBonds: {
    en: 'surety-bonds/bid-bonds',
    es: 'fianzas/fianzas-de-licitacion',
  },
  notaryBonds: {
    en: 'surety-bonds/notary-bonds',
    es: 'fianzas/fianzas-notariales',
  },
  titleInsurance: {
    en: 'title-insurance',
    es: 'seguro-de-titulo',
  },
  titleTransfer: {
    en: 'title-transfer',
    es: 'traspaso-de-titulo',
  },
  petInsurance: {
    en: 'pet-insurance',
    es: 'seguro-para-mascotas',
  },
  houstonTx: {
    en: 'auto-insurance/houston-tx',
    es: 'seguros-de-auto/houston-tx',
  },
  sanAntonioTx: {
    en: 'auto-insurance/san-antonio-tx',
    es: 'seguros-de-auto/san-antonio-tx',
  },
  dallasTx: {
    en: 'auto-insurance/dallas-tx',
    es: 'seguros-de-auto/dallas-tx',
  },
  austinTx: {
    en: 'auto-insurance/austin-tx',
    es: 'seguros-de-auto/austin-tx',
  },
  fortWorthTx: {
    en: 'auto-insurance/fort-worth-tx',
    es: 'seguros-de-auto/fort-worth-tx',
  },
  elPasoTx: {
    en: 'auto-insurance/el-paso-tx',
    es: 'seguros-de-auto/el-paso-tx',
  },
};
