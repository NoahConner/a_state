import { EMPTY, of, throwError } from 'rxjs';
import { GetSuretyQuote } from './get-surety-quote';
import { OFFICES } from '../../components/header/header';

/** Builds the component with hand-written fakes (no template, no network). Test data is obviously fake. */
function setup(lang = 'en') {
  const post = vi.fn((..._args: unknown[]) => of({}));
  const translate = { onLangChange: EMPTY, instant: (k: string) => k };
  const c = new GetSuretyQuote(
    { getCurrentLanguage: () => lang } as any,
    translate as any,
    { post } as any,
    { getSourceFields: () => ({ source_page: 'Surety Quote', source_url: '/' }) } as any,
    { detectChanges: () => {} } as any,
    { nativeElement: document.createElement('div') } as any,
    'browser' as any,
    document,
  );
  c.form.name = ' Test User ';
  c.form.phone = '(555) 010-0100';
  c.form.zip = '77001';
  c.form.pick['bond'] = 'notary';
  const payload = () => (c as any).buildPayload() as any;
  const validate = (n: number) => (c as any).validateStep(n) as string[];
  const inputEvent = (value: string, checked = false) => {
    const input = document.createElement('input');
    input.value = value;
    input.checked = checked;
    return { target: input } as any as Event;
  };
  return { c, post, payload, validate, inputEvent };
}

describe('GetSuretyQuote payload', () => {
  it('sends only the required keys when nothing optional is answered', () => {
    expect(setup().payload()).toEqual({
      type: 'surety_bond',
      full_name: 'Test User',
      phone_number: '(555) 010-0100',
      zip_code: '77001',
      bond_type: 'Notary bond',
      preferred_language: 'English',
      source_page: 'Surety Quote',
      source_url: '/',
    });
  });

  it('defaults the preferred language to the page language', () => {
    expect(setup('es').payload().preferred_language).toBe('Spanish');
  });

  it('maps every choice to canonical English', () => {
    const { c, payload } = setup();
    const cases: [string, string, string, string][] = [
      ['applicant', 'individual', 'applicant_type', 'Individual'],
      ['applicant', 'unsure', 'applicant_type', 'Not sure'],
      ['bond', 'bonded-title', 'bond_type', 'Bonded title (vehicle title bond)'],
      ['bond', 'performance-payment', 'bond_type', 'Performance or payment bond (contract)'],
      ['bond', 'unsure', 'bond_type', 'Not sure: help me find the right bond'],
      ['when', 'asap', 'bond_needed_by', 'As soon as possible'],
      ['when', '30-days', 'bond_needed_by', 'Within 30 days'],
      ['credit', 'good', 'estimated_credit_score', 'Good (680-719)'],
      ['credit', 'below-620', 'estimated_credit_score', 'Below 620'],
      ['renewal', 'renewal', 'new_or_renewal', 'Renewal'],
      ['claims', 'unsure', 'prior_bond_history', 'Not sure'],
      ['judgments', 'discuss', 'has_judgments_liens_bankruptcies', 'Prefer to discuss with an agent'],
      ['method', 'text', 'contact_method', 'Text'],
      ['time', 'morning', 'best_time_to_call', 'Morning (9 AM–12 PM)'],
    ];
    for (const [group, id, key, text] of cases) {
      c.form.pick[group] = id;
      expect(payload()[key]).toBe(text);
    }
  });

  it('sends business name and years only for a business', () => {
    const { c, payload } = setup();
    c.form.biz = ' Test Motors LLC ';
    c.form.years = '7';
    c.form.pick['applicant'] = 'individual';
    expect(payload().business_name).toBeUndefined();
    expect(payload().years_in_business).toBeUndefined();
    c.form.pick['applicant'] = 'business';
    expect(payload()).toMatchObject({ applicant_type: 'Business', business_name: 'Test Motors LLC', years_in_business: '7' });
  });

  it('sends the bond amount as digits, or "Not sure"', () => {
    const { c, payload, inputEvent } = setup();
    c.onAmountInput(inputEvent('10000'));
    expect(c.form.amount).toBe('10,000');
    expect(payload().bond_amount).toBe('10000');
    c.onAmountUnsure(inputEvent('', true));
    expect(c.form.amount).toBe('');
    expect(payload().bond_amount).toBe('Not sure');
  });

  it('sends the specific date only for "Specific date"', () => {
    const { c, payload } = setup();
    c.form.date = '2099-03-01';
    c.form.pick['when'] = 'asap';
    expect(payload().bond_needed_by_specific_date).toBeUndefined();
    c.form.pick['when'] = 'date';
    expect(payload()).toMatchObject({ bond_needed_by: 'Specific date', bond_needed_by_specific_date: '2099-03-01' });
  });

  it('sends obligee, email and office only when given', () => {
    const { c, payload } = setup();
    const p0 = payload();
    expect(p0.obligee_name).toBeUndefined();
    expect(p0.email_address).toBeUndefined();
    expect(p0.preferred_office).toBeUndefined();
    c.form.obligee = ' TxDMV ';
    c.form.email = ' test@example.com ';
    c.form.office = OFFICES[1].id;
    expect(payload()).toMatchObject({
      obligee_name: 'TxDMV',
      email_address: 'test@example.com',
      preferred_office: `${OFFICES[1].street}, ${OFFICES[1].city}`,
    });
  });
});

