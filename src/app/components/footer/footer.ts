import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  insuranceMenu = [
    {
      title: 'Auto Insurance',
      items: [
        'Motorcycle',
        'Car',
        'Boat',
        'RV & Motorhome',
        'Classic Car',
        'Commercial Auto',
        'SR-22',
        'ATV & UTV',
        'Trailer',
        'Mexican Car',
        'Rideshare',
      ],
    },
    {
      title: 'Homeowners Insurance',
      items: [
        'Renters',
        'Condo',
        'Commercial Property',
        'Manufactured Home / Mobile Home',
        'Landlord',
        'Flood',
        'Earthquake',
      ],
    },
    {
      title: 'Commercial Insurance',
      items: [
        'Professional Liability (E&O)',
        'General Liability',
        'Workers’ Compensation',
        'Commercial Property',
        'Commercial Auto',
        'Business Owner’s Policy (BOP)',
        'Employment Practices Liability (EPLI)',
        'Cyber Liability',
        'Builders Risk / Course of Construction',
        'Directors & Officers (D&O) Liability',
      ],
    },
    {
      title: 'Life Insurance',
      items: [
        'Term Life',
        'Whole Life',
        'Universal Life',
        'Final Expense',
        'Variable Life',
        'Group Life',
      ],
    },
    {
      title: 'Health Insurance',
      items: [
        'Individual Health',
        'Family Health',
        'Small Business Health',
        'Employer & Group Health',
        'Travel Health',
        'Medicare Supplement / Medigap',
        'Short-Term Health',
        'Dental & Vision',
        'ACA / Marketplace Plans',
      ],
    },
    {
      title: 'Surety Bonds',
      items: ['Performance Bonds / Payment', 'Commercial Surety', 'Bid', 'Notary'],
    },
    {
      title: 'Additional Insurance',
      items: ['Pet', 'Title', 'Title Transfer'],
    },
  ];
}
