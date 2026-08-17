import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonial-slider',
  templateUrl: './testimonial-slider.html',
  styleUrls: ['./testimonial-slider.scss'],
  standalone: false,
})
export class TestimonialSliderComponent implements OnInit {
  testimonials: any[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadTestimonials();

    this.translate.onLangChange.subscribe(() => {
      this.loadTestimonials();
    });
  }

  loadTestimonials() {
    this.translate.get('HOME.TESTIMONIALS.ITEMS').subscribe((res: any) => {
      this.testimonials = res;
    });
  }

  get groupedTestimonials() {
    const chunkSize = 3;
    const groups = [];
    for (let i = 0; i < this.testimonials.length; i += chunkSize) {
      groups.push(this.testimonials.slice(i, i + chunkSize));
    }
    return groups;
  }
}
