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
  constructor(public languageService: Language) { }
  
  get currentLang() {
    return this.languageService.getCurrentLanguage();
  }

  changeLang(lang: string) {
    this.languageService.setLanguage(lang);
  }

  getRoute(page: string, id?: string): any[] {
    const lang = this.languageService.getCurrentLanguage();

    const slug = routeTranslations[page]?.[lang] || routeTranslations[page]?.['en'];

    if (!slug) return ['/']; // fallback to homepage

    let resolvedSlug = slug;
    if (id) {
      resolvedSlug = slug.replace(':id', id);
    }

    const segments = resolvedSlug.split('/').filter(s => s !== '');

    return lang === 'en'
      ? ['/', ...segments]
      : ['/', lang, ...segments];
  }
}