import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Language } from '../../services/language';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  languages: string[];
  hours: string;
  mapEmbedUrl: string;
  safeMapUrl?: SafeResourceUrl;
}

@Component({
  selector: 'app-our-locations',
  templateUrl: './our-locations.html',
  styleUrls: ['./our-locations.scss'],
  standalone: false,
})
export class OurLocations implements OnInit {
  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', icon: 'fas fa-car' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-house' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-building' },
    { name: 'HOME.BANNER.CHIPS.LIFE', icon: 'fas fa-heart' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', icon: 'fas fa-notes-medical' },
    { name: 'HOME.BANNER.CHIPS.SURETY', icon: 'fas fa-file-contract' },
  ];

  locations: Location[] = [];
  loading = false;
  errorMessage = '';
  currentLang:string = ''

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    public languageService: Language
  ) {}

  ngOnInit(): void {
    let currentLang = this.languageService.getCurrentLanguage();
    this.getLocations(currentLang);
     this.currentLang = currentLang
    this.languageService
    .getLanguageChange()
    .subscribe((lang:any) => {
      this.currentLang = lang.lang;
      this.getLocations(lang.lang);
    });
  }

  getLocations(lang:any) {
    const url = '/assets/locations.json';
    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.locations = (res[lang] || [])?.map((loc:any) => ({
          ...loc,
          safeMapUrl: this.sanitizer.bypassSecurityTrustResourceUrl(loc.mapEmbedUrl),
        }));
        console.log(this.locations, res)
        this.cdr.detectChanges();
      },
    });
  }
}
