import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../material';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


export interface OrderDetailsData {
order: {
    orderId: number;
    orderStatusText: string;
    recipientName: string;
    recipientPhone: string;
    address: string;
    landmark?: string;
    paymentProofUrl?: string;
    totalAmount: number;
  };
}
@Component({
  selector: 'app-details-dialog',
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent,MatDividerModule,MatListModule, MatDialogActions,MATERIAL_IMPORTS,CommonModule],
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss'
})

export class DetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailsData
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  viewPaymentProof(): void {
    if (this.data.order.paymentProofUrl) {
      window.open(this.data.order.paymentProofUrl, '_blank');
    }
  }
}
