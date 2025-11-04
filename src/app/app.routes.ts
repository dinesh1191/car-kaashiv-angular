import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './features/auth/login.component';
import { PartsListComponent } from './features/employee/parts/parts-list.component';
import { PartDetailsComponent } from './features/employee/parts/part-details/part-details.component';
import { EmployeeDashboardComponent } from './features/employee/emp-dashboard/employee-dashboard.component';

export const routes: Routes = [
    // Public
    { path: 'index', component: LandingComponent },
    { path :'login', component: LoginComponent},        
    { path: 'contact', component: ContactComponent },
    { path: 'privacy', component: PrivacyComponent },

    // Protected routes
    { path: 'emp-dashboard', 
      canActivate:[authGuard]
     // loadChildren:() => import('./features/employee/emp-dashboard/')
    },
    { path :'parts-list', component: PartsListComponent,canActivate: [authGuard]},
    { path :'part/details', component: PartDetailsComponent,canActivate: [authGuard]},
    { path :'part/details/:partId', component: PartDetailsComponent,canActivate: [authGuard]},

      // Wildcard fallback
    { path: '**', redirectTo:'index', pathMatch:'full'},
];
