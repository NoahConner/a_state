import { EMPTY, of, Subject } from 'rxjs';
import { GetHomeQuote } from './get-home-quote';
import { OFFICES } from '../../components/header/header';

/** Builds the component with hand-written fakes (no template, no network). Test data is obviously fake. */
function setup(lang = 'en') {
  const post = vi.fn((..._args: unknown[]) => of({}));
  const translate = { onLangChange: EMPTY, instant: (k: string) => k };
  const c = new GetHomeQuote(
    { getCurrentLanguage: () => lang } as any,
    translate as any,
    { post } as any,
    { getSourceFields: () => ({ source_page: 'Home Quote', source_url: '/' }) } as any,
    { detectChanges: () => {} } as any,
    { nativeElement: document.createElement('div') } as any,
    'browser' as any,
    document,
  );
  c.form.address = ' 123 Test St, Houston, TX 77001 ';
  c.form.name = ' Test User ';
  c.form.phone = '(555) 010-0100';
  const payload = () => (c as any).buildPayload() as any;
  const validate = (n: number) => (c as any).validateStep(n) as string[];
  const inputEvent = (value: string) => {
    const input = document.createElement('input');
    input.value = value;
    return { target: input } as any as Event;
  };
  return { c, post, payload, validate, inputEvent };
}

