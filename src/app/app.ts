import { Component } from '@angular/core';
import { Language } from './services/language';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TrailingSlashRedirect } from './services/trailing-slash-redirect';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  constructor(
    private languageService: Language,
    private router: Router,
    _trailingSlashRedirect: TrailingSlashRedirect,
  ) {}

  ngOnInit() {
    this.initScrollToTopOnRouteChange();
  }

  private initScrollToTopOnRouteChange() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
