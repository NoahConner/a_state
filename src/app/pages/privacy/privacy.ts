import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: false,
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy {
  personalList: string[] = [];
  autoList: string[] = [];
}
