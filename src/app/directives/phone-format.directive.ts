import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Optional, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'input[appPhoneFormat], input[formControlName=phone_number]',
  standalone: false,
})
export class PhoneFormatDirective implements OnInit, OnDestroy {
  private valueChangesSub?: Subscription;
  private isWritingValue = false;

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
    @Optional() @Self() private ngControl?: NgControl,
  ) {}

  ngOnInit() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'inputmode', 'tel');

    if (this.ngControl?.control) {
      this.valueChangesSub = this.ngControl.control.valueChanges.subscribe((value) => {
        if (this.isWritingValue) {
          return;
        }
        this.applyFormattedValue(this.formatPhone(value ?? ''));
      });
    }

    queueMicrotask(() => {
      this.applyFormattedValue(this.formatPhone(this.elementRef.nativeElement.value));
    });
  }

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.applyFormattedValue(this.formatPhone(input?.value ?? ''));
  }

  @HostListener('blur')
  onBlur() {
    this.applyFormattedValue(this.formatPhone(this.elementRef.nativeElement.value));
  }

  private applyFormattedValue(formattedValue: string) {
    const input = this.elementRef.nativeElement;
    if (input.value !== formattedValue) {
      this.renderer.setProperty(input, 'value', formattedValue);
    }

    if (this.ngControl?.control && this.ngControl.control.value !== formattedValue) {
      this.isWritingValue = true;
      this.ngControl.control.setValue(formattedValue, { emitEvent: false });
      this.isWritingValue = false;
    }
  }

  private formatPhone(rawValue: string): string {
    const digits = rawValue.replace(/\D/g, '').slice(0, 10);

    if (!digits.length) {
      return '';
    }

    if (digits.length <= 3) {
      return `(${digits}`;
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
}
