import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoLanguage, getSeoPageMeta } from './seo-meta';

@Injectable({ providedIn: 'root' })
export class MetaService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {}

  setMeta(pageKey: string, lang: SeoLanguage = 'en') {
    const pageData = getSeoPageMeta(pageKey, lang);
    if (!pageData) return;

    if (pageData.title) this.titleService.setTitle(pageData.title);

    if (pageData.description)
      this.metaService.updateTag(
        { name: 'description', content: pageData.description },
        'name="description"',
      );
    if (pageData.keywords)
      this.metaService.updateTag(
        { name: 'keywords', content: pageData.keywords },
        'name="keywords"',
      );
  }

  getTitle(pageKey: string, lang: SeoLanguage = 'en'): string {
    return getSeoPageMeta(pageKey, lang)?.title || '';
  }
}
