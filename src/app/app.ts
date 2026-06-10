import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
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
  private readonly isBrowser: boolean;

  constructor(
    private languageService: Language,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    _trailingSlashRedirect: TrailingSlashRedirect,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.initScrollToTopOnRouteChange();
  }

  private initScrollToTopOnRouteChange() {
    if (!this.isBrowser) {
      return;
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
