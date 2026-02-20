import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  standalone: false,
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy {
  personalList: string[] = [];

  AUTO_LIST: string[] = [];

  constructor(private translate: TranslateService) {
    // Load the AUTO_LIST from the JSON translation file
    this.translate.get('PRIVACY.INFORMATION_COLLECT.AUTO_LIST').subscribe((res: string[]) => {
      this.AUTO_LIST = res;
    });

    this.translate.get('PRIVACY.INFORMATION_COLLECT.PERSONAL_LIST').subscribe((res: string[]) => {
      this.personalList = res;
    });
  }
}
