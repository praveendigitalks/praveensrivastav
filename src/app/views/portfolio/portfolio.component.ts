import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import Isotope from 'isotope-layout';
import GLightbox from 'glightbox';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import PureCounter from '@srexi/purecounterjs';
import { AuthService } from '../../authentication/authservice/auth.service';
import { PortfolioService } from './portfolioservice/portfolio.service';
import { Router } from '@angular/router';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';
import { SHARED_IMPORTS } from '../../components/sharedImport';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
  portfolio: any[] = [];
  isLogin = false;
  category: any;
  activeCategory: string = 'ALL';
  private portfolioIsotope?: any;
  private portfolioLightbox?: any;
  private portfolioDetailsLightbox?: any;
  private portfolioDetailsSwiper?: Swiper;
  private pureCounterInstance?: any;

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.hasActionPermission(MODULE.PORTFOLIO, ACTIONS.READ)) {
      alert('You are not Authorized to access this module');
      this.router.navigateByUrl('/');
    }

    this.isLogin = this.authService.isLoggedIn();
    this.loadPortfolio();
    this.loadPortfolioCategory();
  }

  /* ================== NAV / ACTIONS ================== */

  addportfolio(): void {
    this.router.navigateByUrl('/addportfolio');
  }

  editPortfolio(portfolioId: string) {
    this.router.navigate(['/addportfolio', portfolioId]);
  }

  loadPortfolio() {
    this.portfolioService.getportfolio().subscribe((res) => {
      this.portfolio = res || [];
      this.activeCategory = 'ALL';
      setTimeout(() => this.initPortfolioIsotope(), 0);
    });
  }

  loadPortfolioCategory() {
    this.portfolioService.getportfoliocategory().subscribe((res) => {
      this.category = res || [];
    });
  }

  onCategoryClick(cat: string) {
    this.activeCategory = cat;

    if (cat === 'ALL') {
      this.loadPortfolio();
      return;
    }

    this.portfolioService.getportfolioByCategory(cat).subscribe((res) => {
      this.portfolio = res || [];
      setTimeout(() => this.initPortfolioIsotope(), 0);
    });
  }

  /* ================== HELPERS ================== */

  getImageUrl(projectImage: string | null | undefined): string {
    if (!projectImage) return '/portfolio/api.jfif';
    // projectImage already like `/upload/portfolio/xxx.jpg`
    // return `http://localhost:5000${projectImage}`;
    // return `https://praveensrivastav-backend.onrender.com${projectImage}`;
    return `http://13.233.11.48${projectImage}`;
  }

  getCategoryClass(category: string | null | undefined): string {
    const c = (category || '').toLowerCase();
    if (c.includes('angular')) return 'filter-angular';
    if (c.includes('node')) return 'filter-nodejs';
    if (c.includes('laravel')) return 'filter-laravel';
    if (c.includes('css')) return 'filter-csstemp';
    if (c.includes('bootstrap')) return 'filter-bootemp';
    if (c.includes('js')) return 'filter-js';
    return 'filter-angular'; // default
  }

  /* ================== UI LIBS ================== */

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
      layoutMode: 'fitRows',
    });

    const filterItems = Array.from(
      document.querySelectorAll('#portfolio-flters li')
    ) as HTMLElement[];

    filterItems.forEach((li) => {
      li.addEventListener('click', (e) => {
        e.preventDefault();

        filterItems.forEach((el) => el.classList.remove('filter-active'));
        li.classList.add('filter-active');

        const filterValue = li.getAttribute('data-filter') || '*';
        this.portfolioIsotope.arrange({ filter: filterValue });
      });
    });
  }

  /** GLightbox instances */
  private initPortfolioLightboxes(): void {
    this.portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox',
    });

    this.portfolioDetailsLightbox = GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh',
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
        disableOnInteraction: false,
      },
      pagination: {
        el: '.portfolio-details-slider .swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }

  /** PureCounter numbers (if used) */
  private initPureCounter(): void {
    this.pureCounterInstance = new PureCounter();
  }
}
