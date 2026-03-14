import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-auto-quote',
  templateUrl: './get-auto-quote.html',
  standalone: false,
  styleUrl: './get-auto-quote.scss'

})
export class GetAutoQuote {

  autoQuoteForm!: FormGroup;
  contactOptions: string[] = [];
  timeOptions: string[] = [];

  currentStep = 1;
  totalSteps = 5;
  loading = false;
  termsAccepted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.autoQuoteForm = this.fb.group({
      type: ['auto'],
      first_name: ['', Validators.required],
      zip_code: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      vehicles: this.fb.array([]),
      drivers: this.fb.array([]),
      currently_issued: ['', Validators.required],
      sr_22_needed: ['', Validators.required],
      bundle: ['', Validators.required],
      preferred_language: ['', Validators.required],
      contact_method: ['', Validators.required],
      best_time_to_connect: ['', Validators.required]
    });

    this.addVehicle();
    this.addDriver();

    this.translate.get('GET_AUTO_QUOTE.STEPPER.STEP5.CONTACT_OPTIONS')
      .subscribe((res: string[]) => {
        this.contactOptions = res;
      });

    this.translate.get('GET_AUTO_QUOTE.STEPPER.STEP5.TIME_OPTIONS')
      .subscribe((res: string[]) => {
        this.timeOptions = res;
      });
  }

  get vehicles(): FormArray {
    return this.autoQuoteForm.get('vehicles') as FormArray;
  }

  get drivers(): FormArray {
    return this.autoQuoteForm.get('drivers') as FormArray;
  }

  addVehicle() {
    this.vehicles.push(
      this.fb.group({
        year: ['', Validators.required],
        make: ['', Validators.required],
        model: ['', Validators.required],
        ownership: ['', Validators.required],
        primary_use: ['', Validators.required]
      })
    );
  }

  removeVehicle(i: number) {
    this.vehicles.removeAt(i);
  }

  addDriver() {
    this.drivers.push(
      this.fb.group({
        full_name: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        marital_status: ['', Validators.required]
      })
    );
  }

  removeDriver(i: number) {
    this.drivers.removeAt(i);
  }

  getBundleControl(option: string): FormControl {
    return this.autoQuoteForm.get('bundle')! as FormControl;
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

  nextStep() {
    if (!this.validateStep(this.currentStep)) {
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
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
      } else if (control instanceof FormGroup || control instanceof FormArray) {
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
          this.autoQuoteForm.get('first_name')!,
          this.autoQuoteForm.get('zip_code')!,
          this.autoQuoteForm.get('email_address')!,
          this.autoQuoteForm.get('phone_number')!,
        ];
      case 2:
        return [this.vehicles];
      case 3:
        return [this.drivers];
      case 4:
        return [
          this.autoQuoteForm.get('currently_issued')!,
          this.autoQuoteForm.get('sr_22_needed')!,
          this.autoQuoteForm.get('bundle')!,
        ];
      case 5:
        return [
          this.autoQuoteForm.get('preferred_language')!,
          this.autoQuoteForm.get('contact_method')!,
          this.autoQuoteForm.get('best_time_to_connect')!,
        ];
      default:
        return [];
    }
  }

  async sendAutoQuote() {
    this.markFormGroupTouched(this.autoQuoteForm);

    if (this.autoQuoteForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const body = this.autoQuoteForm.getRawValue();
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
    this.autoQuoteForm.reset();
    this.autoQuoteForm.patchValue({ type: 'auto' });
    this.vehicles.clear();
    this.drivers.clear();
    this.addVehicle();
    this.addDriver();
    this.currentStep = 1;
    this.termsAccepted = false;
  }
}

