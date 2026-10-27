import { EMPTY, of, throwError } from 'rxjs';
import { GetHealthQuote } from './get-health-quote';
import { OFFICES } from '../../components/header/header';

/** Builds the component with hand-written fakes (no template, no network). Test data is obviously fake. */
function setup(lang = 'en') {
  const post = vi.fn((..._args: unknown[]) => of({}));
  const translate = { onLangChange: EMPTY, instant: (k: string) => k };
  const c = new GetHealthQuote(
    { getCurrentLanguage: () => lang } as any,
    translate as any,
    { post } as any,
    { getSourceFields: () => ({ source_page: 'Health Quote', source_url: '/' }) } as any,
    { detectChanges: () => {} } as any,
    { nativeElement: document.createElement('div') } as any,
    'browser' as any,
    document,
  );
  c.form.zip = '77001';
  c.form.hh = '2';
  c.form.ages[0].value = '34';
  c.form.name = ' Test User ';
  c.form.phone = '(555) 010-0100';
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

describe('GetHealthQuote payload', () => {
  it('sends only the required keys when nothing optional is answered', () => {
    expect(setup().payload()).toEqual({
      type: 'health',
      zip_code: '77001',
      household_size: '2',
      ages_covered: '34',
      full_name: 'Test User',
      phone_number: '(555) 010-0100',
      preferred_language: 'English',
      source_page: 'Health Quote',
      source_url: '/',
    });
  });

  it('defaults the preferred language to the page language', () => {
    expect(setup('es').payload().preferred_language).toBe('Spanish');
  });

  it('maps every choice to canonical English', () => {
    const { c, payload } = setup();
    const cases: [string, string, string, string][] = [
      ['who', 'me', 'who_needs_coverage', 'Just me'],
      ['who', 'me-spouse', 'who_needs_coverage', 'Me and my spouse'],
      ['who', 'me-children', 'who_needs_coverage', 'Me and my children'],
      ['who', 'family', 'who_needs_coverage', 'My whole family'],
      ['who', 'children', 'who_needs_coverage', 'Just my children'],
      ['who', 'other', 'who_needs_coverage', 'Someone else'],
      ['current', 'better', 'current_insurance_status', 'Yes, looking for a better plan'],
      ['current', 'ending', 'current_insurance_status', "Yes, but it's ending soon"],
      ['current', 'no', 'current_insurance_status', 'No'],
      ['tobacco', 'yes', 'uses_tobacco', 'Yes'],
      ['medicare', 'no', 'on_medicare', 'No'],
      ['medicaid', 'unsure', 'on_medicaid_chip', 'Not sure'],
      ['plan', 'aca', 'plan_type', 'Marketplace (ACA) health plan'],
      ['plan', 'medsup', 'plan_type', 'Medicare Supplement'],
      ['plan', 'dental-vision', 'plan_type', 'Dental and vision only'],
      ['plan', 'short-term', 'plan_type', 'Short-term health plan'],
      ['plan', 'unsure', 'plan_type', 'Not sure: help me choose'],
      ['method', 'call', 'contact_method', 'Call'],
      ['method', 'text', 'contact_method', 'Text'],
      ['time', 'evening', 'best_time_to_call', 'Evening (4 PM–7 PM)'],
      ['lang', 'hi', 'preferred_language', 'Hindi'],
    ];
    for (const [group, id, key, text] of cases) {
      c.form.pick[group] = id;
      expect(payload()[key]).toBe(text);
    }
  });

  it('sends coverage_end_date only when coverage is ending', () => {
    const { c, payload } = setup();
    c.form.ends = '2099-01-31';
    c.form.pick['current'] = 'better';
    expect(payload().coverage_end_date).toBeUndefined();
    c.form.pick['current'] = 'ending';
    expect(payload().coverage_end_date).toBe('2099-01-31');
  });

  it('joins life events, ages and priorities; income goes as digits only', () => {
    const { c, payload } = setup();
    c.form.events = { lost: true, baby: true, married: false };
    c.form.ages = [{ id: 1, value: '34' }, { id: 2, value: '36' }, { id: 3, value: '5' }];
    c.form.income = '48,500';
    c.form.priorities = { premium: true, mental: true, rx: false };
    expect(payload()).toMatchObject({
      life_events: 'Lost health coverage, Had or adopted a baby',
      ages_covered: '34, 36, 5',
      household_income: '48500',
      plan_priorities: ['Lowest monthly premium', 'Mental health coverage'],
    });
  });

  it('trims and caps county and keep_provider, and sends email and office only when given', () => {
    const { c, payload } = setup();
    expect(payload().email_address).toBeUndefined();
    expect(payload().preferred_office).toBeUndefined();
    c.form.county = ' Harris ';
    c.form.keep = 'x'.repeat(250);
    c.form.email = ' test@example.com ';
    c.form.office = OFFICES[0].id;
    const p = payload();
    expect(p.county).toBe('Harris');
    expect(p.keep_provider.length).toBe(200);
    expect(p.email_address).toBe('test@example.com');
    expect(p.preferred_office).toBe(`${OFFICES[0].street}, ${OFFICES[0].city}`);
  });
});

describe('GetHealthQuote form behaviour', () => {
  it('Medicare = yes preselects Medicare Supplement', () => {
    const { c } = setup();
    c.pick('plan', 'aca');
    c.pick('medicare', 'yes');
    expect(c.form.pick['plan']).toBe('medsup');
  });

  it('"None of these" clears the other life events and the reverse', () => {
    const { c, inputEvent } = setup();
    c.onEvent('lost', inputEvent('lost', true));
    c.onEvent('none', inputEvent('none', true));
    expect(c.form.events).toMatchObject({ lost: false, none: true });
    c.onEvent('moved', inputEvent('moved', true));
    expect(c.form.events).toMatchObject({ none: false, moved: true });
  });

  it('matches the age boxes to "Who needs coverage?" until an age is typed', () => {
    const { c } = setup();
    c.form.ages = [{ id: 9, value: '' }];
    c.pick('who', 'family');
    expect(c.form.ages.length).toBe(3);
    c.pick('who', 'me');
    expect(c.form.ages.length).toBe(1);
    c.form.ages[0].value = '40';
    c.pick('who', 'family');
    expect(c.form.ages.length).toBe(1);
  });

  it('adds up to 10 age boxes and never removes the last one', () => {
    const { c } = setup();
    for (let i = 0; i < 15; i++) c.addAge(false);
    expect(c.form.ages.length).toBe(10);
    c.form.ages = [{ id: 1, value: '' }];
    c.removeAge(0);
    expect(c.form.ages.length).toBe(1);
  });

  it('fills the county from Houston-area ZIPs and asks on split ZIPs', () => {
    const { c, inputEvent } = setup();
    c.onZipInput(inputEvent('77459'));
    expect(c.form.county).toBe('Fort Bend');
    c.onZipInput(inputEvent('77002'));
    expect(c.form.county).toBe('Harris');
    c.onZipInput(inputEvent('77053'));
    expect(c.form.county).toBe('');
    expect(c.countyHint.key).toBe('FORM.COUNTY_SPLIT');
  });

  it('knows the Open Enrollment window', () => {
    expect(GetHealthQuote.inOpenEnrollment(new Date(2026, 9, 15))).toBe(true);
    expect(GetHealthQuote.inOpenEnrollment(new Date(2027, 0, 15))).toBe(true);
    expect(GetHealthQuote.inOpenEnrollment(new Date(2027, 0, 16))).toBe(false);
    expect(GetHealthQuote.inOpenEnrollment(new Date(2026, 9, 14))).toBe(false);
  });
});

describe('GetHealthQuote validation', () => {
  it('step 1 needs a 5-digit ZIP and a coverage end date that has not passed', () => {
    const { c, validate } = setup();
    c.form.zip = '';
    expect(validate(1)).toEqual(['mq-zip']);
    c.form.zip = '7700';
    expect(c.errors['zip']).toBeTruthy();
    expect(validate(1)).toEqual(['mq-zip']);
    c.form.zip = '77001';
    c.form.pick['current'] = 'ending';
    c.form.ends = '2000-01-01';
    expect(validate(1)).toEqual(['mq-ends']);
    c.form.pick['current'] = 'no';
    expect(validate(1)).toEqual([]);
  });

  it('step 2 checks household size and ages', () => {
    const { c, validate } = setup();
    expect(validate(2)).toEqual([]);
    c.form.hh = '';
    expect(validate(2)).toEqual(['mq-hh']);
    c.form.hh = '1';
    c.form.ages = [{ id: 1, value: '30' }, { id: 2, value: '31' }];
    expect(validate(2)).toEqual(['mq-hh']);
    expect(c.errors['ages']).toBe('HEALTH_QUOTE_PAGE.FORM.ERR.AGES_HH');
    c.form.hh = '3';
    c.form.ages = [{ id: 1, value: '30' }, { id: 2, value: '' }];
    expect(validate(2)).toEqual(['mq-age-2']);
    c.form.ages = [{ id: 1, value: '130' }];
    expect(validate(2)).toEqual(['mq-age-1']);
    expect(c.errors['ages']).toBe('HEALTH_QUOTE_PAGE.FORM.ERR.AGES_RANGE');
  });

  it('step 4 needs name and phone, and email when Email is the contact method', () => {
    const { c, validate } = setup();
    expect(validate(4)).toEqual([]);
    c.form.pick['method'] = 'email';
    expect(validate(4)).toEqual(['mq-email']);
    c.form.email = 'not-an-email';
    expect(validate(4)).toEqual(['mq-email']);
    c.form.email = 'test@example.com';
    c.form.name = 'x';
    c.form.phone = '555';
    expect(validate(4)).toEqual(['mq-name', 'mq-phone']);
  });
});

describe('GetHealthQuote submit', () => {
  const submitEvent = () => ({ preventDefault: () => {} }) as any as Event;

  it('posts once from the review step, then resets and shows the success panel', async () => {
    const { c, post } = setup();
    c.step = 5;
    c.form.pick['current'] = 'ending';
    c.form.ends = '2099-01-31';
    const first = c.submit(submitEvent());
    await c.submit(submitEvent()); // ignored: already sending
    await first;
    expect(post).toHaveBeenCalledTimes(1);
    expect(post.mock.calls[0][0]).toBe('/quotes/create');
    expect(c.sent).toBe(true);
    expect(c.sentEnding).toBe(true);
    expect(c.form.zip).toBe('');
  });

  it('does nothing before the review step', async () => {
    const { c, post } = setup();
    c.step = 3;
    await c.submit(submitEvent());
    expect(post).not.toHaveBeenCalled();
  });

  it('keeps the answers and shows an error when the request fails', async () => {
    const { c, post } = setup();
    post.mockReturnValueOnce(throwError(() => new Error('fail')));
    c.step = 5;
    await c.submit(submitEvent());
    expect(c.sent).toBe(false);
    expect(c.submitError).toBe('HEALTH_QUOTE_PAGE.FORM.ERR.SUBMIT');
    expect(c.form.zip).toBe('77001');
  });
});
