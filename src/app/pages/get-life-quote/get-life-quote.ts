import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-life-quote',
  standalone: false,
  templateUrl: './get-life-quote.html',
  styleUrl: './get-life-quote.scss',
})
export class GetLifeQuote {
  lifeQuoteForm!: FormGroup;

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
    this.lifeQuoteForm = this.fb.group({
      type: ['life'],
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      zip_code: ['', Validators.required],
      uses_tobacco: ['', Validators.required],
      general_health: ['', Validators.required],
      coverage_amount: ['', Validators.required],
      bundle_option: ['', Validators.required],
      preferred_language: ['', Validators.required],
      contact_method: ['', Validators.required],
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
    const checkArray: FormArray = this.lifeQuoteForm.get(controlName) as FormArray;
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
          this.lifeQuoteForm.get('full_name')!,
          this.lifeQuoteForm.get('email_address')!,
          this.lifeQuoteForm.get('phone_number')!,
          this.lifeQuoteForm.get('gender')!,
          this.lifeQuoteForm.get('date_of_birth')!,
          this.lifeQuoteForm.get('zip_code')!,
        ];
      case 2:
        return [
          this.lifeQuoteForm.get('uses_tobacco')!,
          this.lifeQuoteForm.get('general_health')!,
        ];
      case 3:
        return [
          this.lifeQuoteForm.get('coverage_amount')!,
          this.lifeQuoteForm.get('bundle_option')!,
        ];
      case 4:
        return [
          this.lifeQuoteForm.get('preferred_language')!,
          this.lifeQuoteForm.get('contact_method')!,
          this.lifeQuoteForm.get('best_time_to_connect')!,
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

  async sendLifeQuote() {
    this.markFormGroupTouched(this.lifeQuoteForm);

    if (this.lifeQuoteForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const body = this.lifeQuoteForm.getRawValue();
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
    this.lifeQuoteForm.reset();
    this.lifeQuoteForm.patchValue({ type: 'life' });

    this.currentStep = 1;
    this.submitted = false;
    this.termsAccepted = false;

  }
}