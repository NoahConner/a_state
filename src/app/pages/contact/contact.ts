import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  constructor(private router: Router) {}
  goToThankYou() {
    // Navigate to thank-you page with query param type=contact
    this.router.navigate(['/thank-you'], { queryParams: { type: 'contact' } });
  }
}
