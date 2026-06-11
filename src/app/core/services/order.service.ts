import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderResponse {
  orderId: number;
  invoiceNumber: string;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.apiBaseUrl +'/order';
  constructor(private http: HttpClient) { }


  placeOrder(idempotencyKey: string): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.baseUrl}/place-order`, {}, {
      headers: {
        'Idempotency-Key': idempotencyKey
      }
    });
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${orderId}`);
  }

  submitPaymentById(orderId: number, paymentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${orderId}/submit-payment`, paymentData);
  }

 getOrderList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/payment-review-queue`);
  }

 verifyPayment(orderId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${orderId}/verify-payment`, { status });
  }



}
