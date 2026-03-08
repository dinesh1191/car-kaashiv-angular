import { Routes } from '@angular/router';
import { PartDetailsComponent } from './part-details/part-details.component';
import { PartsListComponent } from './part-list/parts-list.component';



export const PARTS_ROUTES: Routes = [
  { path: '', component: PartsListComponent },
  { path: 'edit/:id', component: PartDetailsComponent },
  { path: 'addPart', component: PartDetailsComponent },
];