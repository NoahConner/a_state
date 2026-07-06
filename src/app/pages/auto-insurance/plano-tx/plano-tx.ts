import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../services/language';
import { QuoteLeadCaptureService } from '../../../services/quote-lead-capture.service';

@Component({
  selector: 'app-plano-tx',
  standalone: false,
  templateUrl: './plano-tx.html',
  styleUrl: './plano-tx.scss',
})
export class PlanoTx implements AfterViewInit {
  @ViewChild('ratesSection') private ratesSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('tocColumn') private tocColumnRef?: ElementRef<HTMLElement>;
  @ViewChild('tocCard') private tocCardRef?: ElementRef<HTMLElement>;
  @ViewChild('tocStopSection') private tocStopSectionRef?: ElementRef<HTMLElement>;
  readonly bannerForm = this.createQuoteFormState();
  readonly coveredForm = this.createQuoteFormState();

  tocCardStyles: Record<string, string> | null = null;

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
    { company: '<a class="company-name inline-link" href="https://texasfarmbureau.org/" rel="nofollow" target="_blank">Texas Farm Bureau</a>', minimum: '$45', fullCoverage: '$147' },
    { company: '<a class="company-name inline-link" href="https://www.geico.com/" rel="nofollow" target="_blank">Geico</a>', minimum: '$47', fullCoverage: '$151' },
    { company: '<a class="company-name inline-link" href="https://www.redpointinsurance.com/" rel="nofollow" target="_blank">Redpoint County Mutual</a>', minimum: '$51', fullCoverage: '$59' },
    { company: '<a class="company-name inline-link" href="https://www.usaa.com/?akredirect=true" rel="nofollow" target="_blank">USAA</a>', minimum: '$54', fullCoverage: '$182' },
    { company: '<a class="company-name inline-link" href="https://www.statefarm.com/" rel="nofollow" target="_blank">State Farm</a>', minimum: '$67', fullCoverage: '$161' },
    { company: '<a class="company-name inline-link" href="https://www.progressive.com/" rel="nofollow" target="_blank">Progressive</a>', minimum: '$80', fullCoverage: '$264' },
    { company: '<a class="company-name inline-link" href="https://www.allstate.com/" rel="nofollow" target="_blank">Allstate</a>', minimum: '$105', fullCoverage: '$375' },
  ];

  zipRateRows = [
    { zipCode: '75074', neighborhood: 'Downtown Plano', monthlyRate: '$138', highlighted: false },
    { zipCode: '75025', neighborhood: 'Legacy', monthlyRate: '$142', highlighted: true },
    { zipCode: '75075', neighborhood: 'Pitman', monthlyRate: '$143', highlighted: false },
    { zipCode: '75023', neighborhood: 'Ridgeview', monthlyRate: '$146', highlighted: true },
    { zipCode: '75024', neighborhood: 'Shops at Legacy', monthlyRate: '$153', highlighted: false },
    { zipCode: '75093', neighborhood: 'Willow Bend', monthlyRate: '$160', highlighted: true },
    { zipCode: '75094', neighborhood: 'Murphy', monthlyRate: '$176', highlighted: false },
    { zipCode: '75098', neighborhood: 'Wylie', monthlyRate: '$89', highlighted: true },
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
    const city = this.translate.instant('PLANO_TX.TABLE_OF_CONTENTS.LOCATION');
    const cityWithState = `${city}${this.translate.instant('GLOBAL_TX.LOCATION.STATE_SUFFIX')}`;
    this.ratesHeading = `${this.translate.instant('GLOBAL_TX.RATES.HEADING_PREFIX')} ${cityWithState}?`;
    this.averageMonthlyRateHeading = `${this.translate.instant('GLOBAL_TX.RATES.AVERAGE_MONTHLY_RATE_PREFIX')} ${city} ${this.translate.instant('GLOBAL_TX.RATES.AVERAGE_MONTHLY_RATE_SUFFIX')}`;
    this.comparisonHeading = `${this.translate.instant('GLOBAL_TX.RATES.COMPARISON_HEADING_PREFIX')} ${city} ${this.translate.instant('GLOBAL_TX.RATES.COMPARISON_HEADING_SUFFIX')}`;
    this.zipCodesHeading = `${this.translate.instant('GLOBAL_TX.RATES.ZIP_CODES_HEADING_PREFIX')} ${this.translate.instant('PLANO_TX.RATES.ZIP_LOCATION_POSSESSIVE')} ${this.translate.instant('GLOBAL_TX.RATES.ZIP_CODES_HEADING_SUFFIX')}`;
    this.compareRateColumns = [
      city,
      this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.COLUMNS.TEXAS_AVERAGE'),
      this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.COLUMNS.NATIONAL_AVERAGE'),
    ];
    this.compareRates = [
      {
        label: this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.LABEL'),
        values: [
          this.translate.instant('PLANO_TX.RATES.COMPARISON_TABLE.MINIMUM'),
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.TEXAS_VALUE'),
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.NATIONAL_VALUE'),
        ],
        highlighted: false,
      },
      {
        label: this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.FULL_COVERAGE.LABEL'),
        values: [
          this.translate.instant('PLANO_TX.RATES.COMPARISON_TABLE.FULL_COVERAGE'),
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

    this.faqItems = this.translate.instant('PLANO_TX.FAQ.ITEMS');
    this.neighborhoodsRows = this.translate.instant('PLANO_TX.NEIGHBORHOODS.ROWS');
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
      await this.router.navigate(this.languageService.getRoute(selected.routeKey));
    } finally {
      form.isSubmitting = false;
    }
  }

  private resetQuoteForm(form: QuoteFormState) {
    form.selectedChip = null;
    form.fullName = '';
    form.phone = '';
  }

  private createQuoteFormState(): QuoteFormState {
    return {
      selectedChip: null,
      fullName: '',
      phone: '',
      isSubmitting: false,
    };
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateTocStickyState() {
    if (typeof window === 'undefined') {
      return;
    }

    const ratesSection = this.ratesSectionRef?.nativeElement;
    const tocColumn = this.tocColumnRef?.nativeElement;
    const tocCard = this.tocCardRef?.nativeElement;
    const tocStopSection = this.tocStopSectionRef?.nativeElement;

    if (!ratesSection || !tocColumn || !tocCard || !tocStopSection || window.innerWidth <= 820) {
      this.tocCardStyles = null;
      return;
    }

    const stickyOffset = 24;
    const stopGap = 24;
    const scrollY = window.scrollY;
    const columnTop = tocColumn.getBoundingClientRect().top + scrollY;

    if (scrollY + stickyOffset < columnTop) {
      this.tocCardStyles = null;
      return;
    }

    const columnRect = tocColumn.getBoundingClientRect();
    const stopRect = tocStopSection.getBoundingClientRect();
    const cardHeight = tocCard.offsetHeight;
    const stopTop = stopRect.top + scrollY;
    const maxTop = stopTop - columnTop - cardHeight - stopGap;
    const nextTop = scrollY - columnTop + stickyOffset;
    const clampedTop = Math.max(0, Math.min(nextTop, maxTop));

    this.tocCardStyles = {
      position: 'absolute',
      top: `${clampedTop}px`,
      left: '0',
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
}
