/**
 * Turns the life quote form into the body of POST /quotes/create.
 *
 * Rules (shared with the other quote pages):
 * - Option answers are sent as English text (ANSWER_VALUES), whatever the page language.
 * - Dates are yyyy-mm-dd.
 * - Unanswered optional fields are left out, never sent as '' or null.
 * - Health answers are never sent to analytics; the API includes them in the lead email and ClickUp task.
 */
import { OFFICES } from '../../components/header/header';
import { PageSourceFields } from '../../services/page-source';
import { ALSO_QUOTE_VALUES, ANSWER_VALUES, LifeQuoteForm, PURPOSE_VALUES, Question } from './life-quote.model';
import { ISO_DATE_RE } from './life-quote.validation';

export interface LifeQuotePayload extends PageSourceFields {
  type: 'life';
  // Step 1: who is covered
  insured_person?: string;
  date_of_birth: string;
  gender?: string;
  spouse_date_of_birth?: string;
  spouse_gender?: string;
  zip_code: string;
  // Step 2: health
  uses_tobacco?: string;
  general_health?: string;
  height?: string;
  weight?: string;
  health_conditions?: string;
  // Step 3: coverage
  insurance_type?: string;
  coverage_term_length?: string;
  coverage_amount?: string;
  coverage_purpose?: string;
  has_life_insurance?: string;
  bundle_option?: string;
  // Step 4: contact
  full_name: string;
  phone_number: string;
  email_address?: string;
  preferred_language: string;
  contact_method?: string;
  best_time_to_connect?: string;
  preferred_office?: string;
}

export function buildLifeQuotePayload(form: LifeQuoteForm, source: PageSourceFields): LifeQuotePayload {
  const answers = form.answers;
  /** English value of a radio answer, or undefined when it wasn't answered. */
  const english = (q: Question) => ANSWER_VALUES[q][answers[q] ?? ''];
  const forBoth = answers.who === 'both';
  const office = OFFICES.find((o) => o.id === form.office);

  const payload: LifeQuotePayload = {
    type: 'life',

    // Step 1: who is covered
    insured_person: english('who'),
    date_of_birth: form.dob,
    gender: english('sex'),
    spouse_date_of_birth: forBoth && ISO_DATE_RE.test(form.spouseDob) ? form.spouseDob : undefined,
    spouse_gender: forBoth ? english('spouseSex') : undefined,
    zip_code: form.zip,

    // Step 2: health
    uses_tobacco: english('tobacco'),
    general_health: english('health'),
    height: form.heightFeet ? `${form.heightFeet} ft ${form.heightInches || '0'} in` : undefined,
    weight: form.weight || undefined,
    health_conditions: english('conditions'),

    // Step 3: coverage
    insurance_type: english('type'),
    coverage_term_length: answers.type === 'term' ? english('term') : undefined,
    coverage_amount: english('amount'),
    coverage_purpose: ticked(form.purpose, PURPOSE_VALUES),
    has_life_insurance: english('hasLife'),
    bundle_option: ticked(form.alsoQuote, ALSO_QUOTE_VALUES),

    // Step 4: contact
    full_name: form.name.trim(),
    phone_number: form.phone,
    email_address: form.email.trim() || undefined,
    preferred_language: english('lang') ?? 'English',
    contact_method: english('method'),
    best_time_to_connect: english('time'),
    preferred_office: office ? `${office.street}, ${office.city}` : undefined,

    ...source,
  };
  return withoutEmpty(payload);
}

/** English values of the ticked boxes, comma separated, or undefined when none is ticked. */
function ticked(boxes: Record<string, boolean>, values: Record<string, string>): string | undefined {
  const picked = Object.keys(values).filter((key) => boxes[key]).map((key) => values[key]);
  return picked.length ? picked.join(', ') : undefined;
}

/** Drops keys whose value is undefined or '', so unanswered questions are not sent. */
function withoutEmpty<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== '')) as T;
}
