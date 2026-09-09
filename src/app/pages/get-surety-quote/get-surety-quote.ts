import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { PageSource } from '../../services/page-source';
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
  bondNeededByOptions: string[] = [];
  minBondDate = new Date().toISOString().split('T')[0];

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
    this.suretyQuoteForm = this.fb.group({
      type: ['surety_bond'],
      full_name: ['', Validators.required],
      zip_code: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      applicant_type: ['', Validators.required],
      bond_type: ['', Validators.required],
      bond_amount: ['', Validators.required],
      obligee_name: ['', Validators.required],
      bond_needed_by: ['', Validators.required],
      bond_needed_by_specific_date: [''],
      estimated_credit_score: ['', Validators.required],
      years_in_business: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      prior_bond_history: ['', Validators.required],
      has_judgments_liens_bankruptcies: ['', Validators.required],
      preferred_language: ['', Validators.required],
      contact_method: ['', Validators.required],
      best_time_to_call: ['', Validators.required],
    });

    this.translate
      .get('SURETY_BOND_QUOTE.STEPPER.STEP2.BOND_NEEDED_BY_OPTIONS')
      .subscribe((res: string[]) => {
        this.bondNeededByOptions = res;
      });

    this.suretyQuoteForm.get('bond_needed_by')!.valueChanges.subscribe(() => {
      const specificDate = this.suretyQuoteForm.get('bond_needed_by_specific_date')!;
      if (this.needsSpecificBondDate) {
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
  get needsSpecificBondDate(): boolean {
    const value = this.suretyQuoteForm?.get('bond_needed_by')?.value;
    return !!value && value === this.bondNeededByOptions[2];
  }

  private applyPrefillFromQueryParams() {
    const fullName = this.route.snapshot.queryParamMap.get('fullName')?.trim();
    const phone = this.route.snapshot.queryParamMap.get('phone')?.trim();

    this.suretyQuoteForm.patchValue({
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
          this.suretyQuoteForm.get('zip_code')!,
          this.suretyQuoteForm.get('email_address')!,
          this.suretyQuoteForm.get('phone_number')!,
          this.suretyQuoteForm.get('applicant_type')!,
        ];
      case 2:
        return [
          this.suretyQuoteForm.get('bond_type')!,
          this.suretyQuoteForm.get('bond_amount')!,
          this.suretyQuoteForm.get('obligee_name')!,
          this.suretyQuoteForm.get('bond_needed_by')!,
          this.suretyQuoteForm.get('bond_needed_by_specific_date')!,
        ];
      case 3:
        return [
          this.suretyQuoteForm.get('estimated_credit_score')!,
          this.suretyQuoteForm.get('years_in_business')!,
          this.suretyQuoteForm.get('prior_bond_history')!,
          this.suretyQuoteForm.get('has_judgments_liens_bankruptcies')!,
        ];
      case 4:
        return [
          this.suretyQuoteForm.get('preferred_language')!,
          this.suretyQuoteForm.get('contact_method')!,
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
      const body = {
        ...this.suretyQuoteForm.getRawValue(),
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
    this.suretyQuoteForm.reset();
    this.suretyQuoteForm.patchValue({ type: 'surety' });
    this.currentStep = 1;
    this.submitted = false;
    this.termsAccepted = false;

  }
}
