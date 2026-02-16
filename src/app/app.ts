import { Component, signal } from '@angular/core';
import { Language } from './services/language';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MetaService } from './services/meta-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('myapp');
  constructor(
    private languageService: Language,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: MetaService,
  ) {}

  ngOnInit() {
    this.initMetaOnRouteChange();
  }

  private initMetaOnRouteChange() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe(async (data) => {
        const pageKey = data['metaPage']; // e.g., 'home', 'about'
        if (pageKey) {
          // Wait for language meta to load if needed
          await this.metaService.loadMetaForCurrentLanguage();

          // Update meta tags
          this.metaService.setMeta(pageKey);

          // Update signal for reactive template binding
          const pageTitle = this.metaService.getTitle(pageKey);
          if (pageTitle) this.title.set(pageTitle);
        }
      });
  }

  private updateMetaForCurrentRoute() {
    let route = this.activatedRoute;
    while (route.firstChild) route = route.firstChild;
    const pageKey = route.snapshot.data['metaPage'];
    if (pageKey) {
      this.metaService.setMeta(pageKey);
      const pageTitle = this.metaService.getTitle(pageKey);
      if (pageTitle) this.title.set(pageTitle);
    }
  }
}
