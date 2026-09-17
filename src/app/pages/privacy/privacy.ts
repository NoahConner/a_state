import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-privacy',
  standalone: false,
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy implements AfterViewInit {
  @ViewChild('privacyBody') private privacyBodyRef?: ElementRef<HTMLElement>;
  @ViewChild('tocColumn') private tocColumnRef?: ElementRef<HTMLElement>;
  @ViewChild('tocCard') private tocCardRef?: ElementRef<HTMLElement>;
  @ViewChild('tocStopSection') private tocStopSectionRef?: ElementRef<HTMLElement>;

  personalList: string[] = [];

  AUTO_LIST: string[] = [];

  // Drives the table of contents; ids match the section anchors in the template
  sections = [
    { id: 'introduction', title: 'PRIVACY.INTRODUCTION.TITLE' },
    { id: 'information-we-collect', title: 'PRIVACY.INFORMATION_COLLECT.TITLE' },
    { id: 'how-we-collect', title: 'PRIVACY.HOW_COLLECT.TITLE' },
    { id: 'how-we-use', title: 'PRIVACY.HOW_USE.TITLE' },
    { id: 'cookies', title: 'PRIVACY.COOKIES.TITLE' },
    { id: 'sharing', title: 'PRIVACY.SHARING.TITLE' },
    { id: 'data-security', title: 'PRIVACY.SECURITY.TITLE' },
    { id: 'privacy-rights', title: 'PRIVACY.RIGHTS.TITLE' },
    { id: 'third-party-links', title: 'PRIVACY.THIRD_PARTY.TITLE' },
    { id: 'childrens-privacy', title: 'PRIVACY.CHILDREN.TITLE' },
    { id: 'sms', title: 'PRIVACY.SMS.TITLE' },
    { id: 'updates', title: 'PRIVACY.UPDATES.TITLE' },
    { id: 'contact-information', title: 'PRIVACY.CONTACT.TITLE' },
  ];

  tocCardStyles: Record<string, string> | null = null;
  activeTocIndex = 0;
  isMobileTocOpen = false;

  constructor(
    private translate: TranslateService,
    private languageService: Language,
  ) {
    // Load the AUTO_LIST from the JSON translation file
    this.translate.get('PRIVACY.INFORMATION_COLLECT.AUTO_LIST').subscribe((res: string[]) => {
      this.AUTO_LIST = res;
    });

    this.translate.get('PRIVACY.INFORMATION_COLLECT.PERSONAL_LIST').subscribe((res: string[]) => {
      this.personalList = res;
    });

    this.languageService.getLanguageChange().subscribe(() => {
      setTimeout(() => this.updateTocStickyState());
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateTocStickyState());
  }

  scrollToSection(index: number, event: Event) {
    event.preventDefault();
    this.closeMobileToc();

    if (typeof document === 'undefined') {
      return;
    }

    document.getElementById(this.sections[index].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMobileToc() {
    this.isMobileTocOpen = !this.isMobileTocOpen;
  }

  closeMobileToc() {
    this.isMobileTocOpen = false;
  }

  private updateActiveTocSection() {
    if (typeof document === 'undefined') {
      return;
    }

    const scrollPos = window.scrollY + 140;
    let activeIndex = 0;

    this.sections.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= scrollPos) {
        activeIndex = i;
      }
    });

    this.activeTocIndex = activeIndex;

    // Same as the city pages: the [class.active] binding stops reacting after
    // SSR hydration for items inside an @for block, so toggle the class directly.
    const items = this.tocColumnRef?.nativeElement.querySelectorAll('.toc-item');
    items?.forEach((item, i) => item.classList.toggle('active', i === activeIndex));
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateTocStickyState() {
    if (typeof window === 'undefined') {
      return;
    }

    this.updateActiveTocSection();

    const privacyBody = this.privacyBodyRef?.nativeElement;
    const tocColumn = this.tocColumnRef?.nativeElement;
    const tocCard = this.tocCardRef?.nativeElement;
    const tocStopSection = this.tocStopSectionRef?.nativeElement;

    if (window.innerWidth > 991) {
      this.closeMobileToc();
    }

    if (!privacyBody || !tocColumn || !tocCard || window.innerWidth <= 991) {
      this.tocCardStyles = null;
      return;
    }

    const stickyOffset = 24;
    const stopGap = 24;
    const scrollY = window.scrollY;
    const columnRect = tocColumn.getBoundingClientRect();
    const columnTop = columnRect.top + scrollY;

    if (scrollY + stickyOffset < columnTop) {
      this.tocCardStyles = null;
      return;
    }

    if (tocStopSection) {
      const stopTop = tocStopSection.getBoundingClientRect().top + scrollY;
      const cardHeight = tocCard.offsetHeight;
      const maxPageTop = stopTop - cardHeight - stopGap;

      if (scrollY + stickyOffset > maxPageTop) {
        this.tocCardStyles = {
          position: 'absolute',
          top: `${maxPageTop - columnTop}px`,
          left: '0',
          width: `${columnRect.width}px`,
          zIndex: '10',
        };
        return;
      }
    }

    this.tocCardStyles = {
      position: 'fixed',
      top: `${stickyOffset}px`,
      left: `${columnRect.left}px`,
      width: `${columnRect.width}px`,
      zIndex: '10',
    };
  }
}
