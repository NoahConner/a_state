import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { addTrailingSlash } from './trailing-slash-url-serializer';

function normalizeInternalLinks(html: string): string {
  return html.replace(/href=(['"])(\/[^'"?#]*)([^'"]*)\1/g, (_match, quote: string, path: string, suffix: string) => {
    if (path.startsWith('//')) {
      return `href=${quote}${path}${suffix}${quote}`;
    }

    return `href=${quote}${addTrailingSlash(`${path}${suffix}`)}${quote}`;
  });
}

@Pipe({
  name: 'translateHtml',
  pure: false,
  standalone: true,
})
export class TranslateHtmlPipe implements PipeTransform {
  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
  ) {}

  transform(key: string, interpolateParams?: object): Observable<SafeHtml> {
    return this.translate
      .get(key, interpolateParams)
      .pipe(
        map((text: string) =>
          this.sanitizer.bypassSecurityTrustHtml(normalizeInternalLinks(text)),
        ),
      );
  }
}
