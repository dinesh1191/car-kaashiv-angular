import { Routes } from '@angular/router';
import { PartsListComponent } from './features/parts/pages/parts-list.component';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
    { path: '', redirectTo:'parts-list', pathMatch:'full'},
    { path :'parts-list', component: PartsListComponent},
    { path :'auth', component: AuthComponent},

];
