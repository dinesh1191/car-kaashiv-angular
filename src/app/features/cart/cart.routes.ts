import { Routes } from '@angular/router';
import { CartComponent } from './cart.component';



export const cart_ROUTES: Routes = [
  
  { path: '',component: CartComponent },
];

// export const PARTS_ROUTES: Routes = [
//   { path: '', component: PartsListComponent },
//   { path: 'edit/:id', component: PartDetailsComponent },
//   { path: 'addPart', component: PartDetailsComponent },
// ];