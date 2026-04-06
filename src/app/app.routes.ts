import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './features/auth/login.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { UserRegisterComponent } from './features/user/user-register/user-register.component';
import { EmpRegisterFormComponent } from './features/employee/emp-register-form/emp-register-form.component';
import { AppLayoutComponent } from './shared/layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { roleGuard } from './core/guards/role.guard';




export const routes: Routes = [
  /* ---------- Public Pages ---------- */
  { path: '', component: LandingComponent },
     
  /* ---------- Auth Pages (Header + Footer only) ---------- */
  {
    path: '',
    component: AuthLayoutComponent, //shared wrapper for all dashboard routes
    children: [

      { path: 'login', component: LoginComponent},
      { path: 'contact', component: ContactComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'unauthorized', component: UnauthorizedComponent }, 
      { path: 'register-user', component: UserRegisterComponent },
      { path: 'register-employee', component: EmpRegisterFormComponent },
      ]
    },
    /* ---------- Authenticated App ---------- */
    {
    path: '',
    component: AppLayoutComponent, //shared wrapper for authienticated routes
    canActivateChild: [authGuard],
    children: [
      {
        path: 'employee',
        canActivate:[roleGuard], 
        data:{roles:['employee','admin']}, //only employee users can access employee dashboard
        loadChildren: () =>
          import('./features/employee/employee.routes').then(
            (m) => m.EMPLOYEE_ROUTES,
          ),
      },
      {
        path: 'user',
        canActivate:[roleGuard], 
        data:{roles:['customer']}, //only customer users can access user dashboard
        loadChildren: () =>
          import('./features/user/user.routes').then((m) => m.USER_ROUTES),
      },
      {
        path: 'parts',
        canActivate:[roleGuard], 
        data:{roles:['employee','admin']}, //only employee users can access parts
        loadChildren: () =>          
          import('./features/parts/parts.routes').then((m) => m.PARTS_ROUTES),
      
      },  
      {
        path: 'cart',
        canActivate:[authGuard,roleGuard], 
        data:{roles:['customer']}, //only customer users can access cart
        loadChildren: () =>
          import('./features/cart/cart.routes').then((m) => m.cart_ROUTES),
        
      }
    ],
    },
  /* ---------- Wildcard Route (for 404 Not Found) ---------- */
   { path: '**', redirectTo: 'unauthorized' },
];

    /*routes to be used new feature developement*/
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