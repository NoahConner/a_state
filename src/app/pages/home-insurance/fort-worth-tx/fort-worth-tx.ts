import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../services/language';
import { QuoteLeadCaptureService } from '../../../services/quote-lead-capture.service';

@Component({
  selector: 'app-homeowners-fort-worth-tx',
  standalone: false,
  templateUrl: './fort-worth-tx.html',
  styleUrl: './fort-worth-tx.scss',
})
export class HomeownersFortWorthTx implements AfterViewInit {
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
    { company: '<a class="company-name inline-link" href="https://www.republicindemnity.com/" rel="nofollow" target="_blank">Republic Indemnity</a>', premium: '$2,273' },
    { company: '<a class="company-name inline-link" href="https://www.mercuryinsurance.com/" rel="nofollow" target="_blank">Mercury</a>', premium: '$2,811' },
    { company: '<a class="company-name inline-link" href="https://www.afi.org/" rel="nofollow" target="_blank">Armed Forces Insurance Exchange</a>', premium: '$2,816' },
    { company: '<a class="company-name inline-link" href="https://www.txfb-ins.com/" rel="nofollow" target="_blank">Texas Farm Bureau Group</a>', premium: '$3,118' },
    { company: '<a class="company-name inline-link" href="https://www.farmers.com/" rel="nofollow" target="_blank">Farmers</a>', premium: '$3,801' },
    { company: '<a class="company-name inline-link" href="https://bankersinsurance.com/" rel="nofollow" target="_blank">Bankers Insurance Group</a>', premium: '$4,333' },
    { company: '<a class="company-name inline-link" href="https://www.statefarm.com/" rel="nofollow" target="_blank">State Farm</a>', premium: '$4,771' },
    { company: '<a class="company-name inline-link" href="https://www.asi-assurance.org/" rel="nofollow" target="_blank">ASI</a>', premium: '$4,916' },
    { company: '<a class="company-name inline-link" href="https://www.allstate.com/" rel="nofollow" target="_blank">Allstate</a>', premium: '$5,681' },
    { company: '<a class="company-name inline-link" href="http://travelers" rel="nofollow" target="_blank">Travelers</a>', premium: '$5,764' },
    { company: '<a class="company-name inline-link" href="https://www.foremost.com/insurance/home/" rel="nofollow" target="_blank">Foremost</a>', premium: '$5,905' },
    { company: '<a class="company-name inline-link" href="https://www.nationwide.com/" rel="nofollow" target="_blank">Nationwide</a>', premium: '$6,115' },
    { company: '<a class="company-name inline-link" href="https://www.texasfairplan.org/" rel="nofollow" target="_blank">Texas Fair Plan Association</a>', premium: '$6,946' },
    { company: '<a class="company-name inline-link" href="https://www.occidental-ins.com/" rel="nofollow" target="_blank">Occidental/Acceptance Group</a>', premium: '$8,084' },
    { company: '<a class="company-name inline-link" href="https://www.chubb.com/us-en/individuals-families.html" rel="nofollow" target="_blank">Chubb</a>', premium: '$8,580' },
    { company: '<a class="company-name inline-link" href="https://www.guard.com/amguard-insurance-company/" rel="nofollow" target="_blank">AmGUARD Insurance Company</a>', premium: '$9,159' },
  ];

  zipRateRows = [
    { zipCode: '76179', neighborhood: 'Saginaw', annualCost: '$3,504', highlighted: false },
    { zipCode: '76137', neighborhood: 'Heritage', annualCost: '$3,287', highlighted: true },
    { zipCode: '76133', neighborhood: 'Wedgwood', annualCost: '$2,890', highlighted: false },
    { zipCode: '76119', neighborhood: 'Forest Hill', annualCost: '$3,179', highlighted: true },
    { zipCode: '76116', neighborhood: 'Ridglea', annualCost: '$3,422', highlighted: false },
    { zipCode: '76131', neighborhood: 'Alliance', annualCost: '$3,352', highlighted: true },
    { zipCode: '76108', neighborhood: 'Western Hills', annualCost: '$3,233', highlighted: false },
    { zipCode: '76112', neighborhood: 'Woodhaven', annualCost: '$3,034', highlighted: true },
    { zipCode: '76123', neighborhood: 'Summer Creek', annualCost: '$3,098', highlighted: false },
    { zipCode: '76106', neighborhood: 'Northside', annualCost: '$3,301', highlighted: true },
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
    const city = this.translate.instant('FORT_WORTH_HOME_TX.TABLE_OF_CONTENTS.LOCATION');
    const cityWithState = `${city}${this.translate.instant('GLOBAL_HOME_TX.LOCATION.STATE_SUFFIX')}`;
    this.ratesHeading = `${this.translate.instant('GLOBAL_HOME_TX.RATES.HEADING_PREFIX')} ${cityWithState}`;
    this.averageAnnualRateHeading = `${this.translate.instant('GLOBAL_HOME_TX.RATES.AVERAGE_ANNUAL_RATE_PREFIX')} ${city}`;
    this.comparisonHeading = `${this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_HEADING_PREFIX')} ${city} ${this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_HEADING_SUFFIX')}`;
    this.zipCodesHeading = `${this.translate.instant('GLOBAL_HOME_TX.RATES.ZIP_CODES_HEADING_PREFIX')} ${this.translate.instant('FORT_WORTH_HOME_TX.RATES.ZIP_LOCATION_POSSESSIVE')} ${this.translate.instant('GLOBAL_HOME_TX.RATES.ZIP_CODES_HEADING_SUFFIX')}`;
    this.compareRateColumns = [
      city,
      this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.COLUMNS.TEXAS_AVERAGE'),
      this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.COLUMNS.NATIONAL_AVERAGE'),
    ];
    this.compareRates = [
      {
        label: this.translate.instant('GLOBAL_HOME_TX.RATES.COMPARISON_TABLE.ROWS.AVERAGE_ANNUAL.LABEL'),
        values: [
          this.translate.instant('FORT_WORTH_HOME_TX.RATES.COMPARISON_CITY_VALUE'),
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

    this.faqItems = this.translate.instant('FORT_WORTH_HOME_TX.FAQ.ITEMS');
    this.neighborhoodsRows = this.translate.instant('FORT_WORTH_HOME_TX.NEIGHBORHOODS.ROWS');
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
