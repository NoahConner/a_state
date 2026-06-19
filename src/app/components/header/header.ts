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
  readonly languageFlags: Record<'en' | 'es', string> = {
    en: '/assets/images/header/flag-us.svg',
    es: '/assets/images/header/flag-es.svg',
  };

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage() as 'en' | 'es';
  }

  get currentLanguageFlag(): string {
    return this.languageFlags[this.currentLang];
  }

  changeLang(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLang = lang as 'en' | 'es';
  }

  selectLang(lang: 'en' | 'es') {
    this.changeLang(lang);
    this.openMenu = null;
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
