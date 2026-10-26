import { EMPTY, of, throwError } from 'rxjs';
import { GetCommercialQuote } from './get-commercial-quote';
import { OFFICES } from '../../components/header/header';

/** Builds the component with hand-written fakes (no template, no network). Test data is obviously fake. */
function setup(lang = 'en', query: Record<string, string> = {}) {
  const post = vi.fn((..._args: unknown[]) => of({}));
  const translate = { onLangChange: EMPTY, instant: (k: string) => k };
  const route = { snapshot: { queryParamMap: { get: (k: string) => query[k] ?? null } } };
  const c = new GetCommercialQuote(
    { getCurrentLanguage: () => lang } as any,
    translate as any,
    { post } as any,
    { getSourceFields: () => ({ source_page: 'Commercial Quote', source_url: '/' }) } as any,
    route as any,
    { detectChanges: () => {} } as any,
    { nativeElement: document.createElement('div') } as any,
    'browser' as any,
    document,
  );
  Object.assign(c.form, {
    bizName: ' Test Co ', industry: 'retail', desc: ' Test shop ', zip: '77001', employees: '3',
    name: ' Test User ', phone: '(555) 010-0100',
  });
  c.form.coverage['gl'] = true;
  const payload = () => (c as any).buildPayload() as any;
  const validate = (n: number) => (c as any).validateStep(n) as string[];
  return { c, post, payload, validate };
}

describe('GetCommercialQuote payload', () => {
  it('sends only the required keys when nothing optional is answered', () => {
    expect(setup().payload()).toEqual({
      type: 'commercial',
      business_name: 'Test Co',
      industry_type: 'Retail',
      business_description: 'Test shop',
      business_zip_code: '77001',
      number_of_employees: '3',
      coverage_items: ['General Liability'],
      contact_name: 'Test User',
      phone_number: '(555) 010-0100',
      preferred_language: 'English',
      source_page: 'Commercial Quote',
      source_url: '/',
    });
  });

  it('defaults the preferred language to the page language', () => {
    expect(setup('es').payload().preferred_language).toBe('Spanish');
  });

  it('maps every chip answer to canonical English', () => {
    const { c, payload } = setup();
    Object.assign(c.form.pick, {
      structure: 'llc', outside: 'yes', years: '1-3', revenue: '500k-1m', vehicles: '11-plus', works: 'jobsites',
      insured: 'no', start: '30-days', coi: 'yes', claims: 'not-sure', role: 'owner', method: 'text', time: 'evening',
    });
    expect(payload()).toMatchObject({
      business_entity_type: 'LLC',
      works_outside_texas: 'Yes',
      years_in_business: '1–3 years',
      estimated_annual_revenue: '$500k–$1M',
      business_vehicles: '11+',
      business_location_type: 'Job sites or on the road',
      policy_status: 'No, I need new coverage',
      coverage_start: 'Within 30 days',
      needs_coi: 'Yes',
      recent_claims: 'Not sure',
      job_title: 'Owner',
      preferred_contact_method: 'Text',
      best_time_to_connect: 'Evening (4 PM–7 PM)',
      lead_tags: 'coi',
    });
  });

  it('sends payroll and bond details only when their boxes are ticked', () => {
    const { c, payload } = setup();
    c.form.payroll = '250,000';
    c.form.bondFor = ' license bond ';
    expect(payload().annual_payroll).toBeUndefined();
    expect(payload().bond_purpose).toBeUndefined();
    c.form.coverage['workers-comp'] = true;
    c.form.coverage['bond'] = true;
    const p = payload();
    expect(p.annual_payroll).toBe('250000');
    expect(p.bond_purpose).toBe('license bond');
    expect(p.coverage_items).toEqual(['General Liability', "Workers' Compensation", 'Surety bond (license, permit or contract bond)']);
    expect(p.lead_tags).toBe('bond');
  });

  it('sends the current company and expiration only for insured businesses', () => {
    const { c, payload } = setup();
    c.form.carrier = 'Test Carrier';
    c.form.expiration = '2030-01-15';
    c.form.pick['insured'] = 'no';
    expect(payload().current_carrier).toBeUndefined();
    c.form.pick['insured'] = 'yes';
    expect(payload()).toMatchObject({ current_carrier: 'Test Carrier', expiration_date: '2030-01-15' });
  });

  it('sends the office address and the email when given', () => {
    const { c, payload } = setup();
    c.form.office = OFFICES[0].id;
    c.form.email = ' test@example.com ';
    expect(payload()).toMatchObject({ preferred_office: `${OFFICES[0].street}, ${OFFICES[0].city}`, email_address: 'test@example.com' });
  });
});

describe('GetCommercialQuote validation', () => {
  it('requires business name, industry, description and a 5-digit ZIP', () => {
    const { c, validate } = setup();
    Object.assign(c.form, { bizName: '', industry: '', desc: '', zip: '7700' });
    expect(validate(1)).toEqual(['bq-name', 'bq-ind', 'bq-desc', 'bq-zip']);
  });

  it('requires at least one employee and at least one coverage', () => {
    const { c, validate } = setup();
    c.form.employees = '0';
    c.form.coverage = {};
    expect(validate(2)).toEqual(['bq-emp']);
    expect(validate(3)).toEqual(['bq-c-gl']);
  });

  it('rejects a start date in the past', () => {
    const { c, validate } = setup();
    c.form.startDate = '2000-01-01';
    expect(validate(3)).toEqual(['bq-sdate']);
  });

  it('needs an email only when the visitor chooses email', () => {
    const { c, validate } = setup();
    expect(validate(4)).toEqual([]);
    c.form.pick['method'] = 'email';
    expect(validate(4)).toEqual(['bq-email']);
  });
});

describe('GetCommercialQuote behaviour', () => {
  it('fills an empty business name when "Not formed yet" is chosen', () => {
    const { c } = setup();
    c.form.bizName = '';
    c.pick('structure', 'not-formed-yet');
    expect(c.form.bizName).toBe('COMMERCIAL_QUOTE_PAGE.FORM.NOT_FORMED');
  });

  it('prefills name and phone and flags group health from the query string', () => {
    const { c } = setup('en', { fullName: 'Test User', phone: '5550100100', coverage: 'group-health' });
    expect(c.form.phone).toBe('(555) 010-0100');
    expect(c.groupHealth).toBe(true);
    expect(c.covered('unsure')).toBe(true);
    expect(c.tags()).toEqual(['group-health']);
  });

  it('posts to /quotes/create and shows the success panel', async () => {
    const { c, post } = setup();
    c.step = 5;
    await c.submit(new Event('submit'));
    expect(post).toHaveBeenCalledWith('/quotes/create', expect.objectContaining({ type: 'commercial' }), true);
    expect(c.sent).toBe(true);
    expect(c.sentFirst).toBe('Test');
  });

  it('keeps the answers when the request fails', async () => {
    const { c, post } = setup();
    post.mockReturnValueOnce(throwError(() => new Error('fail')));
    c.step = 5;
    await c.submit(new Event('submit'));
    expect(c.sent).toBe(false);
    expect(c.form.bizName).toBe(' Test Co ');
    expect(c.submitError).toBe('COMMERCIAL_QUOTE_PAGE.FORM.ERR.SUBMIT');
  });
});
