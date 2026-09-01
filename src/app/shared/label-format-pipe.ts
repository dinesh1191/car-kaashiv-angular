import { Pipe, PipeTransform } from '@angular/core';
import { Badge } from 'primeng/badge';

@Pipe({ name: 'lableFormatPipe'})

export class LableFormatPipe implements PipeTransform {

  transform(value: string,type:'order' |'payment' |'badge' = 'order'):string {
    
    if(!value) return 'N/A';

    const orderMap: Record<string, string> = {
      Pending: 'Pending',
      ReadyForDispatch: 'Ready for Dispatch',
      shipped: 'Shipped',
    };

    const badgeMap: Record<string, string >={
      Pending : "badge bg-warning text-dark",
      ReadyForDispatch : 'badge bg-info text-dark',
      Shipped:'badge bg-success text-dark'
    }
    // to used for future
    const paymentMap:Record<string,string>={
      Pending : 'Payment Pending',
      Submitted: 'Payment Submitted',
      Verified : 'Payment Verified',
      FailedVerification:'Verfication Failed'
    };

    switch(type){
      case 'badge': return badgeMap[value] || 'badge bg-secondary';
      case 'payment' :return paymentMap[value] || value;
      default :return orderMap[value] || value;
    }
  }
}

// reusable pipe to extract the city:

// @Pipe({ name: 'cityExtractor' })
// export class CityExtractorPipe implements PipeTransform {
//   transform(address: string): string {
//     if (!address) return 'N/A';

//     // Normalize separators
//     const normalized = address.replace(/[-,]/g, ' ');
//     const tokens = normalized.split(/\s+/).filter(t => t.trim().length > 0);

//     // Find first numeric token (postal code) and take the word before it
//     const postalIndex = tokens.findIndex(t => /^\d+$/.test(t));
//     if (postalIndex > 0) {
//       return tokens[postalIndex - 1];
//     }

//     // Fallback: last token
//     return tokens[tokens.length - 1];
//   }
// }
