import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Language } from '../../services/language';

const LABELS = {
  en: { month: 'Month', day: 'Day', year: 'Year' },
  es: { month: 'Mes', day: 'Día', year: 'Año' },
};

/**
 * Date of birth as three dropdowns (Month / Day / Year) instead of a date picker, where reaching a birth year
 * takes many taps. Emits yyyy-mm-dd once all three are chosen, and '' while any is missing.
 * The month dropdown gets `inputId`, so the page's <label for> points at it; day and year get `<inputId>-day` / `-year`.
 */
@Component({
  selector: 'app-dob-select',
  standalone: false,
  templateUrl: './dob-select.html',
  styleUrl: './dob-select.scss',
})
export class DobSelect implements OnChanges {
  @Input() inputId = 'dob';
  /** yyyy-mm-dd, or '' */
  @Input() value = '';
  @Input() invalid = false;
  @Input() describedBy: string | null = null;
  @Input() minYear = 1920;
  @Output() valueChange = new EventEmitter<string>();

  month = '';
  day = '';
  year = '';

  constructor(private languageService: Language) {}

  private get lang(): 'en' | 'es' {
    return this.languageService.getCurrentLanguage() === 'es' ? 'es' : 'en';
  }

  get labels() {
    return LABELS[this.lang];
  }

  get months(): { v: string; name: string }[] {
    const fmt = new Intl.DateTimeFormat(this.lang === 'es' ? 'es-US' : 'en-US', { month: 'long', timeZone: 'UTC' });
    return Array.from({ length: 12 }, (_, i) => {
      const name = fmt.format(new Date(Date.UTC(2000, i, 1)));
      return { v: String(i + 1).padStart(2, '0'), name: name.charAt(0).toUpperCase() + name.slice(1) };
    });
  }

  /** 1–31, cut to the length of the chosen month (and year, for February 29). */
  get days(): string[] {
    const max = this.month ? new Date(Number(this.year) || 2000, Number(this.month), 0).getDate() : 31;
    return Array.from({ length: max }, (_, i) => String(i + 1).padStart(2, '0'));
  }

  /** This year back to `minYear`, newest first. */
  get years(): string[] {
    const now = new Date().getFullYear();
    return Array.from({ length: now - this.minYear + 1 }, (_, i) => String(now - i));
  }

  ngOnChanges() {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(this.value || '');
    if (m) {
      [this.year, this.month, this.day] = [m[1], m[2], m[3]];
    } else if (!this.value && (this.year && this.month && this.day)) {
      // Cleared from outside (form reset); a partly filled date stays as the visitor left it.
      this.year = this.month = this.day = '';
    }
  }

  set(part: 'month' | 'day' | 'year', event: Event) {
    this[part] = (event.target as HTMLSelectElement).value;
    if (this.day && Number(this.day) > this.days.length) this.day = '';
    const full = this.year && this.month && this.day ? `${this.year}-${this.month}-${this.day}` : '';
    this.valueChange.emit(full);
  }
}
