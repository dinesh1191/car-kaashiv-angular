import { Component, Input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material'
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-order-summary',
  imports: [MATERIAL_IMPORTS, CommonModule, EmptyStateComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  currentUser: any;
  orderList: any[] = [];
  getInitials(name: string): string {
    return name ? name.substring(0, 2).toUpperCase() : '';
  }

  constructor(
    private orderService: OrderService,
    private snackBarService: SnackbarService,
  ) {}

  ngOnInit() {
    this.getOrderList();
  }
  getOrderList() {
    this.orderService.getOrderList().subscribe((res) => {
      if (res && res.success && res.data) {
        this.orderList = res.data;
        console.log('Order List:', this.orderList);
      }
    });
  }

  verifyPayment(orderId: number) {
    this.orderService.verifyPayment(orderId).subscribe({
      next: (res) => {
        if (res.success) {        
         this.getOrderList(); // Refresh the order list to reflect changes
         this.snackBarService.show('Payment verified successfully', 'success'); 
        }
      },
    });
  }

  rejectPayment(orderId: number){
      throw new Error('Reject payment functionality not implemented yet');
        // this.orderService.rejectPayment(orderId).subscribe({
        //   next: (res) => {
        //     if (res.success) {
        //       // Handle successful rejection
        //     }
        //   }
        // });
      
      }
    
  }

  // payments = [
  //   {
  //     name: 'Ramesh Kumar',
  //     phone: '+91 9876543210',
  //     orderId: '1023',
  //     date: '24 May 2025, 10:30 AM',
  //     method: 'UPI',
  //     utr: '1234',
  //     amount: 450,
  //     status: 'Paid',
  //     logo: 'assets/gpay.png',
  //   },
  //   {
  //     name: 'Anita R',
  //     phone: '+91 91234 56789',
  //     orderId: 1025,
  //     date: '25 May 2025, 02:15 PM',
  //     method: 'PhonePe',
  //     utr: 7890,
  //     amount: '1,250.00',
  //     status: 'Pending',
  //     logo: 'assets/paytm.png',
  //   },
  //   {
  //     name: 'Karthik M',
  //     phone: '+91 99876 54321',
  //     orderId: 1026,
  //     date: '26 May 2025, 09:45 AM',
  //     method: 'Paytm',
  //     utr: 3456,
  //     amount: '600.00',
  //     status: 'Paid',
  //     logo: 'assets/upi.png',
  //   },
  //   {
  //     name: 'Priya S',
  //     phone: '+91 98765 43210',
  //     orderId: 1027,
  //     date: '27 May 2025, 05:30 PM',
  //     method: 'NetBanking',
  //     utr: 2345,
  //     amount: '2,000.00',
  //     status: 'Rejected',
  //     logo: 'assets/gpay.png',
  //   },
  //   {
  //     name: 'Rahul D',
  //     phone: '+91 87654 12345',
  //     orderId: 1028,
  //     date: '28 May 2025, 07:20 PM',
  //     method: 'Credit Card',
  //     utr: 4567,
  //     amount: '3,500.00',
  //     status: 'Paid',
  //     logo: 'assets/upi.png',
  //   },
  // ];



