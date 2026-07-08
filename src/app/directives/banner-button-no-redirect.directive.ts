import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteLeadCaptureService } from '../services/quote-lead-capture.service';
import { Language } from '../services/language';

@Directive({
  selector: 'button[appBannerQuoteSubmit]',
  standalone: false,
})
export class BannerButtonNoRedirectDirective implements AfterViewInit, OnDestroy {
  private cleanupListeners: Array<() => void> = [];
  private isSubmitting = false;
  private defaultButtonText = '';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private quoteLeadCaptureService: QuoteLeadCaptureService,
    private renderer: Renderer2,
    private router: Router,
    private languageService: Language,
  ) {}

  ngAfterViewInit() {
    const bannerContainer = this.elementRef.nativeElement.closest('.topSub2');
    if (!bannerContainer || !this.hasBannerForm(bannerContainer)) {
      return;
    }

    this.defaultButtonText = this.elementRef.nativeElement.textContent?.trim() || 'Get a Quote';

    this.cleanupListeners.push(
      this.renderer.listen(bannerContainer, 'click', () => {
        setTimeout(() => this.updateDisabledState(), 0);
      }),
    );
    this.cleanupListeners.push(
      this.renderer.listen(bannerContainer, 'input', () => {
        this.updateDisabledState();
      }),
    );

    this.updateDisabledState();
  }

  ngOnDestroy() {
    this.cleanupListeners.forEach((cleanup) => cleanup());
    this.cleanupListeners = [];
  }

  @HostListener('click', ['$event'])
  async handleClick(event: Event) {
    const bannerContainer = this.elementRef.nativeElement.closest('.topSub2');
    if (!bannerContainer || !this.hasBannerForm(bannerContainer)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    if (this.isSubmitting) {
      return;
    }

    const selectedChip = bannerContainer.querySelector<HTMLElement>(
      '.chip.selected, .quote-option.selected',
    );
    const inputs = bannerContainer.querySelectorAll<HTMLInputElement>(
      '.inps input, .quote-form-row input',
    );

    if (!selectedChip || inputs.length < 2) {
      return;
    }

    this.isSubmitting = true;
    this.setButtonLoadingState(true);

    try {
      const isSubmitted = await this.quoteLeadCaptureService.submitLead({
        selected_chip: selectedChip.textContent?.trim() || '',
        full_name: inputs[0]?.value || '',
        phone_number: inputs[1]?.value || '',
      });

      if (!isSubmitted) {
        return;
      }

      selectedChip.classList.remove('selected');
      selectedChip.setAttribute('aria-pressed', 'false');

      inputs.forEach((input) => {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      const redirectRoute = this.resolveRedirectRoute(selectedChip);
      if (redirectRoute) {
        await this.router.navigate(redirectRoute);
      }
    } finally {
      this.isSubmitting = false;
      this.setButtonLoadingState(false);
      this.updateDisabledState();
    }
  }

  private updateDisabledState() {
    const bannerContainer = this.elementRef.nativeElement.closest('.topSub2');
    if (!bannerContainer || !this.hasBannerForm(bannerContainer)) {
      return;
    }

    const selectedChip = bannerContainer.querySelector<HTMLElement>(
      '.chip.selected, .quote-option.selected',
    );
    const inputs = bannerContainer.querySelectorAll<HTMLInputElement>(
      '.inps input, .quote-form-row input',
    );
    const hasAllValues =
      !!selectedChip &&
      inputs.length >= 2 &&
      !!inputs[0]?.value.trim() &&
      !!inputs[1]?.value.trim();

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      this.isSubmitting || !hasAllValues,
    );
  }

  private hasBannerForm(container: Element) {
    return !!container.querySelector('.inps input, .quote-form-row input');
  }

  private resolveRedirectRoute(selectedChip: HTMLElement): string[] | null {
    const chipKey = selectedChip.getAttribute('data-chip-key') || '';
    const parentRouteKey = this.resolveParentRouteKey();

    if (parentRouteKey) {
      return this.languageService.getRoute(parentRouteKey);
    }

    const chipRouteMap: Record<string, string> = {
      'HOME.BANNER.CHIPS.AUTO': 'autoInsurance',
      'HOME.BANNER.CHIPS.HOMEOWNERS': 'homeInsurance',
      'HOME.BANNER.CHIPS.COMMERCIAL': 'commercialInsurance',
      'HOME.BANNER.CHIPS.LIFE': 'lifeInsurance',
      'HOME.BANNER.CHIPS.HEALTH': 'healthInsurance',
      'HOME.BANNER.CHIPS.SURETY': 'suretyBondInsurance',

      'AUTO_INSURANCE.BANNER.CHIPS.PERSONAL_CAR': 'carInsurance',
      'AUTO_INSURANCE.BANNER.CHIPS.COMMERCIAL_AUTO': 'commercialAutoInsurance',
      'AUTO_INSURANCE.BANNER.CHIPS.RIDESHARE': 'rideshareInsurance',
      'AUTO_INSURANCE.BANNER.CHIPS.SR22': 'sr22Insurance',
      'AUTO_INSURANCE.BANNER.CHIPS.RV_MOTORHOME': 'rvInsurance',

      'HOME_INSURANCE.BANNER.CHIPS.CONDO': 'condoInsurance',
      'HOME_INSURANCE.BANNER.CHIPS.RENTERS': 'rentersInsurance',
      'HOME_INSURANCE.BANNER.CHIPS.OLDER_HOME': 'manufacturedMobileHomeInsurance',

      'COMMERCIAL_INSURANCE.BANNER.CHIPS.GENERAL_LIABILITY': 'generalLiabilityInsurance',
      'COMMERCIAL_INSURANCE.BANNER.CHIPS.BUSINESS_OWNERS': 'businessOwnerInsurance',
      'COMMERCIAL_INSURANCE.BANNER.CHIPS.COMMERCIAL_AUTO': 'commercialAutoInsurance',
      'COMMERCIAL_INSURANCE.BANNER.CHIPS.WORKERS_COMPENSATION': 'workersCompensationInsurance',
      'COMMERCIAL_INSURANCE.BANNER.CHIPS.PROFESSIONAL_LIABILITY': 'professionalLiabilityInsurance',

      'LIFE_INSURANCE.BANNER.CHIPS.TERM_LIFE': 'termLifeInsurance',
      'LIFE_INSURANCE.BANNER.CHIPS.WHOLE_LIFE': 'wholeLifeInsurance',
      'LIFE_INSURANCE.BANNER.CHIPS.UNIVERSAL_LIFE': 'universalLifeInsurance',
      'LIFE_INSURANCE.BANNER.CHIPS.FINAL_EXPENSE': 'finalExpenseInsurance',
      'LIFE_INSURANCE.BANNER.CHIPS.GROUP_LIFE': 'groupLifeInsurance',

      'HEALTH_INSURANCE.BANNER.CHIPS.INDIVIDUAL_FAMILY': 'individualHealthInsurance',
      'HEALTH_INSURANCE.BANNER.CHIPS.MEDICARE_SUPPLEMENT': 'medicareSupplementInsurance',
      'HEALTH_INSURANCE.BANNER.CHIPS.SHORT_TERM': 'shortTermHealthInsurance',
      'HEALTH_INSURANCE.BANNER.CHIPS.DENTAL_VISION': 'dentalVisionInsurance',
      'HEALTH_INSURANCE.BANNER.CHIPS.GROUP_EMPLOYER': 'employerGroupHealthInsurance',

      'SURETY_INSURANCE.BANNER.CHIPS.CONTRACT_CONSTRUCTION': 'performanceBondsPaymentBonds',
      'SURETY_INSURANCE.BANNER.CHIPS.COMMERCIAL': 'commercialSuretyBonds',
      'SURETY_INSURANCE.BANNER.CHIPS.LICENSE_PERMIT': 'notaryBonds',
    };

    const directRouteKey = chipRouteMap[chipKey];
    if (directRouteKey) {
      return this.languageService.getRoute(directRouteKey);
    }

    return null;
  }

  private resolveParentRouteKey(): string | null {
    const currentUrl = this.router.url.split('?')[0].split('#')[0];
    const normalizedUrl = currentUrl.endsWith('/') && currentUrl.length > 1
      ? currentUrl.slice(0, -1)
      : currentUrl;

    const parentRoutePrefixes: Array<{ prefixes: string[]; routeKey: string }> = [
      {
        prefixes: ['/auto-insurance/', '/es/seguros-de-auto/'],
        routeKey: 'getAutoQuote',
      },
      {
        prefixes: ['/homeowners-insurance/', '/es/seguros-de-vivienda/'],
        routeKey: 'getHomeQuote',
      },
      {
        prefixes: ['/commercial-insurance/', '/es/seguros-comerciales/'],
        routeKey: 'getCommercialQuote',
      },
      {
        prefixes: ['/life-insurance/', '/es/seguros-de-vida/'],
        routeKey: 'getLifeQuote',
      },
      {
        prefixes: ['/health-insurance/', '/es/seguros-de-salud/'],
        routeKey: 'getHealthQuote',
      },
      {
        prefixes: ['/surety-bonds/', '/es/fianzas/'],
        routeKey: 'getSuretyQuote',
      },
      {
        prefixes: ['/title-insurance', '/es/seguro-de-titulo'],
        routeKey: 'requestACustomQuote',
      },
      {
        prefixes: ['/title-transfer', '/es/traspaso-de-titulo'],
        routeKey: 'requestACustomQuote',
      },
      {
        prefixes: ['/pet-insurance', '/es/seguro-para-mascotas'],
        routeKey: 'requestACustomQuote',
      },
    ];

    const matchedParent = parentRoutePrefixes.find(({ prefixes }) =>
      prefixes.some((prefix) => normalizedUrl.startsWith(prefix)),
    );

    return matchedParent?.routeKey || null;
  }

  private setButtonLoadingState(isLoading: boolean) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'textContent',
      isLoading ? 'Loading...' : this.defaultButtonText,
    );
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'aria-busy',
      isLoading ? 'true' : 'false',
    );
  }
}
