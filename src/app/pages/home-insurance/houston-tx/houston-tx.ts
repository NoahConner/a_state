import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../services/language';
import { QuoteLeadCaptureService } from '../../../services/quote-lead-capture.service';

@Component({
  selector: 'app-homeowners-houston-tx',
  standalone: false,
  templateUrl: './houston-tx.html',
  styleUrl: './houston-tx.scss',
})
export class HomeownersHoustonTx implements AfterViewInit {
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
    { name: 'GLOBAL_HOME_TX.BANNER.CHIPS.STANDARD', image: '/assets/images/homeowners-city/houston-tx/car.png' },
    { name: 'GLOBAL_HOME_TX.BANNER.CHIPS.CONDO', image: '/assets/images/homeowners-city/houston-tx/truck.png' },
    { name: 'GLOBAL_HOME_TX.BANNER.CHIPS.LANDLORD', image: '/assets/images/homeowners-city/houston-tx/truck-1.png' },
    { name: 'GLOBAL_HOME_TX.BANNER.CHIPS.MOBILE', image: '/assets/images/homeowners-city/houston-tx/truck-3.png' },
    { name: 'GLOBAL_HOME_TX.BANNER.CHIPS.RENTERS', image: '/assets/images/homeowners-city/houston-tx/truck-2.png' },
    { name: 'GLOBAL_HOME_TX.BANNER.CHIPS.OTHER', image: '/assets/images/homeowners-city/houston-tx/shield with cross.png' },
  ];

  tableOfContents: string[] = [];
  ratesHeading = '';
  averageAnnualRateHeading = '';
  comparisonHeading = '';
  zipCodesHeading = '';
  compareRateColumns: string[] = [];
  compareRates: { label: string; values: string[]; highlighted: boolean }[] = [];

  annualRates = [
    { company: '<a class="company-name inline-link" href="https://www.republicgroup.com/" rel="nofollow" target="_blank">Republic Indemnity</a>', premium: '$1,416' },
    { company: '<a class="company-name inline-link" href="https://www.travelers.com/" rel="nofollow" target="_blank">Travelers</a>', premium: '$2,304' },
    { company: '<a class="company-name inline-link" href="https://www.foremost.com/" rel="nofollow" target="_blank">Foremost</a>', premium: '$2,832' },
    { company: '<a class="company-name inline-link" href="https://www.nationwide.com/" rel="nofollow" target="_blank">Nationwide</a>', premium: '$3,252' },
    { company: '<a class="company-name inline-link" href="https://www.statefarm.com/" rel="nofollow" target="_blank">State Farm</a>', premium: '$3,984' },
    { company: '<a class="company-name inline-link" href="https://www.usaa.com/" rel="nofollow" target="_blank">USAA</a>', premium: '$4,164' },
    { company: '<a class="company-name inline-link" href="https://www.mercuryinsurance.com/" rel="nofollow" target="_blank">Mercury</a>', premium: '$4,332' },
    { company: '<a class="company-name inline-link" href="https://www.farmers.com/" rel="nofollow" target="_blank">Farmers</a>', premium: '$5,016' },
    { company: '<a class="company-name inline-link" href="https://www.allstate.com/" rel="nofollow" target="_blank">Allstate</a>', premium: '$5,184' },
    { company: '<a class="company-name inline-link" href="https://www.chubb.com/" rel="nofollow" target="_blank">Chubb</a>', premium: '$7,020' },
  ];

  zipRateRows = [
    { zipCode: '77084', neighborhood: 'Addicks', annualCost: '$2,755', highlighted: false },
    { zipCode: '77083', neighborhood: 'Mission Bend', annualCost: '$2,876', highlighted: true },
    { zipCode: '77095', neighborhood: 'Copperfield', annualCost: '$2,613', highlighted: false },
    { zipCode: '77036', neighborhood: 'Sharpstown', annualCost: '$2,929', highlighted: true },
    { zipCode: '77072', neighborhood: 'Alief', annualCost: '$2,852', highlighted: false },
    { zipCode: '77077', neighborhood: 'Energy Corridor', annualCost: '$2,709', highlighted: true },
    { zipCode: '77089', neighborhood: 'South Belt', annualCost: '$3,360', highlighted: false },
    { zipCode: '77070', neighborhood: 'Willowbrook', annualCost: '$2,998', highlighted: true },
    { zipCode: '77015', neighborhood: 'Cloverleaf', annualCost: '$3,153', highlighted: false },
    { zipCode: '77088', neighborhood: 'Acres Homes', annualCost: '$3,048', highlighted: true },
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
    const city = this.translate.instant('HOUSTON_HOME_TX.TABLE_OF_CONTENTS.LOCATION');
    const cityWithState = `${city}${this.translate.instant('GLOBAL_HOME_TX.LOCATION.STATE_SUFFIX')}`;
    this.ratesHeading = `${this.translate.instant('GLOBAL_HOME_TX.RATES.HEADING_PREFIX')} ${cityWithState}`;
    this.averageAnnualRateHeading = `${this.translate.instant('GLOBAL_HOME_TX.RATES.AVERAGE_ANNUAL_RATE_PREFIX')} ${city}`;
    this.comparisonHeading = `${this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_HEADING_PREFIX')} ${city} ${this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_HEADING_SUFFIX')}`;
    this.zipCodesHeading = `${this.translate.instant('GLOBAL_HOME_TX.RATES.ZIP_CODES_HEADING_PREFIX')} ${this.translate.instant('HOUSTON_HOME_TX.RATES.ZIP_LOCATION_POSSESSIVE')} ${this.translate.instant('GLOBAL_HOME_TX.RATES.ZIP_CODES_HEADING_SUFFIX')}`;
    this.compareRateColumns = [
      city,
      this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.COLUMNS.TEXAS_AVERAGE'),
      this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.COLUMNS.NATIONAL_AVERAGE'),
    ];
    this.compareRates = [
      {
        label: this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.ROWS.AVERAGE_ANNUAL.LABEL'),
        values: [
          this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.ROWS.AVERAGE_ANNUAL.HOUSTON_VALUE'),
          this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.ROWS.AVERAGE_ANNUAL.TEXAS_VALUE'),
          this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.ROWS.AVERAGE_ANNUAL.NATIONAL_VALUE'),
        ],
        highlighted: true,
      },
    ];

    this.tableOfContents = [
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.WHY_LOCAL_BEFORE')} ${city} ${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.WHY_LOCAL_AFTER')}`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.NEIGHBORHOODS')} ${cityWithState}`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.COVERS')} ${cityWithState}?`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.NOT_COVERED')} ${cityWithState}?`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.RISKS_BEFORE')}${city}${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.RISKS_AFTER')}`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.COST')} ${cityWithState}`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.RATE_FACTORS')} ${cityWithState}?`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.SAVE_MONEY')} ${city} ${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.HOMEOWNERS')}`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.WHY_INDEPENDENT')} ${cityWithState}`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.TYPES')} ${cityWithState}`,
      `${this.wrapHighlight('GLOBAL_HOME_TX.TABLE_OF_CONTENTS.ITEMS.FAQ')} ${cityWithState}`,
    ];

    this.faqItems = this.translate.instant('HOUSTON_HOME_TX.FAQ.ITEMS');
    this.neighborhoodsRows = this.translate.instant('HOUSTON_HOME_TX.NEIGHBORHOODS.ROWS');
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
      await this.router.navigate(this.languageService.getRoute('getHomeQuote'));
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
