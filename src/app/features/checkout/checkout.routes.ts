import { Routes } from '@angular/router';
import { CheckoutComponent} from './checkout.component';
import { InvoiceComponent } from '../invoice/invoice.component';




export const Checkout_ROUTES: Routes = [
  { path: 'checkout-dashboard', component: CheckoutComponent },
  { path: 'invoice', component: InvoiceComponent }
];
