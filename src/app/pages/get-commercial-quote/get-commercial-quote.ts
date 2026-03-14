import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-commercial-quote',
  standalone: false,
  templateUrl: './get-commercial-quote.html',
  styleUrl: './get-commercial-quote.scss',
})
export class GetCommercialQuote {
  commercialQuoteForm!: FormGroup;

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
    this.commercialQuoteForm = this.fb.group({
      type: ['commercial'],
      business_name: ['', Validators.required],
      industry_type: ['', Validators.required],
      business_zip_code: ['', Validators.required],
      years_in_business: ['', Validators.required],
      number_of_employees: ['', Validators.required],
      estimated_annual_revenue: ['', Validators.required],
      coverage_items: this.fb.array([], Validators.required),
      bundle_option: ['', Validators.required],
      contact_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      preferred_language: ['', Validators.required],
      best_time_to_connect: ['', Validators.required],
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

  onCheckboxChange(e: any, controlName: string) {
    const checkArray: FormArray = this.commercialQuoteForm.get(controlName) as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
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
      } else if (control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });

    return controls.every((control) => {
      if (control instanceof FormControl) {
        return control.valid;
      }
      if (control instanceof FormArray) {
        return control.length > 0;
      }
      return control.valid;
    });
  }

  private getControlsForStep(step: number) {
    switch (step) {
      case 1:
        return [
          this.commercialQuoteForm.get('business_name')!,
          this.commercialQuoteForm.get('industry_type')!,
          this.commercialQuoteForm.get('business_zip_code')!,
        ];
      case 2:
        return [
          this.commercialQuoteForm.get('years_in_business')!,
          this.commercialQuoteForm.get('number_of_employees')!,
          this.commercialQuoteForm.get('estimated_annual_revenue')!,
        ];
      case 3:
        return [
          this.commercialQuoteForm.get('coverage_items')!,
          this.commercialQuoteForm.get('bundle_option')!,
        ];
      case 4:
        return [
          this.commercialQuoteForm.get('contact_name')!,
          this.commercialQuoteForm.get('email_address')!,
          this.commercialQuoteForm.get('phone_number')!,
          this.commercialQuoteForm.get('preferred_language')!,
          this.commercialQuoteForm.get('best_time_to_connect')!,
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

  async sendCommercialQuote() {
    this.markFormGroupTouched(this.commercialQuoteForm);

    if (this.commercialQuoteForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const body = this.commercialQuoteForm.getRawValue();
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
    this.commercialQuoteForm.reset();
    this.commercialQuoteForm.patchValue({ type: 'commercial' });
    const coverageArray = this.commercialQuoteForm.get('coverage_items') as FormArray;
    coverageArray.clear();

    this.currentStep = 1;
    this.submitted = false;
    this.termsAccepted = false;

  }
}