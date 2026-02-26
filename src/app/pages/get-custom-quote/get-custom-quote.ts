import { Component } from '@angular/core';

@Component({
  selector: 'app-get-custom-quote',
  standalone: false,
  templateUrl: './get-custom-quote.html',
  styleUrl: './get-custom-quote.scss',
})
export class GetCustomQuote {

  coverageOptions: string[] = [
    'Auto',
    'Home',
    'Commercial',
    'Life',
    'Health',
    'Surety Bonds',
    'Bundle & Save'
  ];
}
