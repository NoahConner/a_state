import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-home-quote',
  standalone: false,
  templateUrl: './get-home-quote.html',
  styleUrl: './get-home-quote.scss',
})
export class GetHomeQuote {

  homeQuoteForm!: FormGroup;
  bundleOptions: string[] = [];
  insuredOptions: string[] = [];
  reachOption: string[] = [];

  timeOptions: string[] = [];

  currentStep = 1;
  totalSteps = 5;
  loading = false;
  submitted = false;
  termsAccepted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.homeQuoteForm = this.fb.group({
      type: ['home'],
      property_address: ['', Validators.required],
      is_primary_residence: ['', Validators.required],
      property_type: ['', Validators.required],
      ownership_status: ['', Validators.required],
      year_built: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      square_footage: ['', Validators.required],
      number_of_stories: ['', Validators.required],
      roof_age: ['', Validators.required],
      roof_type: ['', Validators.required],
      construction_type: ['', Validators.required],
      has_alarm_system: ['', Validators.required],
      has_swimming_pool: ['', Validators.required],
      has_pets: ['', Validators.required],
      has_trampoline: ['', Validators.required],
      recent_claims: ['', Validators.required],
      current_insurance_status: ['', Validators.required],
      current_carrier: [''],
      renewal_date: [''],
      needs_flood_insurance: ['', Validators.required],
      bundle_option: ['', Validators.required],
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      preferred_language: ['', Validators.required],
      contact_method: ['', Validators.required],
      best_time_to_connect: ['', Validators.required]
    });

    this.translate
      .get('GET_HOME_QUOTE.STEPPER.STEP4.BUNDLE_OPTIONS')
      .subscribe((res: string[]) => {
        this.bundleOptions = res;
      });

    this.translate
      .get('GET_HOME_QUOTE.STEPPER.STEP4.INSURED_OPTIONS')
      .subscribe((res: string[]) => {
        this.insuredOptions = res;
      });

    this.homeQuoteForm.get('current_insurance_status')!.valueChanges.subscribe(() => {
      const carrier = this.homeQuoteForm.get('current_carrier')!;
      const renewal = this.homeQuoteForm.get('renewal_date')!;
      if (this.isCurrentlyInsured) {
        carrier.setValidators(Validators.required);
        renewal.setValidators(Validators.required);
      } else {
        carrier.clearValidators();
        renewal.clearValidators();
        carrier.reset('');
        renewal.reset('');
      }
      carrier.updateValueAndValidity();
      renewal.updateValueAndValidity();
    });

    this.translate
      .get('GET_HOME_QUOTE.STEPPER.STEP5.CONTACT_OPTIONS')
      .subscribe((res: string[]) => {
        this.reachOption = res;
      });

    this.translate
      .get('GET_HOME_QUOTE.STEPPER.STEP5.TIME_OPTIONS')
      .subscribe((res: string[]) => {
        this.timeOptions = res;
      });

    this.applyPrefillFromQueryParams();
  }

  get isCurrentlyInsured(): boolean {
    const value = this.homeQuoteForm?.get('current_insurance_status')?.value;
    return !!value && value === this.insuredOptions[0];
  }

  private applyPrefillFromQueryParams() {
    const fullName = this.route.snapshot.queryParamMap.get('fullName')?.trim();
    const phone = this.route.snapshot.queryParamMap.get('phone')?.trim();

    this.homeQuoteForm.patchValue({
      full_name: fullName || '',
      phone_number: phone || '',
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
      this.currentStep = this.totalSteps + 1;
      setTimeout(() => {
        document.querySelector('.quote-summary-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
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
    setTimeout(() => {
      document.querySelector('.quote-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  canEditStep(step: number): boolean {
    return this.getControlsForStep(step).every((control) => control.valid);
  }

  private validateStep(step: number): boolean {
    const controls = this.getControlsForStep(step);
    controls.forEach((control) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
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
          this.homeQuoteForm.get('property_address')!,
          this.homeQuoteForm.get('is_primary_residence')!,
          this.homeQuoteForm.get('property_type')!,
          this.homeQuoteForm.get('ownership_status')!,
        ];
      case 2:
        return [
          this.homeQuoteForm.get('year_built')!,
          this.homeQuoteForm.get('square_footage')!,
          this.homeQuoteForm.get('number_of_stories')!,
          this.homeQuoteForm.get('roof_age')!,
          this.homeQuoteForm.get('roof_type')!,
          this.homeQuoteForm.get('construction_type')!,
        ];
      case 3:
        return [
          this.homeQuoteForm.get('has_alarm_system')!,
          this.homeQuoteForm.get('has_swimming_pool')!,
          this.homeQuoteForm.get('has_pets')!,
          this.homeQuoteForm.get('has_trampoline')!,
          this.homeQuoteForm.get('recent_claims')!,
        ];
      case 4:
        return [
          this.homeQuoteForm.get('current_insurance_status')!,
          this.homeQuoteForm.get('current_carrier')!,
          this.homeQuoteForm.get('renewal_date')!,
          this.homeQuoteForm.get('needs_flood_insurance')!,
          this.homeQuoteForm.get('bundle_option')!,
        ];
      case 5:
        return [
          this.homeQuoteForm.get('full_name')!,
          this.homeQuoteForm.get('email_address')!,
          this.homeQuoteForm.get('phone_number')!,
          this.homeQuoteForm.get('preferred_language')!,
          this.homeQuoteForm.get('contact_method')!,
          this.homeQuoteForm.get('best_time_to_connect')!,
        ];
      default:
        return [];
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  async sendHomeQuote() {
    this.markFormGroupTouched(this.homeQuoteForm);

    if (this.homeQuoteForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const body = this.homeQuoteForm.getRawValue();
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
    this.homeQuoteForm.reset();
    this.homeQuoteForm.patchValue({ type: 'home' });
    this.currentStep = 1;
    this.submitted = false;
    this.termsAccepted = false;

  }
}
