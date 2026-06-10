import { Routes } from '@angular/router';
import { UserPartListComponent } from './user-dashboard/user-part-list/user-part-list.component';
import { PaymentComponent } from '../payment/payment.component';



export const USER_ROUTES: Routes = [
  
  { path: 'parts-dashboard',component: UserPartListComponent },
  { path: 'payment',component: PaymentComponent },
];