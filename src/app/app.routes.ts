import { authGuard } from './authentication/authguard/auth.guard';
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
        path: 'addabout',
        canActivate : [authGuard],
        loadComponent: () =>
          import('./views/about/addabout/addabout.component').then((m) => m.AddaboutComponent),
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
      {
        path : 'user',
        canActivate : [authGuard],
        loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent)
      },
      {
        path : 'adduser',
        canActivate : [authGuard],
        loadComponent: () => import('./pages/user/adduser/adduser.component').then(m => m.AdduserComponent)
      },
      {
        path : 'role',
        canActivate : [authGuard],
        loadComponent: () => import('./pages/role/role.component').then(m => m.RoleComponent)
      },
      {
        path : 'addrole',
        canActivate : [authGuard],
        loadComponent: () => import('./pages/role/addrole/addrole.component').then(m => m.AddroleComponent)
      },
      {
        path:'profile/loggeddevices',
        loadComponent : () => import("./pages/profile/loggeddevices/loggeddevices.component").then( m => m.LoggeddevicesComponent)
      }
    ],
  },

  {path: 'login',
    loadComponent : () => import('./authentication/login/login.component').then( m => m.LoginComponent)
  }
];
