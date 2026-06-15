import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { InsuranceServices } from './pages/insurance-services/insurance-services';
import { About } from './pages/about/about';
import { Privacy } from './pages/privacy/privacy';
import { Terms } from './pages/terms/terms';
import { TestimonialSliderComponent } from './components/testimonial-slider/testimonial-slider';
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
import { ReactiveFormsModule } from '@angular/forms';
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
import { TranslateHtmlPipe } from './services/translate-html.pipe';
import { AsyncPipe } from '@angular/common';
import { PhoneFormatDirective } from './directives/phone-format.directive';
import { ChipNavigationDirective } from './directives/chip-navigation.directive';
import { UrlSerializer } from '@angular/router';
import { TrailingSlashUrlSerializer } from './services/trailing-slash-url-serializer';
import { TrailingSlashRedirect } from './services/trailing-slash-redirect';
import { TitleStrategy } from '@angular/router';
import { SeoTitleStrategy } from './services/seo-title-strategy';
import { HoustonTx } from './pages/auto-insurance/houston-tx/houston-tx';

@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    Home,
    Contact,
    InsuranceServices,
    About,
    Privacy,
    Careers,
    Terms,
    TestimonialSliderComponent,
    Thankyou,
    OurLocations,
    LocationDetail,
    GetAQuote,
    GetCustomQuote,
    GetAutoQuote,
    GetHomeQuote,
    GetCommercialQuote,
    GetLifeQuote,
    GetHealthQuote,
    GetSuretyQuote,
    AutoInsurance,
    HomeInsurance,
    CommercialInsurance,
    LifeInsurance,
    HealthInsurance,
    SuretyBondInsurance,
    CarInsurance,
    MotorcycleInsurance,
    BoatInsurance,
    RvInsurance,
    ClassicCarInsurance,
    Sr22Insurance,
    AtvAndUtvInsurance,
    TrailerInsurance,
    MexicanCarInsurance,
    RideshareInsurance,
    RentersInsurance,
    FloodInsurance,
    CondoInsurance,
    ManufacturedMobileHomeInsurance,
    LandlordInsurance,
    EarthquakeInsurance,
    ProfessionalLiabilityInsurance,
    GeneralLiabilityInsurance,
    WorkersCompensationInsurance,
    CommercialPropertyInsurance,
    CommercialAutoInsurance,
    BusinessOwnerInsurance,
    EmploymentPracticesLiabilityInsurance,
    CyberLiabilityInsurance,
    BuildersRiskInsurance,
    DirectorsOfficersLiabilityInsurance,
    WholeLifeInsurance,
    UniversalLifeInsurance,
    FinalExpenseInsurance,
    TermLifeInsurance,
    GroupLifeInsurance,
    FamilyHealthInsurance,
    SmallBusinessHealthInsurance,
    MedicareSupplementInsurance,
    ShortTermHealthInsurance,
    DentalVisionInsurance,
    VariableLifeInsurance,
    IndividualHealthInsurance,
    EmployerGroupHealthInsurance,
    TravelHealthInsurance,
    AcaMarketplacePlansInsurance,
    PerformanceBondsPaymentBonds,
    CommercialSuretyBonds,
    BidBonds,
    NotaryBonds,
    TitleInsurance,
    TitleTransfer,
    PetInsurance,
    HoustonTx,
    PhoneFormatDirective,
    ChipNavigationDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AsyncPipe,
    TranslateHtmlPipe,
    // ✅ Required for NgModule apps
    TranslateModule.forRoot({
      defaultLanguage: 'en',
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    { provide: UrlSerializer, useClass: TrailingSlashUrlSerializer },
    { provide: TitleStrategy, useClass: SeoTitleStrategy },

    // ✅ Correct loader for v17
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
