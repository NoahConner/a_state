import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../services/language';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';
import { buildRoute } from '../header/header';

export type ProductKey = 'auto' | 'home' | 'business' | 'life' | 'health' | 'other';

interface Product {
  key: ProductKey;
  icon: string;
  /** Label key under `<ns>.PRODUCTS` for the hero form; the final form uses `finalLabel`. */
  label: string;
  finalLabel: string;
  /** Detailed quote page the visitor continues to after the short form. */
  quoteRouteKey: string;
}

const PRODUCTS: Product[] = [
  { key: 'auto', icon: 'i-car', label: 'AUTO', finalLabel: 'AUTO', quoteRouteKey: 'getAutoQuote' },
  { key: 'home', icon: 'i-home', label: 'HOME', finalLabel: 'HOMEOWNERS', quoteRouteKey: 'getHomeQuote' },
  { key: 'business', icon: 'i-briefcase', label: 'BUSINESS', finalLabel: 'COMMERCIAL', quoteRouteKey: 'getCommercialQuote' },
  { key: 'life', icon: 'i-heart', label: 'LIFE', finalLabel: 'LIFE', quoteRouteKey: 'getLifeQuote' },
  { key: 'health', icon: 'i-health', label: 'HEALTH', finalLabel: 'HEALTH', quoteRouteKey: 'getHealthQuote' },
  { key: 'other', icon: 'i-more', label: 'OTHER', finalLabel: 'OTHER', quoteRouteKey: 'getAQuote' },
];

type Field = 'product' | 'name' | 'phone';

/**
 * Short quote form (products + name + phone) used on the home and insurance services pages.
 * Visitors can pick several products. One product continues to its own quote page; several
 * continue to the general quote page. Needs the product icons from the page's SVG sprite.
 */
@Component({
  selector: 'app-quote-form',
  standalone: false,
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss',
})
export class QuoteForm {
  /** Prefix for input ids and names, e.g. "hero" gives #hero-name and name="hero-product". */
  @Input({ required: true }) formId!: string;
  /** The final form uses the final labels (e.g. Homeowners) and the SUBMIT_FINAL button. */
  @Input() variant: 'hero' | 'final' = 'hero';
  /** Translation namespace holding LEGEND, NAME, PHONE, SUBMIT_*, ERR_*, PRODUCTS.*, etc. */
  @Input() ns = 'HOME_PAGE.FORM';

  readonly products = PRODUCTS;
  selected: ProductKey[] = [];
  name = '';
  phone = '';
  errors: Partial<Record<Field, string>> = {};
  isSubmitting = false;

  constructor(
    private languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
  ) {}

  key(suffix: string): string {
    return `${this.ns}.${suffix}`;
  }

  labelKey(p: Product): string {
    return this.key('PRODUCTS.' + (this.variant === 'final' ? p.finalLabel : p.label));
  }

  isSelected(key: ProductKey): boolean {
    return this.selected.includes(key);
  }

  toggleProduct(key: ProductKey) {
    this.selected = this.isSelected(key) ? this.selected.filter((p) => p !== key) : [...this.selected, key];
    if (this.selected.length) this.errors.product = undefined;
  }

  onNameInput(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
    if (this.errors.name) this.validate(['name']);
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const d = this.digits(input.value).slice(0, 10);
    let out = d;
    if (d.length > 6) out = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    else if (d.length > 3) out = `(${d.slice(0, 3)}) ${d.slice(3)}`;
    input.value = out;
    this.phone = out;
    if (this.errors.phone) this.validate(['phone']);
  }

  onBlur(field: 'name' | 'phone') {
    if (this[field]) this.validate([field]);
  }

  async submit(event: Event) {
    event.preventDefault();
    if (this.isSubmitting) return;

    const invalid = this.validate();
    if (invalid.length) {
      this.host.nativeElement.querySelector<HTMLElement>(invalid[0])?.focus();
      return;
    }

    const selected = PRODUCTS.filter((p) => this.selected.includes(p.key));
    const label = selected.map((p) => this.translate.instant(this.labelKey(p))).join(', ');
    const quoteRouteKey = selected.length === 1 ? selected[0].quoteRouteKey : 'getAQuote';

    this.isSubmitting = true;
    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: label,
        full_name: this.name,
        phone_number: this.phone,
      });
      if (!isSubmitted) return;

      this.reset();
      await this.router.navigate(buildRoute(this.languageService, quoteRouteKey));
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  /** Returns selectors of the invalid fields, in page order. */
  private validate(only?: Field[]): string[] {
    const want = (f: Field) => !only || only.includes(f);
    const bad: string[] = [];
    const t = (suffix: string) => this.translate.instant(this.key(suffix));

    if (want('product')) {
      this.errors.product = this.selected.length ? undefined : t('ERR_PRODUCT');
      if (!this.selected.length) bad.push(`input[name="${this.formId}-product"]`);
    }
    if (want('name')) {
      this.errors.name = this.name.trim().length < 2 ? t('ERR_NAME') : undefined;
      if (this.errors.name) bad.push(`#${this.formId}-name`);
    }
    if (want('phone')) {
      const d = this.digits(this.phone);
      this.errors.phone = !d ? t('ERR_PHONE_EMPTY') : d.length !== 10 ? t('ERR_PHONE_INVALID') : undefined;
      if (this.errors.phone) bad.push(`#${this.formId}-phone`);
    }
    return bad;
  }

  private digits(value: string): string {
    return value.replace(/\D/g, '').replace(/^1(?=\d{10})/, '');
  }

  private reset() {
    this.selected = [];
    this.name = '';
    this.phone = '';
    this.errors = {};
  }
}
