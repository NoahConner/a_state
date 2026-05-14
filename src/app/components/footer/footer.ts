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
  currentLang: string = '';

  constructor(public languageService: Language) { }

  changeLang(lang: string) {
    this.languageService.setLanguage(lang);
  }

  ngOnInit(): void {
    let currentLang = this.languageService.getCurrentLanguage();
    this.currentLang = currentLang;
    this.languageService.getLanguageChange().subscribe((lang: any) => {
      this.currentLang = lang.lang;
    });
  }





  getRoute(page: string): string[] {
    const lang = this.languageService.getCurrentLanguage();

    const slug = routeTranslations[page]?.[lang] || routeTranslations[page]?.['en'];

    if (!slug) return ['/']; // fallback to homepage

    const segments = slug.split('/');

    return lang === 'en'
      ? ['/', ...segments]
      : ['/', lang, ...segments];
  }
}