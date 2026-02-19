import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { routeTranslations } from '../app-routing-module';

@Injectable({
  providedIn: 'root',
})
export class Language {
  availableLangs = ['en', 'es'];
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initLanguage();
  }

  private initLanguage() {
    this.translate.addLangs(this.availableLangs);
    this.translate.setDefaultLang('en');

    let langToUse = 'en';

    if (this.isBrowser) {
      const savedLang = localStorage.getItem('lang');
      const browserLang = this.translate.getBrowserLang();
      langToUse =
        savedLang ||
        (browserLang && this.availableLangs.includes(browserLang) ? browserLang : 'en');
    }

    this.setLanguage(langToUse);
  }

  setLanguage(lang: string) {
    // Always update translation (safe for SSR)
    this.translate.use(lang);

    // Browser-only code
    if (!this.isBrowser) return; // prevent SSR crashes

    const currentUrl = this.router.url.split('/').filter(Boolean);
    let currentLang = 'en';
    let currentSlug = currentUrl[0];

    if (currentUrl[0] === 'es') {
      currentLang = 'es';
      currentSlug = currentUrl[1];
    }

    const routeKey = Object.keys(routeTranslations).find(
      (key) => routeTranslations[key][currentLang] === currentSlug,
    );

    if (routeKey) {
      const newSlug = routeTranslations[routeKey][lang];
      if (lang === 'en') {
        this.router.navigate([newSlug]);
      } else {
        this.router.navigate([lang, newSlug]);
      }
    }

    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }
}
