import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: false,
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers {
  constructor(private router: Router) {}

  personalList: string[] = [];
  autoList: string[] = [];

  goToThankYou() {
    // Navigate to thank-you page with query param type=contact
    this.router.navigate(['/thank-you'], { queryParams: { type: 'career' } });
  }
}
