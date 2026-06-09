import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { addTrailingSlash } from './trailing-slash-url-serializer';

@Injectable({ providedIn: 'root' })
export class TrailingSlashRedirect {
  private readonly isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (!this.isBrowser) {
      return;
    }

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
