import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-surety-quote',
  standalone: false,
  templateUrl: './get-surety-quote.html',
  styleUrl: './get-surety-quote.scss',
})
export class GetSuretyQuote {
  suretyQuoteForm!: FormGroup;

  contactOptions: string[] = [];
  timeOptions: string[] = [];

  currentStep = 1;
  totalSteps = 4;
  loading = false;
  submitted = false;
  termsAccepted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.suretyQuoteForm = this.fb.group({
      type: ['surety_bond'],
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      bond_type: ['', Validators.required],
      bond_amount: ['', Validators.required],
      obligee_name: ['', Validators.required],
      estimated_credit_score: ['', Validators.required],
      years_in_business: ['', Validators.required],
      preferred_language: ['', Validators.required],
      best_time_to_call: ['', Validators.required],
    });

    this.translate
      .get('GET_AUTO_QUOTE.STEPPER.STEP5.CONTACT_OPTIONS')
      .subscribe((res: string[]) => {
        this.contactOptions = res;
      });

    this.translate
      .get('GET_AUTO_QUOTE.STEPPER.STEP5.TIME_OPTIONS')
      .subscribe((res: string[]) => {
        this.timeOptions = res;
      });
  }

  nextStep() {
    if (!this.validateStep(this.currentStep)) {
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else if (this.currentStep === this.totalSteps) {
      this.submitted = true;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    if (step < 1 || step > this.totalSteps) {
      return;
    }
    this.currentStep = step;
  }

  private validateStep(step: number): boolean {
    const controls = this.getControlsForStep(step);
    controls.forEach((control) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });

    return controls.every((control) => {
      if (control instanceof FormControl) {
        return control.valid;
      }
      return control.valid;
    });
  }

  private getControlsForStep(step: number) {
    switch (step) {
      case 1:
        return [
          this.suretyQuoteForm.get('full_name')!,
          this.suretyQuoteForm.get('email_address')!,
          this.suretyQuoteForm.get('phone_number')!,
        ];
      case 2:
        return [
          this.suretyQuoteForm.get('bond_type')!,
          this.suretyQuoteForm.get('bond_amount')!,
          this.suretyQuoteForm.get('obligee_name')!,
        ];
      case 3:
        return [
          this.suretyQuoteForm.get('estimated_credit_score')!,
          this.suretyQuoteForm.get('years_in_business')!,
        ];
      case 4:
        return [
          this.suretyQuoteForm.get('preferred_language')!,
          this.suretyQuoteForm.get('best_time_to_call')!,
        ];
      default:
        return [];
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  async sendSuretyQuote() {
    this.markFormGroupTouched(this.suretyQuoteForm);

    if (this.suretyQuoteForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const body = this.suretyQuoteForm.getRawValue();
      const res: any = await this.http
        .post('/quotes/create', body, true)
        .toPromise();
      this.resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  private resetForm() {
    this.suretyQuoteForm.reset();
    this.suretyQuoteForm.patchValue({ type: 'surety' });
    this.currentStep = 1;
    this.submitted = false;
    this.termsAccepted = false;

  }
}