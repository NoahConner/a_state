import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../services/language';
import { QuoteLeadCaptureService } from '../../../services/quote-lead-capture.service';

@Component({
  selector: 'app-houston-tx',
  standalone: false,
  templateUrl: './houston-tx.html',
  styleUrl: './houston-tx.scss',
})
export class HoustonTx {
  constructor(
    public languageService: Language,
    private translate: TranslateService,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
  ) {
    this.buildTableOfContents();
    this.languageService.getLanguageChange().subscribe(() => this.buildTableOfContents());
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
    { company: '<a class="company-name inline-link" href="https://texasfarmbureau.org/" rel="nofollow" target="_blank">Texas Farm Bureau</a>', minimum: '$40', fullCoverage: '$97' },
    { company: '<a class="company-name inline-link" href="https://www.usaa.com/?akredirect=true" rel="nofollow" target="_blank">USAA</a>', minimum: '$50', fullCoverage: '$130' },
    { company: '<a class="company-name inline-link" href="https://www.statefarm.com/" rel="nofollow" target="_blank">State Farm</a>', minimum: '$51', fullCoverage: '$124' },
    { company: '<a class="company-name inline-link" href="https://www.geico.com/" rel="nofollow" target="_blank">Geico</a>', minimum: '$81', fullCoverage: '$182' },
    { company: '<a class="company-name inline-link" href="https://www.progressive.com/" rel="nofollow" target="_blank">Progressive</a>', minimum: '$105', fullCoverage: '$266' },
    { company: '<a class="company-name inline-link" href="https://www.allstate.com/" rel="nofollow" target="_blank">Allstate</a>', minimum: '$106', fullCoverage: '$267' },
  ];

  zipRateRows = [
    { zipCode: '77015', neighborhood: 'Northshore', monthlyRate: '$296', highlighted: false },
    { zipCode: '77095', neighborhood: 'Copperfield', monthlyRate: '$299', highlighted: true },
    { zipCode: '77077', neighborhood: 'Energy Corridor', monthlyRate: '$302', highlighted: false },
    { zipCode: '77084', neighborhood: 'Bear Creek', monthlyRate: '$306', highlighted: true },
    { zipCode: '77089', neighborhood: 'Sagemont', monthlyRate: '$306', highlighted: false },
    { zipCode: '77083', neighborhood: 'Mission Bend', monthlyRate: '$308', highlighted: true },
    { zipCode: '77082', neighborhood: 'West Oaks', monthlyRate: '$312', highlighted: false },
    { zipCode: '77072', neighborhood: 'Alief', monthlyRate: '$316', highlighted: true },
    { zipCode: '77044', neighborhood: 'Summerwood', monthlyRate: '$316', highlighted: false },
    { zipCode: '77036', neighborhood: 'Sharpstown', monthlyRate: '$317', highlighted: true },
  ];

  faqItems = [
    {
      question: 'How much is car insurance in Houston per month?',
      answer:
        'Car insurance in Houston typically ranges from $257 to $357 per month for full coverage, depending on driving history, ZIP code, and vehicle type. Minimum liability coverage can cost around $157 monthly, making Houston one of the more expensive Texas cities for auto insurance overall consistently.',
    },
    {
      question: 'What is the minimum car insurance required in Texas?',
      answer:
        'Texas requires at least 30/60/25 liability coverage, which includes $30,000 for injuries per person, $60,000 per accident, and $25,000 for property damage you cause to others.',
    },
    {
      question: 'Why is car insurance so expensive in Houston?',
      answer:
        'Houston car insurance rates are often higher because of dense traffic, severe weather risks, frequent claims, uninsured drivers, and higher repair and medical costs across the metro area.',
    },
    {
      question: 'What\'s the cheapest car insurance in Houston?',
      answer:
        'The cheapest car insurance in Houston depends on your driving record, age, vehicle, and coverage level, but minimum coverage from lower-cost regional or national carriers is often the most affordable starting point.',
    },
    {
      question: 'Do I need flood insurance for my car in Houston?',
      answer:
        'If you want protection from flood damage in Houston, you typically need comprehensive coverage on your auto policy, since standard liability insurance does not cover weather-related damage to your own vehicle.',
    },
  ];
  neighborhoodsRows = [
    ['Acres Home', 'Addicks / Park Ten', 'Afton Oaks / River Oaks', 'Alief'],
    ['Astrodome Area', 'Braeburn', 'Braeswood', 'Brays Oaks'],
    ['Briar Forest', 'Carverdale', 'Central Northwest', 'Central Southwest'],
    ['Clear Lake', 'Clinton Park', 'Denver Harbor', 'Downtown'],
    ['East Houston', 'East Little York', 'Eastex / Jensen', 'Edgebrook'],
    ['El Dorado / Oates Prairie', 'Eldridge / West Oaks', 'Fairbanks / NW Crossing', 'Fondren Gardens'],
    ['Fort Bend / Houston', 'Fourth Ward', 'Golfcrest / Bellfort', 'Greater Eastwood'],
    ['Greater Fifth Ward', 'Greater Greenspoint', 'Greater Heights', 'Greater Hobby Area'],
    ['Greater Inwood', 'Greater Meyerland', 'Greater OST / South Union', 'Greater Third Ward'],
    ['Greater Uptown', 'Greenway / Upper Kirby', 'Gulfgate / Pine Valley', 'Gulfton'],
    ['Harrisburg / Manchester', 'Hidden Valley', 'Hunterwood', 'IAH Airport'],
    ['Independence Heights', 'Kashmere Gardens', 'Kingwood', 'Lake Houston'],
    ['Langwood', 'Lawndale / Wayside', 'Lazybrook / Timbergrove', 'MacGregor'],
    ['Magnolia Park', 'Meadowbrook / Allendale', 'Medical Center', 'Memorial'],
    ['Mid-West', 'Midtown', 'Minnetex', 'Museum Park'],
    ['Near Northside', 'Near Southwest', 'Neartown / Montrose', 'Northshore'],
    ['Northside / Northline', 'Park Place', 'Pecan Park', 'Pleasantville Area'],
    ['Second Ward', 'Settegast', 'Sharpstown', 'South Acres / Crestmont'],
    ['South Belt / Ellington', 'South Main', 'South Park', 'Spring Branch Central'],
    ['Trinity / Houston Gardens', 'University Place', 'Washington Ave / Memorial', 'Westbranch'],
    ['Westbury', 'Westchase', 'Westwood', 'Willowbrook'],
  ];
  openFaqIndex = 0;

