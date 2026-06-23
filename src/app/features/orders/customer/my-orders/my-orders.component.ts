import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { OrderService } from '../../../../core/services/order.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LableFormatPipe } from '../../../../shared/label-format-pipe';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';


@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, SharedModule,LableFormatPipe,EmptyStateComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  Orders: any[]=[];
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
      next: (res:any) => {
        if (res.data.length > 0) {
          this.Orders = res.data;         
          console.log('My Orders:', this.Orders);
        }
      },
    });
  }
}
