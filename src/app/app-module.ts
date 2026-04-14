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
    EarthquakeInsurance
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,


    // ✅ Required for NgModule apps
    TranslateModule.forRoot({
      defaultLanguage: 'en',
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),

    // ✅ Correct loader for v17
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
  ],
  bootstrap: [App],
})
export class AppModule { }
