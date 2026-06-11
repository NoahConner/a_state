import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { getSeoPageMeta, resolveSeoLanguageFromUrl } from './seo-meta';
import { buildCanonicalUrl } from './seo-url';

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private static readonly LOCATION_ROUTE_PREFIXES = [
    '/our-locations/',
    '/es/nuestras-ubicaciones/',
  ];

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const lang = resolveSeoLanguageFromUrl(snapshot.url);

    if (this.document?.documentElement) {
      this.document.documentElement.lang = lang;
    }

    this.updateCanonicalUrl(snapshot.url);

    const pageKey = this.getMetaPageKey(snapshot.root, snapshot.url);

    if (!pageKey) {
      return;
    }

    const pageMeta = getSeoPageMeta(pageKey, lang);

    if (!pageMeta?.title) {
      return;
    }

    this.title.setTitle(pageMeta.title);
    this.updateMetaTags(pageMeta);
  }

  private getMetaPageKey(route: ActivatedRouteSnapshot, url: string): string | undefined {
    let currentRoute = route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute.data['metaPage'] ?? this.resolveLocationMetaPage(url);
  }

  private resolveLocationMetaPage(url: string): string | undefined {
    const pathname = url.split('?')[0].split('#')[0];

    for (const prefix of SeoTitleStrategy.LOCATION_ROUTE_PREFIXES) {
      if (!pathname.startsWith(prefix)) {
        continue;
      }

      const locationId = pathname.slice(prefix.length).replace(/\/+$/, '');

      if (!locationId) {
        return undefined;
      }

      return `location_${locationId}`;
    }

    return undefined;
  }

  private updateMetaTags(pageMeta: { title?: string; description?: string; keywords?: string }): void {
    if (pageMeta.description) {
      this.meta.updateTag(
        { name: 'description', content: pageMeta.description },
        'name="description"',
      );

      this.meta.updateTag(
        { property: 'og:description', content: pageMeta.description },
        'property="og:description"',
      );
    }

    if (pageMeta.keywords) {
      this.meta.updateTag(
        { name: 'keywords', content: pageMeta.keywords },
        'name="keywords"',
      );
    }

    if (pageMeta.title) {
      this.meta.updateTag(
        { property: 'og:title', content: pageMeta.title },
        'property="og:title"',
      );
    }
  }

  private updateCanonicalUrl(url: string): void {
    const canonicalUrl = buildCanonicalUrl(url);
    let canonicalLink = this.document.querySelector('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);

    this.meta.updateTag(
      { property: 'og:url', content: canonicalUrl },
      'property="og:url"',
    );
  }
}
