import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: false,
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers {
  pillars = ['PILLAR1', 'PILLAR2', 'PILLAR3'];
  standFor = ['GROWTH', 'FLEXIBILITY', 'MISSION'];
  languageOptions = ['ENGLISH', 'SPANISH', 'HINDI', 'OTHER'];
  interestOptions = ['SALES', 'CUSTOMER_SERVICE', 'ACCOUNT_MANAGEMENT', 'ADMINISTRATION', 'OTHER'];

  selectedLanguages = new Set<string>();
  resumeFile: File | null = null;
  isDragging = false;
  termsAccepted = false;

  readonly form = inject(FormBuilder).group({
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    interest: [''],
  });

  constructor(private router: Router) {}

  toggleLanguage(option: string) {
    if (this.selectedLanguages.has(option)) {
      this.selectedLanguages.delete(option);
    } else {
      this.selectedLanguages.add(option);
    }
  }

  onResumeSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.resumeFile = input.files?.[0] ?? null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    this.resumeFile = event.dataTransfer?.files?.[0] ?? this.resumeFile;
  }

  goToThankYou() {
    if (this.form.invalid || !this.termsAccepted) {
      this.form.markAllAsTouched();
      return;
    }

    this.router.navigate(['/thank-you'], { queryParams: { type: 'career' } });
  }
}
