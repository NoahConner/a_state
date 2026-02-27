import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-get-custom-quote',
  standalone: false,
  templateUrl: './get-custom-quote.html',
  styleUrl: './get-custom-quote.scss',
})
export class GetCustomQuote {

  coverageOptions: string[] = [];

  contactOptions: string[] = [];

  
  reachOptions: string[] = [];

   constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.get('GET_CUSTOM_QUOTE.STEPPER.STEP4.OPTIONS')
      .subscribe((res: string[]) => {
        this.contactOptions = res;
      });

       this.translate
      .get('GET_CUSTOM_QUOTE.STEPPER.STEP4.TIME_OPTIONS')
      .subscribe((res: string[]) => {
        this.reachOptions = res;
      });

        this.translate
      .get('GET_CUSTOM_QUOTE.STEPPER.STEP2.OPTIONS')
      .subscribe((res: string[]) => {
        this.coverageOptions = res;
      });
  }
}