import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Language } from './language';

@Injectable({ providedIn: 'root' })
export class MetaService {
  private data: any = {};

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: Language,
  ) {
    this.loadMetaForCurrentLanguage();
  }

  async loadMetaForCurrentLanguage() {
    const lang = this.languageService.getCurrentLanguage(); // returns 'en', 'es', etc.
    try {
      this.data = await import(`../../assets/meta-tag.${lang}.json`);
    } catch (e) {
      console.error(`Failed to load meta data for language: ${lang}`, e);
    }
  }

  setMeta(pageKey: string) {
    const pageData = this.data[pageKey];
    if (!pageData) return;

    // Update document title
    if (pageData.title) this.titleService.setTitle(pageData.title);

    // Update meta tags
    if (pageData.description)
      this.metaService.updateTag({ name: 'description', content: pageData.description });
    if (pageData.keywords)
      this.metaService.updateTag({ name: 'keywords', content: pageData.keywords });
  }

  getTitle(pageKey: string): string {
    return this.data[pageKey]?.title || '';
  }
}
