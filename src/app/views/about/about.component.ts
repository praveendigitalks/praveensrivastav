import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef as NgElementRef,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AuthService } from './../../authentication/authservice/auth.service';
import { AboutService } from './aboutservice/about.service';
import { SHARED_IMPORTS } from '../../components/sharedImport';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatProgressBarModule, SHARED_IMPORTS],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  isLogin = false;
  aboutData: any[] = [];

  @ViewChildren('progressBar') progressBars!: QueryList<NgElementRef>;

  private skillsObserver?: IntersectionObserver;
  private countsObserver?: IntersectionObserver;

  private sliderIntervalId: any;
  private currentSlideIndex = 0;
  private totalSlides = 0;

  constructor(
    private authService: AuthService,
    private aboutService: AboutService,
    private router: Router
  ) {}

  /* ================== LIFECYCLE ================== */

  ngOnInit(): void {
    // console.log('[About] ngOnInit');

    // Permission (optional)
    // if (!this.authService.hasActionPermission(MODULE.ABOUT, ACTIONS.READ)) {
    //   alert('You are not authorized to access this module');
    //   this.router.navigateByUrl('/');
    //   return;
    // }

    this.isLogin = this.authService.isLoggedIn();
    console.log('[About] isLogin =', this.isLogin);
    this.loadAbout();
  }

  ngAfterViewInit(): void {
    console.log('[About] ngAfterViewInit');
    this.initSkillsAnimation();
    this.initCountsAnimation();
    this.initProjectsSlider(); // guest slider first
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    console.log('[About] ngOnDestroy');
    this.skillsObserver?.disconnect();
    this.countsObserver?.disconnect();
    if (this.sliderIntervalId) {
      window.clearInterval(this.sliderIntervalId);
    }
    window.removeEventListener('resize', this.onResize);
  }

  /* ================== API LOAD ================== */

  private loadAbout(): void {
    console.log('[About] loadAbout() called');

    this.aboutService.getAbout().subscribe({
      next: (res) => {
        console.log('[About] API success, res =', res);
        this.aboutData = res || [];

        console.log(
          '[About] aboutData length =',
          this.aboutData.length,
          'companyProjects length =',
          this.getCompanyProjects().length
        );

        // Ensure login template has rendered before querying DOM
        setTimeout(() => {
          console.log('[About] Re-init after data load (post-render)');
          this.initSkillsAnimation();
          this.initCountsAnimation();
          this.initProjectsSlider();
        }, 50);
      },
      error: (err) => {
        console.error('[About] Error loading about data:', err);
      }
    });
  }

  /* ================== NAV / ACTIONS ================== */

  editAbout(aboutId: string): void {
    console.log('[About] editAbout clicked, id =', aboutId);
    this.router.navigate(['/addabout', aboutId]);
  }

  addAbout(): void {
    console.log('[About] addAbout clicked');
    this.router.navigateByUrl('/addabout');
  }

  /* ================== HELPERS ================== */

  getPriorSkills() {
    const skills = this.aboutData[0]?.priorskills || [];
    return skills;
  }

  getCompanyProjects() {
    const companies = this.aboutData[0]?.companyProjects || [];
    return companies;
  }

  /* ================== SKILLS ANIMATION ================== */

  private initSkillsAnimation(): void {
    const skillsSection = document.querySelector('.skills-content');
    console.log(
      '[Skills] initSkillsAnimation, skillsSection exists =',
      !!skillsSection
    );
    if (!skillsSection) return;

    if (this.skillsObserver) {
      this.skillsObserver.disconnect();
    }

    this.skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('[Skills] section visible -> animate');
            this.animateDynamicSkills();
            this.skillsObserver?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.skillsObserver.observe(skillsSection);
  }

  private animateDynamicSkills(): void {
    console.log('[Skills] animateDynamicSkills called');

    setTimeout(() => {
      if (this.progressBars && this.progressBars.length > 0) {
        console.log(
          '[Skills] Number of progress bars =',
          this.progressBars.length
        );

        this.progressBars.forEach((barRef: NgElementRef, index: number) => {
          const bar = barRef.nativeElement as HTMLElement;
          const target = Number(bar.getAttribute('data-skill') || 0);

          console.log(
            `[Skills] Bar index=${index}, target=${target}, element=`,
            bar
          );

          bar.style.width = '0%';
          bar.style.transition = 'none';

          setTimeout(() => {
            bar.style.transition =
              'width 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            bar.style.width = target + '%';
          }, index * 300);
        });
      } else {
        console.warn('[Skills] No progressBars found to animate');
      }
    }, 200);
  }

  /* ================== COUNTS ANIMATION ================== */

  private initCountsAnimation(): void {
    const countsSection = document.querySelector('.counts.container');
    console.log(
      '[Counts] initCountsAnimation, countsSection exists =',
      !!countsSection
    );
    if (!countsSection) return;

    if (this.countsObserver) {
      this.countsObserver.disconnect();
    }

    this.countsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('[Counts] section visible -> animate');
            const counters = document.querySelectorAll(
              '.count-number'
            ) as NodeListOf<HTMLElement>;
            console.log('[Counts] counters length =', counters.length);
            counters.forEach((counter) => {
              const target = Number(counter.dataset['target'] || '0');
              this.animateCount(counter, target, 1000);
            });
            this.countsObserver?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.countsObserver.observe(countsSection);
  }

  private animateCount(
    element: HTMLElement,
    target: number,
    duration: number
  ): void {
    const start = 0;
    const startTime = performance.now();
    console.log('[Counts] animateCount start: target =', target);

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(start + progress * (target - start));
      element.textContent = value.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        console.log('[Counts] animateCount done: final value =', value);
      }
    };

    requestAnimationFrame(step);
  }

  /* ================== PROJECTS SLIDER (INFINITE, NO BLANK) ================== */

  private initProjectsSlider(): void {
    console.log('[Slider] initProjectsSlider called');

    const slider = document.querySelector(
      '#company-projects-slider .swiper-wrapper'
    ) as HTMLElement | null;
    const slides = document.querySelectorAll(
      '#company-projects-slider .swiper-slide'
    ) as NodeListOf<HTMLElement>;
    const pagination = document.querySelector(
      '#company-projects-slider .swiper-pagination'
    ) as HTMLElement | null;

    console.log(
      '[Slider] DOM check -> slider:',
      !!slider,
      'slides count:',
      slides.length,
      'pagination:',
      !!pagination
    );

    if (!slider || slides.length === 0 || !pagination) {
      console.warn(
        '[Slider] Missing DOM or no slides, will retry once after 100ms...'
      );
      setTimeout(() => this.retryInitProjectsSliderOnce(), 100);
      return;
    }

    // Each slide should be full width; ensure no flex-gap that causes blanks
    slider.style.display = 'flex';
    slider.style.transition = 'transform 0.6s ease';
    slides.forEach((s: HTMLElement) => {
      s.style.flex = '0 0 100%';
      s.style.maxWidth = '100%';
    });

    this.setupSlider(slider, pagination, slides.length);
  }

  private retryInitProjectsSliderOnce(): void {
    const slider = document.querySelector(
      '#company-projects-slider .swiper-wrapper'
    ) as HTMLElement | null;
    const slides = document.querySelectorAll(
      '#company-projects-slider .swiper-slide'
    ) as NodeListOf<HTMLElement>;
    const pagination = document.querySelector(
      '#company-projects-slider .swiper-pagination'
    ) as HTMLElement | null;

    console.log(
      '[Slider] retry DOM check -> slider:',
      !!slider,
      'slides count:',
      slides.length,
      'pagination:',
      !!pagination
    );

    if (!slider || slides.length === 0 || !pagination) {
      console.error(
        '[Slider] Retry failed: slider DOM still missing. Check template IDs/classes.'
      );
      return;
    }

    slider.style.display = 'flex';
    slider.style.transition = 'transform 0.6s ease';
    slides.forEach((s: HTMLElement) => {
      s.style.flex = '0 0 100%';
      s.style.maxWidth = '100%';
    });

    this.setupSlider(slider, pagination, slides.length);
  }

  private setupSlider(
    slider: HTMLElement,
    pagination: HTMLElement,
    slideCount: number
  ): void {
    this.totalSlides = slideCount;
    console.log('[Slider] setupSlider, totalSlides =', this.totalSlides);

    if (this.sliderIntervalId) {
      console.log('[Slider] Clearing previous interval');
      window.clearInterval(this.sliderIntervalId);
    }

    // Create bullets
    pagination.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-pagination-bullet');
      if (i === 0) {
        bullet.classList.add('swiper-pagination-bullet-active');
      }
      bullet.addEventListener('click', () => {
        console.log('[Slider] bullet clicked index =', i);
        this.currentSlideIndex = i;
        this.updateSliderTransform(slider);
        this.updateBullets(pagination);
      });
      pagination.appendChild(bullet);
    }

    console.log(
      '[Slider] pagination bullets created =',
      pagination.querySelectorAll('.swiper-pagination-bullet').length
    );

    this.currentSlideIndex = 0;
    this.updateSliderTransform(slider);
    this.updateBullets(pagination);

    // Infinite loop: 0 -> 1 -> 2 -> ... -> (n-1) -> 0 -> ...
    this.sliderIntervalId = window.setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
      console.log(
        '[Slider] auto-slide -> index =',
        this.currentSlideIndex
      );
      this.updateSliderTransform(slider);
      this.updateBullets(pagination);
    }, 4000);
  }

  private updateBullets(pagination: HTMLElement): void {
    const bullets = pagination.querySelectorAll(
      '.swiper-pagination-bullet'
    ) as NodeListOf<HTMLElement>;

    bullets.forEach((b, i) => {
      if (i === this.currentSlideIndex) {
        b.classList.add('swiper-pagination-bullet-active');
      } else {
        b.classList.remove('swiper-pagination-bullet-active');
      }
    });
  }

  private updateSliderTransform(slider: HTMLElement): void {
    const translateX = -(this.currentSlideIndex * 100);
    console.log(
      '[Slider] updateSliderTransform -> index =',
      this.currentSlideIndex,
      'translateX =',
      translateX
    );
    slider.style.transform = `translateX(${translateX}%)`;
  }

  /* ================== RESIZE HANDLER ================== */

  private onResize = () => {
    console.log('[Slider] window resize -> re-init slider');
    this.initProjectsSlider();
  };
}
