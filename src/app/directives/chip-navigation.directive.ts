import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appChipNav]',
  standalone: false,
})
export class ChipNavigationDirective implements OnInit {
  @Input() appChipNav = '';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'appearance', 'none');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'button');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '0');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-chip-key', this.appChipNav);
    this.setSelectedState(this.elementRef.nativeElement, false);
  }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    event.preventDefault();
    this.selectCurrentChip();
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleKeyboard(event: Event) {
    event.preventDefault();
    this.handleClick(event);
  }

  private selectCurrentChip() {
    const currentChip = this.elementRef.nativeElement;
    const chipContainer = currentChip.closest('.topSub2') || currentChip.closest('.selectable')?.parentElement;

    chipContainer?.querySelectorAll('.chip.selected').forEach((chip) => {
      this.setSelectedState(chip as HTMLElement, chip === currentChip);
    });

    // Re-apply the current state explicitly so repeat selections still work
    // even if some other code removed the class directly from the DOM.
    this.setSelectedState(currentChip, true);
  }

  private setSelectedState(chip: HTMLElement, isSelected: boolean) {
    if (isSelected) {
      this.renderer.addClass(chip, 'selected');
      this.renderer.setAttribute(chip, 'aria-pressed', 'true');
      return;
    }

    this.renderer.removeClass(chip, 'selected');
    this.renderer.setAttribute(chip, 'aria-pressed', 'false');
  }
}
