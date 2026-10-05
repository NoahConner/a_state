import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../services/language';
import { QuoteLeadCaptureService } from '../../services/quote-lead-capture.service';

// Flag images instead of emoji: Windows renders flag emoji as plain letters ("US", "MX").
const LANGUAGE_FLAGS: Record<string, string> = {
  English: '/assets/images/our-locations/flag-us.svg',
  Inglés: '/assets/images/our-locations/flag-us.svg',
  Español: '/assets/images/our-locations/flag-mx.svg',
  Hindi: '/assets/images/our-locations/flag-in.svg',
};

// Listed column by column, in the order the design shows them.
const TEXAS_CITIES = [
  'Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano',
  'Lubbock', 'Laredo', 'Irving', 'Garland', 'Frisco', 'McKinney', 'Amarillo', 'Grand Prairie', 'Brownsville',
  'Killeen', 'Denton', 'Pasadena', 'Mesquite', 'McAllen', 'Waco', 'Midland', 'Carrollton', 'Lewisville', 'Abilene',
  'Round Rock', 'Pearland', 'College Station', 'The Woodlands', 'Richardson', 'League City', 'Odessa', 'Beaumont',
  'Allen', 'Sugar Land', 'Tyler', 'New Braunfels', 'Edinburg', 'Wichita Falls', 'Conroe', 'San Angelo', 'Atascocita',
  'Temple',
  'Bryan', 'Mission', 'Georgetown', 'Baytown', 'Longview', 'Pharr', 'Flower Mound', 'Cedar Park', 'Mansfield',
  'Missouri City', 'Leander', 'Harlingen', 'San Marcos', 'North Richland Hills', 'Spring', 'Pflugerville', 'Victoria',
  'Rowlett', 'Euless', 'Wylie', 'Kyle', 'DeSoto', 'Port Arthur', 'Texas City', 'Little Elm', 'Galveston', 'Burleson',
  'Rockwall', 'Grapevine', 'Bedford', 'Cedar Hill', 'Huntsville', 'Sherman', 'Keller', 'Haltom City', 'The Colony',
  'Waxahachie', 'Schertz', 'Channelview', 'Weslaco', 'Coppell', 'Friendswood', 'Lancaster', 'Rosenberg', 'Hurst',
  'Duncanville',
  'Midlothian', 'Copperas Cove', 'Prosper', 'Socorro', 'La Porte', 'Farmers Branch', 'Mission Bend', 'San Juan',
  'Texarkana', 'Weatherford', 'Hutto', 'Timberwood Park', 'Cibolo', 'Fulshear', 'Del Rio', 'Cleburne', 'Celina',
  'Lufkin', 'Harker Heights', 'Deer Park', 'Canyon Lake', 'Seguin', 'West Odessa', 'Nacogdoches', 'Forney',
  'Greenville', 'Southlake', 'Sachse', 'Converse', 'Eagle Pass', 'Alvin', 'Lake Jackson', 'Balch Springs', 'Fort Hood',
  'Colleyville', 'Denison', 'Corsicana', 'Princeton', 'Katy', 'University Park', 'Kingsville', 'Sienna', 'Saginaw',
  'Paris', 'Kerrville', 'San Benito',
  'Fresno', 'Benbrook', 'Belton', 'Anna', 'Pecan Grove', 'Cloverleaf', 'Big Spring', 'Marshall', 'Horizon City',
  'Corinth', 'Watauga', 'Fate', 'Ennis', 'Dickinson', 'Stephenville', 'Murphy', 'Portland', 'Boerne', 'Terrell',
  'Alamo', 'Alton', 'Universal City', 'Melissa', 'Royse City', 'Angleton', 'Plainview', 'Brushy Creek', 'Crowley',
  'Seagoville', 'Lakeway', 'La Marque', 'Orange', 'Palestine', 'Brownwood', 'Brenham', 'Steiner Ranch', 'Cinco Ranch',
  'Manor', 'Nederland', 'White Settlement', 'Glenn Heights', 'Gainesville', 'Bay City', 'Alice', 'Stafford', 'Addison',
  'Bellaire', 'Aldine', 'Taylor', 'Red Oak', 'Groves', 'Donna', 'Mercedes', 'Pampa', 'Humble', 'Hewitt',
  'Sulphur Springs', 'Gatesville', 'Mount Pleasant', 'Highland Village', 'South Houston', 'Live Oak', 'Palmview', 'Buda',
  'Canyon', 'Uvalde', 'Rio Grande City', 'Lockhart', 'Mineral Wells', 'West University Place', 'Hereford', 'Manvel',
  'Rendon', 'Hidalgo', 'Dumas', 'Jacksonville', 'Azle', 'Forest Hill', 'Lumberton', 'Seabrook', 'Trophy Club',
  'Port Neches', 'Tomball', 'Wells Branch', 'Kilgore', 'Andrews', 'Beeville', 'Henderson', 'Athens', 'Santa Fe',
  'Iowa Colony', 'Robinson City',
];

