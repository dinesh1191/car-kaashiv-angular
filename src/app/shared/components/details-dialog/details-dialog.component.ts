import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../material';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

export interface OrderItem {
  partId: number;
  partName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}
export interface OrderDetailsData {
order: {
    orderId: number;
    orderStatusText: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
    landMark?: string;
    paymentProofUrl?: string;
    gstTaxAmount:number;
    totalAmount: number;
    items: OrderItem[];
  };
}
@Component({
  selector: 'app-details-dialog',
  imports: [MatDialogModule,MatDividerModule,MatListModule, MATERIAL_IMPORTS,CommonModule],
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
