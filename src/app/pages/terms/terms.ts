import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Language } from '../../services/language';

interface TermsSection {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}

@Component({
  selector: 'app-terms',
  standalone: false,
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class Terms implements AfterViewInit {
  @ViewChild('termsBody') private termsBodyRef?: ElementRef<HTMLElement>;
  @ViewChild('tocColumn') private tocColumnRef?: ElementRef<HTMLElement>;
  @ViewChild('tocCard') private tocCardRef?: ElementRef<HTMLElement>;
  @ViewChild('tocStopSection') private tocStopSectionRef?: ElementRef<HTMLElement>;

  // Drives both the content and the table of contents; the last entry is the contact block
  termsSections: TermsSection[] = [
    {
      id: 'acceptance',
      title: 'TERMS_PAGE.ACCEPTANCE.TITLE',
      paragraphs: ['TERMS_PAGE.ACCEPTANCE.P1', 'TERMS_PAGE.ACCEPTANCE.P2'],
    },
    {
      id: 'about',
      title: 'TERMS_PAGE.ABOUT.TITLE',
      paragraphs: ['TERMS_PAGE.ABOUT.P1', 'TERMS_PAGE.ABOUT.P2'],
    },
    {
      id: 'use-of-website',
      title: 'TERMS_PAGE.USE.TITLE',
      paragraphs: ['TERMS_PAGE.USE.P1', 'TERMS_PAGE.USE.P2'],
    },
    {
      id: 'quotes-disclaimer',
      title: 'TERMS_PAGE.DISCLAIMER.TITLE',
      paragraphs: ['TERMS_PAGE.DISCLAIMER.P1', 'TERMS_PAGE.DISCLAIMER.P2'],
    },
    {
      id: 'policy-responsibility',
      title: 'TERMS_PAGE.RESPONSIBILITY.TITLE',
      paragraphs: ['TERMS_PAGE.RESPONSIBILITY.P1', 'TERMS_PAGE.RESPONSIBILITY.P2'],
    },
    {
      id: 'third-party-providers',
      title: 'TERMS_PAGE.THIRD_PARTY.TITLE',
      paragraphs: ['TERMS_PAGE.THIRD_PARTY.P1', 'TERMS_PAGE.THIRD_PARTY.P2'],
    },
    {
      id: 'payment-terms',
      title: 'TERMS_PAGE.PAYMENT.TITLE',
      paragraphs: ['TERMS_PAGE.PAYMENT.P1', 'TERMS_PAGE.PAYMENT.P2'],
    },
    {
      id: 'communication-consent',
      title: 'TERMS_PAGE.COMMUNICATION.TITLE',
      paragraphs: ['TERMS_PAGE.COMMUNICATION.P1', 'TERMS_PAGE.COMMUNICATION.P2'],
    },
    {
      id: 'bilingual-disclaimer',
      title: 'TERMS_PAGE.BILINGUAL.TITLE',
      paragraphs: ['TERMS_PAGE.BILINGUAL.P1'],
    },
    {
      id: 'privacy-data-use',
      title: 'TERMS_PAGE.PRIVACY.TITLE',
      paragraphs: ['TERMS_PAGE.PRIVACY.P1'],
    },
    {
      id: 'intellectual-property',
      title: 'TERMS_PAGE.INTELLECTUAL.TITLE',
      paragraphs: ['TERMS_PAGE.INTELLECTUAL.P1'],
    },
    {
      id: 'limitation-of-liability',
      title: 'TERMS_PAGE.LIABILITY.TITLE',
      paragraphs: ['TERMS_PAGE.LIABILITY.P1'],
    },
    {
      id: 'indemnification',
      title: 'TERMS_PAGE.INDEMNIFICATION.TITLE',
      paragraphs: ['TERMS_PAGE.INDEMNIFICATION.P1'],
    },
    {
      id: 'changes-to-terms',
      title: 'TERMS_PAGE.CHANGES.TITLE',
      paragraphs: ['TERMS_PAGE.CHANGES.P1', 'TERMS_PAGE.CHANGES.LAST_UPDATED'],
    },
    {
      id: 'governing-law',
      title: 'TERMS_PAGE.GOVERNING.TITLE',
      paragraphs: ['TERMS_PAGE.GOVERNING.P1'],
      points: [
        'TERMS_PAGE.GOVERNING.POINT1',
        'TERMS_PAGE.GOVERNING.POINT2',
        'TERMS_PAGE.GOVERNING.POINT3',
      ],
    },
    {
      id: 'contact-information',
      title: 'TERMS_PAGE.CONTACT_INFO.TITLE',
      paragraphs: [],
    },
  ];

  tocCardStyles: Record<string, string> | null = null;
  activeTocIndex = 0;
  isMobileTocOpen = false;

  constructor(private languageService: Language) {
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

    document.getElementById(this.termsSections[index].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    this.termsSections.forEach((section, i) => {
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

    const termsBody = this.termsBodyRef?.nativeElement;
    const tocColumn = this.tocColumnRef?.nativeElement;
    const tocCard = this.tocCardRef?.nativeElement;
    const tocStopSection = this.tocStopSectionRef?.nativeElement;

    if (window.innerWidth > 991) {
      this.closeMobileToc();
    }

    if (!termsBody || !tocColumn || !tocCard || window.innerWidth <= 991) {
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
