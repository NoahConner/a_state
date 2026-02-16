import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
    Terms,
    TestimonialSliderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

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
export class AppModule {}
