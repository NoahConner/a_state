import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { QuoteLeadCaptureService } from '../services/quote-lead-capture.service';

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
