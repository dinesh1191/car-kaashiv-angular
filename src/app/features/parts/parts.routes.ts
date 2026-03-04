import { Routes } from '@angular/router';
import { PartDetailsComponent } from './part-details/part-details.component';
import { PartFormComponent } from './part-form/part-form.component';
import { PartsListComponent } from './part-list/parts-list.component';



export const PARTS_ROUTES: Routes = [
  { path: '', component: PartsListComponent },
  { path: 'details/:id', component: PartDetailsComponent },
  { path: 'addPart', component: PartFormComponent },
];