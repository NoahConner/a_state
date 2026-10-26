import { EMPTY, of, throwError } from 'rxjs';
import { GetLifeQuote } from './get-life-quote';
import { OFFICES } from '../../components/header/header';
import { LifeQuoteForm, emptyLifeQuoteForm } from './life-quote.model';
import { buildLifeQuotePayload } from './life-quote.payload';
import { fieldErrorKey } from './life-quote.validation';

// Test data is obviously fake.
const SOURCE = { source_page: 'Life Quote', source_url: '/' };
const TODAY = '2026-10-26';

/** A form with only the required answers filled in. */
function filledForm(lang = 'en'): LifeQuoteForm {
  return { ...emptyLifeQuoteForm(lang), dob: '1980-05-20', zip: '77001', name: ' Test User ', phone: '(555) 010-0100' };
}

describe('buildLifeQuotePayload', () => {
  it('sends only the required keys when nothing optional is answered', () => {
    expect(buildLifeQuotePayload(filledForm(), SOURCE)).toEqual({
      type: 'life',
      date_of_birth: '1980-05-20',
      zip_code: '77001',
      full_name: 'Test User',
      phone_number: '(555) 010-0100',
      preferred_language: 'English',
      ...SOURCE,
    });
  });

  it('defaults the preferred language to the page language', () => {
    expect(buildLifeQuotePayload(filledForm('es'), SOURCE).preferred_language).toBe('Spanish');
  });

  it('sends radio answers as English text', () => {
    const form = filledForm();
    Object.assign(form.answers, {
      who: 'parent', sex: 'female', tobacco: 'no', health: 'good', conditions: 'discuss', type: 'whole',
      amount: '100-250k', hasLife: 'not-sure', method: 'text', time: 'morning',
    });
    expect(buildLifeQuotePayload(form, SOURCE)).toMatchObject({
      insured_person: 'A parent',
      gender: 'Female',
      uses_tobacco: 'No',
      general_health: 'Good',
      health_conditions: 'Prefer to discuss with an agent',
      insurance_type: 'Whole life',
      coverage_amount: '$100k–$250k',
      has_life_insurance: 'Not sure',
      contact_method: 'Text',
      best_time_to_connect: 'Morning (9 AM–12 PM)',
    });
  });

  it('sends the term length only for term life', () => {
    const form = filledForm();
    Object.assign(form.answers, { term: '20y', type: 'whole' });
    expect(buildLifeQuotePayload(form, SOURCE).coverage_term_length).toBeUndefined();
    form.answers.type = 'term';
    expect(buildLifeQuotePayload(form, SOURCE)).toMatchObject({ insurance_type: 'Term', coverage_term_length: '20 years' });
  });

  it('sends the spouse details only for "Me and my spouse"', () => {
    const form = filledForm();
    form.spouseDob = '1982-01-02';
    Object.assign(form.answers, { who: 'me', spouseSex: 'male' });
    expect(buildLifeQuotePayload(form, SOURCE).spouse_date_of_birth).toBeUndefined();
    form.answers.who = 'both';
    expect(buildLifeQuotePayload(form, SOURCE)).toMatchObject({ spouse_date_of_birth: '1982-01-02', spouse_gender: 'Male' });
  });

  it('sends height, weight, checkboxes, office and email when given', () => {
    const form = { ...filledForm(), heightFeet: '5', weight: '165', office: OFFICES[0].id, email: ' test@example.com ' };
    form.purpose = { income: true, funeral: true };
    form.alsoQuote = { health: true, auto: true };
    expect(buildLifeQuotePayload(form, SOURCE)).toMatchObject({
      height: '5 ft 0 in',
      weight: '165',
      coverage_purpose: 'Funeral and final costs, Replace my income for my family',
      bundle_option: 'Auto, Health',
      preferred_office: `${OFFICES[0].street}, ${OFFICES[0].city}`,
      email_address: 'test@example.com',
    });
  });
});

