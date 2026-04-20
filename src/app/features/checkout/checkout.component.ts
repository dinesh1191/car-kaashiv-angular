import { Component } from '@angular/core';
import { PRIME_IMPORTS } from '../../shared/prime';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, MATERIAL_IMPORTS, PRIME_IMPORTS],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  isPlacingOrder: boolean = false;


  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
    private orderService: OrderService
  ) {
   
  }

placeOrder() {
    const idempotencyKey = this.generateIdempotencyKey();     
    this.orderService.placeOrder(idempotencyKey).subscribe({
      next: (res) => {
        this.isPlacingOrder = true;
        this.snackbarService.show('Order placed successfully!', 'success');
        // this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.isPlacingOrder = false;
        this.snackbarService.show('Failed to place order. Please try again.', 'error', 3000, err);
      },
    });
  }

  private generateIdempotencyKey(): string {
    const idempotencyKey = crypto.randomUUID();
    console.log('Generated Idempotency Key:', idempotencyKey);
    return idempotencyKey;
  }


}