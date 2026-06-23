import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { OrderService } from '../../../../core/services/order.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LableFormatPipe } from '../../../../shared/label-format-pipe';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { DetailsDialogComponent, OrderDetailsData } from '../../../../shared/components/details-dialog/details-dialog.component';


@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, SharedModule, LableFormatPipe, EmptyStateComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  Orders: any[] = [];
  constructor(
    private orderService: OrderService,
    private snackBarService: SnackbarService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadMyOrders();
  }

  loadMyOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.Orders = res.data;
          console.log('My Orders:', this.Orders);
        }
      },
    });
  }

  viewDetails(order: any) {
    console.log(order, 'order dialog ');
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '500px',
      data: {
        order: {
          orderId: order.orderId,
          orderStatusText: order.orderStatusText,
          recipientName: order.recipientName,
          recipientPhone: order.recipientPhone,
          address: order.recipientAddress,
          landmark: order.landmark,
          paymentProofUrl: order.paymentProofUrl,
          totalAmount: order.totalAmount,
        },
      } as OrderDetailsData,
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('Details dialog closed');
    });
  }

  goToUserDashboard(){
    this.router.navigate(['user/parts-dashboard'])
  }
}
