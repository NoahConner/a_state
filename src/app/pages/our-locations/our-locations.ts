import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
    
  ) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    const url = '/assets/locations.json';
    this.http.get<Location[]>(url).subscribe({
      next: (res) => {
        this.locations = (res || []).map((loc) => ({
          ...loc,
          safeMapUrl: this.sanitizer.bypassSecurityTrustResourceUrl(loc.mapEmbedUrl),
        }));
        this.cdr.detectChanges();
      },
    });
  }
}
