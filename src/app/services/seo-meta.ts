import enMeta from '../../assets/meta-tag.en.json';
import esMeta from '../../assets/meta-tag.es.json';

export type SeoLanguage = 'en' | 'es';

export interface SeoPageMeta {
  title?: string;
  description?: string;
  keywords?: string;
}

export type SeoMetaDictionary = Record<string, SeoPageMeta>;

const SEO_META_BY_LANGUAGE: Record<SeoLanguage, SeoMetaDictionary> = {
  en: enMeta as SeoMetaDictionary,
  es: esMeta as SeoMetaDictionary,
};

export function resolveSeoLanguageFromUrl(url: string): SeoLanguage {
  const pathname = url.split('?')[0].split('#')[0];
  const segments = pathname.split('/').filter(Boolean);

  return segments[0] === 'es' ? 'es' : 'en';
}

export function getSeoPageMeta(pageKey: string, lang: SeoLanguage): SeoPageMeta | undefined {
  return SEO_META_BY_LANGUAGE[lang]?.[pageKey] ?? SEO_META_BY_LANGUAGE.en?.[pageKey];
}
