import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { addTrailingSlash } from './trailing-slash-url-serializer';

@Injectable({ providedIn: 'root' })
export class TrailingSlashRedirect {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationStart => event instanceof NavigationStart))
      .subscribe((event) => {
        const withSlash = addTrailingSlash(event.url);

        if (withSlash !== event.url) {
          void this.router.navigateByUrl(withSlash, { replaceUrl: true });
        }
      });
  }
}
