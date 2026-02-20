import { Component } from '@angular/core';

@Component({
  selector: 'app-careers',
  standalone: false,
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers {
  personalList: string[] = [];
  autoList: string[] = [];
}
