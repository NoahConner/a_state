import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../services/language';

@Directive({
  selector: '[appChipNav]',
  standalone: false,
})
export class ChipNavigationDirective implements OnInit {
  @Input() appChipNav = '';

  @HostBinding('class.selected') isSelected = false;
  @HostBinding('attr.aria-pressed') get ariaPressed() {
    return this.isSelected ? 'true' : 'false';
  }

  private readonly chipRouteMap: Record<string, string> = {
    'HOME.BANNER.CHIPS.AUTO': 'autoInsurance',
    'HOME.BANNER.CHIPS.HOMEOWNERS': 'homeInsurance',
    'HOME.BANNER.CHIPS.COMMERCIAL': 'commercialInsurance',
    'HOME.BANNER.CHIPS.LIFE': 'lifeInsurance',
    'HOME.BANNER.CHIPS.HEALTH': 'healthInsurance',
    'HOME.BANNER.CHIPS.SURETY': 'suretyBonds',

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

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private router: Router,
    private languageService: Language,
  ) {}

  ngOnInit() {
    const routeKey = this.getRouteKey();

    this.renderer.setStyle(this.elementRef.nativeElement, 'appearance', 'none');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'button');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '0');

    if (routeKey) {
      const urlTree = this.router.createUrlTree(this.languageService.getRoute(routeKey));
      this.isSelected = this.router.isActive(urlTree, {
        paths: 'exact',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored',
      });
    }
  }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    this.selectCurrentChip();

    const routeKey = this.getRouteKey();
    if (!routeKey) {
      event.preventDefault();
      return;
    }

    this.router.navigate(this.languageService.getRoute(routeKey));
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleKeyboard(event: Event) {
    this.handleClick(event);
  }

  private getRouteKey() {
    return this.chipRouteMap[this.appChipNav] || '';
  }

  private selectCurrentChip() {
    const currentChip = this.elementRef.nativeElement;
    const chipContainer = currentChip.closest('.topSub2') || currentChip.closest('.selectable')?.parentElement;

    chipContainer?.querySelectorAll('.chip.selected').forEach((chip) => {
      if (chip !== currentChip) {
        this.renderer.removeClass(chip, 'selected');
        this.renderer.setAttribute(chip, 'aria-pressed', 'false');
      }
    });

    this.isSelected = true;
  }
}
