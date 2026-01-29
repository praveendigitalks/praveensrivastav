import { AuthService } from './../../authentication/authservice/auth.service';
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  ElementRef as NgElementRef
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SHARED_IMPORTS } from '../../components/sharedImport';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';
import { AboutService } from './aboutservice/about.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatProgressBarModule, SHARED_IMPORTS],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  isLogin = false;
  aboutData: any = [];

  // 🔥 Skills animation refs
  @ViewChildren('progressBar') progressBars!: QueryList<NgElementRef>;

  constructor(
    private authService: AuthService,
    private aboutService: AboutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn();
    this.loadAbout();
  }

  loadAbout() {
    this.aboutService.getAbout().subscribe({
      next: (res) => {
        console.log("🚀 ~ AboutComponent ~ loadAbout ~ res:", res);
        this.aboutData = res;  // Array [{}]
      },
      error: (err) => {
        console.log("🚀 ~ AboutComponent ~ loadAbout ~ err:", err);
      }
    });
  }

  editAbout(aboutId: string) {
    this.router.navigate(['/addabout', aboutId]);
  }

  /* ---------- Prior Skills Display Helper ---------- */
  getPriorSkills() {
    return this.aboutData[0]?.priorskills || [];
  }
  getCompanyProjects() {
    return this.aboutData[0]?.companyProjects || [];
  }





  /* ---------- Skills Animation ---------- */
  private skillsObserver?: IntersectionObserver;

  private initSkillsAnimation(): void {
    const skillsSection = document.querySelector('.skills-content');
    if (!skillsSection) return;

    this.skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
    setTimeout(() => {
      if (this.progressBars && this.progressBars.length > 0) {
        this.progressBars.forEach((barRef: NgElementRef, index: number) => {
          const bar = barRef.nativeElement as HTMLElement;
          const target = Number(bar.getAttribute('data-skill') || 0);

          bar.style.width = '0% !important';
          bar.style.transition = 'none';

          setTimeout(() => {
            bar.style.transition = 'width 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            bar.style.width = target + '%';
          }, index * 300);
        });
      }
    }, 200);
  }

  /* ---------- Your Existing Code (Unchanged) ---------- */
  private countsObserver?: IntersectionObserver;
  private sliderIntervalId?: number;
  private currentSlideIndex = 0;
  private totalSlides = 0;

  ngAfterViewInit(): void {
    this.initSkillsAnimation();
    this.initCountsAnimation();
    this.initProjectsSlider();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    this.skillsObserver?.disconnect();
    this.countsObserver?.disconnect();
    if (this.sliderIntervalId) {
      window.clearInterval(this.sliderIntervalId);
    }
    window.removeEventListener('resize', this.onResize);
  }

  /* ---------- Counts ---------- */
  private initCountsAnimation(): void {
    const countsSection = document.querySelector('.counts.container');
    if (!countsSection) return;

    this.countsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.count-number') as NodeListOf<HTMLElement>;
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

  private animateCount(element: HTMLElement, target: number, duration: number): void {
    const start = 0;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(start + progress * (target - start));
      element.textContent = value.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  /* ---------- Projects Slider ---------- */
  private initProjectsSlider(): void {
    // Your existing slider code...
  }

  private onResize = () => {
    this.initProjectsSlider();
  };
}
