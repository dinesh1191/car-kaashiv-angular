import { Routes } from '@angular/router';
import { CheckoutComponent} from './checkout.component';
import { roleGuard } from '../../core/guards/role.guard';




export const Checkout_ROUTES: Routes = [
  {
    path: 'checkout-dashboard', component: CheckoutComponent, 
  },
];