  selectedChip: string | null = null;
  fullName = '';
  phone = '';
  isSubmitting = false;

  private wrapHighlight(key: string) {
    return `<span class="toc-highlight">${this.translate.instant(key)}</span>`;
  }

  private buildTableOfContents() {
    const city = this.translate.instant('HOUSTON_TX.TABLE_OF_CONTENTS.LOCATION');
    const cityWithState = `${city}${this.translate.instant('GLOBAL_TX.LOCATION.STATE_SUFFIX')}`;
    this.ratesHeading = `${this.translate.instant('GLOBAL_TX.RATES.HEADING_PREFIX')} ${cityWithState}?`;
    this.averageMonthlyRateHeading = `${this.translate.instant('GLOBAL_TX.RATES.AVERAGE_MONTHLY_RATE_PREFIX')} ${city} ${this.translate.instant('GLOBAL_TX.RATES.AVERAGE_MONTHLY_RATE_SUFFIX')}`;
    this.comparisonHeading = `${this.translate.instant('GLOBAL_TX.RATES.COMPARISON_HEADING_PREFIX')} ${city} ${this.translate.instant('GLOBAL_TX.RATES.COMPARISON_HEADING_SUFFIX')}`;
    this.zipCodesHeading = `${this.translate.instant('GLOBAL_TX.RATES.ZIP_CODES_HEADING_PREFIX')} ${this.translate.instant('HOUSTON_TX.RATES.ZIP_LOCATION_POSSESSIVE')} ${this.translate.instant('GLOBAL_TX.RATES.ZIP_CODES_HEADING_SUFFIX')}`;
    this.compareRateColumns = [
      city,
      this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.COLUMNS.TEXAS_AVERAGE'),
      this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.COLUMNS.NATIONAL_AVERAGE'),
    ];
    this.compareRates = [
      {
        label: this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.LABEL'),
        values: [
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.HOUSTON_VALUE'),
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.TEXAS_VALUE'),
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.MINIMUM_COVERAGE.NATIONAL_VALUE'),
        ],
        highlighted: false,
      },
      {
        label: this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.FULL_COVERAGE.LABEL'),
        values: [
          this.translate.instant('GLOBAL_TX.RATES.COMPARISON_TABLE.ROWS.FULL_COVERAGE.HOUSTON_VALUE'),
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
  }

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }

  selectChip(chipName: string) {
    this.selectedChip = chipName;
  }

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? -1 : index;
  }

  async goToSelectedQuote() {
    if (this.isSubmitting) {
      return;
    }

    const selected = this.chips.find((chip) => chip.name === this.selectedChip);
    if (!selected) {
      return;
    }

    this.isSubmitting = true;

    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: this.translate.instant(selected.name),
        full_name: this.fullName,
        phone_number: this.phone,
      });

      if (!isSubmitted) {
        return;
      }

      this.selectedChip = null;
      this.fullName = '';
      this.phone = '';
    } finally {
      this.isSubmitting = false;
    }
  }
}
