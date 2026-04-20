import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';
import { PRIME_IMPORTS } from '../../shared/prime';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-success',
  imports: [CommonModule, MATERIAL_IMPORTS, PRIME_IMPORTS],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss'
})
export class OrderSuccessComponent implements OnInit {

  constructor(private snackbarService: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private orderService: OrderService) {}  
   
ngOnInit(): void {
const orderId = this.activatedRoute.snapshot.queryParamMap.get('id');
  if (orderId) {
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (res) => {
        console.log('Order details:', res); 
      this.snackbarService.show('Order details loaded successfully!', 'success');
     
    },
      error: (err) => {
        this.snackbarService.show('Failed to load order details', 'error', 3000, err);
      },
    });
  }
 
}
}