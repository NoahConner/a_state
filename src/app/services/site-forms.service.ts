import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageSource } from './page-source';

/**
 * Sends the Contact Us and Careers forms to the API.
 *
 *   POST /contact   JSON        -> ContactController@store (saves + emails the office)
 *   POST /careers   multipart   -> CareerController@store  (saves, stores the resume privately, emails it)
 *
 * The pages pass their raw form values (option keys like 'call' or 'es'); this service turns them into the
 * English values the API accepts, so both languages send the same data. The API rejects any other value.
 * Errors are not handled here: the page shows its own translated message and keeps the answers.
 */

// ---------- Contact Us ----------

export interface ContactFormValues {
  name: string; phone: string; email: string;
  method: string; type: string; lang: string; time: string; message: string;
}

const CONTACT_METHOD: Record<string, string> = { call: 'Call', text: 'Text', email: 'Email' };
const CONTACT_TYPE: Record<string, string> = {
  auto: 'Auto', home: 'Homeowners', commercial: 'Commercial', life: 'Life', health: 'Health', bond: 'Surety Bond', other: 'Other',
};
const CONTACT_LANG: Record<string, string> = { en: 'English', es: 'Spanish', hi: 'Hindi' };
const CONTACT_TIME: Record<string, string> = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };

// ---------- Careers ----------

export interface CareersFormValues {
  name: string; phone: string; email: string;
  langs: string[]; area: string; office: string;
}

const CAREERS_LANG: Record<string, string> = { en: 'English', es: 'Spanish', hi: 'Hindi', other: 'Other' };
const CAREERS_AREA: Record<string, string> = {
  sales: 'Sales', 'customer-service': 'Customer Service', commercial: 'Commercial', 'life-health': 'Life & Health', other: 'Other',
};
const CAREERS_OFFICE: Record<string, string> = {
  any: 'No preference', shotwell: 'Shotwell', 'southwest-fwy': 'Southwest Fwy',
  'post-oak': 'Post Oak', antoine: 'Antoine', airline: 'Airline',
};

@Injectable({ providedIn: 'root' })
export class SiteFormsService {
  constructor(
    private http: HttpClient,
    private pageSource: PageSource,
  ) {}

  /** Sends the Contact Us form. Throws when the API rejects it or can't be reached. */
  async submitContact(form: ContactFormValues): Promise<void> {
    const body: Record<string, string> = {
      full_name: form.name.trim(),
      phone_number: form.phone,
      contact_method: CONTACT_METHOD[form.method],
      insurance_type: CONTACT_TYPE[form.type],
      preferred_language: CONTACT_LANG[form.lang],
      ...this.pageSource.getSourceFields(),
    };
    // Optional answers are left out when empty.
    if (form.email.trim()) body['email_address'] = form.email.trim();
    if (CONTACT_TIME[form.time]) body['best_time_to_reach'] = CONTACT_TIME[form.time];
    if (form.message.trim()) body['message'] = form.message.trim();

    await firstValueFrom(this.http.post(`${environment.baseUrl}/contact`, body));
  }

  /** Sends a job application with its resume. Throws when the API rejects it or can't be reached. */
  async submitCareer(form: CareersFormValues, resume: File): Promise<void> {
    // Multipart, because of the file. The browser sets the Content-Type with the boundary itself.
    const data = new FormData();
    data.append('full_name', form.name.trim());
    data.append('phone_number', form.phone);
    data.append('email_address', form.email.trim());
    form.langs.forEach((lang) => data.append('languages[]', CAREERS_LANG[lang]));
    data.append('area', CAREERS_AREA[form.area]);
    data.append('preferred_office', CAREERS_OFFICE[form.office]);
    data.append('resume', resume, resume.name);
    const source = this.pageSource.getSourceFields();
    data.append('source_page', source.source_page);
    data.append('source_url', source.source_url);

    await firstValueFrom(this.http.post(`${environment.baseUrl}/careers`, data));
  }
}
