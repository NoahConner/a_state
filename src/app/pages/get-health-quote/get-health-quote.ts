import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { PageSource } from '../../services/page-source';
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
  startDateOptions: string[] = [];
  minStartDate = new Date().toISOString().split('T')[0];

  currentStep = 1;
  totalSteps = 4;
  loading = false;
  submitted = false;
  termsAccepted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpService,
    private pageSource: PageSource,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.healthQuoteForm = this.fb.group({
      type: ['health'],
      who_needs_coverage: ['', Validators.required],
      zip_code: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      county: ['', Validators.required],
      coverage_start_date: ['', Validators.required],
      coverage_start_specific_date: [''],
      household_size: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      ages_covered: ['', Validators.required],
      // Optional on purpose: it only unlocks the subsidy check.
      household_income: [''],
      uses_tobacco: ['', Validators.required],
      on_medicare_or_medicaid: ['', Validators.required],
      has_pre_existing_condition: ['', Validators.required],
      plan_type: ['', Validators.required],
      plan_priorities: this.fb.array([], Validators.required),
      current_insurance_status: ['', Validators.required],
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      preferred_language: ['', Validators.required],
      best_time_to_call: ['', Validators.required],
    });

    this.translate
      .get('GET_HEALTH_QUOTE.STEPPER.STEP1.START_DATE_OPTIONS')
      .subscribe((res: string[]) => {
        this.startDateOptions = res;
      });

    this.healthQuoteForm.get('coverage_start_date')!.valueChanges.subscribe(() => {
      const specificDate = this.healthQuoteForm.get('coverage_start_specific_date')!;
      if (this.needsSpecificStartDate) {
        specificDate.setValidators(Validators.required);
      } else {
        specificDate.clearValidators();
        specificDate.reset('');
      }
      specificDate.updateValueAndValidity();
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

    this.applyPrefillFromQueryParams();
  }

  /** Only the "Specific date" answer needs an exact date, so key off its position. */
  get needsSpecificStartDate(): boolean {
    const value = this.healthQuoteForm?.get('coverage_start_date')?.value;
    return !!value && value === this.startDateOptions[1];
  }

  private applyPrefillFromQueryParams() {
    const fullName = this.route.snapshot.queryParamMap.get('fullName')?.trim();
    const phone = this.route.snapshot.queryParamMap.get('phone')?.trim();

    this.healthQuoteForm.patchValue({
      full_name: fullName || '',
      phone_number: phone || '',
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

  formatDate(value: string | null | undefined): string {
    if (!value) return 'None';

    const [year, month, day] = value.split('-');
    if (!year || !month || !day) return value;

    return `${day}/${month}/${year}`;
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
          this.healthQuoteForm.get('county')!,
          this.healthQuoteForm.get('coverage_start_date')!,
          this.healthQuoteForm.get('coverage_start_specific_date')!,
        ];
      case 2:
        return [
          this.healthQuoteForm.get('household_size')!,
          this.healthQuoteForm.get('ages_covered')!,
          this.healthQuoteForm.get('household_income')!,
          this.healthQuoteForm.get('uses_tobacco')!,
          this.healthQuoteForm.get('on_medicare_or_medicaid')!,
          this.healthQuoteForm.get('has_pre_existing_condition')!,
        ];
      case 3:
        return [
          this.healthQuoteForm.get('plan_type')!,
          this.healthQuoteForm.get('plan_priorities')!,
          this.healthQuoteForm.get('current_insurance_status')!,
        ];
      case 4:
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
      const body = {
        ...this.healthQuoteForm.getRawValue(),
        ...this.pageSource.getSourceFields(),
      };
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
    (this.healthQuoteForm.get('plan_priorities') as FormArray).clear();

    this.currentStep = 1;
    this.submitted = false;
    this.termsAccepted = false;

  }
}