describe('GetHomeQuote payload', () => {
  it('sends only the required keys when nothing optional is answered', () => {
    const { payload } = setup();
    expect(payload()).toEqual({
      type: 'home',
      property_address: '123 Test St, Houston, TX 77001',
      full_name: 'Test User',
      phone_number: '(555) 010-0100',
      preferred_language: 'English',
      source_page: 'Home Quote',
      source_url: '/',
    });
  });

  it('defaults the preferred language to the page language', () => {
    expect(setup('es').payload().preferred_language).toBe('Spanish');
  });

  it('maps home use, property type and ownership to canonical English', () => {
    const { c, payload } = setup();
    const cases: [string, string, string, string][] = [
      ['usage', 'primary', 'is_primary_residence', 'Primary home'],
      ['usage', 'second', 'is_primary_residence', 'Second or vacation home'],
      ['usage', 'rental', 'is_primary_residence', 'Rental (tenants)'],
      ['ptype', 'single-family', 'property_type', 'Single-family'],
      ['ptype', 'condo', 'property_type', 'Condo'],
      ['ptype', 'townhome', 'property_type', 'Townhome'],
      ['ptype', 'mobile', 'property_type', 'Mobile or manufactured home'],
      ['ptype', 'other', 'property_type', 'Other'],
      ['status', 'owner', 'ownership_status', 'Already the owner'],
      ['status', 'buying', 'ownership_status', 'Buying this home'],
      ['status', 'refinancing', 'ownership_status', 'Refinancing'],
    ];
    for (const [group, id, key, text] of cases) {
      c.form.pick[group] = id;
      expect(payload()[key]).toBe(text);
    }
  });

  it('maps stories, roof, construction and foundation', () => {
    const { c, payload } = setup();
    const cases: [string, string, string, string][] = [
      ['stories', '1', 'number_of_stories', '1'],
      ['stories', '2', 'number_of_stories', '2'],
      ['stories', '3+', 'number_of_stories', '3+'],
      ['roofAge', 'under-1', 'roof_age', 'Under 1 year'],
      ['roofAge', '1-10', 'roof_age', '1-10 years'],
      ['roofAge', '11-20', 'roof_age', '11-20 years'],
      ['roofAge', '20-plus', 'roof_age', '20+ years'],
      ['roofAge', 'unsure', 'roof_age', 'Not sure'],
      ['roofType', 'asphalt', 'roof_type', 'Asphalt shingle'],
      ['roofType', 'metal', 'roof_type', 'Metal'],
      ['roofType', 'tile', 'roof_type', 'Tile'],
      ['roofType', 'wood', 'roof_type', 'Wood'],
      ['roofType', 'other', 'roof_type', 'Other'],
      ['roofType', 'unsure', 'roof_type', 'Not sure'],
      ['construction', 'frame', 'construction_type', 'Frame'],
      ['construction', 'brick', 'construction_type', 'Brick or masonry'],
      ['construction', 'mixed', 'construction_type', 'Mixed'],
      ['construction', 'unsure', 'construction_type', 'Not sure'],
      ['foundation', 'slab', 'foundation_type', 'Slab'],
      ['foundation', 'pier', 'foundation_type', 'Pier and beam'],
      ['foundation', 'unsure', 'foundation_type', 'Not sure'],
    ];
    for (const [group, id, key, text] of cases) {
      c.form.pick[group] = id;
      expect(payload()[key]).toBe(text);
    }
  });

  it('maps the yes/no questions, claims and flood', () => {
    const { c, payload } = setup();
    c.form.pick['alarm'] = 'yes';
    c.form.pick['pool'] = 'no';
    c.form.pick['tramp'] = 'yes';
    c.form.pick['dogs'] = 'no';
    c.form.pick['claims'] = 'unsure';
    c.form.pick['flood'] = 'yes';
    expect(payload()).toMatchObject({
      has_alarm_system: 'Yes', has_swimming_pool: 'No', has_trampoline: 'Yes', has_pets: 'No',
      recent_claims: 'Not sure', needs_flood_insurance: 'Yes',
    });
    c.form.pick['claims'] = 'no';
    c.form.pick['flood'] = 'unsure';
    expect(payload()).toMatchObject({ recent_claims: 'No', needs_flood_insurance: 'Not sure' });
  });

  it('sends closing_date only when buying', () => {
    const { c, payload } = setup();
    c.form.close = '2999-01-31';
    c.form.pick['status'] = 'owner';
    expect('closing_date' in payload()).toBe(false);
    c.form.pick['status'] = 'buying';
    expect(payload().closing_date).toBe('2999-01-31');
    c.form.close = '';
    expect('closing_date' in payload()).toBe(false);
  });

  it('sends dog_breed only when dogs is Yes and a breed was typed, capped at 100 characters',() => {
    const { c, payload } = setup();
    c.form.breed = ' Labrador ';
    c.form.pick['dogs'] = 'no';
    expect('dog_breed' in payload()).toBe(false);
    c.form.pick['dogs'] = 'yes';
    expect(payload().dog_breed).toBe('Labrador');
    c.form.breed = '  ';
    expect('dog_breed' in payload()).toBe(false);
    c.form.breed = 'x'.repeat(150);
    expect(payload().dog_breed.length).toBe(100);
  });

  it('sends carrier and renewal_date only when insured, carrier capped at 100 characters', () => {
    const { c, payload } = setup();
    c.form.carrier = ' Acme ';
    c.form.renewal = '2999-12-31';
    c.form.pick['insured'] = 'no';
    let p = payload();
    expect(p.current_insurance_status).toBe('No');
    expect('current_carrier' in p).toBe(false);
    expect('renewal_date' in p).toBe(false);
    c.form.pick['insured'] = 'yes';
    p = payload();
    expect(p.current_insurance_status).toBe('Yes');
    expect(p.current_carrier).toBe('Acme');
    expect(p.renewal_date).toBe('2999-12-31');
    c.form.carrier = 'x'.repeat(150);
    expect(payload().current_carrier.length).toBe(100);
  });

  it('sends digits-only square_footage and year_built', () => {
    const { c, payload } = setup();
    c.form.sqft = '1,800';
    c.form.year = '1998';
    expect(payload().square_footage).toBe('1800');
    expect(payload().year_built).toBe('1998');
    c.form.sqft = '';
    c.form.year = '';
    expect('square_footage' in payload()).toBe(false);
    expect('year_built' in payload()).toBe(false);
  });

  it('joins bundle_option with comma + space and omits it when none ticked', () => {
    const { c, payload } = setup();
    expect('bundle_option' in payload()).toBe(false);
    c.form.also['umbrella'] = true;
    c.form.also['auto'] = true;
    expect(payload().bundle_option).toBe('Auto, Umbrella');
    c.form.also['life'] = true;
    expect(payload().bundle_option).toBe('Auto, Life, Umbrella');
  });

  it('maps language, contact method, best time and omits a blank email', () => {
    const { c, payload } = setup();
    c.form.pick['lang'] = 'hi';
    c.form.pick['method'] = 'text';
    c.form.pick['time'] = 'evening';
    let p = payload();
    expect(p.preferred_language).toBe('Hindi');
    expect(p.contact_method).toBe('Text');
    expect(p.best_time_to_connect).toBe('Evening (4 PM–7 PM)');
    expect('email_address' in p).toBe(false);
    c.form.pick['method'] = 'email';
    c.form.pick['time'] = 'morning';
    c.form.email = ' test@example.com ';
    p = payload();
    expect(p.contact_method).toBe('Email');
    expect(p.best_time_to_connect).toBe('Morning (9 AM–12 PM)');
    expect(p.email_address).toBe('test@example.com');
    c.form.pick['method'] = 'call';
    c.form.pick['time'] = 'afternoon';
    p = payload();
    expect(p.contact_method).toBe('Call');
    expect(p.best_time_to_connect).toBe('Afternoon (12 PM–4 PM)');
  });

  it('sends preferred_office as "street, city" and omits it for no preference', () => {
    const { c, payload } = setup();
    expect('preferred_office' in payload()).toBe(false);
    c.form.office = OFFICES[1].id;
    expect(payload().preferred_office).toBe(`${OFFICES[1].street}, ${OFFICES[1].city}`);
  });

  it('adds lead_tags for rental, mobile and buying, in that order', () => {
    const { c, payload } = setup();
    expect('lead_tags' in payload()).toBe(false);
    c.form.pick['status'] = 'buying';
    expect(payload().lead_tags).toBe('buying');
    c.form.pick['usage'] = 'rental';
    c.form.pick['ptype'] = 'mobile';
    expect(payload().lead_tags).toBe('rental,mobile,buying');
    c.form.pick['usage'] = 'primary';
    c.form.pick['ptype'] = 'condo';
    c.form.pick['status'] = 'owner';
    expect('lead_tags' in payload()).toBe(false);
  });

  it('never sends empty strings or nulls', () => {
    const { c, payload } = setup();
    c.form.pick['status'] = 'buying';
    c.form.pick['dogs'] = 'yes';
    c.form.pick['insured'] = 'yes';
    for (const value of Object.values(payload())) {
      expect(value === '' || value === null || value === undefined).toBe(false);
    }
  });
});

