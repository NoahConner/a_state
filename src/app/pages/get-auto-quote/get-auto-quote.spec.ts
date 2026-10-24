import { EMPTY, of } from 'rxjs';
import { GetAutoQuote } from './get-auto-quote';
import { OFFICES } from '../../components/header/header';

/** Builds the component with hand-written fakes (no template, no network). */
function setup() {
  const post = vi.fn(() => of({}));
  const translate = { onLangChange: EMPTY, instant: (k: string) => k };
  const c = new GetAutoQuote(
    { getCurrentLanguage: () => 'en' } as any,
    translate as any,
    { post } as any,
    { getSourceFields: () => ({ source_page: 'Auto Quote', source_url: '/' }) } as any,
    { snapshot: { queryParamMap: { get: () => null } } } as any,
    { detectChanges: () => {} } as any,
    { nativeElement: document.createElement('div') } as any,
    'browser' as any,
    document,
  );
  c.form.name = ' Test User ';
  c.form.phone = '(555) 010-0100';
  c.form.zip = '77001';
  const v = c.form.vehicles[0];
  v.year = '2020'; v.make = 'Toyota '; v.model = 'Camry';
  const d = c.form.drivers[0];
  d.name = 'Test User'; d.dob = '1990-01-01';
  const payload = () => (c as any).buildPayload() as any;
  return { c, post, payload, v, d };
}

describe('GetAutoQuote payload', () => {
  it('omits unanswered optional keys', () => {
    const { payload } = setup();
    const p = payload();
    for (const k of ['coverage_type', 'accidents', 'tickets', 'current_carrier', 'renewal_date', 'preferred_office', 'currently_issued']) {
      expect(k in p).toBe(false);
    }
    expect(p.vehicles[0]).toEqual({ year: '2020', make: 'Toyota', model: 'Camry' });
    expect(p.drivers[0]).toEqual({ full_name: 'Test User', date_of_birth: '1990-01-01' });
    expect(p.bundle).toBe('No, just Auto for now.');
  });

  it('adds vehicle vin, digits-only miles and garaging zip', () => {
    const { v, payload } = setup();
    v.vin = '1HGCM82633A004352';
    v.miles = '12,000';
    v.pzip = '77002';
    expect(payload().vehicles[0]).toMatchObject({ vin: '1HGCM82633A004352', annual_miles: '12000', garaging_zip: '77002' });
    v.pzip = '770';
    expect('garaging_zip' in payload().vehicles[0]).toBe(false);
  });

  it('sends "1989 or older" for the oldest year option', () => {
    const { v, payload } = setup();
    v.year = '1989';
    expect(payload().vehicles[0].year).toBe('1989 or older');
  });

  it('maps license type and age first licensed', () => {
    const { d, payload } = setup();
    const map: Record<string, string> = {
      texas: 'Texas', us: 'Other U.S. state', foreign: 'Foreign or international', none: 'No license yet',
    };
    d.age = '17';
    for (const [id, text] of Object.entries(map)) {
      d.license = id;
      expect(payload().drivers[0].license_type).toBe(text);
    }
    expect(payload().drivers[0].age_first_licensed).toBe('17');
  });

  it('maps coverage type, accidents and tickets', () => {
    const { c, payload } = setup();
    c.form.pick['coverage'] = 'minimum';
    c.form.pick['accidents'] = '2+';
    c.form.pick['tickets'] = 'unsure';
    let p = payload();
    expect(p.coverage_type).toBe('State minimum (liability only)');
    expect(p.accidents).toBe('2+');
    expect(p.tickets).toBe('Not sure');
    c.form.pick['coverage'] = 'full';
    c.form.pick['accidents'] = '0';
    c.form.pick['tickets'] = '1';
    p = payload();
    expect(p.coverage_type).toBe('Full coverage');
    expect(p.accidents).toBe('0');
    expect(p.tickets).toBe('1');
  });

  it('sends carrier and renewal_date only when insured', () => {
    const { c, payload } = setup();
    c.form.carrier = ' Acme ';
    c.form.renewal = '2026-12-31';
    c.form.pick['insured'] = 'no';
    let p = payload();
    expect('current_carrier' in p).toBe(false);
    expect('renewal_date' in p).toBe(false);
    c.form.pick['insured'] = 'yes';
    p = payload();
    expect(p.current_carrier).toBe('Acme');
    expect(p.renewal_date).toBe('2026-12-31');
  });

  it('sends preferred_office as "street, city"', () => {
    const { c, payload } = setup();
    c.form.office = OFFICES[1].id;
    expect(payload().preferred_office).toBe(`${OFFICES[1].street}, ${OFFICES[1].city}`);
  });

  it('Commercial-only sends the Commercial bundle text, not the none text', () => {
    const { c, payload } = setup();
    c.form.also['commercial'] = true;
    expect(payload().bundle).toBe('Yes! I want an Auto + Commercial bundle discount.');
  });

  it('joins several bundles', () => {
    const { c, payload } = setup();
    c.form.also['home'] = true;
    c.form.also['life'] = true;
    expect(payload().bundle).toBe('Yes! I want an Auto + Home bundle discount. Yes! I want an Auto + Life bundle discount.');
  });

  it('submit posts to /quotes/create (fake HttpService)', async () => {
    const { c, post } = setup();
    c.step = 6;
    await c.submit({ preventDefault: () => {} } as Event);
    expect(post).toHaveBeenCalledTimes(1);
    expect((post.mock.calls[0] as any[])[0]).toBe('/quotes/create');
  });
});
