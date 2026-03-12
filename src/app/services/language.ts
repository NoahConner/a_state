import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { routeTranslations } from '../app-routing-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Language {
  availableLangs = ['en', 'es'];
  private isBrowser: boolean;
  getLanguageChange(): Observable<LangChangeEvent> {
  return this.translate.onLangChange;
}

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

  this.translate.use(lang);

  if (!this.isBrowser) return;

  const segments = this.router.url.split('/').filter(Boolean);

  let currentLang = 'en';
  let currentSlug = '';

  if (segments[0] === 'es') {
    currentLang = 'es';
    currentSlug = segments.slice(1).join('/');
  } else {
    currentSlug = segments.join('/');
  }

  const routeKey = Object.keys(routeTranslations).find(
    (key) => routeTranslations[key][currentLang] === currentSlug
  );

  if (!routeKey) {
    return; // prevent fallback to /
  }

  const newSlug = routeTranslations[routeKey][lang];
  const newSegments = newSlug.split('/');

  if (lang === 'en') {
    this.router.navigate(newSegments);
  } else {
    this.router.navigate(['es', ...newSegments]);
  }

  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
}

  getCurrentLanguage() {
    return this.translate.currentLang;
  }
}
