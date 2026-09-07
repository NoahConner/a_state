import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routeTranslations } from '../app-routing-module';
import { normalizeSeoPath } from './seo-url';

export interface PageSourceFields {
  /** Readable name of the page the form was submitted from, always in English. */
  source_page: string;
  /** Exact path the form was submitted from, including the `/es` prefix when applicable. */
  source_url: string;
}

/**
 * Resolves which page a quote submission came from so the backend can store it
 * alongside the lead. The name is derived from the English route slug (even on
 * Spanish pages) so both language variants of a page report the same value,
 * while `source_url` keeps the actual path the visitor was on.
 */
@Injectable({ providedIn: 'root' })
export class PageSource {
  // Kept deliberately small: `us` is excluded because it appears as a word in
  // `about-us` / `contact-us`, not as the country abbreviation.
  private static readonly UPPERCASE_WORDS = new Set(['tx', 'rv', 'atv', 'utv', 'aca', 'sr']);

  constructor(private router: Router) {}

  getSourceFields(url: string = this.router.url): PageSourceFields {
    return {
      source_page: this.getPageName(url),
      source_url: normalizeSeoPath(url),
    };
  }

  private getPageName(url: string): string {
    const { lang, slug } = this.splitPath(url);

    if (!slug) {
      return 'Home';
    }

    return this.humanize(lang === 'es' ? this.toEnglishSlug(slug) : slug);
  }

  private splitPath(url: string): { lang: 'en' | 'es'; slug: string } {
    const pathname = url.split('?')[0].split('#')[0];
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'es') {
      return { lang: 'es', slug: segments.slice(1).join('/') };
    }

    return { lang: 'en', slug: segments.join('/') };
  }

  /** Map a Spanish slug back to its English counterpart via `routeTranslations`. */
  private toEnglishSlug(slug: string): string {
    const exactKey = Object.keys(routeTranslations).find(
      (key) => routeTranslations[key]['es'] === slug,
    );

    if (exactKey) {
      return routeTranslations[exactKey]['en'];
    }

    for (const key of Object.keys(routeTranslations)) {
      const pattern = routeTranslations[key]['es'];

      if (!pattern?.includes(':')) {
        continue;
      }

      const paramNames = (pattern.match(/:\w+/g) || []).map((param) => param.substring(1));
      const matches = new RegExp('^' + pattern.replace(/:\w+/g, '(.+)') + '$').exec(slug);

      if (!matches) {
        continue;
      }

      let englishSlug = routeTranslations[key]['en'];
      paramNames.forEach((paramName, index) => {
        englishSlug = englishSlug.replace(`:${paramName}`, matches[index + 1]);
      });

      return englishSlug;
    }

    return slug;
  }

  private humanize(slug: string): string {
    return slug
      .split('/')
      .filter(Boolean)
      .map((segment) =>
        segment
          .split('-')
          .filter(Boolean)
          .map((word) =>
            PageSource.UPPERCASE_WORDS.has(word)
              ? word.toUpperCase()
              : word.charAt(0).toUpperCase() + word.slice(1),
          )
          .join(' '),
      )
      .join(' ');
  }
}
