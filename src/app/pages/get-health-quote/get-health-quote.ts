import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-health-quote',
  standalone: false,
  templateUrl: './get-health-quote.html',
  styleUrl: './get-health-quote.scss',
})
export class GetHealthQuote {
  healthQuoteForm!: FormGroup;

  contactOptions: string[] = [];
  timeOptions: string[] = [];

  currentStep = 1;
  totalSteps = 3;
  loading = false;
  submitted = false;
  termsAccepted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.healthQuoteForm = this.fb.group({
      type: ['health'],
      who_needs_coverage: ['', Validators.required],
      zip_code: ['', Validators.required],
      household_size: ['', Validators.required],
      household_income: ['', Validators.required],
      uses_tobacco: ['', Validators.required],
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
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

  onCheckboxChange(e: any, controlName: string) {
    const checkArray: FormArray = this.healthQuoteForm.get(controlName) as FormArray;
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
          this.healthQuoteForm.get('who_needs_coverage')!,
          this.healthQuoteForm.get('zip_code')!,
        ];
      case 2:
        return [
          this.healthQuoteForm.get('household_size')!,
          this.healthQuoteForm.get('household_income')!,
          this.healthQuoteForm.get('uses_tobacco')!,
        ];
      case 3:
        return [
          this.healthQuoteForm.get('full_name')!,
          this.healthQuoteForm.get('email_address')!,
          this.healthQuoteForm.get('phone_number')!,
          this.healthQuoteForm.get('preferred_language')!,
          this.healthQuoteForm.get('best_time_to_call')!,
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

  async sendHealthQuote() {
    this.markFormGroupTouched(this.healthQuoteForm);

    if (this.healthQuoteForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const body = this.healthQuoteForm.getRawValue();
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
    this.healthQuoteForm.reset();
    this.healthQuoteForm.patchValue({ type: 'health' });

    this.currentStep = 1;
    this.submitted = false;
    this.termsAccepted = false;

  }
}