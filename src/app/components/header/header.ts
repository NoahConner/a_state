import { Component } from '@angular/core';
import { Language } from '../../services/language';

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
}
