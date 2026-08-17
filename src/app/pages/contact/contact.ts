import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  constructor(private router: Router, public languageService: Language) { }
  goToThankYou() {
    // Navigate to thank-you page with query param type=contact
    this.router.navigate(['/thank-you'], { queryParams: { type: 'contact' } });
  }

  getRoute(page: string) {
    return this.languageService.getRoute(page);
  }
}
