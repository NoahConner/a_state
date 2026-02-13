import { Component } from '@angular/core';
import { Language } from '../../services/language';
import { routeTranslations } from '../../app-routing-module';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(public languageService: Language) {}

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
