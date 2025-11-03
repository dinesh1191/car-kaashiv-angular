import { Routes } from '@angular/router';
import { PartsListComponent } from './features/parts/pages/parts-list.component';
import { AuthComponent } from './features/auth/auth.component';
import { PartDetailsComponent } from './features/parts/pages/part-details/part-details.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    // Public
    { path: 'index', component: LandingComponent },
    { path :'login', component: LoginComponent},        
    { path: 'contact', component: ContactComponent },
    { path: 'privacy', component: PrivacyComponent },

    // Protected routes
 
   { path :'parts-list', component: PartsListComponent,canActivate: [authGuard]},
    { path :'part/details', component: PartDetailsComponent,canActivate: [authGuard]},
    { path :'part/details/:partId', component: PartDetailsComponent,canActivate: [authGuard]},    
      // Wildcard fallback
    { path: '**', redirectTo:'index', pathMatch:'full'},
];
