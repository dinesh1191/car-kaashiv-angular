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
import { EmpRegisterFormComponent } from './features/employee/emp-register-form/emp-register-form.component';




export const routes: Routes = [
  /* ---------- Public Routes ---------- */

  { path: 'index', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  
  
  /* ----------Protected Dashboard Routes---------------- */
  {
    path: 'dashboard',
    component: DashboardLayoutComponent, //shared wrapper for all dashboard routes
    //canActivate: [authGuard],
    children: [
       /*public*/
      { path: 'register-user', component: UserRegisterComponent },
      { path: 'register-employee', component: EmpRegisterFormComponent },
      
      /*protected childs routes*/

      /* Employee Module (lazy-loaded routes)-*/
      {
        path: 'employee',
        canActivateChild: [authGuard],
        loadChildren: () =>
          import('./features/employee/employee.routes').then(
            (m) => m.EMPLOYEE_ROUTES,
          ),
      },
      /* User Module*/
      {
        path: 'user',
        canActivateChild: [authGuard],
        loadChildren: () =>
          import('./features/user/user.routes').then((m) => m.USER_ROUTES),
      },
      /*routes to be used new feature building*/
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
    ],
  },

  /* ---------- Wildcard Route (for 404 Not Found) ---------- */
  { path: '**', redirectTo: 'index', pathMatch: 'full' },
];
