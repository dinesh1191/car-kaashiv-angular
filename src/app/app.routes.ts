import { Routes } from '@angular/router';
import { PartsListComponent } from './features/parts/pages/parts-list.component';

export const routes: Routes = [
    { path: '', redirectTo:'parts-list', pathMatch:'full'},
    { path :'parts-list', component: PartsListComponent},
];
