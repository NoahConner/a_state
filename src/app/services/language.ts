import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Language {
  availableLangs = ['en', 'es'];
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
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
    this.translate.use(lang);

    if (this.isBrowser) {
      localStorage.setItem('lang', lang);

      // ✅ Only manipulate document if in browser
      document.documentElement.lang = lang;
      document.documentElement.dir = 'ltr'; // For English & Spanish
    }
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }
}
