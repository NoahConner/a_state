import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import type { LayerGroup, Map as LeafletMap } from 'leaflet';
import { Language } from '../../services/language';
import { BAYTOWN_OFFICE, buildRoute, Office, OFFICES } from '../header/header';

type LeafletLib = typeof import('leaflet');

/**
 * OpenStreetMap of the six Houston offices (Leaflet), with the favicon as each marker and a small
 * popup (name, address, phone, directions, office page). Used on the home and contact pages.
 *
 * Browser only: the server renders an empty box. Leaflet and its stylesheet (a separate
 * `leaflet.css` bundle, see angular.json) load when the map first scrolls near the screen.
 */
@Component({
  selector: 'app-office-map',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './office-map.html',
  styleUrl: './office-map.scss',
})
export class OfficeMap implements AfterViewInit, OnDestroy {
  /** Also pin the Baytown office (it has no office page, so its popup has no "View office" link). */
  @Input() withBaytown = false;

  @ViewChild('canvas', { static: true }) private canvas!: ElementRef<HTMLElement>;

  private readonly isBrowser: boolean;
  private readonly subs = new Subscription();
  private L?: LeafletLib;
  private map?: LeafletMap;
  private markers?: LayerGroup;
  private observer?: IntersectionObserver;
  private destroyed = false;

  constructor(
    private languageService: Language,
    private translate: TranslateService,
    private router: Router,
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    const el = this.canvas.nativeElement;
    if (!('IntersectionObserver' in window)) {
      this.init();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        this.observer?.disconnect();
        this.init();
      },
      { rootMargin: '400px 0px' },
    );
    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.observer?.disconnect();
    this.subs.unsubscribe();
    this.map?.remove();
  }

  private async init() {
    if (!this.document.getElementById('leaflet-css')) {
      const link = this.document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = '/leaflet.css';
      this.document.head.appendChild(link);
    }
    // Leaflet is CommonJS: the production build exposes it only as `default`, while the dev
    // server also gives named exports. Without this, `L.map` is undefined in production.
    const mod = (await import('leaflet')) as LeafletLib & { default?: LeafletLib };
    const L = mod.default ?? mod;
    if (this.destroyed) return;
    this.L = L;

    // Outside Angular so panning and zooming don't run change detection.
    this.zone.runOutsideAngular(() => {
      const touch = window.matchMedia('(pointer:coarse)').matches;
      this.map = L.map(this.canvas.nativeElement, {
        scrollWheelZoom: false, // the page keeps scrolling over the map
        dragging: !touch, // one finger scrolls the page on phones; the zoom buttons still work
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      }).addTo(this.map);
      this.map.fitBounds(L.latLngBounds(this.list().map((o) => [o.lat, o.lng] as [number, number])), {
        padding: [36, 36],
      });
      this.markers = L.layerGroup().addTo(this.map);
      this.addMarkers();
    });
    this.subs.add(this.translate.onLangChange.subscribe(() => this.addMarkers()));
  }

  private list(): Office[] {
    return this.withBaytown ? [...OFFICES, BAYTOWN_OFFICE] : OFFICES;
  }

  /** One favicon marker per office. Rebuilt on language change so the popup links follow. */
  private addMarkers() {
    const L = this.L;
    if (!L || !this.map || !this.markers) return;
    const t = (k: string) => this.translate.instant('HOME_PAGE.OFFICES.' + k);
    // Leaflet sets the size inline, so global img styles can't stretch the favicon.
    const icon = L.icon({
      iconUrl: '/assets/images/map-marker-red.png',
      className: 'as-pin',
      iconSize: [40, 40],
      iconAnchor: [20, 38],
      popupAnchor: [0, -34],
    });

    this.markers.clearLayers();
    for (const o of this.list()) {
      const name = `A-State Insurance (${o.name})`;
      const el = (tag: string, text: string, cls?: string) => {
        const node = this.document.createElement(tag);
        node.textContent = text;
        if (cls) node.className = cls;
        return node;
      };
      const link = (text: string, href: string, external = false) => {
        const a = el('a', text) as HTMLAnchorElement;
        a.href = href;
        if (external) {
          a.target = '_blank';
          a.rel = 'noopener';
        }
        return a;
      };

      const acts = el('span', '', 'as-pop-acts');
      acts.append(link(t('DIRECTIONS'), o.directionsUrl, true));
      if (o.hasPage !== false) {
        const commands = buildRoute(this.languageService, 'ourLocations/:id', o.id);
        const view = link(t('DETAILS'), '/' + commands.slice(1).join('/') + '/');
        view.addEventListener('click', (e) => {
          e.preventDefault();
          this.zone.run(() => this.router.navigate(commands));
        });
        acts.append(view);
      }
      const box = el('div', '', 'as-pop');
      box.append(el('strong', name), el('span', `${o.street}, ${o.city}`), link(o.phone, 'tel:' + o.tel), acts);

      L.marker([o.lat, o.lng], { icon, title: name, alt: name, keyboard: true })
        .bindPopup(box, { maxWidth: 260 })
        .addTo(this.markers);
    }
  }
}
