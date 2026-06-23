import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Observable, of } from 'rxjs';

function resolveTranslationPath(lang: string): string {
  const fileName = `${lang}.json`;
  const candidates = [
    join(import.meta.dirname, '../browser/assets/i18n', fileName),
    join(process.cwd(), 'dist/myapp/browser/assets/i18n', fileName),
    join(process.cwd(), 'src/assets/i18n', fileName),
  ];

  for (const filePath of candidates) {
    if (existsSync(filePath)) {
      return filePath;
    }
  }

  throw new Error(`Translation file not found for language "${lang}"`);
}

export class TranslateServerLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    const filePath = resolveTranslationPath(lang);
    return of(JSON.parse(readFileSync(filePath, 'utf8')));
  }
}
