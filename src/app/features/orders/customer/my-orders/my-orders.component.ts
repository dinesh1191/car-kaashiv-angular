import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { OrderService } from '../../../../core/services/order.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, SharedModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  orderList: any[]=[];
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
    this.orderList = [];
    this.orderService.getMyOrders().subscribe({
      next: (res:any) => {
        if (res.data.length > 0) {
          this.orderList = res.data;
          console.log('My Orders:', this.orderList);
        }
      },
    });
  }
}
