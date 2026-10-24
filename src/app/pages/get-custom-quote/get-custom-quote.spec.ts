import { EMPTY, of } from 'rxjs';
import { GetCustomQuote } from './get-custom-quote';
import { OFFICES } from '../../components/header/header';

/** Builds the component with hand-written fakes (no template, no network). */
function setup(lang = 'en') {
  const post = vi.fn(() => of({}));
  const translate = { onLangChange: EMPTY, instant: (k: string) => k };
  const c = new GetCustomQuote(
    { getCurrentLanguage: () => lang } as any,
    translate as any,
    { post } as any,
    { getSourceFields: () => ({ source_page: 'Custom Quote', source_url: '/' }) } as any,
    { detectChanges: () => {} } as any,
    { nativeElement: document.createElement('div') } as any,
    'browser' as any,
    document,
  );
  c.form.name = ' Test User ';
  c.form.phone = '(555) 010-0100';
  c.form.zip = '77001';
  const payload = () => (c as any).buildPayload() as Record<string, unknown>;
  return { c, post, payload };
}

describe('GetCustomQuote payload', () => {
  it('sends zip, flags and omits unanswered optional keys', () => {
    const { c, payload } = setup();
    c.form.cov['auto'] = true;
    const p = payload();
    expect(p['zip_code']).toBe('77001');
    expect(p['name']).toBe('Test User');
    expect(p['coverage_auto']).toBe(1);
    expect(p['coverage_health']).toBe(0);
    expect(p['coverage_unsure']).toBe(0);
    expect(p['preferred_language']).toBe('English');
    for (const k of ['coverage_unsure_details', 'coverage_other_details', 'looking_for', 'renewal_date', 'preferred_office', 'email', 'currently_insured']) {
      expect(k in p).toBe(false);
    }
  });

  it('Health-only sets coverage_health 1 and the other flags 0', () => {
    const { c, payload } = setup();
    c.form.cov['health'] = true;
    const p = payload();
    expect(p['coverage_health']).toBe(1);
    expect(p['coverage_auto']).toBe(0);
    expect(p['coverage_home']).toBe(0);
    expect(p['coverage_commercial']).toBe(0);
  });

  it('sends unsure details only when unsure is checked and non-empty', () => {
    const { c, payload } = setup();
    c.form.unsure = '  need help  ';
    expect('coverage_unsure_details' in payload()).toBe(false);
    c.form.cov['unsure'] = true;
    expect(payload()['coverage_unsure']).toBe(1);
    expect(payload()['coverage_unsure_details']).toBe('need help');
    c.form.unsure = '   ';
    expect('coverage_unsure_details' in payload()).toBe(false);
  });

  it('maps the goal to English text', () => {
    const { c, payload } = setup();
    const map: Record<string, string> = { new: 'New coverage', compare: 'Compare current policy', unsure: 'Not sure yet' };
    for (const [id, text] of Object.entries(map)) {
      c.form.goal = id;
      expect(payload()['looking_for']).toBe(text);
    }
  });

  it('sends renewal_date only when insured and a valid yyyy-mm-dd', () => {
    const { c, payload } = setup();
    c.form.renewal = '2026-12-31';
    c.form.insured = 'no';
    expect('renewal_date' in payload()).toBe(false);
    c.form.insured = 'yes';
    expect(payload()['renewal_date']).toBe('2026-12-31');
    c.form.renewal = '12/31/2026';
    expect('renewal_date' in payload()).toBe(false);
  });

  it('sends preferred_office as "street, city" when chosen', () => {
    const { c, payload } = setup();
    const o = OFFICES[0];
    c.form.office = o.id;
    expect(payload()['preferred_office']).toBe(`${o.street}, ${o.city}`);
  });

  it('sends the language name in English', () => {
    const { c, payload } = setup();
    c.form.lang = 'es';
    expect(payload()['preferred_language']).toBe('Spanish');
    c.form.lang = 'hi';
    expect(payload()['preferred_language']).toBe('Hindi');
  });

  it('submit posts the payload to /quotes/create (fake HttpService)', async () => {
    const { c, post } = setup();
    c.form.cov['auto'] = true;
    c.step = 5;
    await c.submit({ preventDefault: () => {} } as Event);
    expect(post).toHaveBeenCalledTimes(1);
    expect((post.mock.calls[0] as any[])[0]).toBe('/quotes/create');
  });
});
