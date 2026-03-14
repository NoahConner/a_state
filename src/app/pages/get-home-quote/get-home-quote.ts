import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
  reachOption: string[] = [];

  timeOptions: string[] = [];

  currentStep = 1;
  totalSteps = 6;
  loading = false;
  submitted = false;
  termsAccepted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.homeQuoteForm = this.fb.group({
      type: ['home'],
      property_address: ['', Validators.required],
      is_primary_residence: ['', Validators.required],
      property_type: ['', Validators.required],
      year_built: ['', Validators.required],
      square_footage: ['', Validators.required],
      number_of_stories: ['', Validators.required],
      roof_age: ['', Validators.required],
      has_alarm_system: ['', Validators.required],
      has_swimming_pool: ['', Validators.required],
      has_pets: ['', Validators.required],
      current_insurance_status: ['', Validators.required],
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
      .get('GET_HOME_QUOTE.STEPPER.STEP5.CONTACT_OPTIONS')
      .subscribe((res: string[]) => {
        this.reachOption = res;
      });

    this.translate
      .get('GET_HOME_QUOTE.STEPPER.STEP5.TIME_OPTIONS')
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
        ];
      case 2:
        return [
          this.homeQuoteForm.get('year_built')!,
          this.homeQuoteForm.get('square_footage')!,
          this.homeQuoteForm.get('number_of_stories')!,
          this.homeQuoteForm.get('roof_age')!,
        ];
      case 3:
        return [
          this.homeQuoteForm.get('has_alarm_system')!,
          this.homeQuoteForm.get('has_swimming_pool')!,
          this.homeQuoteForm.get('has_pets')!,
        ];
      case 4:
        return [
          this.homeQuoteForm.get('current_insurance_status')!,
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