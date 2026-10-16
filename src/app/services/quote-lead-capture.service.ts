import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { PageSource } from './page-source';

type QuoteLeadPayload = {
  selected_chip: string;
  full_name: string;
  phone_number: string;
  /** Sent only by forms that ask for them (the Our Locations and office page quote forms). */
  email?: string;
  preferred_office?: string;
  preferred_language?: string;
  best_time?: string;
  contact_method?: string;
};

const OPTIONAL_FIELDS = ['email', 'preferred_office', 'preferred_language', 'best_time', 'contact_method'] as const;

@Injectable({
  providedIn: 'root',
})
export class QuoteLeadCaptureService {
  // Assumption: the backend shortForm action is exposed at this route.
  private readonly endpoint = '/quotes/short-form';

  constructor(
    private http: HttpClient,
    private pageSource: PageSource,
  ) {}

  async submitLead(payload: QuoteLeadPayload) {
    const selectedChip = payload.selected_chip.trim();
    const fullName = payload.full_name.trim();
    const phoneNumber = payload.phone_number.trim();

    if (!selectedChip) {
      await this.showWarning('Please select a chip first.');
      return false;
    }

    if (!fullName || !phoneNumber) {
      await this.showWarning('Please enter your name and phone number.');
      return false;
    }

    await firstValueFrom(
      this.http.post(`${environment.baseUrl}${this.endpoint}`, {
        selected_chip: selectedChip,
        full_name: fullName,
        phone_number: phoneNumber,
        ...this.optionalFields(payload),
        ...this.pageSource.getSourceFields(),
      }),
    );

    await Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Quote sent successfully',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    });

    return true;
  }

  /** The optional fields that have a value; empty ones are left out of the request. */
  private optionalFields(payload: QuoteLeadPayload): Partial<QuoteLeadPayload> {
    const out: Partial<QuoteLeadPayload> = {};
    for (const key of OPTIONAL_FIELDS) {
      const value = payload[key]?.trim();
      if (value) out[key] = value;
    }
    return out;
  }

  private async showWarning(message: string) {
    await Swal.fire({
      icon: 'warning',
      title: 'Missing details',
      text: message,
      confirmButtonColor: '#ca2b28',
    });
  }
}
