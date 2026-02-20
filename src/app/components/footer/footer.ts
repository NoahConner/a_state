import { Component } from '@angular/core';
import { Language } from '../../services/language';
import { routeTranslations } from '../../app-routing-module';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  constructor(public languageService: Language) {}
  currentLang: 'en' | 'es' = 'es';

  changeLang(lang: string) {
    this.languageService.setLanguage(lang);
  }

  getRoute(page: string): string[] {
    const lang = this.languageService.getCurrentLanguage();

    const slug = routeTranslations[page]?.[lang] || routeTranslations[page]?.['en'];

    if (!slug) return ['/']; // fallback to homepage

    return lang === 'en' ? [slug] : [lang, slug];
  }
}
