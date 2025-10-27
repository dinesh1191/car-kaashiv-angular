import { Routes } from '@angular/router';
import { PartsListComponent } from './features/parts/pages/parts-list.component';
import { AuthComponent } from './features/auth/auth.component';
import { PartDetailsComponent } from './features/parts/pages/part-details/part-details.component';

export const routes: Routes = [
    { path: '', redirectTo:'auth', pathMatch:'full'},
    { path :'auth', component: AuthComponent},
    { path :'parts-list', component: PartsListComponent},
    { path :'part/details', component: PartDetailsComponent},
    { path :'part/details/:partId', component: PartDetailsComponent},    
    
];
