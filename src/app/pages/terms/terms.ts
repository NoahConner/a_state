import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: false,
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class Terms {
  termsSections = [
    {
      title: 'TERMS_PAGE.ACCEPTANCE.TITLE',
      paragraphs: ['TERMS_PAGE.ACCEPTANCE.P1', 'TERMS_PAGE.ACCEPTANCE.P2'],
    },
    {
      title: 'TERMS_PAGE.ABOUT.TITLE',
      paragraphs: ['TERMS_PAGE.ABOUT.P1', 'TERMS_PAGE.ABOUT.P2'],
    },
    {
      title: 'TERMS_PAGE.USE.TITLE',
      paragraphs: ['TERMS_PAGE.USE.P1', 'TERMS_PAGE.USE.P2'],
    },
    {
      title: 'TERMS_PAGE.DISCLAIMER.TITLE',
      paragraphs: ['TERMS_PAGE.DISCLAIMER.P1', 'TERMS_PAGE.DISCLAIMER.P2'],
    },
    {
      title: 'TERMS_PAGE.RESPONSIBILITY.TITLE',
      paragraphs: ['TERMS_PAGE.RESPONSIBILITY.P1', 'TERMS_PAGE.RESPONSIBILITY.P2'],
    },
    {
      title: 'TERMS_PAGE.THIRD_PARTY.TITLE',
      paragraphs: ['TERMS_PAGE.THIRD_PARTY.P1', 'TERMS_PAGE.THIRD_PARTY.P2'],
    },
    {
      title: 'TERMS_PAGE.PAYMENT.TITLE',
      paragraphs: ['TERMS_PAGE.PAYMENT.P1', 'TERMS_PAGE.PAYMENT.P2'],
    },
    {
      title: 'TERMS_PAGE.COMMUNICATION.TITLE',
      paragraphs: ['TERMS_PAGE.COMMUNICATION.P1', 'TERMS_PAGE.COMMUNICATION.P2'],
    },
    {
      title: 'TERMS_PAGE.BILINGUAL.TITLE',
      paragraphs: ['TERMS_PAGE.BILINGUAL.P1'],
    },
    {
      title: 'TERMS_PAGE.PRIVACY.TITLE',
      paragraphs: ['TERMS_PAGE.PRIVACY.P1'],
    },
    {
      title: 'TERMS_PAGE.INTELLECTUAL.TITLE',
      paragraphs: ['TERMS_PAGE.INTELLECTUAL.P1'],
    },
    {
      title: 'TERMS_PAGE.LIABILITY.TITLE',
      paragraphs: ['TERMS_PAGE.LIABILITY.P1'],
    },
    {
      title: 'TERMS_PAGE.INDEMNIFICATION.TITLE',
      paragraphs: ['TERMS_PAGE.INDEMNIFICATION.P1'],
    },
    {
      title: 'TERMS_PAGE.CHANGES.TITLE',
      paragraphs: ['TERMS_PAGE.CHANGES.P1', 'TERMS_PAGE.CHANGES.LAST_UPDATED'],
    },
    {
      title: 'TERMS_PAGE.GOVERNING.TITLE',
      paragraphs: ['TERMS_PAGE.GOVERNING.P1'],
      points: [
        'TERMS_PAGE.GOVERNING.POINT1',
        'TERMS_PAGE.GOVERNING.POINT2',
        'TERMS_PAGE.GOVERNING.POINT3',
      ],
    },
  ];
}
