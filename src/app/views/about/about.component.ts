import {
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit, OnDestroy {

  private skillsObserver?: IntersectionObserver;
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


  /* ---------- Skills ---------- */
  private initSkillsAnimation(): void {
    const skillsSection = document.querySelector('.skills-content');
    if (!skillsSection) return;

    this.skillsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bars = document.querySelectorAll(
              '.progress .progress-bar'
            ) as NodeListOf<HTMLElement>;

            bars.forEach(bar => {
              const target = Number(bar.dataset['skill'] || '0');
              bar.style.transition = 'width 0.8s ease-out';
              bar.style.width = target + '%';
            });

            this.skillsObserver?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.skillsObserver.observe(skillsSection);
  }

  /* ---------- Counts ---------- */
  private initCountsAnimation(): void {
    const countsSection = document.querySelector('.counts.container');
    if (!countsSection) return;

    this.countsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counters = document.querySelectorAll(
              '.count-number'
            ) as NodeListOf<HTMLElement>;

            counters.forEach(counter => {
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

    const step = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );
      const value = Math.floor(start + progress * (target - start));
      element.textContent = value.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  /* ---------- Projects slider ---------- */
private initProjectsSlider(): void {
  const slider = document.querySelector(
    '#company-projects-slider'
  ) as HTMLElement | null;
  if (!slider) return;

  const wrapper = slider.querySelector(
    '.swiper-wrapper'
  ) as HTMLElement | null;
  const slides = slider.querySelectorAll(
    '.swiper-slide'
  ) as NodeListOf<HTMLElement>;
  if (!wrapper || !slides.length) return;

  // const slidesPerView = 3;
  const slidesPerView = this.getSlidesPerView();

  const totalSlides = slides.length;
  const totalPages = Math.ceil(totalSlides / slidesPerView);

  this.totalSlides = totalPages;
  this.currentSlideIndex = 0;

  const pagination = slider.querySelector(
    '.swiper-pagination'
  ) as HTMLElement | null;

  // build dots (one per page)
  if (pagination) {
    pagination.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('span');
      dot.classList.add('swiper-pagination-bullet');
      if (i === 0) {
        dot.classList.add('swiper-pagination-bullet-active');
      }
      dot.dataset['index'] = i.toString();
      dot.addEventListener('click', () => {
        this.currentSlideIndex = i;
        this.updateSliderPages(wrapper, pagination, slidesPerView);
        this.resetAutoplayPages(wrapper, pagination, slidesPerView);
      });
      pagination.appendChild(dot);
    }
  }

  // initial position
  this.updateSliderPages(wrapper, pagination, slidesPerView);

  // autoplay between pages
  this.sliderIntervalId = window.setInterval(() => {
    this.currentSlideIndex =
      (this.currentSlideIndex + 1) % totalPages;
    this.updateSliderPages(wrapper, pagination, slidesPerView);
  }, 5000);
}

private updateSliderPages(
  wrapper: HTMLElement,
  pagination: HTMLElement | null,
  slidesPerView: number
): void {
  const offset = -(this.currentSlideIndex * 100);
  wrapper.style.transform = `translateX(${offset}%)`;

  if (pagination) {
    const dots = pagination.querySelectorAll(
      '.swiper-pagination-bullet'
    ) as NodeListOf<HTMLElement>;
    dots.forEach((dot, i) => {
      if (i === this.currentSlideIndex) {
        dot.classList.add('swiper-pagination-bullet-active');
      } else {
        dot.classList.remove('swiper-pagination-bullet-active');
      }
    });
  }
}

private onResize = () => {
  this.initProjectsSlider();
};


private getSlidesPerView(): number {
  const width = window.innerWidth;

  if (width <= 576) {
    return 1; // mobile
  }
  if (width <= 991) {
    return 2; // tablet
  }
  return 3; // desktop
}


private resetAutoplayPages(
  wrapper: HTMLElement,
  pagination: HTMLElement | null,
  slidesPerView: number
): void {
  if (this.sliderIntervalId) {
    window.clearInterval(this.sliderIntervalId);
  }
  const totalPages = this.totalSlides;
  this.sliderIntervalId = window.setInterval(() => {
    this.currentSlideIndex =
      (this.currentSlideIndex + 1) % totalPages;
    this.updateSliderPages(wrapper, pagination, slidesPerView);
  }, 5000);
}


  private updateSlider(
    wrapper: HTMLElement,
    pagination: HTMLElement | null
  ): void {
    const offset = -this.currentSlideIndex * 100;
    wrapper.style.transform = `translateX(${offset}%)`;

    if (pagination) {
      const dots = pagination.querySelectorAll(
        '.swiper-pagination-bullet'
      ) as NodeListOf<HTMLElement>;
      dots.forEach((dot, i) => {
        if (i === this.currentSlideIndex) {
          dot.classList.add('swiper-pagination-bullet-active');
        } else {
          dot.classList.remove('swiper-pagination-bullet-active');
        }
      });
    }
  }

  private resetAutoplay(
    wrapper: HTMLElement,
    pagination: HTMLElement | null
  ): void {
    if (this.sliderIntervalId) {
      window.clearInterval(this.sliderIntervalId);
    }
    this.sliderIntervalId = window.setInterval(() => {
      this.currentSlideIndex =
        (this.currentSlideIndex + 1) % this.totalSlides;
      this.updateSlider(wrapper, pagination);
    }, 5000);
  }
}
