import { Component, Input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../shared/material'
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewDialogComponent } from '../../../../shared/components/image-preview-dialog/image-preview-dialog.component';
import { FallbackImageDirective } from '../../../../shared/directives/fallback-image.directive';
import { Router } from '@angular/router';
import { PRIME_IMPORTS } from '../../../../shared/prime';
import { DetailsDialogComponent, OrderDetailsData } from '../../../../shared/components/details-dialog/details-dialog.component';

@Component({
  selector: 'app-order-summary',
  imports: [MATERIAL_IMPORTS,PRIME_IMPORTS, CommonModule, EmptyStateComponent, FallbackImageDirective],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  currentUser: any;
  orderList: any[] = [];
  pendingOrder: number = 1;
  dipatchedOrder: number = 2;
  shippedOrder: number = 3;
  selectedTab = 0;
  selectedOrder: any[]=[];
  

  getInitials(name: string): string {
    return name ? name.substring(0, 2).toUpperCase() : '';
  }

  constructor(
    private orderService: OrderService,
    private snackBarService: SnackbarService,
    private dialog: MatDialog,
    private router:Router
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

  verifyPayment(orderId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Verify Payment',
        message:
          'Are you sure you want to verify this payment? This order will move to Ready for Dispatch.',
        confirmText: 'Verify',
        cancelText: 'Cancel',
        icon: 'check_circle',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.orderService.verifyPayment(orderId).subscribe({
          next: (res) => {
            if (res.success) {
              this.loadOrderList(this.pendingOrder); // Refresh the order list to reflect changes
              this.snackBarService.show(
                'Payment verified successfully',
                'success',
              );
            }
          },
        });
      }
    });
  }
  openPaymentPreview(imageUrl: string): void {
    this.dialog.open(ImagePreviewDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
      data: {
        imageUrl,
        title: 'Payment Screenshot',
      },
    });
  }


  markShipped(orderId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Mark as Shipped',
        message:
          'Are you sure you want to mark this order as shipped? This order will move to Shipped status.',
        confirmText: 'Mark Shipped',
        cancelText: 'Cancel',
        icon: 'local_shipping',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.orderService.markOrderShipped(orderId).subscribe({
          next: (res) => {
            if (res.success) {
              this.loadOrderList(this.dipatchedOrder); // Refresh the order list to reflect changes
              this.snackBarService.show(
                'Order marked as shipped successfully',
                'success',
              );
            }
          },
        });
      }
    });
  }



 loadOrderDetailsById(orderId: number) {
  console.log('orderId:', orderId);

  this.orderService.getOrderDetailsById(orderId).subscribe({
    next: (res: any) => {
      if (res && res.data) {
        const order = res.data;      
        const dialogRef = this.dialog.open(DetailsDialogComponent, {          
        width: '600px',
          data: {order} as OrderDetailsData        
             });
           dialogRef.afterClosed().subscribe(() => {
          console.log('Details dialog closed');
        });
      } else {
        console.warn('No order found for ID:', orderId);
      }
    },
    error: (err) => {
      console.error('Error fetching order:', err);
    },
  });
}


  
   goToEmpDashboard(){
    this.router.navigate(['/employee/emp-dashboard'])
  }
 
}


