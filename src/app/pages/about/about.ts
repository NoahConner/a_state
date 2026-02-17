import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  chips = [
    { name: 'HOME.BANNER.CHIPS.AUTO', icon: 'fas fa-car' },
    { name: 'HOME.BANNER.CHIPS.HOMEOWNERS', icon: 'fas fa-house' },
    { name: 'HOME.BANNER.CHIPS.COMMERCIAL', icon: 'fas fa-building' },
    { name: 'HOME.BANNER.CHIPS.LIFE', icon: 'fas fa-heart' },
    { name: 'HOME.BANNER.CHIPS.HEALTH', icon: 'fas fa-notes-medical' },
    { name: 'HOME.BANNER.CHIPS.SURETY', icon: 'fas fa-file-contract' },
  ];
}
