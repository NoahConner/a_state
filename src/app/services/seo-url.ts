import { addTrailingSlash } from './trailing-slash-url-serializer';

export const SEO_CANONICAL_ORIGIN = 'https://astateinsurance.com';
export const SEO_CANONICAL_HOST = 'astateinsurance.com';

const SEO_MANAGED_HOSTS = new Set(['astateinsurance.com', 'www.astateinsurance.com']);

function getPathname(url: string): string {
  const pathname = url.split('?')[0].split('#')[0];

  if (!pathname) {
    return '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function normalizeSeoPath(url: string): string {
  return addTrailingSlash(getPathname(url));
}

export function buildCanonicalUrl(url: string): string {
  return `${SEO_CANONICAL_ORIGIN}${normalizeSeoPath(url)}`;
}

export function buildCanonicalRedirectUrl(url: string): string {
  const [withoutHash] = url.split('#');
  const [pathname, query = ''] = withoutHash.split('?');
  const normalizedPath = normalizeSeoPath(pathname);

  return `${SEO_CANONICAL_ORIGIN}${normalizedPath}${query ? `?${query}` : ''}`;
}

export function isManagedSeoHost(host: string | undefined): boolean {
  if (!host) {
    return false;
  }

  const normalizedHost = host.split(',')[0].trim().toLowerCase().split(':')[0];

  return SEO_MANAGED_HOSTS.has(normalizedHost);
}
