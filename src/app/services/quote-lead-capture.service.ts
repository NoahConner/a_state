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
};

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

  private async showWarning(message: string) {
    await Swal.fire({
      icon: 'warning',
      title: 'Missing details',
      text: message,
      confirmButtonColor: '#ca2b28',
    });
  }
}
