import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  faqItems: { question: string; answer: string }[] = [];
  openFaqIndex = 0;

  socialLinks = [
    { icon: 'fa-brands fa-facebook', href: 'https://www.facebook.com/astateinsurancetx', label: 'Facebook' },
    { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/astateinsurance/', label: 'Instagram' },
    { icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/@a-state-insurance', label: 'YouTube' },
    { icon: 'fa-brands fa-tiktok', href: 'https://www.tiktok.com/@astateinsurancetx', label: 'TikTok' },
    { icon: 'fa-brands fa-pinterest', href: 'https://www.pinterest.com/astateinsurance/', label: 'Pinterest' },
    { icon: 'fa-brands fa-snapchat', href: 'https://www.snapchat.com/@astateinsurance', label: 'Snapchat' },
    { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/astateinsurance', label: 'X' },
    { icon: 'fa-brands fa-threads', href: null, label: 'Threads' },
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public languageService: Language,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.getOffices(this.currentLang);
    this.loadFaqItems();

    this.languageService.getLanguageChange().subscribe((lang: any) => {
      this.currentLang = lang.lang;
      this.getOffices(lang.lang);
    });

    this.translate.onLangChange.subscribe(() => this.loadFaqItems());
  }

  goToThankYou() {
    // Navigate to thank-you page with query param type=contact
    this.router.navigate(['/thank-you'], { queryParams: { type: 'contact' } });
  }

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? -1 : index;
  }

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }

  getOfficeDetailRoute(id: string): string[] {
    return this.currentLang === 'es' ? ['/es/nuestras-ubicaciones', id] : ['/our-locations', id];
  }

  private loadFaqItems() {
    this.translate.get('CONTACT.FAQ.ITEMS').subscribe((items) => {
      this.faqItems = Array.isArray(items) ? items : [];
      this.cdr.detectChanges();
    });
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
