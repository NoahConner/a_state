/**
 * Data shapes and fixed option values for the life insurance quote form.
 * The visible labels live in the translation files (LIFE_QUOTE_PAGE.FORM.*); this file only holds
 * the option keys and the English values the API stores, so both languages send the same data.
 */

/** Every radio-button question on the form. The value stored for each is an option key, e.g. who = 'both'. */
export type Question =
  | 'who' | 'sex' | 'spouseSex'
  | 'tobacco' | 'health' | 'conditions'
  | 'type' | 'term' | 'amount' | 'hasLife'
  | 'lang' | 'method' | 'time';

/** Everything the visitor has entered so far. Text fields hold exactly what is in the input. */
export interface LifeQuoteForm {
  // Step 1: who is covered
  dob: string;          // yyyy-mm-dd from the date input
  spouseDob: string;    // only used when who = 'both'
  zip: string;
  // Step 2: health
  heightFeet: string;
  heightInches: string;
  weight: string;       // pounds, digits only
  // Step 4: contact
  name: string;
  phone: string;        // formatted as (713) 555-0123
  email: string;
  office: string;       // an OFFICES id, or '' for no preference
  /** Radio answers by question. A missing key means "not answered". */
  answers: Partial<Record<Question, string>>;
  /** Step 3 checkboxes, by option key. */
  purpose: Record<string, boolean>;
  alsoQuote: Record<string, boolean>;
}

/** Translation key prefix for this page. */
export const T = 'LIFE_QUOTE_PAGE.';

export const TOTAL_STEPS = 5;
export const MAX_AGE = 100;

/**
 * English value sent to the API for each option key, per question.
 * Keep the keys in sync with the `V` values of the matching lists in en.json / es.json.
 */
export const ANSWER_VALUES: Record<Question, Record<string, string>> = {
  who: { me: 'Me', spouse: 'My spouse', both: 'Me and my spouse', parent: 'A parent', other: 'Someone else' },
  sex: { female: 'Female', male: 'Male' },
  spouseSex: { female: 'Female', male: 'Male' },
  tobacco: { yes: 'Yes', no: 'No' },
  health: { excellent: 'Excellent', good: 'Good', fair: 'Fair', poor: 'Poor' },
  conditions: { yes: 'Yes', no: 'No', discuss: 'Prefer to discuss with an agent' },
  type: { term: 'Term', whole: 'Whole life', final: 'Final expense', unsure: 'Not sure: help me choose' },
  term: { '10y': '10 years', '15y': '15 years', '20y': '20 years', '25y': '25 years', '30y': '30 years', 'not-sure': 'Not sure' },
  amount: {
    'under-25k': 'Under $25k', '25-50k': '$25k–$50k', '50-100k': '$50k–$100k', '100-250k': '$100k–$250k',
    '250-500k': '$250k–$500k', '500k-plus': '$500k+', unsure: 'Not sure: help me figure it out',
  },
  hasLife: { yes: 'Yes', no: 'No', 'not-sure': 'Not sure' },
  lang: { en: 'English', es: 'Spanish', hi: 'Hindi' },
  method: { call: 'Call', text: 'Text', email: 'Email' },
  time: { morning: 'Morning (9 AM–12 PM)', afternoon: 'Afternoon (12 PM–4 PM)', evening: 'Evening (4 PM–7 PM)' },
};

/** English values for the step 3 checkboxes, in the order they are sent. */
export const PURPOSE_VALUES: Record<string, string> = {
  funeral: 'Funeral and final costs',
  income: 'Replace my income for my family',
  mortgage: 'Pay off the mortgage',
  other: 'Other',
};
export const ALSO_QUOTE_VALUES: Record<string, string> = { auto: 'Auto', home: 'Home or Renters', health: 'Health' };

/** Icons (sprite ids) shown next to options and sections. */
export const TYPE_SECTION_ICONS = ['i-cal', 'i-layers', 'i-heart'];
export const PURPOSE_ICONS: Record<string, string> = { funeral: 'i-heart', income: 'i-user', mortgage: 'i-home', other: 'i-more' };
export const ALSO_QUOTE_ICONS: Record<string, string> = { auto: 'i-car', home: 'i-home', health: 'i-health' };

/** Height dropdown choices. */
export const HEIGHT_FEET = ['4', '5', '6', '7'];
export const HEIGHT_INCHES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

/** A blank form. The preferred language starts as the page language. */
export function emptyLifeQuoteForm(pageLang: string): LifeQuoteForm {
  return {
    dob: '', spouseDob: '', zip: '',
    heightFeet: '', heightInches: '', weight: '',
    name: '', phone: '', email: '', office: '',
    answers: { lang: pageLang === 'es' ? 'es' : 'en' },
    purpose: {},
    alsoQuote: {},
  };
}