describe('GetSuretyQuote validation', () => {
  it('step 1 needs name, phone and a 5-digit ZIP; email only when typed', () => {
    const { c, validate } = setup();
    expect(validate(1)).toEqual([]);
    c.form.email = 'nope';
    c.form.zip = '770';
    c.form.name = '';
    expect(validate(1)).toEqual(['sq-name', 'sq-email', 'sq-zip']);
  });

  it('step 2 needs a bond and a date that has not passed', () => {
    const { c, validate } = setup();
    c.form.pick['bond'] = '';
    expect(validate(2)).toEqual(['sq-b-notary']);
    c.form.pick['bond'] = 'notary';
    c.form.pick['when'] = 'date';
    c.form.date = '2000-01-01';
    expect(validate(2)).toEqual(['sq-date']);
    c.form.pick['when'] = 'asap';
    expect(validate(2)).toEqual([]);
  });

  it('step 4 needs an email from step 1 when Email is the contact method', () => {
    const { c, validate } = setup();
    c.form.pick['method'] = 'email';
    expect(validate(4)).toEqual(['sq-m-email']);
    c.form.email = 'test@example.com';
    expect(validate(4)).toEqual([]);
  });
});

describe('GetSuretyQuote submit', () => {
  const submitEvent = () => ({ preventDefault: () => {} }) as any as Event;

  it('posts once from the review step, then resets and shows the success panel', async () => {
    const { c, post } = setup();
    c.step = 5;
    c.form.pick['when'] = 'asap';
    const first = c.submit(submitEvent());
    await c.submit(submitEvent()); // ignored: already sending
    await first;
    expect(post).toHaveBeenCalledTimes(1);
    expect((post.mock.calls[0][1] as any).type).toBe('surety_bond');
    expect(c.sent).toBe(true);
    expect(c.sentAsap).toBe(true);
    expect(c.form.name).toBe('');
  });

  it('does nothing before the review step', async () => {
    const { c, post } = setup();
    c.step = 2;
    await c.submit(submitEvent());
    expect(post).not.toHaveBeenCalled();
  });

  it('keeps the answers and shows an error when the request fails', async () => {
    const { c, post } = setup();
    post.mockReturnValueOnce(throwError(() => new Error('fail')));
    c.step = 5;
    await c.submit(submitEvent());
    expect(c.sent).toBe(false);
    expect(c.submitError).toBe('SURETY_QUOTE_PAGE.FORM.ERR.SUBMIT');
    expect(c.form.zip).toBe('77001');
  });
});
