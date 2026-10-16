import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language } from '../../services/language';
import { buildRoute } from '../../components/header/header';

/** What the Careers form hands over in sessionStorage before redirecting here (?type=career). */
export interface CareersApplication { first: string; area: string; office: string; ref: string; sent: number }

/** What the Contact form hands over in sessionStorage before redirecting here (?type=contact). */
export interface ContactMessage { first: string; method: string; ref: string; sent: number }

export const CAREERS_APPLICATION_KEY = 'astate_application';
export const CONTACT_MESSAGE_KEY = 'astate_contact';
const CONVERSION_KEY = 'astate_app_sent';
const LEAD_KEY = 'astate_lead_sent';

@Component({
  selector: 'app-thank-you',
  standalone: false,
  templateUrl: './thank-you.html',
  styleUrls: ['./thank-you.scss'],
})
export class Thankyou implements OnInit, AfterViewInit, OnDestroy {
  type: string = 'contact';

  // Contact thank-you
  contact: ContactMessage | null = null;
  status: 'unknown' | 'open' | 'closed' = 'unknown';
  statusKey = 'CONTACT_THANKS_PAGE.STATUS.DEFAULT';

  // Contact thank-you: insurance pages for the "Have these ready" rows (Auto, Homeowners, Commercial), in content order.
  readonly readyRoutes = ['autoInsurance', 'homeInsurance', 'commercialInsurance'];

  // Careers thank-you
  readonly prepIcons = ['i-phone', 'i-cal', 'i-pin', 'i-doc'];
  application: CareersApplication | null = null;
  sentLabel = '';
  toast = '';

