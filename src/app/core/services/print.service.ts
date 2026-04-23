import { Injectable } from '@angular/core';
import { buildInvoiceTemplate } from '../../shared/templates/invoice-template';


@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor() {}

  printInvoice(invoiceData: any) {
    const html = buildInvoiceTemplate(invoiceData);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  }
}
}
