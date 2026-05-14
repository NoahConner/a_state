import { Component, OnInit } from '@angular/core';
import { Language } from '../../services/language';
import { routeTranslations } from '../../app-routing-module';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  constructor(public languageService: Language) {}
  currentLang: 'en' | 'es' = 'es';
  openMenu: string | null = null;

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage() as 'en' | 'es';
  }

  changeLang(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLang = lang as 'en' | 'es';
  }

  getRoute(page: string): string[] {
    const lang = this.languageService.getCurrentLanguage();

    const slug = routeTranslations[page]?.[lang] || routeTranslations[page]?.['en'];

    if (!slug) return ['/'];

    const segments = slug.split('/');

    return lang === 'en' ? ['/', ...segments] : ['/', lang, ...segments];
  }

  toggleMenu(key: string) {
    this.openMenu = this.openMenu === key ? null : key;
  }
}
