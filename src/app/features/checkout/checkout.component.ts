import { Component } from '@angular/core';
import { PRIME_IMPORTS } from '../../shared/prime';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';
import { OrderService } from '../../core/services/order.service';
import { OrderResponse } from '../../core/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, SharedModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})

export class CheckoutComponent {
  isPlacingOrder: boolean = false;
  OrderResponse: OrderResponse[] = [];
  orderForm!: FormGroup;

  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.orderForm = this.fb.group({
      deliveryName: ['', [Validators.required, Validators.maxLength(100)]],
      deliveryPhone: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      deliveryAddress: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(250)]],
      landmark: ['', [ Validators.minLength(3)]],
    });
  }

  placeOrder() {

      if (this.orderForm.valid) {
       const idempotencyKey = this.generateIdempotencyKey();
       let orderAddress = {...this.orderForm.value}
       this.orderService.placeOrder(idempotencyKey,orderAddress).subscribe({
        next: (res) => {
          this.isPlacingOrder = true;
          this.snackbarService.show('Order placed successfully!', 'success');
          this.router.navigate(['user/invoice'], { queryParams: { id: res.orderId  } });
        },
        error: (err) => {
          this.isPlacingOrder = false;
          this.snackbarService.show( err.error.Message ||'Failed to place order. Please try again.', 'error', 3000, err);
        },
      });
    } 
    }

  private generateIdempotencyKey(): string {
    const idempotencyKey = crypto.randomUUID();
    return idempotencyKey;
  }


  onlyNumbers(event: KeyboardEvent): void {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }  
}

toUpperCase(event:Event){
    const input = event.target as HTMLInputElement;
  input.value = input.value.toUpperCase();
  this.orderForm.get('deliveryName')?.setValue(input.value, { emitEvent: false });
  }
}