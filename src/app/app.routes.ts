import { authGuard } from './authentication/authguard/auth.guard';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { SuperadminLayoutComponent } from './SuperadminLayout/superadmin-layout/superadmin-layout.component';
import { superadminGuard } from './authentication/superadminguard/superadmin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'subscriptionplan',
    loadComponent: () =>
      import(
        './pages/subscription plans/subscriptionplans/subscriptionplans.component'
      ).then((m) => m.SubscriptionplansComponent),
  },

  {
    path: '',
    canActivate : [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'about',
        loadComponent: () =>
          import('./views/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'addabout',
        loadComponent: () =>
          import('./views/about/addabout/addabout.component').then(
            (m) => m.AddaboutComponent
          ),
      },
      {
        path: 'addabout/:aboutId',
        loadComponent: () =>
          import('./views/about/addabout/addabout.component').then(
            (m) => m.AddaboutComponent
          ),
      },
      {
        path: 'resume',
        loadComponent: () =>
          import('./views/resume/resume.component').then(
            (m) => m.ResumeComponent
          ),
      },
      {
        path: 'addresume',
        loadComponent: () =>
          import('./views/resume/addresume/addresume.component').then(
            (m) => m.AddresumeComponent
          ),
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./views/portfolio/portfolio.component').then(
            (m) => m.PortfolioComponent
          ),
      },
      {
        path: 'addportfolio',
        loadComponent: () =>
          import('./views/portfolio/addportfolio/addportfolio.component').then(
            (m) => m.AddportfolioComponent
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./views/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      {
        path: 'addcontact',
        loadComponent: () =>
          import('./views/contact/addcontact/addcontact.component').then(
            (m) => m.AddcontactComponent
          ),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./pages/user/user.component').then((m) => m.UserComponent),
      },
      {
        path: 'adduser',
        loadComponent: () =>
          import('./pages/user/adduser/adduser.component').then(
            (m) => m.AdduserComponent
          ),
      },
      {
        path: 'role',
        loadComponent: () =>
          import('./pages/role/role.component').then((m) => m.RoleComponent),
      },
      {
        path: 'addrole',
        loadComponent: () =>
          import('./pages/role/addrole/addrole.component').then(
            (m) => m.AddroleComponent
          ),
      },
      {
        path: 'permission',
        loadComponent: () =>
          import('./pages/permission/permission.component').then(
            (m) => m.PermissionComponent
          ),
      },
      {
        path: 'addpermission',
        loadComponent: () =>
          import(
            './pages/permission/addpermission/addpermission.component'
          ).then((m) => m.AddpermissionComponent),
      },
      {
        path: 'profile/loggeddevices',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/profile/loggeddevices/loggeddevices.component').then(
            (m) => m.LoggeddevicesComponent
          ),
      },
    ],
  },

  {
    path: 'superadmin',
    component: SuperadminLayoutComponent,
    canActivate: [superadminGuard],
    children: [
      {
        path: '', // Changed from "superadmin"
        loadComponent: () =>
          import(
            './SuperadminViews/superadmin-dashboard/superadmin-dashboard.component'
          ).then((m) => m.SuperadminDashboardComponent),
      },
      {
        path: 'tenant',
        loadComponent: () =>
          import('./SuperadminViews/tenants/tenants/tenants.component').then(
            (m) => m.TenantsComponent
          ),
      },
      {
        path: 'addtenant',
        loadComponent: () =>
          import(
            './SuperadminViews/tenants/addtenants/addtenants.component'
          ).then((m) => m.AddtenantsComponent),
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./authentication/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
