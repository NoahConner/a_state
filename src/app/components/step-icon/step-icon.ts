import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Line icons for the quote-form step indicators. Strokes use currentColor. */
export type StepIconName =
  | 'user'
  | 'car'
  | 'license'
  | 'shield'
  | 'phone'
  | 'review'
  | 'pin'
  | 'home'
  | 'lock'
  | 'briefcase'
  | 'users'
  | 'heart'
  | 'plan'
  | 'bond'
  | 'search'
  | 'list';

@Component({
  selector: 'app-step-icon',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host{display:inline-flex;line-height:0}svg{width:16px;height:16px}'],
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" [ngSwitch]="name">
      <g *ngSwitchCase="'user'"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></g>
      <g *ngSwitchCase="'car'"><path d="M5 17H3v-5l2-5h11l4 5h1v5h-2" /><path d="M5 12h15M9.5 17h5" /><circle cx="7.5" cy="17" r="2" /><circle cx="16.5" cy="17" r="2" /></g>
      <g *ngSwitchCase="'license'"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M6 16a3 3 0 0 1 6 0M14 10h4M14 14h3" /></g>
      <g *ngSwitchCase="'shield'"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="m9 12 2 2 4-4" /></g>
      <g *ngSwitchCase="'phone'"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></g>
      <g *ngSwitchCase="'review'"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></g>
      <g *ngSwitchCase="'pin'"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></g>
      <g *ngSwitchCase="'home'"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></g>
      <g *ngSwitchCase="'lock'"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></g>
      <g *ngSwitchCase="'briefcase'"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></g>
      <g *ngSwitchCase="'users'"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></g>
      <g *ngSwitchCase="'heart'"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" /></g>
      <g *ngSwitchCase="'plan'"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></g>
      <g *ngSwitchCase="'bond'"><circle cx="12" cy="9" r="6" /><path d="M8.5 14 7 22l5-3 5 3-1.5-8" /></g>
      <g *ngSwitchCase="'search'"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></g>
      <g *ngSwitchCase="'list'"><path d="M10 6h10M10 12h10M10 18h10M3 6l1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2" /></g>
    </svg>
  `,
})
export class StepIconComponent {
  @Input() name: StepIconName = 'user';
}
