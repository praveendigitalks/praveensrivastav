import {
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import Isotope from 'isotope-layout';
import GLightbox from 'glightbox';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import PureCounter from '@srexi/purecounterjs';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {

  // use `any` because Isotope types are not available
  private portfolioIsotope?: any;
  private portfolioLightbox?: any;
  private portfolioDetailsLightbox?: any;
  private portfolioDetailsSwiper?: Swiper;
  private pureCounterInstance?: any;

  ngAfterViewInit(): void {
    this.initPortfolioIsotope();
    this.initPortfolioLightboxes();
    this.initPortfolioDetailsSlider();
    this.initPureCounter();
  }

  ngOnDestroy(): void {
    this.portfolioIsotope?.destroy();
    this.portfolioDetailsSwiper?.destroy(true, true);
  }

  /** Isotope filter for portfolio grid */
  private initPortfolioIsotope(): void {
    const portfolioContainer = document.querySelector(
      '.portfolio-container'
    ) as HTMLElement | null;

    if (!portfolioContainer) {
      return;
    }

    this.portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    const filterItems = Array.from(
      document.querySelectorAll('#portfolio-flters li')
    ) as HTMLElement[];

    filterItems.forEach(li => {
      li.addEventListener('click', e => {
        e.preventDefault();

        filterItems.forEach(el =>
          el.classList.remove('filter-active')
        );
        li.classList.add('filter-active');

        const filterValue = li.getAttribute('data-filter') || '*';
        this.portfolioIsotope.arrange({ filter: filterValue });
      });
    });
  }

  /** GLightbox instances */
  private initPortfolioLightboxes(): void {
    this.portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });

    this.portfolioDetailsLightbox = GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });
  }

  /** Swiper slider for portfolio details */
  private initPortfolioDetailsSlider(): void {
    const sliderEl = document.querySelector(
      '.portfolio-details-slider'
    ) as HTMLElement | null;

    if (!sliderEl) {
      return;
    }

    this.portfolioDetailsSwiper = new Swiper(sliderEl, {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.portfolio-details-slider .swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  /** PureCounter numbers (if used in this section or globally) */
  private initPureCounter(): void {
    this.pureCounterInstance = new PureCounter();
  }
}
