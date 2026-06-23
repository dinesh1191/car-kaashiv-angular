import { Routes } from '@angular/router';
import { UserPartListComponent } from './user-dashboard/user-part-list/user-part-list.component';
import { PaymentComponent } from '../payment/payment.component';
import { MyOrdersComponent } from '../orders/customer/my-orders/my-orders.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';



export const USER_ROUTES: Routes = [
  { path: 'parts-dashboard', component: UserPartListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'checkout', component: CheckoutComponent },
];