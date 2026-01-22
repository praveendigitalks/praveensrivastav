import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'about',
        loadComponent: () =>
          import('./views/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'resume',
        loadComponent: () =>
          import('./views/resume/resume.component').then(
            (m) => m.ResumeComponent,
          ),
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./views/portfolio/portfolio.component').then(
            (m) => m.PortfolioComponent,
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./views/contact/contact.component').then(
            (m) => m.ContactComponent,
          ),
      },
    ],
  },

  {path: 'login',
    loadComponent : () => import('./authentication/login/login.component').then( m => m.LoginComponent)
  }
];
