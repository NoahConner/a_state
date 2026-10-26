/**
 * Validation rules for the life insurance quote form. Pure functions: they read the form and return
 * translation keys, so they are easy to test and the component only has to translate and display them.
 */
import { LifeQuoteForm, MAX_AGE } from './life-quote.model';

export type CheckedField = 'dob' | 'spouseDob' | 'zip' | 'weight' | 'name' | 'phone' | 'email';

/** Fields checked before leaving each step, in page order. Steps 3 and 5 have nothing required. */
export const STEP_FIELDS: Record<number, CheckedField[]> = {
  1: ['dob', 'spouseDob', 'zip'],
  2: ['weight'],
  4: ['name', 'phone', 'email'],
};

/** DOM id of each field's input, used to move focus to the first invalid field. */
export const FIELD_INPUT_IDS: Record<CheckedField, string> = {
  dob: 'lq-p-dob',
  spouseDob: 'lq-s-dob',
  zip: 'lq-zip',
  weight: 'lq-wt',
  name: 'lq-name',
  phone: 'lq-phone',
  email: 'lq-email',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}$/;
export const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * The error for one field, as a key under LIFE_QUOTE_PAGE.FORM.ERR (e.g. 'ZIP'), or '' when it is fine.
 * `today` is yyyy-mm-dd; tests pass a fixed date.
 */
export function fieldErrorKey(field: CheckedField, form: LifeQuoteForm, today = todayIso()): string {
  switch (field) {
    case 'dob':
      return dobErrorKey(form.dob, today);

    case 'spouseDob':
      // Only asked when the visitor chose "Me and my spouse".
      return form.answers.who === 'both' ? dobErrorKey(form.spouseDob, today) : '';

    case 'zip':
      if (!form.zip) return 'ZIP_EMPTY';
      return ZIP_RE.test(form.zip) ? '' : 'ZIP';

    case 'weight': {
      // Optional, but a typo like 16 or 1650 would mislead the agent.
      if (!form.weight) return '';
      const pounds = Number(form.weight);
      return pounds < 50 || pounds > 700 ? 'WEIGHT' : '';
    }

    case 'name':
      return form.name.trim().length < 2 ? 'NAME' : '';

    case 'phone': {
      const d = phoneDigits(form.phone);
      if (!d) return 'PHONE_EMPTY';
      return d.length === 10 ? '' : 'PHONE_INVALID';
    }

    case 'email': {
      // Optional, unless the visitor asked to be contacted by email.
      const email = form.email.trim();
      if (!email) return form.answers.method === 'email' ? 'EMAIL_NEEDED' : '';
      return EMAIL_RE.test(email) ? '' : 'EMAIL';
    }
  }
}

/** A date of birth is required, can't be in the future and can't be more than MAX_AGE years ago. */
function dobErrorKey(value: string, today: string): string {
  if (!value) return 'DOB_EMPTY';
  if (!ISO_DATE_RE.test(value) || value > today || ageOn(value, today) > MAX_AGE) return 'DOB';
  return '';
}

/** Whole years between two yyyy-mm-dd dates. */
function ageOn(birth: string, today: string): number {
  const [by, bm, bd] = birth.split('-').map(Number);
  const [ty, tm, td] = today.split('-').map(Number);
  const hadBirthday = tm > bm || (tm === bm && td >= bd);
  return ty - by - (hadBirthday ? 0 : 1);
}

/** Today as yyyy-mm-dd in the visitor's time zone. */
export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** The 10 digits of a US phone number (a leading country code 1 is dropped). */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '').replace(/^1(?=\d{10})/, '');
}
