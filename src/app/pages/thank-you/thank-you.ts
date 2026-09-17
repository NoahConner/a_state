import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'app-thank-you',
  standalone: false,
  templateUrl: './thank-you.html',
  styleUrls: ['./thank-you.scss'],
})
export class Thankyou {
  type: string = 'contact';

  socialLinks = [
    { icon: 'fa-brands fa-facebook', href: 'https://www.facebook.com/astateinsurancetx', label: 'Facebook' },
    { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/astateinsurance/', label: 'Instagram' },
    { icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/@a-state-insurance', label: 'YouTube' },
    { icon: 'fa-brands fa-tiktok', href: 'https://www.tiktok.com/@astateinsurancetx', label: 'TikTok' },
    { icon: 'fa-brands fa-pinterest', href: 'https://www.pinterest.com/astateinsurance/', label: 'Pinterest' },
    { icon: 'fa-brands fa-snapchat', href: 'https://www.snapchat.com/@astateinsurance', label: 'Snapchat' },
    { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/astateinsurance', label: 'X' },
    { icon: 'fa-brands fa-threads', href: null, label: 'Threads' },
  ];

  constructor(
    private route: ActivatedRoute,
    public languageService: Language,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.type = params['type'] || 'contact';
    });
  }

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
