import { Component } from '@angular/core';

/** Content and layout live in the shared LegalPage component (LEGAL_PAGE.TERMS in the i18n files). */
@Component({
  selector: 'app-terms',
  standalone: false,
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class Terms {}
