import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-custom-quote',
  standalone: false,
  templateUrl: './get-custom-quote.html',
  styleUrl: './get-custom-quote.scss',
})
export class GetCustomQuote {
  customQuoteForm!: FormGroup;

  coverageOptions: string[] = [];
  contactOptions: string[] = [];
  reachOptions: string[] = [];

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
    this.customQuoteForm = this.fb.group({
      type: ['custom'],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      preferred_language: ['', Validators.required],
      full_address: ['', Validators.required],

      coverage_auto: [0],
      coverage_home: [0],
      coverage_commercial: [0],
      coverage_life: [0],
      coverage_travel: [0],
      coverage_super_bonds: [0],
      coverage_bundle_save: [0],
      coverage_other_details: [''],

      currently_insured: ['', Validators.required],
      current_insurance_provider: ['', Validators.required],

      preferred_contact_method: ['', Validators.required],
      best_time_to_reach: ['', Validators.required],
    });

    this.translate.get('GET_CUSTOM_QUOTE.STEPPER.STEP4.OPTIONS')
      .subscribe((res: string[]) => {
        this.contactOptions = res;
      });

    this.translate.get('GET_CUSTOM_QUOTE.STEPPER.STEP4.TIME_OPTIONS')
      .subscribe((res: string[]) => {
        this.reachOptions = res;
      });

    this.translate.get('GET_CUSTOM_QUOTE.STEPPER.STEP2.OPTIONS')
      .subscribe((res: string[]) => {
        this.coverageOptions = res;
      });
  }

  onCheckboxChange(e: any, controlName: string) {
    if (e.target.checked) {
      this.customQuoteForm.get(controlName)?.setValue(1);
    } else {
      this.customQuoteForm.get(controlName)?.setValue(0);
    }
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
          this.customQuoteForm.get('name')!,
          this.customQuoteForm.get('phone_number')!,
          this.customQuoteForm.get('email')!,
          this.customQuoteForm.get('preferred_language')!,
          this.customQuoteForm.get('full_address')!,
        ];
      case 2:
        return [
          this.customQuoteForm.get('coverage_other_details')!
        ];
      case 3:
        return [
          this.customQuoteForm.get('currently_insured')!,
          this.customQuoteForm.get('current_insurance_provider')!,
        ];
      case 4:
        return [
          this.customQuoteForm.get('preferred_contact_method')!,
          this.customQuoteForm.get('best_time_to_reach')!,
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

  async sendCustomQuote() {
    this.markFormGroupTouched(this.customQuoteForm);

    if (this.customQuoteForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const body = this.customQuoteForm.getRawValue();
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
    this.customQuoteForm.reset({
      type: 'custom',
      coverage_auto: 0,
      coverage_home: 0,
      coverage_commercial: 0,
      coverage_life: 0,
      coverage_travel: 0,
      coverage_super_bonds: 0,
      coverage_bundle_save: 0,
    });
    this.currentStep = 1;
    this.submitted = false;
    this.termsAccepted = false;

  }
}