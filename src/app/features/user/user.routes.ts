import { Routes } from '@angular/router';
import { UserPartListComponent } from './user-dashboard/user-part-list/user-part-list.component';



export const USER_ROUTES: Routes = [
  
  { path: 'parts-dashboard',component: UserPartListComponent },
];