describe('GetHomeQuote step validation', () => {
  it('step 1 requires an address that ends with a 5-digit ZIP', () => {
    const { c, validate } = setup();
    c.form.address = '';
    expect(validate(1)).toEqual(['hq-addr']);
    c.form.address = '123 Test St, Houston, TX';
    expect(validate(1)).toEqual(['hq-addr']);
    c.form.address = '123 Test St, Houston, TX 7700';
    expect(validate(1)).toEqual(['hq-addr']);
    c.form.address = '123 Test St, Houston, TX 77001';
    expect(validate(1)).toEqual([]);
  });

  it('step 1 rejects a closing date in the past, but only when buying', () => {
    const { c, validate } = setup();
    c.form.close = '2000-01-01';
    c.form.pick['status'] = 'owner';
    expect(validate(1)).toEqual([]);
    c.form.pick['status'] = 'buying';
    expect(validate(1)).toEqual(['hq-close']);
    c.form.close = '2999-01-01';
    expect(validate(1)).toEqual([]);
    c.form.close = '';
    expect(validate(1)).toEqual([]);
  });

  it('step 2 accepts a blank year and square footage', () => {
    const { validate } = setup();
    expect(validate(2)).toEqual([]);
  });

  it('step 2 checks the year range 1800..next year', () => {
    const { c, validate } = setup();
    const nextYear = new Date().getFullYear() + 1;
    for (const bad of ['1799', '999', String(nextYear + 1)]) {
      c.form.year = bad;
      expect(validate(2)).toEqual(['hq-year']);
    }
    for (const ok of ['1800', '1998', String(nextYear)]) {
      c.form.year = ok;
      expect(validate(2)).toEqual([]);
    }
  });

  it('step 2 checks the square footage range 200..20,000', () => {
    const { c, validate } = setup();
    for (const bad of ['199', '20,001']) {
      c.form.sqft = bad;
      expect(validate(2)).toEqual(['hq-sqft']);
    }
    for (const ok of ['200', '1,800', '20,000']) {
      c.form.sqft = ok;
      expect(validate(2)).toEqual([]);
    }
  });

  it('step 5 requires a name of at least 2 characters and a 10-digit phone', () => {
    const { c, validate } = setup();
    c.form.name = ' A ';
    c.form.phone = '555';
    expect(validate(5)).toEqual(['hq-name', 'hq-phone']);
    c.form.name = 'Al';
    c.form.phone = '(555) 010-0100';
    expect(validate(5)).toEqual([]);
    c.form.phone = '1 (555) 010-0100';
    expect(validate(5)).toEqual([]);
  });

  it('step 5 treats the email as optional, but validates it when given', () => {
    const { c, validate } = setup();
    c.form.email = '';
    expect(validate(5)).toEqual([]);
    c.form.email = 'not-an-email';
    expect(validate(5)).toEqual(['hq-email']);
    c.form.email = 'test@example.com';
    expect(validate(5)).toEqual([]);
  });

  it('step 5 requires an email when the contact method is Email', () => {
    const { c, validate } = setup();
    c.form.pick['method'] = 'email';
    c.form.email = '';
    expect(validate(5)).toEqual(['hq-email']);
    c.form.email = 'test@example.com';
    expect(validate(5)).toEqual([]);
  });
});