describe('fieldErrorKey', () => {
  it('requires a date of birth that is not in the future or more than 100 years ago', () => {
    const form = filledForm();
    expect(fieldErrorKey('dob', form, TODAY)).toBe('');
    expect(fieldErrorKey('dob', { ...form, dob: '' }, TODAY)).toBe('DOB_EMPTY');
    expect(fieldErrorKey('dob', { ...form, dob: '2999-01-01' }, TODAY)).toBe('DOB');
    expect(fieldErrorKey('dob', { ...form, dob: '1900-01-01' }, TODAY)).toBe('DOB');
  });

  it('asks for the spouse date of birth only for "Me and my spouse"', () => {
    const form = filledForm();
    expect(fieldErrorKey('spouseDob', form, TODAY)).toBe('');
    form.answers.who = 'both';
    expect(fieldErrorKey('spouseDob', form, TODAY)).toBe('DOB_EMPTY');
  });

  it('requires a 5-digit ZIP', () => {
    expect(fieldErrorKey('zip', { ...filledForm(), zip: '' })).toBe('ZIP_EMPTY');
    expect(fieldErrorKey('zip', { ...filledForm(), zip: '770' })).toBe('ZIP');
  });

  it('checks the weight range only when a weight is given', () => {
    expect(fieldErrorKey('weight', filledForm())).toBe('');
    expect(fieldErrorKey('weight', { ...filledForm(), weight: '20' })).toBe('WEIGHT');
  });

  it('needs an email only when the visitor chooses email', () => {
    const form = filledForm();
    expect(fieldErrorKey('email', form)).toBe('');
    form.answers.method = 'email';
    expect(fieldErrorKey('email', form)).toBe('EMAIL_NEEDED');
  });
});

/** Builds the component with hand-written fakes (no template, no network). */
function setupComponent(query: Record<string, string> = {}) {
  const post = vi.fn((..._args: unknown[]) => of({}));
  const c = new GetLifeQuote(
    { getCurrentLanguage: () => 'en' } as any,
    { onLangChange: EMPTY, instant: (k: string) => k } as any,
    { post } as any,
    { getSourceFields: () => SOURCE } as any,
    { snapshot: { queryParamMap: { get: (k: string) => query[k] ?? null } } } as any,
    { detectChanges: () => {} } as any,
    { nativeElement: document.createElement('div') } as any,
    'browser' as any,
    document,
  );
  return { c, post };
}

describe('GetLifeQuote', () => {
  it('pre-selects the type and the "not sure" amount from the links below the form', () => {
    const { c } = setupComponent();
    c.pickType('final', new Event('click'));
    expect(c.form.answers.type).toBe('final');
    c.onSegLink({ t: 'x', h: '#quote', k: 'amount' }, new Event('click'));
    expect(c.form.answers.amount).toBe('unsure');
  });

  it('prefills name and phone from the query string', () => {
    const { c } = setupComponent({ fullName: 'Test User', phone: '5550100100' });
    expect(c.form.name).toBe('Test User');
    expect(c.form.phone).toBe('(555) 010-0100');
  });

  it('does not leave step 1 while the required fields are empty', () => {
    const { c } = setupComponent();
    c.next();
    expect(c.step).toBe(1);
    expect(c.errors.dob).toBe('LIFE_QUOTE_PAGE.FORM.ERR.DOB_EMPTY');
  });

  it('posts to /quotes/create and shows the success panel', async () => {
    const { c, post } = setupComponent();
    c.form = filledForm();
    c.step = 5;
    await c.submit(new Event('submit'));
    expect(post).toHaveBeenCalledWith('/quotes/create', expect.objectContaining({ type: 'life' }), true);
    expect(c.sent).toBe(true);
    expect(c.sentFirstName).toBe('Test');
  });

  it('keeps the answers when the request fails', async () => {
    const { c, post } = setupComponent();
    post.mockReturnValueOnce(throwError(() => new Error('fail')));
    c.form = filledForm();
    c.step = 5;
    await c.submit(new Event('submit'));
    expect(c.sent).toBe(false);
    expect(c.form.zip).toBe('77001');
    expect(c.submitError).toBe('LIFE_QUOTE_PAGE.FORM.ERR.SUBMIT');
  });
});
