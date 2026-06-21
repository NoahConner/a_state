import {
  Directive,
  ElementRef,
  HostBinding,
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

  @HostBinding('class.selected') isSelected = false;
  @HostBinding('attr.aria-pressed') get ariaPressed() {
    return this.isSelected ? 'true' : 'false';
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'appearance', 'none');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'button');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '0');
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
      if (chip !== currentChip) {
        this.renderer.removeClass(chip, 'selected');
        this.renderer.setAttribute(chip, 'aria-pressed', 'false');
      }
    });

    this.isSelected = true;
  }
}
