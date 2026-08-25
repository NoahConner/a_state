import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  offices: any[] = [];
  currentLang = 'en';
  smsConsentAccepted = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public languageService: Language,
  ) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.getOffices(this.currentLang);

    this.languageService.getLanguageChange().subscribe((lang: any) => {
      this.currentLang = lang.lang;
      this.getOffices(lang.lang);
    });
  }

  goToThankYou() {
    // Navigate to thank-you page with query param type=contact
    this.router.navigate(['/thank-you'], { queryParams: { type: 'contact' } });
  }

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }

  getOfficeDetailRoute(id: string): string[] {
    return this.currentLang === 'es' ? ['/es/nuestras-ubicaciones', id] : ['/our-locations', id];
  }

  private getOffices(lang: string) {
    this.http.get<any>('/assets/locations.json').subscribe({
      next: (res) => {
        this.offices = res?.[lang] || res?.['en'] || [];
        this.cdr.detectChanges();
      },
    });
  }
}
