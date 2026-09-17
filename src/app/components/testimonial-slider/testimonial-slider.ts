import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonial-slider',
  templateUrl: './testimonial-slider.html',
  styleUrls: ['./testimonial-slider.scss'],
  standalone: false,
})
export class TestimonialSliderComponent implements OnInit {
  testimonials: any[] = [];
  readonly stars = Array.from({ length: 5 });
  isMobile = false;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadTestimonials();

    this.translate.onLangChange.subscribe(() => {
      this.loadTestimonials();
    });

    if (isPlatformBrowser(this.platformId)) {
      // defer past hydration so the first client render matches the server
      setTimeout(() => this.refreshLayout());
      document.fonts?.ready.then(() => this.updateCardHeight());
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.refreshLayout();
    }
  }

  private updateIsMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  private refreshLayout() {
    this.updateIsMobile();
    this.changeDetectorRef.detectChanges();
    this.updateCardHeight();
  }

  /**
   * Gives every card the height of the tallest testimonial. Slides that are not
   * active are display:none, so they are shown invisibly just long enough to measure.
   */
  private updateCardHeight() {
    const host = this.elementRef.nativeElement;
    host.style.removeProperty('--testimonial-card-height');

    const hiddenItems = Array.from(
      host.querySelectorAll<HTMLElement>('.carousel-item:not(.active)'),
    );
    hiddenItems.forEach((item) => {
      item.style.cssText = 'display:block;position:absolute;top:0;left:0;width:100%;visibility:hidden;';
    });

    const cards = Array.from(host.querySelectorAll<HTMLElement>('.testimonial-card'));
    const tallest = Math.max(0, ...cards.map((card) => card.offsetHeight));

    hiddenItems.forEach((item) => (item.style.cssText = ''));

    if (tallest) {
      host.style.setProperty('--testimonial-card-height', `${tallest}px`);
    }
  }

  loadTestimonials() {
    this.translate.get('HOME.TESTIMONIALS.ITEMS').subscribe((res: any) => {
      this.testimonials = res;

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.changeDetectorRef.detectChanges();
          this.updateCardHeight();
        });
      }
    });
  }

  get groupedTestimonials() {
    const chunkSize = this.isMobile ? 1 : 2;
    const groups = [];
    for (let i = 0; i < this.testimonials.length; i += chunkSize) {
      groups.push(this.testimonials.slice(i, i + chunkSize));
    }
    return groups;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}
