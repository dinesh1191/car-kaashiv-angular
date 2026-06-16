import { Component, Input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material'
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-order-summary',
  imports: [MATERIAL_IMPORTS, CommonModule, EmptyStateComponent],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  currentUser: any;
  orderList: any[] = [];
  pendingOrder: number = 1;
  dipatchedOrder: number = 2;
  shippedOrder: number = 3
  selectedTab = 0;

  getInitials(name: string): string {
    return name ? name.substring(0, 2).toUpperCase() : '';
  }

  constructor(
    private orderService: OrderService,
    private snackBarService: SnackbarService,
  ) {}

  ngOnInit() {
    this.loadOrderList(this.pendingOrder);
  }
  
  onTabChanged(event: MatTabChangeEvent) {
    this.selectedTab = event.index;    
    switch (this.selectedTab) {
      case 0:
        this.loadOrderList(this.pendingOrder);
        break;
      case 1:
        this.loadOrderList(this.dipatchedOrder); 
        break;
      case 2:
        this.loadOrderList(this.shippedOrder); 
        break;
    }
  }

  loadOrderList(status: number) {
    this.orderList = [];   
    this.orderService.getOrderList(status).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) { 
             
          this.orderList = res.data;
          console.log('Order List:', this.orderList);
        }
      },
    });
  }

  verifyPayment(orderId: number) {
    this.orderService.verifyPayment(orderId).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadOrderList(this.pendingOrder); // Refresh the order list to reflect changes
          this.snackBarService.show('Payment verified successfully', 'success');
        }
      },
    });
  }

  rejectPayment(orderId: number) {
    throw new Error('Reject payment functionality not implemented yet');
  }
}
 


