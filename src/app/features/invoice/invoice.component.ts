import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SnackbarService } from '../../core/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { PRIME_IMPORTS } from '../../shared/prime';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { AuthService } from '../../core/services/auth.service';
import { PrintService } from '../../core/services/print.service';

@Component({
  selector: 'app-invoice',
  imports: [CommonModule,PRIME_IMPORTS,MATERIAL_IMPORTS],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  orderId: number | undefined;
  OrderDetails: any;
  CustomerName:string| undefined;
  CustomerEmail: string | undefined;
  invoiceData: any;

 
  constructor( private snackbarService: SnackbarService,
    
    private activatedRoute: ActivatedRoute, 
    private orderService: OrderService,
    private authService:AuthService,
    private printService: PrintService){}

ngOnInit(): void {  
   this.activatedRoute.queryParamMap.subscribe(params => { 'id'
    this.orderId= Number(params.get('id')); 
  });
      console.log('Resolved OrderId:', this.orderId); // debug
      console.log('URL:', window.location.href);
       console.log('OrderId:', this.orderId);
 


  if (this.orderId) {
    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (res) => {
      this.OrderDetails = res;     
      this.snackbarService.show('Order details loaded successfully!', 'success');
    },
      error: (err) => {
        this.snackbarService.show('Failed to load order details', 'error', 3000, err);
      },
    });
  }
  this.CustomerName  = this.authService.currentUser?.name;
  this.CustomerEmail = this.authService.currentUser?.email; 
}

print(){ 
   const content = document.querySelector('.invoice-card')?.innerHTML;
   this.printService.printInvoice(content);
  
}
}
