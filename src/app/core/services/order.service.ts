import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderResponse {
  orderId: string; 
  invoiceNumber: string;
  totalAmount: number;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.apiBaseUrl +'/api/order';
  constructor(private http: HttpClient) { }


  placeOrder(idempotencyKey: string): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.baseUrl}/place-order`, {}, {
      headers: {
        'Idempotency-Key': idempotencyKey
      }
    });
  }

  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${orderId}`);
  }

}
