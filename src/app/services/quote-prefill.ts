/**
 * Hands the details typed into a short quote form (name, phone, and email where the form asks for it)
 * to the detailed quote page the visitor is sent to next, so they don't have to type them again.
 *
 * Kept in sessionStorage (this tab only, gone when it closes) for 30 minutes. Never logged or sent anywhere.
 * Browser only: on the server both functions do nothing.
 */
const KEY = 'as-quote-prefill';
const TTL_MS = 30 * 60 * 1000;

export interface QuotePrefill {
  name?: string;
  /** Formatted as (713) 555-0123 */
  phone?: string;
  email?: string;
}

/** Called after a short form was sent successfully. */
export function saveQuotePrefill(details: { name?: string; phone?: string; email?: string }): void {
  if (typeof window === 'undefined') return;
  const data: QuotePrefill & { at: number } = { at: Date.now() };
  const name = details.name?.trim();
  const phone = formatPhone(details.phone ?? '');
  const email = details.email?.trim();
  if (name) data.name = name;
  if (phone) data.phone = phone;
  if (email) data.email = email;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage blocked: the quote page just starts empty */
  }
}

/** The saved details, or null when there are none or they are older than 30 minutes. */
export function readQuotePrefill(): QuotePrefill | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const { at, name, phone, email } = JSON.parse(raw);
    if (typeof at !== 'number' || Date.now() - at > TTL_MS) {
      sessionStorage.removeItem(KEY);
      return null;
    }
    return {
      name: typeof name === 'string' ? name : undefined,
      phone: typeof phone === 'string' ? phone : undefined,
      email: typeof email === 'string' ? email : undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Fills the empty name/phone/email fields of a quote form from the saved short form details.
 * Fields the visitor already has a value in are left alone.
 */
export function applyQuotePrefill(form: { name: string; phone: string; email: string }): void {
  const p = readQuotePrefill();
  if (!p) return;
  if (p.name && !form.name) form.name = p.name;
  if (p.phone && !form.phone) form.phone = p.phone;
  if (p.email && !form.email) form.email = p.email;
}

function formatPhone(value: string): string {
  const d = value.replace(/\D/g, '').replace(/^1(?=\d{10})/, '').slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d;
}
