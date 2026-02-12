import { Component, signal } from '@angular/core';
import { Language } from './services/language';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('myapp');
  constructor(private languageService: Language) {}
}
