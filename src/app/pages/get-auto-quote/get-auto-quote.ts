import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-get-auto-quote',
  standalone: false,
  templateUrl: './get-auto-quote.html',
  styleUrl: './get-auto-quote.scss',
})
export class GetAutoQuote {

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