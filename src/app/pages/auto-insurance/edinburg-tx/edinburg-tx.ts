import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../services/language';
import { QuoteLeadCaptureService } from '../../../services/quote-lead-capture.service';

@Component({
  selector: 'app-edinburg-tx',
  standalone: false,
  templateUrl: './edinburg-tx.html',
  styleUrl: './edinburg-tx.scss',
})
export class EdinburgTx implements AfterViewInit {
  @ViewChild('ratesSection') private ratesSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('tocColumn') private tocColumnRef?: ElementRef<HTMLElement>;
  @ViewChild('tocCard') private tocCardRef?: ElementRef<HTMLElement>;
  @ViewChild('tocStopSection') private tocStopSectionRef?: ElementRef<HTMLElement>;
  readonly bannerForm = this.createQuoteFormState();
  readonly coveredForm = this.createQuoteFormState();

  tocCardStyles: Record<string, string> | null = null;
  activeTocIndex = 0;
  isMobileTocOpen = false;

  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private router: Router,
  ) {
    this.buildTableOfContents();
    this.languageService.getLanguageChange().subscribe(() => {
      this.buildTableOfContents();
      setTimeout(() => this.updateTocStickyState());
    });
  }

  chips = [
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.PERSONAL_CAR',  image: '/assets/images/houston-tx/car.png', routeKey: 'carInsurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.COMMERCIAL_AUTO', image: '/assets/images/houston-tx/truck.png', routeKey: 'commercialAutoInsurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.SR22', image: '/assets/images/houston-tx/plane.png', routeKey: 'sr22Insurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RIDESHARE', image: '/assets/images/houston-tx/taxi.png', routeKey: 'rideshareInsurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RV_MOTORHOME', image: '/assets/images/houston-tx/truck-1.png', routeKey: 'rvInsurance' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.OTHER', image: '/assets/images/houston-tx/shield with cross.png', routeKey: 'getAutoQuote' },
  ];

  tableOfContents: string[] = [];
  ratesHeading = '';
  averageMonthlyRateHeading = '';
  comparisonHeading = '';
  zipCodesHeading = '';
  compareRateColumns: string[] = [];
  compareRates: { label: string; values: string[]; highlighted: boolean }[] = [];

  monthlyRates = [
    { company: '<a class="company-name inline-link" href="https://www.usaa.com/?akredirect=true" rel="nofollow" target="_blank">USAA</a>', minimum: '$59', fullCoverage: '$185' },
    { company: '<a class="company-name inline-link" href="https://texasfarmbureau.org/" rel="nofollow" target="_blank">Texas Farm Bureau</a>', minimum: '$63', fullCoverage: '$164' },
    { company: '<a class="company-name inline-link" href="https://www.statefarm.com/" rel="nofollow" target="_blank">State Farm</a>', minimum: '$64', fullCoverage: '$170' },
    { company: '<a class="company-name inline-link" href="https://www.redpointinsurance.com/" rel="nofollow" target="_blank">Redpoint County Mutual</a>', minimum: '$67', fullCoverage: '$196' },
    { company: '<a class="company-name inline-link" href="https://www.mercuryinsurance.com/" rel="nofollow" target="_blank">Mercury</a>', minimum: '$77', fullCoverage: '$156' },
    { company: '<a class="company-name inline-link" href="https://www.aaa.com/" rel="nofollow" target="_blank">AAA</a>', minimum: '$86', fullCoverage: '$236' },
    { company: '<a class="company-name inline-link" href="https://www.progressive.com/" rel="nofollow" target="_blank">Progressive</a>', minimum: '$87', fullCoverage: '$248' },
    { company: '<a class="company-name inline-link" href="https://www.allstate.com/" rel="nofollow" target="_blank">Allstate</a>', minimum: '$184', fullCoverage: '$533' },
    { company: '<a class="company-name inline-link" href="https://www.farmers.com/" rel="nofollow" target="_blank">Farmers</a>', minimum: '$190', fullCoverage: '$492' },
  ];

  zipRateRows = [
    { zipCode: '78504', neighborhood: 'McAllen', monthlyRate: '$77', highlighted: false },
    { zipCode: '78539', neighborhood: 'Edinburg', monthlyRate: '$191', highlighted: true },
    { zipCode: '78541', neighborhood: 'Edinburg South', monthlyRate: '$191', highlighted: false },
    { zipCode: '78542', neighborhood: 'Edinburg Southeast', monthlyRate: '$210', highlighted: true },
  ];

  faqItems: { question: string; answer: string }[] = [];
  neighborhoodsRows: string[][] = [];
  openFaqIndex = 0;

  ngAfterViewInit() {
    setTimeout(() => this.updateTocStickyState());
  }

  private wrapHighlight(key: string) {
    return `<span class="toc-highlight">${this.translate.instant(key)}</span>`;
  }

  private buildTableOfContents() {
    const city = this.translate.instant('EDINBURG_TX.TABLE_OF_CONTENTS.LOCATION');
    const cityWithState = `${city}${this.translate.instant('GLOBAL_TX.LOCATION.STATE_SUFFIX')}`;
    this.ratesHeading = `${this.translate.instant('GLOBAL_TX.RATES.HEADING_PREFIX')} ${cityWithState}?`;
    this.averageMonthlyRateHeading = `${this.translate.instant('GLOBAL_TX.RATES.AVERAGE_MONTHLY_RATE_PREFIX')} ${city} ${this.translate.instant('GLOBAL_TX.RATES.AVERAGE_MONTHLY_RATE_SUFFIX')}`;
    this.comparisonHeading = `${this.translate.instant('GLOBAL_TX.RATES.COMPARISON_HEADING_PREFIX')} ${city} ${this.translate.instant('GLOBAL_TX.RATES.COMPARISON_HEADING_SUFFIX')}`;
    this.zipCodesHeading = `${this.translate.instant('GLOBAL_TX.RATES.ZIP_CODES_HEADING_PREFIX')} ${this.translate.instant('EDINBURG_TX.RATES.ZIP_LOCATION_POSSESSIVE')} ${this.translate.instant('GLOBAL_TX.RATES.ZIP_CODES_HEADING_SUFFIX')}`;
    this.compareRateColumns = [
      city,
      this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.COLUMNS.TEXAS_AVERAGE'),
      this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.COLUMNS.NATIONAL_AVERAGE'),
    ];
    this.compareRates = [
      {
        label: this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.LABEL'),
        values: [
          this.translate.instant('EDINBURG_TX.RATES.COMPARISON_TABLE.MINIMUM'),
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.TEXAS_VALUE'),
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.NATIONAL_VALUE'),
        ],
        highlighted: false,
      },
      {
        label: this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.FULL_COVERAGE.LABEL'),
        values: [
          this.translate.instant('EDINBURG_TX.RATES.COMPARISON_TABLE.FULL_COVERAGE'),
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.FULL_COVERAGE.TEXAS_VALUE'),
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.FULL_COVERAGE.NATIONAL_VALUE'),
        ],
        highlighted: true,
      },
    ];

    this.tableOfContents = [
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.COST')} ${cityWithState}?`,
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.REQUIREMENTS')} ${city} ${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.DRIVERS')}`,
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.COVERAGE_OPTIONS')} ${city} ${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.DRIVERS')}`,
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.RATE_FACTORS')} ${city}?`,
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.SAVE_MONEY')} ${cityWithState}`,
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.WHY_INDEPENDENT_BEFORE')} ${city} ${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.WHY_INDEPENDENT_AFTER')}`,
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.SPECIAL_SITUATIONS')} ${city} ${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.DRIVERS')}`,
      `${city}-${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.DRIVING_RISKS')}`,
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.NEIGHBORHOODS')} ${cityWithState}`,
      `${this.wrapHighlight('GLOBAL_TX.TABLE_OF_CONTENTS.ITEMS.FAQ')} ${cityWithState}`,
    ];

    this.faqItems = this.translate.instant('EDINBURG_TX.FAQ.ITEMS');
    this.neighborhoodsRows = this.translate.instant('EDINBURG_TX.NEIGHBORHOODS.ROWS');
  }

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }

  selectChip(form: QuoteFormState, chipName: string) {
    form.selectedChip = chipName;
  }

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? -1 : index;
    setTimeout(() => this.updateTocStickyState());
  }

  scrollToSection(index: number, event: Event) {
    event.preventDefault();
    this.closeMobileToc();

    if (typeof document === 'undefined') {
      return;
    }

    document.getElementById(`toc-section-${index + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMobileToc() {
    this.isMobileTocOpen = !this.isMobileTocOpen;
  }

  closeMobileToc() {
    this.isMobileTocOpen = false;
  }

  async goToSelectedQuote(form: QuoteFormState) {
    if (form.isSubmitting) {
      return;
    }

    const selected = this.chips.find((chip) => chip.name === form.selectedChip);
    if (!selected) {
      return;
    }

    form.isSubmitting = true;

    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: this.translate.instant(selected.name),
        full_name: form.fullName,
        phone_number: form.phone,
      });

      if (!isSubmitted) {
        return;
      }

      this.resetQuoteForm(form);
      await this.router.navigate(this.languageService.getRoute('getAutoQuote'));
    } finally {
      form.isSubmitting = false;
    }
  }

  private resetQuoteForm(form: QuoteFormState) {
    form.selectedChip = null;
    form.fullName = '';
    form.phone = '';
    form.termsAccepted = false;
  }

  private createQuoteFormState(): QuoteFormState {
    return {
      selectedChip: null,
      fullName: '',
      phone: '',
      isSubmitting: false,
      termsAccepted: false,
    };
  }

  private updateActiveTocSection() {
    if (typeof document === 'undefined') {
      return;
    }

    const scrollPos = window.scrollY + 140;
    let activeIndex = 0;

    for (let i = 0; i < this.tableOfContents.length; i++) {
      const section = document.getElementById(`toc-section-${i + 1}`);
      if (section && section.offsetTop <= scrollPos) {
        activeIndex = i;
      }
    }

    this.activeTocIndex = activeIndex;

    // Directly toggle the DOM class: the [class.active] binding stops
    // reacting to state changes after SSR hydration for items inside
    // an @for block, so we bypass Angular's binding here.
    const items = this.tocColumnRef?.nativeElement.querySelectorAll('.toc-item');
    items?.forEach((item, i) => item.classList.toggle('active', i === activeIndex));
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateTocStickyState() {
    if (typeof window === 'undefined') {
      return;
    }

    this.updateActiveTocSection();

    const ratesSection = this.ratesSectionRef?.nativeElement;
    const tocColumn = this.tocColumnRef?.nativeElement;
    const tocCard = this.tocCardRef?.nativeElement;
    const tocStopSection = this.tocStopSectionRef?.nativeElement;

    if (window.innerWidth > 820) {
      this.closeMobileToc();
    }

    if (!ratesSection || !tocColumn || !tocCard || window.innerWidth <= 820) {
      this.tocCardStyles = null;
      return;
    }

    const stickyOffset = 24;
    const stopGap = 24;
    const scrollY = window.scrollY;
    const columnRect = tocColumn.getBoundingClientRect();
    const columnTop = columnRect.top + scrollY;

    if (scrollY + stickyOffset < columnTop) {
      this.tocCardStyles = null;
      return;
    }

    if (tocStopSection) {
      const stopTop = tocStopSection.getBoundingClientRect().top + scrollY;
      const cardHeight = tocCard.offsetHeight;
      const maxPageTop = stopTop - cardHeight - stopGap;

      if (scrollY + stickyOffset > maxPageTop) {
        this.tocCardStyles = {
          position: 'absolute',
          top: `${maxPageTop - columnTop}px`,
          left: '0',
          width: `${columnRect.width}px`,
          zIndex: '10',
        };
        return;
      }
    }

    this.tocCardStyles = {
      position: 'fixed',
      top: `${stickyOffset}px`,
      left: `${columnRect.left}px`,
      width: `${columnRect.width}px`,
      zIndex: '10',
    };
  }
}

interface QuoteFormState {
  selectedChip: string | null;
  fullName: string;
  phone: string;
  isSubmitting: boolean;
  termsAccepted: boolean;
}
