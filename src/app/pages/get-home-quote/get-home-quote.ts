import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-get-home-quote',
  standalone: false,
  templateUrl: './get-home-quote.html',
  styleUrl: './get-home-quote.scss',
})
export class GetHomeQuote {

  // languageOptions: any;

  contactOptions: string[] = [];
  timeOptions: string[] = [];

  
  // reachOptions: string[] = [];

   constructor(private translate: TranslateService) {}

  ngOnInit() {
       this.translate
      .get('GET_AUTO_QUOTE.STEPPER.STEP5.CONTACT_OPTIONS')
      .subscribe((res: string[]) => {
        this.contactOptions = res;
      });

        this.translate
      .get('GET_AUTO_QUOTE.STEPPER.STEP5.TIME_OPTIONS')
      .subscribe((res: string[]) => {
        this.timeOptions = res;
      });
  }
}