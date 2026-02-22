import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-thank-you',
  standalone: false,
  templateUrl: './thank-you.html',
  styleUrls: ['./thank-you.scss'],
})
export class Thankyou {
  type: string = 'contact';

  titleLine1: string = '';
  titleLine2: string = '';
  description: any;
  button: string = '';

  constructor(private route: ActivatedRoute, private translate: TranslateService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.type = params['type'] || 'contact';
      this.setContent();
    });
  }

  setContent() {
    const key = this.type === 'career' ? 'THANK_YOU_CAREER' : 'THANK_YOU_CONTACT';

    this.translate
      .get([`${key}.TITLE_LINE1`, `${key}.TITLE_LINE2`, `${key}.DESCRIPTION`, `${key}.BUTTON`])
      .subscribe((res) => {
        this.titleLine1 = `${key}.TITLE_LINE1`;
        this.titleLine2 = `${key}.TITLE_LINE2`;
        this.description = `${key}.DESCRIPTION`;
        this.button = `${key}.BUTTON`;
      });
  }
}
