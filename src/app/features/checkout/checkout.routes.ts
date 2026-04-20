import { Routes } from '@angular/router';
import { CheckoutComponent} from './checkout.component';
import { roleGuard } from '../../core/guards/role.guard';
import { OrderSuccessComponent } from '../order-success/order-success.component';




export const Checkout_ROUTES: Routes = [
  { path: 'checkout-dashboard', component: CheckoutComponent },
  { path: 'order-success/:id', component: OrderSuccessComponent }
];