  private readonly isBrowser: boolean;
  private readonly listCache = new Map<string, any[]>();
  private readonly subs = new Subscription();
  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    public languageService: Language,
    private meta: Meta,
    private title: Title,
    private host: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // A confirmation page has nothing for search engines.
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });

    this.subs.add(
      this.route.queryParams.subscribe((params) => {
        this.type = params['type'] || 'contact';
        this.setContent();
      }),
    );
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        this.listCache.clear();
        this.setContent();
      }),
    );
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.host.nativeElement.querySelector<HTMLElement>('#hero-title')?.focus({ preventScroll: true });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.meta.removeTag('name="robots"');
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  setContent() {
    if (this.type === 'career') this.setCareerContent();
    else this.setContactContent();
  }

  /** "by phone" / "by text" / "by email" for the contact method the visitor picked. */
  howKey(): string {
    const method = this.contact?.method;
    return `CONTACT_THANKS_PAGE.HOW.${method === 'call' || method === 'text' || method === 'email' ? method : 'DEFAULT'}`;
  }

  routeTo(page: string): string[] {
    return buildRoute(this.languageService, page);
  }

  /** A translated array, cached because `instant()` returns a new array on every call. */
  list<T = any>(key: string): T[] {
    const cached = this.listCache.get(key);
    if (cached) return cached;
    const value = this.translate.instant(key);
    if (!Array.isArray(value)) return [];
    this.listCache.set(key, value);
    return value;
  }

  areaLabel(): string {
    return this.application ? this.translate.instant(`CAREERS_THANKS_PAGE.AREAS.${this.application.area}`) : '';
  }

  /** Empty for "No preference", so the chip is hidden. */
  officeLabel(): string {
    const office = this.application?.office;
    if (!office || office === 'any') return '';
    const key = `CAREERS_THANKS_PAGE.OFFICES.${office}`;
    const label = this.translate.instant(key);
    return label === key ? '' : label;
  }

  async share() {
    if (!this.isBrowser) return;
    const url = 'https://astateinsurance.com' + this.routeTo('careers').join('/').replace(/^\/+/, '/') + '/';
    const t = (k: string) => this.translate.instant('CAREERS_THANKS_PAGE.WAIT.' + k);
    if (navigator.share) {
      navigator.share({ title: t('SHARE_SHARE_TITLE'), text: t('SHARE_TEXT_NATIVE'), url }).catch(() => undefined);
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      this.showToast(`${t('COPIED')}: ${url}`);
    } catch {
      this.showToast(url);
    }
  }

  private setPageMeta(ns: string) {
    this.translate.get([`${ns}.META_TITLE`, `${ns}.META_DESCRIPTION`]).subscribe((res) => {
      const title = res[`${ns}.META_TITLE`];
      const description = res[`${ns}.META_DESCRIPTION`];
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
    });
  }

  private sentAt(sent: number, ns: string): string {
    const es = this.languageService.getCurrentLanguage() === 'es';
    const time = new Intl.DateTimeFormat(es ? 'es-US' : 'en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(sent));
    return `${time} ${this.translate.instant(ns + '.TIME_ZONE')}`;
  }

  private setContactContent() {
    this.setPageMeta('CONTACT_THANKS_PAGE');
    if (!this.isBrowser) return;

    try {
      this.contact = JSON.parse(sessionStorage.getItem(CONTACT_MESSAGE_KEY) || 'null');
    } catch {
      this.contact = null;
    }
    this.updateStatus();
    const msg = this.contact;
    if (!msg) return;
    this.sentLabel = this.sentAt(msg.sent, 'CONTACT_THANKS_PAGE');

    // Conversion event: once per message, never on refresh or back-navigation.
    try {
      if (sessionStorage.getItem(LEAD_KEY) !== msg.ref) {
        const w = window as unknown as { dataLayer?: object[] };
        (w.dataLayer = w.dataLayer || []).push({ event: 'generate_lead', form_id: 'contact', contact_method: msg.method, lead_ref: msg.ref });
        sessionStorage.setItem(LEAD_KEY, msg.ref);
      }
    } catch {
      /* storage blocked: skip the event */
    }
  }

  /** Live reply-time message: Mon–Sat 9 AM–7 PM Central. */
  private updateStatus() {
    const parts: Record<string, string> = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date())
      .forEach((p) => (parts[p.type] = p.value));
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts['weekday']);
    const minutes = Number(parts['hour']) * 60 + Number(parts['minute']);
    const weekday = day >= 1 && day <= 6;
    const open = weekday && minutes >= 540 && minutes < 1140;
    const k = 'CONTACT_THANKS_PAGE.STATUS.';
    this.status = open ? 'open' : 'closed';
    if (open) this.statusKey = k + (minutes >= 1080 ? 'OPEN_LATE' : 'OPEN');
    else if (weekday && minutes < 540) this.statusKey = k + 'CLOSED_TODAY';
    else if (day === 6 || day === 0) this.statusKey = k + 'CLOSED_MONDAY';
    else this.statusKey = k + 'CLOSED_TOMORROW';
  }

  private setCareerContent() {
    this.setPageMeta('CAREERS_THANKS_PAGE');
    if (!this.isBrowser) return;

    try {
      this.application = JSON.parse(sessionStorage.getItem(CAREERS_APPLICATION_KEY) || 'null');
    } catch {
      this.application = null;
    }
    const app = this.application;
    if (!app) return;

    this.sentLabel = this.sentAt(app.sent, 'CAREERS_THANKS_PAGE');

    // Conversion event: once per application, never on refresh.
    try {
      if (sessionStorage.getItem(CONVERSION_KEY) !== app.ref) {
        const w = window as unknown as { dataLayer?: object[] };
        (w.dataLayer = w.dataLayer || []).push({
          event: 'job_application',
          form_id: 'careers_general',
          area_of_interest: app.area,
          preferred_office: app.office,
          application_ref: app.ref,
        });
        sessionStorage.setItem(CONVERSION_KEY, app.ref);
      }
    } catch {
      /* storage blocked: skip the event */
    }
  }

  private showToast(message: string) {
    this.toast = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = ''), 2600);
  }
}