@Component({
  selector: 'app-our-locations',
  templateUrl: './our-locations.html',
  styleUrls: ['./our-locations.scss'],
  standalone: false,
})
export class OurLocations implements OnInit {
  readonly coveredForm = this.createQuoteFormState();
  termsAccepted = false;

  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', image: '/assets/images/home/car.png', routeKey: 'getAutoQuote' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', image: '/assets/images/home/home.png', routeKey: 'getHomeQuote' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', image: '/assets/images/home/shop.png', routeKey: 'getCommercialQuote' },
    { name: 'HOME.BANNER.CHIPS.LIFE', image: '/assets/images/home/heart.png', routeKey: 'getLifeQuote' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', image: '/assets/images/home/medical-cross.png', routeKey: 'getHealthQuote' },
    { name: 'HOME.BANNER.CHIPS.SURETY', image: '/assets/images/home/other.png', routeKey: 'getAQuote' },
  ];

  whyVisitPoints: string[] = [];
  faqItems: { question: string; answer: string }[] = [];
  openFaqIndex = 0;

  citySearch = '';
  filteredCities = TEXAS_CITIES;

  locations: any;
  currentLang: string = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private router: Router,
    public languageService: Language
  ) {}

  ngOnInit(): void {
    let currentLang = this.languageService.getCurrentLanguage();
    this.getLocations(currentLang);
    this.currentLang = currentLang;
    this.languageService.getLanguageChange().subscribe((lang: any) => {
      this.currentLang = lang.lang;
      this.getLocations(lang.lang);
    });

    this.translate.stream('OUR_LOCATION.SESSION2.POINTS').subscribe((points) => {
      this.whyVisitPoints = Array.isArray(points) ? points : [];
    });
    this.translate.stream('OUR_LOCATION.FAQ.ITEMS').subscribe((items) => {
      this.faqItems = Array.isArray(items) ? items : [];
    });
  }

  getRoute(page: string): string[] {
    return this.languageService.getRoute(page);
  }

  getLocations(lang: any) {
    const url = '/assets/locations.json';
    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.locations = (res[lang] || [])?.map((loc: any) => ({
          ...loc,
          safeMapUrl: this.sanitizer.bypassSecurityTrustResourceUrl(loc.mapEmbedUrl),
          languageItems: loc.languages.map((language: string) => ({
            label: language,
            flag: LANGUAGE_FLAGS[language],
          })),
        }));
        this.cdr.detectChanges();
      },
    });
  }

  // Office numbers in the design are zero-padded: 01, 02, ...
  officeNumber(index: number) {
    return String(index + 1).padStart(2, '0');
  }

  searchCities() {
    const term = this.citySearch.trim().toLowerCase();
    this.filteredCities = term ? TEXAS_CITIES.filter((city) => city.toLowerCase().includes(term)) : TEXAS_CITIES;
  }

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? -1 : index;
  }

  toggleChip(form: QuoteFormState, chipName: string) {
    form.selectedChips = this.isChipSelected(form, chipName)
      ? form.selectedChips.filter((name) => name !== chipName)
      : [...form.selectedChips, chipName];
  }

  isChipSelected(form: QuoteFormState, chipName: string) {
    return form.selectedChips.includes(chipName);
  }

  async goToSelectedQuote(form: QuoteFormState) {
    if (form.isSubmitting) {
      return;
    }

    const selected = this.chips.filter((chip) => form.selectedChips.includes(chip.name));
    if (!selected.length) {
      return;
    }

    // One product goes to its own quote page; several go to the general quote page.
    const routeKey = selected.length === 1 ? selected[0].routeKey : 'getAQuote';

    form.isSubmitting = true;

    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: selected.map((chip) => this.translate.instant(chip.name)).join(', '),
        full_name: form.fullName,
        phone_number: form.phone,
      });

      if (!isSubmitted) {
        return;
      }

      this.resetQuoteForm(form);
      await this.router.navigate(this.languageService.getRoute(routeKey));
    } finally {
      form.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  private resetQuoteForm(form: QuoteFormState) {
    form.selectedChips = [];
    form.fullName = '';
    form.phone = '';
    this.termsAccepted = false;
  }

  private createQuoteFormState(): QuoteFormState {
    return {
      selectedChips: [],
      fullName: '',
      phone: '',
      isSubmitting: false,
    };
  }
}

interface QuoteFormState {
  selectedChips: string[];
  fullName: string;
  phone: string;
  isSubmitting: boolean;
}
