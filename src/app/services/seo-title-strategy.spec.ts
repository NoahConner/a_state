import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SeoTitleStrategy } from './seo-title-strategy';

describe('SeoTitleStrategy', () => {
  let strategy: SeoTitleStrategy;
  let documentRef: Document;
  let titleCalls: string[];
  let metaCalls: Array<{ tag: Record<string, string>; selector?: string }>;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    titleCalls = [];
    metaCalls = [];
    titleService = {
      setTitle: (value: string) => {
        titleCalls.push(value);
      },
    } as Title;
    metaService = {
      updateTag: (tag: Record<string, string>, selector?: string) => {
        metaCalls.push({ tag, selector });
        return null;
      },
    } as Meta;

    TestBed.configureTestingModule({
      providers: [
        SeoTitleStrategy,
        { provide: Title, useValue: titleService },
        { provide: Meta, useValue: metaService },
      ],
    });

    strategy = TestBed.inject(SeoTitleStrategy);
    documentRef = TestBed.inject(DOCUMENT);
  });

  it('sets the canonical URL for the active route', () => {
    const leafRoute = {
      data: { metaPage: 'contact' },
    } as unknown as ActivatedRouteSnapshot;

    const rootRoute = {
      firstChild: leafRoute,
    } as unknown as ActivatedRouteSnapshot;

    const snapshot = {
      url: '/contact-us?utm_source=test',
      root: rootRoute,
    } as RouterStateSnapshot;

    strategy.updateTitle(snapshot);

    const canonicalLink = documentRef.head.querySelector('link[rel="canonical"]');

    expect(titleCalls).toContain('Contact A-State Insurance | Get a Quote or Support Today');
    expect(documentRef.documentElement.lang).toBe('en');
    expect(canonicalLink?.getAttribute('href')).toBe('https://www.astateinsurance.com/contact-us/');
    expect(metaCalls).toContainEqual({
      tag: {
        property: 'og:url',
        content: 'https://www.astateinsurance.com/contact-us/',
      },
      selector: 'property="og:url"',
    });
  });

  it('sets a canonical URL even when no page metadata exists', () => {
    const leafRoute = {
      data: {},
    } as unknown as ActivatedRouteSnapshot;

    const rootRoute = {
      firstChild: leafRoute,
    } as unknown as ActivatedRouteSnapshot;

    const snapshot = {
      url: '/thank-you',
      root: rootRoute,
    } as RouterStateSnapshot;

    strategy.updateTitle(snapshot);

    const canonicalLink = documentRef.head.querySelector('link[rel="canonical"]');

    expect(titleCalls).toEqual([]);
    expect(documentRef.documentElement.lang).toBe('en');
    expect(canonicalLink?.getAttribute('href')).toBe('https://www.astateinsurance.com/thank-you/');
    expect(metaCalls).toContainEqual({
      tag: {
        property: 'og:url',
        content: 'https://www.astateinsurance.com/thank-you/',
      },
      selector: 'property="og:url"',
    });
  });

  it('falls back to location metadata for english location detail routes', () => {
    const leafRoute = {
      data: {},
    } as unknown as ActivatedRouteSnapshot;

    const rootRoute = {
      firstChild: leafRoute,
    } as unknown as ActivatedRouteSnapshot;

    const snapshot = {
      url: '/our-locations/10547-s-post-oak-rd-houston-tx-77035/',
      root: rootRoute,
    } as RouterStateSnapshot;

    strategy.updateTitle(snapshot);

    expect(titleCalls).toContain('A-State Insurance in Westbury | Houston, TX 77035');
    expect(metaCalls).toContainEqual({
      tag: {
        name: 'description',
        content:
          'Visit our Westbury office for Auto, Home, Commercial, Life & Health insurance. Multilingual experts (English, Spanish, Hindi) serving 77035. Get a quote today!',
      },
      selector: 'name="description"',
    });
  });

  it('falls back to location metadata for spanish location detail routes', () => {
    const leafRoute = {
      data: {},
    } as unknown as ActivatedRouteSnapshot;

    const rootRoute = {
      firstChild: leafRoute,
    } as unknown as ActivatedRouteSnapshot;

    const snapshot = {
      url: '/es/nuestras-ubicaciones/5206-airline-dr-g-houston-tx-77022/',
      root: rootRoute,
    } as RouterStateSnapshot;

    strategy.updateTitle(snapshot);

    expect(titleCalls).toContain('Seguros A-State en Northside-Northline | Houston, TX 77022');
    expect(documentRef.documentElement.lang).toBe('es');
    expect(metaCalls).toContainEqual({
      tag: {
        name: 'description',
        content:
          'Visite nuestra oficina de Northside-Northline: Auto, Hogar, Comercio, Vida y Salud. Expertos multilingües (Inglés, Español, Hindi) en el 77022. ¡Pida su cotización!',
      },
      selector: 'name="description"',
    });
  });
});
