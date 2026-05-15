import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'translateHtml',
  pure: false,
  standalone: true, // 👈 add this
})
export class TranslateHtmlPipe implements PipeTransform {
  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
  ) {}

  transform(key: string, interpolateParams?: object): Observable<SafeHtml> {
    return this.translate
      .get(key, interpolateParams)
      .pipe(map((text: string) => this.sanitizer.bypassSecurityTrustHtml(text)));
  }
}
