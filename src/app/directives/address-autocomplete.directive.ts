import { Directive, ElementRef, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

const GOOGLE_MAPS_API_KEY: string = (environment as { googleMapsApiKey?: string }).googleMapsApiKey ?? '';

/** Rough box around Texas: suggestions are limited to addresses inside it. */
const TEXAS = { south: 25.83, west: -106.65, north: 36.5, east: -93.5 };
const MIN_CHARS = 3;
const DEBOUNCE_MS = 250;

let mapsLoader: Promise<any> | null = null;

/** Loads the Maps JavaScript API once per page and resolves with its Places library. */
function loadPlaces(doc: Document, lang: string): Promise<any> {
  if (!mapsLoader) {
    mapsLoader = new Promise<void>((resolve, reject) => {
      const w = window as any;
      if (w.google?.maps?.importLibrary) return resolve();
      const cb = '__asMapsReady';
      w[cb] = () => {
        delete w[cb];
        resolve();
      };
      const s = doc.createElement('script');
      s.src =
        'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(GOOGLE_MAPS_API_KEY) +
        '&loading=async&libraries=places&language=' + lang + '&region=US&callback=' + cb;
      s.async = true;
      s.onerror = () => {
        mapsLoader = null; // allow a retry on the next focus
        reject(new Error('maps load failed'));
      };
      doc.head.appendChild(s);
    }).then(() => (window as any).google.maps.importLibrary('places'));
  }
  return mapsLoader;
}

/**
 * Google Places address suggestions under a text input (Places API "New", our own dropdown so it matches
 * the form style). Picking a suggestion writes the full address into the input and fires an `input` event,
 * so the component's own (input) handler stores it as if it had been typed.
 *
 * Usage: <input appAddressAutocomplete ...>. Does nothing on the server or when no API key is set.
 * Needs the `.as-ac-*` styles from src/styles.scss.
 */
@Directive({
  selector: 'input[appAddressAutocomplete]',
  standalone: false,
})
export class AddressAutocompleteDirective implements OnInit, OnDestroy {
  /** Language of the suggestions ('en' | 'es'). */
  @Input() acLang = 'en';
  /** County name (without " County") of a picked suggestion, emitted after the input event. Only fetched when bound. */
  @Output() acCounty = new EventEmitter<string>();

  private places: any;
  private token: any;
  private list?: HTMLUListElement;
  private items: { text: string; prediction: any }[] = [];
  private active = -1;
  private timer?: ReturnType<typeof setTimeout>;
  private seq = 0;
  private readonly enabled: boolean;
  private readonly cleanups: (() => void)[] = [];

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    this.enabled = isPlatformBrowser(platformId) && !!GOOGLE_MAPS_API_KEY;
  }

  ngOnInit() {
    if (!this.enabled) return;
    const input = this.el.nativeElement;
    const id = (input.id || 'addr') + '-ac';
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', id);
    // The browser's own autofill list would cover ours.
    input.setAttribute('autocomplete', 'off');

    // Outside Angular: typing and arrow keys shouldn't run change detection.
    this.zone.runOutsideAngular(() => {
      this.on(input, 'focus', () => this.load());
      this.on(input, 'input', (e) => {
        if ((e as any).__fromAutocomplete) return;
        this.schedule();
      });
      this.on(input, 'keydown', (e) => this.onKey(e as KeyboardEvent));
      this.on(input, 'blur', () => setTimeout(() => this.close(), 150));
    });
  }

  /**
   * The list is added on first use, not in ngOnInit: inserting a node next to the input before
   * hydration has finished would break SSR hydration of the rest of the form.
   */
  private ensureList(): HTMLUListElement {
    if (this.list) return this.list;
    const input = this.el.nativeElement;
    const list = this.doc.createElement('ul');
    list.id = input.getAttribute('aria-controls')!;
    list.className = 'as-ac-list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    const parent = input.parentElement!;
    if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
    input.insertAdjacentElement('afterend', list);
    // mousedown, not click: picking must happen before the input's blur closes the list.
    this.on(list, 'mousedown', (e) => {
      const li = (e.target as HTMLElement).closest('li[data-i]');
      if (!li) return;
      e.preventDefault();
      this.pick(Number(li.getAttribute('data-i')));
    });
    this.list = list;
    return list;
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    this.cleanups.forEach((fn) => fn());
    this.list?.remove();
  }

  private on(target: EventTarget, type: string, fn: (e: Event) => void) {
    target.addEventListener(type, fn);
    this.cleanups.push(() => target.removeEventListener(type, fn));
  }

  private async load() {
    if (this.places) return;
    try {
      this.places = await loadPlaces(this.doc, this.acLang === 'es' ? 'es' : 'en');
      this.token = new this.places.AutocompleteSessionToken();
    } catch {
      /* no network or bad key: the field stays a plain text box */
    }
  }

  private schedule() {
    clearTimeout(this.timer);
    const text = this.el.nativeElement.value.trim();
    if (text.length < MIN_CHARS) return this.close();
    this.timer = setTimeout(() => this.fetch(text), DEBOUNCE_MS);
  }

  private async fetch(text: string) {
    await this.load();
    if (!this.places) return;
    const mine = ++this.seq;
    try {
      const { suggestions } = await this.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: text,
        sessionToken: this.token,
        includedRegionCodes: ['us'],
        locationRestriction: TEXAS,
        language: this.acLang === 'es' ? 'es' : 'en',
      });
      if (mine !== this.seq) return; // an older request answered late
      this.items = (suggestions || [])
        .map((s: any) => s.placePrediction)
        .filter(Boolean)
        .slice(0, 5)
        .map((p: any) => ({ text: p.text.toString(), prediction: p }));
      this.render();
    } catch {
      this.close();
    }
  }

  private render() {
    if (!this.items.length) return this.close();
    const list = this.ensureList();
    const input = this.el.nativeElement;
    // Right under the input (the label sits above it and the error line below it).
    list.style.top = input.offsetTop + input.offsetHeight + 4 + 'px';
    list.style.left = input.offsetLeft + 'px';
    list.style.width = input.offsetWidth + 'px';
    list.textContent = '';
    this.items.forEach((item, i) => {
      const li = this.doc.createElement('li');
      li.id = `${list.id}-${i}`;
      li.setAttribute('role', 'option');
      li.setAttribute('data-i', String(i));
      li.textContent = item.text;
      list.appendChild(li);
    });
    // Google requires its attribution when suggestions are shown without a Google map.
    const brand = this.doc.createElement('li');
    brand.className = 'as-ac-brand';
    brand.setAttribute('aria-hidden', 'true');
    brand.textContent = 'powered by Google';
    list.appendChild(brand);
    this.active = -1;
    list.hidden = false;
    this.el.nativeElement.setAttribute('aria-expanded', 'true');
    this.el.nativeElement.removeAttribute('aria-activedescendant');
  }

  private onKey(e: KeyboardEvent) {
    if (!this.list || this.list.hidden) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const n = this.items.length;
      this.active = e.key === 'ArrowDown' ? (this.active + 1) % n : (this.active - 1 + n) % n;
      this.highlight();
    } else if (e.key === 'Enter' && this.active >= 0) {
      // Don't let the form's Enter handler move to the next step.
      e.preventDefault();
      e.stopPropagation();
      this.pick(this.active);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }

  private highlight() {
    const input = this.el.nativeElement;
    this.list!.querySelectorAll('li[data-i]').forEach((li, i) => li.classList.toggle('active', i === this.active));
    if (this.active >= 0) input.setAttribute('aria-activedescendant', `${this.list!.id}-${this.active}`);
    else input.removeAttribute('aria-activedescendant');
  }

  private async pick(i: number) {
    const item = this.items[i];
    if (!item) return;
    this.close();
    let address = item.text;
    let county = '';
    const wantCounty = this.acCounty.observed;
    try {
      // Fetching the place ends the billing session; formattedAddress includes the ZIP code.
      const place = item.prediction.toPlace();
      await place.fetchFields({ fields: wantCounty ? ['formattedAddress', 'addressComponents'] : ['formattedAddress'] });
      if (place.formattedAddress) address = place.formattedAddress;
      if (wantCounty) {
        const c = (place.addressComponents ?? []).find((x: any) => x.types?.includes('administrative_area_level_2'));
        county = String(c?.longText ?? '').replace(/\s+County$/i, '').trim();
      }
    } catch {
      /* keep the suggestion text */
    }
    this.token = new this.places.AutocompleteSessionToken();
    address = address.replace(/,\s*(USA|EE\. UU\.|Estados Unidos)$/i, '');

    const input = this.el.nativeElement;
    input.value = address;
    const ev = new Event('input', { bubbles: true });
    (ev as any).__fromAutocomplete = true;
    // Back inside Angular so the component's (input) handler updates the form and the view.
    this.zone.run(() => {
      input.dispatchEvent(ev);
      if (county) this.acCounty.emit(county);
    });
  }

  private close() {
    if (!this.list) return;
    this.list.hidden = true;
    this.active = -1;
    this.el.nativeElement.setAttribute('aria-expanded', 'false');
    this.el.nativeElement.removeAttribute('aria-activedescendant');
  }
}
