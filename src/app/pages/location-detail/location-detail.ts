import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // ChangeDetectorRef import kiya
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    private cdr: ChangeDetectorRef
  ) {}

  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', icon: 'fas fa-car' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-house' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-building' },
    { name: 'HOME.BANNER.CHIPS.LIFE', icon: 'fas fa-heart' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', icon: 'fas fa-notes-medical' },
    { name: 'HOME.BANNER.CHIPS.SURETY', icon: 'fas fa-file-contract' },
  ];

  getIcon(name: string): string {
  const map: any = {
    'Auto Insurance': 'assets/images/car.png',
    'Homeowners Insurance': 'assets/images/house.png',
    'Commercial Insurance': 'assets/images/commercial.png',
    'Life Insurance': 'assets/images/life.png',
    'Health Insurance': 'assets/images/health.png',
    'Surety Bonds': 'assets/images/secure.png'
  };

  return map[name] || 'assets/images/default.png';
}

  ngOnInit(): void {
    this.getLocationDetail();
   
  }

  getLocationDetail() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/our-locations']);
      return;
    }

    this.http.get<Location[]>('assets/locations.json').subscribe({
      next: (locations) => {
        const found = locations.find((loc) => loc.id === id);
        if (!found) {
          this.router.navigate(['/our-locations']);
          return;
        }
        this.location = found;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(found.mapEmbedUrl);

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.router.navigate(['/our-locations']);
      },
    });
  }


}