describe('GetHomeQuote inputs and navigation', () => {
  it('formats the phone as (xxx) xxx-xxxx and caps it at 10 digits', () => {
    const { c, inputEvent } = setup();
    c.onPhoneInput(inputEvent('5550100123999'));
    expect(c.form.phone).toBe('(555) 010-0123');
  });

  it('formats the square footage with commas and keeps year to 4 digits', () => {
    const { c, inputEvent } = setup();
    c.onSqftInput(inputEvent('1800'));
    expect(c.form.sqft).toBe('1,800');
    c.onYearInput(inputEvent('19a98'));
    expect(c.form.year).toBe('1998');
  });

  it('Enter on an input advances the step, and stays put on invalid input', () => {
    const { c } = setup();
    const input = document.createElement('input');
    const event = { target: input, preventDefault: vi.fn() } as any as Event;
    c.form.address = '';
    c.onEnter(event);
    expect(c.step).toBe(1);
    c.form.address = '123 Test St, Houston, TX 77001';
    c.onEnter(event);
    expect(c.step).toBe(2);
  });

  it('Enter on the review step does not move anywhere', () => {
    const { c } = setup();
    c.step = 6;
    const event = { target: document.createElement('input'), preventDefault: vi.fn() } as any as Event;
    c.onEnter(event);
    expect(c.step).toBe(6);
  });

  it('Edit from the review step sets editing; Back to review returns to step 6', () => {
    const { c } = setup();
    c.step = 6;
    c.edit(2);
    expect(c.step).toBe(2);
    expect(c.editing).toBe(true);
    c.backToReview();
    expect(c.step).toBe(6);
    expect(c.editing).toBe(false);
  });

  it('Back to review jumps to the first invalid step', () => {
    const { c } = setup();
    c.edit(2);
    c.form.name = '';
    c.backToReview();
    expect(c.step).toBe(5);
  });
});

describe('GetHomeQuote submit', () => {
  const evt = { preventDefault: () => {} } as Event;

  it('posts to /quotes/create and resets the form on success', async () => {
    const { c, post } = setup();
    c.step = 6;
    c.form.pick['status'] = 'buying';
    await c.submit(evt);
    expect(post).toHaveBeenCalledTimes(1);
    const args = post.mock.calls[0] as unknown[];
    expect(args[0]).toBe('/quotes/create');
    expect(args[2]).toBe(true);
    expect(c.sent).toBe(true);
    expect(c.sentBuying).toBe(true);
    expect(c.form.name).toBe('');
    expect(c.form.address).toBe('');
  });

  it('does not post before the review step', async () => {
    const { c, post } = setup();
    c.step = 3;
    await c.submit(evt);
    expect(post).not.toHaveBeenCalled();
  });

  it('does not post when an earlier step is invalid, and jumps to it', async () => {
    const { c, post } = setup();
    c.step = 6;
    c.form.address = '';
    await c.submit(evt);
    expect(post).not.toHaveBeenCalled();
    expect(c.step).toBe(1);
  });

  it('ignores a second submit while the first is in flight', async () => {
    const { c, post } = setup();
    const pending = new Subject<object>();
    post.mockReturnValueOnce(pending as any);
    c.step = 6;
    const first = c.submit(evt);
    await c.submit(evt);
    expect(post).toHaveBeenCalledTimes(1);
    pending.next({});
    pending.complete();
    await first;
    expect(c.isSubmitting).toBe(false);
  });

  it('keeps the answers and shows a message when the request fails', async () => {
    const { c, post } = setup();
    post.mockImplementationOnce(() => { throw new Error('network'); });
    c.step = 6;
    await c.submit(evt);
    expect(c.sent).toBe(false);
    expect(c.submitError).toBe('HOME_QUOTE_PAGE.FORM.ERR.SUBMIT');
    expect(c.form.name).toBe(' Test User ');
    expect(c.isSubmitting).toBe(false);
  });
});
