import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // ChangeDetectorRef import kiya
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Language } from '../../services/language';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  languages: string[];
  officeHours: string;
  languageHeaing: string;
  mapEmbedUrl: string;
  detail?: {
    headline: string;
    NearbyLandmarks: string;
    parking: string;
    heroHeading: string;
  };
}

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.html',
  styleUrls: ['./location-detail.scss'],
  standalone: false,
})
export class LocationDetail implements OnInit {
  location: any;
  mapUrl?: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    public languageService: Language
  ) {}

  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', icon: 'fas fa-car' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-house' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-building' },
    { name: 'HOME.BANNER.CHIPS.LIFE', icon: 'fas fa-heart' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', icon: 'fas fa-notes-medical' },
    { name: 'HOME.BANNER.CHIPS.SURETY', icon: 'fas fa-file-contract' },
  ];

  getIcon(key: string): string {
    const map: any = {
      auto: 'assets/images/car.png',
      home: 'assets/images/house.png',
      commercial: 'assets/images/commercial.png',
      life: 'assets/images/life.png',
      health: 'assets/images/health.png',
      bonds: 'assets/images/secure.png',
    };

    return map[key] || 'assets/images/default.png';
  }

  ngOnInit(): void {
    const currentLang = this.languageService.getCurrentLanguage();
    this.getLocationDetail(currentLang);
    this.languageService.getLanguageChange().subscribe((lang: any) => {
      this.getLocationDetail(lang.lang);
    });
  }

  getLocationDetail(lang: any) {
    this.http.get<any[]>('assets/locations.json').subscribe({
      next: (locations) => {
        const locationList = locations?.[lang] || [];
        const id = this.resolveLocationId();
        const found =
          locationList.find((loc: any) => loc.id === id) ||
          locationList.find((loc: any) => loc.id === `${id}-es`) ||
          locationList.find((loc: any) => loc.id === id?.replace(/-es$/, ''));

        if (!found) {
          this.location = null;
          console.warn(`Location not found for id: ${id} and language: ${lang}`);
          this.cdr.detectChanges();
          return;
        }

        this.location = found;
        this.location.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(found.mapEmbedUrl);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private resolveLocationId(): string {
    const routeParamId = this.route.snapshot.paramMap.get('id');
    if (routeParamId) {
      return routeParamId;
    }

    const cleanUrl = this.router.url.split('?')[0].split('#')[0];
    const segments = cleanUrl.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  }

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
