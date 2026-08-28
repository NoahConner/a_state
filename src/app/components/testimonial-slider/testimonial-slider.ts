import {
  Component,
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
  ) {}

  ngOnInit() {
    this.loadTestimonials();

    this.translate.onLangChange.subscribe(() => {
      this.loadTestimonials();
    });

    if (isPlatformBrowser(this.platformId)) {
      // defer past hydration so the first client render matches the server
      setTimeout(() => this.updateIsMobile());
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateIsMobile();
    }
  }

  private updateIsMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  loadTestimonials() {
    this.translate.get('HOME.TESTIMONIALS.ITEMS').subscribe((res: any) => {
      this.testimonials = res;
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
