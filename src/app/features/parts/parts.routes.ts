import { Routes } from '@angular/router';
import { PartsListComponent } from './parts-list.component';
import { PartDetailsComponent } from './part-details/part-details.component';
import { PartFormComponent } from './part-form/part-form.component';



export const PARTS_ROUTES: Routes = [
  { path: '', component: PartsListComponent },
  { path: 'details/:id', component: PartDetailsComponent },
  { path: 'create', component: PartFormComponent },
];