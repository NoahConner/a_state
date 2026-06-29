import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

/** Split URL into path and suffix (query + hash). */
function splitUrl(url: string): { path: string; suffix: string } {
  const hashIndex = url.indexOf('#');
  const queryIndex = url.indexOf('?');
  let pathEnd = url.length;

  if (hashIndex !== -1) {
    pathEnd = Math.min(pathEnd, hashIndex);
  }
  if (queryIndex !== -1) {
    pathEnd = Math.min(pathEnd, queryIndex);
  }

  return {
    path: url.slice(0, pathEnd),
    suffix: url.slice(pathEnd),
  };
}

export function addTrailingSlash(url: string): string {
  const { path, suffix } = splitUrl(url);

  if (!path || path === '/') {
    return url;
  }

  // Skip files (.css, .js, .png, .jpg, .svg, .ico, .woff2, etc.)
  if (/\.[a-zA-Z0-9]+$/.test(path)) {
    return url;
  }

  // Skip static asset folders
  if (path.startsWith('/assets/') || path.startsWith('/media/')) {
    return url;
  }

  if (path.endsWith('/')) {
    return url;
  }

  return `${path}/${suffix}`;
}

export function stripTrailingSlash(url: string): string {
  const { path, suffix } = splitUrl(url);

  if (!path || path === '/') {
    return url;
  }

  if (!path.endsWith('/')) {
    return url;
  }

  return `${path.slice(0, -1)}${suffix}`;
}

@Injectable()
export class TrailingSlashUrlSerializer implements UrlSerializer {
  private readonly defaultSerializer = new DefaultUrlSerializer();

  parse(url: string): UrlTree {
    return this.defaultSerializer.parse(stripTrailingSlash(url));
  }

  serialize(tree: UrlTree): string {
    return addTrailingSlash(this.defaultSerializer.serialize(tree));
  }
}
