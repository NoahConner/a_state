import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-get-health-quote',
  standalone: false,
  templateUrl: './get-health-quote.html',
  styleUrl: './get-health-quote.scss',
})
export class GetHealthQuote {

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