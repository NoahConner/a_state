import { Component } from '@angular/core';
import { Language } from '../../services/language';
import { routeTranslations } from '../../app-routing-module';

@Component({
  selector: 'app-get-a-quote',
  standalone: false,
  templateUrl: './get-a-quote.html',
  styleUrl: './get-a-quote.scss',
})
export class GetAQuote {
  constructor(public languageService: Language) { }
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
  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', icon: 'fas fa-car' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-house' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-building' },
    { name: 'HOME.BANNER.CHIPS.LIFE', icon: 'fas fa-heart' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', icon: 'fas fa-notes-medical' },
    { name: 'HOME.BANNER.CHIPS.SURETY', icon: 'fas fa-file-contract' },
  ];
}
