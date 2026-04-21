import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SnackbarService } from '../../core/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { PRIME_IMPORTS } from '../../shared/prime';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice',
  imports: [CommonModule,PRIME_IMPORTS,MATERIAL_IMPORTS],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  orderId: any;
  OrderDetails: any;
  CustomerName:string| undefined;
  CustomerEmail: string | undefined;

 
  constructor( private snackbarService: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private orderService: OrderService,
     private authService:AuthService,private matSnackBar: MatSnackBar){}

ngOnInit(): void {  
this.orderId = this.activatedRoute.snapshot.queryParamMap.get('id');
this.CustomerName  = this.authService.currentUser?.name
this.CustomerEmail = this.authService.currentUser?.email
this.orderId = 50;
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
}

print(){
    this.matSnackBar.dismiss(); //important
  const content = document.querySelector('.invoice-card')?.innerHTML;

   
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const printWindow = window.open('', '', 'width=800,height=600');

  if (printWindow && content) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
               color: #000;
            }
              .company-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }

            .company-name {
              font-size: 22px;
              font-weight: bold;
            }
              .company-meta {
              text-align: right;
              font-size: 12px;
         
            }
              

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            h2, h3 {
             margin: 10px 0;
            }
              .summary {
              text-align: right;
              margin-top: 20px;
            }  
              .footer {
          margin-top: 40px;
          font-size: 12px;
        }

        .signature {
          text-align: right;
          margin-top: 60px;
        }

        .signature-line {
          margin-top: 40px;
          border-top: 1px solid #000;
          width: 200px;
          margin-left: auto;
          text-align: center;
          padding-top: 5px;
        }

        .terms {
          margin-top: 30px;
          font-size: 11px;
          color: #333;
        }   
              .terms ul {
              margin: 5px 0 0 15px;
              padding: 0;
            }       
          </style>
        </head>

        <body>
                  <!-- Company Header -->

           <div class="company-header">
            <div>
              <div class="company-name">CarKaashiv</div>
              <div style="font-size:12px;">Automobile Parts & Services</div>
            </div>

            <div class="company-meta">
              <div><strong>Printed:</strong> ${today}</div>        
              <div>WhatsApp: +91-XXXXXXXXXX</div>
            </div>
          </div>
          ${content}
           <!-- Signature -->
      <div class="signature">
        <div class="signature-line">
          Authorized Signature
        </div>
      </div>

      <!-- Terms & Conditions -->
      <div class="terms">
        <strong>Terms & Conditions:</strong>
        <ul>
          <li>Goods once sold cannot be returned or exchanged.</li>
          <li>Please verify items at the time of delivery.</li>
          <li>Warranty (if applicable) is as per manufacturer policy.</li>
          <li>CarKaashiv is not responsible for misuse of products.</li>
        </ul>
      </div>

        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }  
}
}
