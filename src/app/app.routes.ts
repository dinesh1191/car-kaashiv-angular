import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './features/auth/login.component';
import { PartsListComponent } from './features/employee/parts/parts-list.component';
import { PartDetailsComponent } from './features/employee/parts/part-details/part-details.component';
import { EmployeeDashboardComponent } from './features/employee/emp-dashboard/employee-dashboard.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { DashboardLayoutComponent } from './shared/layout/sidebar/dashboard-layout/dashboard-layout.component';
import { UserRegisterComponent } from './features/user/user-register/user-register.component';




export const routes: Routes = [
  // Public

  //{ path: '', component: DashboardLayoutComponent },
  { path: 'index', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Protected routes
  {
    path: 'user',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      
      // {
      //   path: 'dashboard',
      //   loadComponent: () =>
      //     import('./shared/layout/sidebar/dashboard-layout/dashboard-layout.component'
      //     ).then((m) => m.DashboardLayoutComponent),
      // },
      // {
      //   path: 'parts-list',
      //   component: PartsListComponent,
      // },
      // {
      //   path: 'part/details',
      //   component: PartDetailsComponent,
      // },
      // {
      //   path: 'part/details/:partId',
      //   component: PartDetailsComponent,
      // },
      //  {
      //   path: 'register-user',
      //   component: UserRegisterComponent,
      // },
    ],
  },

  
  //Employee dashboard (lazy-loaded routes)
  {
    path: 'emp-dashboard',   
    //canActivate: [authGuard],
    loadChildren: () =>
      import('./features/employee/employee.routes')
        .then((m) => m.EMPLOYEE_ROUTES),
  },

  // User dashboard (lazy-loaded routes) 
  {
    path: 'user',
    //canActivate: [authGuard],
    loadChildren: () =>
      import('./features/user/user.routes')
        .then((m) => m.USER_ROUTES),
  },



  // Wildcard fallback
  { path: '**', redirectTo: 'index', pathMatch: 'full' },
];
