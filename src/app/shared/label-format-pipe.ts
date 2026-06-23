import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lableFormatPipe'})

export class LableFormatPipe implements PipeTransform {

  transform(value: string,type:'order' |'payment' = 'order') {
    
    if(!value) return 'N/A';

    const orderMap: Record<string, string> = {
      Pending: 'Pending',
      ReadyForDispatch: 'Ready for Dispatch',
      shipped: 'Shipped',
    };
    const paymentMap:Record<string,string>={
      Pending : 'Payment Pending',
      Submitted: 'Payment Submitted',
      Verified : 'Payment Verified',
      FailedVerification:'Verfication Failed'
    };

    switch(type){
      case 'payment' :return paymentMap[value] || value;
      default :return orderMap[value] || value;
    }
  }
}
