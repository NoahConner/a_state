import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { routeTranslations } from '../app-routing-module';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { addTrailingSlash } from './trailing-slash-url-serializer';

@Injectable({
  providedIn: 'root',
})
export class Language {
  availableLangs = ['en', 'es'];
  private isBrowser: boolean;
  private languageSwitchInProgress = false;

  getLanguageChange(): Observable<LangChangeEvent> {
    return this.translate.onLangChange;
  }

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initLanguage();
    this.listenToRouteChanges();
  }

  /** Language implied by the URL path (`/es/...` → es, otherwise en). */
  getLanguageFromUrl(url?: string): 'en' | 'es' {
    const pathname = this.getPathname(url);
    const segments = pathname.split('/').filter(Boolean);
    return segments[0] === 'es' ? 'es' : 'en';
  }

  private getPathname(url?: string): string {
    const raw =
      url ??
      (this.isBrowser && this.router.url === '/' && window.location.pathname !== '/'
        ? window.location.pathname
        : this.router.url);

    return raw.split('?')[0].split('#')[0];
  }

  private getCurrentSlug(): { currentLang: 'en' | 'es'; currentSlug: string } {
    const segments = this.getPathname().split('/').filter(Boolean);

    if (segments[0] === 'es') {
      return { currentLang: 'es', currentSlug: segments.slice(1).join('/') };
    }

    return { currentLang: 'en', currentSlug: segments.join('/') };
  }

  private findRouteKey(currentSlug: string, currentLang: 'en' | 'es'): string | undefined {
    let routeKey = Object.keys(routeTranslations).find(
      (key) => routeTranslations[key][currentLang] === currentSlug,
    );

    if (!routeKey) {
      routeKey = Object.keys(routeTranslations).find(
        (key) =>
          routeTranslations[key]['en'] === currentSlug ||
          routeTranslations[key]['es'] === currentSlug,
      );
    }

    if (!routeKey) {
      for (const key of Object.keys(routeTranslations)) {
        const pattern = routeTranslations[key][currentLang];
        if (!pattern?.includes(':')) {
          continue;
        }
        const regexPattern = '^' + pattern.replace(/:\w+/g, '(.+)') + '$';
        const regex = new RegExp(regexPattern);
        if (regex.test(currentSlug)) {
          return key;
        }
      }
    }

    return routeKey;
  }

  /** Build the path (with trailing slash) for the same page in `targetLang`. */
  private buildTargetPath(targetLang: 'en' | 'es'): string {
    const { currentLang, currentSlug } = this.getCurrentSlug();

    if (!currentSlug) {
      return targetLang === 'en' ? '/' : '/es/';
    }

    const routeKey = this.findRouteKey(currentSlug, currentLang);

    if (!routeKey) {
      const segments = currentSlug.split('/');
      return targetLang === 'en'
        ? addTrailingSlash('/' + segments.join('/'))
        : addTrailingSlash('/es/' + segments.join('/'));
    }

    const newSlug = routeTranslations[routeKey][targetLang];

    if (newSlug.includes(':')) {
      const currentPattern = routeTranslations[routeKey][currentLang];
      const paramNames = (currentPattern.match(/:\w+/g) || []).map((p) => p.substring(1));
      const paramValues = currentSlug.split('/').slice(paramNames.length === 1 ? -1 : -paramNames.length);

      let translatedSlug = newSlug;
      paramNames.forEach((paramName, index) => {
        translatedSlug = translatedSlug.replace(`:${paramName}`, paramValues[index]);
      });

      return targetLang === 'en'
        ? addTrailingSlash('/' + translatedSlug)
        : addTrailingSlash('/es/' + translatedSlug);
    }

    return targetLang === 'en'
      ? addTrailingSlash('/' + newSlug)
      : addTrailingSlash('/es/' + newSlug);
  }

  private initLanguage() {
    this.translate.addLangs(this.availableLangs);
    this.translate.setDefaultLang('en');

    const langToUse = this.getLanguageFromUrl();
    this.applyLanguage(langToUse);
  }

  private listenToRouteChanges() {
    if (!this.isBrowser) return;

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const routeLang = this.getLanguageFromUrl(this.router.url);

      if (this.languageSwitchInProgress) {
        this.languageSwitchInProgress = false;
        this.applyLanguage(routeLang);
        return;
      }

      if (routeLang !== this.translate.currentLang) {
        this.applyLanguage(routeLang);
      }
    });
  }

  /** Set translations and document lang without changing the route. */
  private applyLanguage(lang: string) {
    this.translate.use(lang);

    if (this.document?.documentElement) {
      this.document.documentElement.lang = lang;
    }

    if (!this.isBrowser) return;

    localStorage.setItem('lang', lang);
  }

  /** User-initiated language switch: navigate first, then sync translations from the new URL. */
  setLanguage(lang: string) {
    if (!this.isBrowser) {
      this.applyLanguage(lang);
      return;
    }

    const targetLang = lang as 'en' | 'es';
    const targetPath = this.buildTargetPath(targetLang);
    const currentPath = addTrailingSlash(this.getPathname());

    if (targetPath === currentPath) {
      this.applyLanguage(targetLang);
      return;
    }

    const currentTree = this.router.parseUrl(this.router.url);
    const targetTree = this.router.parseUrl(targetPath);
    targetTree.queryParams = currentTree.queryParams;
    targetTree.fragment = currentTree.fragment;

    this.languageSwitchInProgress = true;

    void this.router.navigateByUrl(targetTree).then((success) => {
      if (!success) {
        this.languageSwitchInProgress = false;
        this.applyLanguage(this.getLanguageFromUrl());
      }
    });
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }

  getRoute(page: string): string[] {
    const lang = this.getCurrentLanguage();

    const slug =
      routeTranslations[page]?.[lang] ||
      routeTranslations[page]?.['en'];

    if (!slug) return ['/'];

    const segments = slug.split('/');

    return lang === 'en'
      ? ['/', ...segments]
      : ['/', lang, ...segments];
  }
}
