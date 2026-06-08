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

  socialLinks = [
    {
      icon: 'fa-brands fa-facebook-f',
      href: 'https://www.facebook.com/astateinsurancetx',
      label: 'Facebook',
    },
    {
      icon: 'fa-brands fa-instagram',
      href: 'https://www.instagram.com/astateinsurance/',
      label: 'Instagram',
    },
    {
      icon: 'fa-brands fa-youtube',
      href: null,
      label: 'YouTube',
    },
    {
      icon: 'fa-brands fa-tiktok',
      href: null,
      label: 'TikTok',
    },
    {
      icon: 'fa-brands fa-pinterest-p',
      href: null,
      label: 'Pinterest',
    },
    {
      icon: 'fa-brands fa-snapchat-ghost',
      href: null,
      label: 'Snapchat',
    },
    {
      icon: 'fa-brands fa-x-twitter',
      href: null,
      label: 'X',
    },
    {
      icon: 'fa-brands fa-linkedin-in',
      href: null,
      label: 'LinkedIn',
    },
  ];

  get currentLang() {
    return this.languageService.getCurrentLanguage();
  }

  getRoute(page: string): string[] {
    const lang = this.languageService.getCurrentLanguage();

    if (page === 'home') {
      return lang === 'en' ? ['/'] : ['/', lang];
    }

    const slug = routeTranslations[page]?.[lang] || routeTranslations[page]?.['en'];

    if (!slug) return ['/'];

    const segments = slug.split('/');

    return lang === 'en' ? ['/', ...segments] : ['/', lang, ...segments];
  }

  changeLang(lang: string) {
    this.languageService.setLanguage(lang);
  }

  trackByValue(_index: number, value: string): string {
    return value;
  }
}
