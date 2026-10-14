import { Component } from '@angular/core';

/** Content and layout live in the shared LegalPage component (LEGAL_PAGE.PRIVACY in the i18n files). */
@Component({
  selector: 'app-privacy',
  standalone: false,
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy {}
