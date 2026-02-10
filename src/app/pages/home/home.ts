import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  chips = [
    {
      name: 'Auto',
      icon: 'fas fa-car',
    },
    {
      name: 'Homeowners',
      icon: 'fas fa-car',
    },
    {
      name: 'Commercial',
      icon: 'fas fa-car',
    },
    {
      name: 'Life',
      icon: 'fas fa-car',
    },
    {
      name: 'Health',
      icon: 'fas fa-car',
    },
    {
      name: 'Surety Bonds',
      icon: 'fas fa-car',
    },
  ];
}
