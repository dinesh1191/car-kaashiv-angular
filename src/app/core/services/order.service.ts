import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderResponse {
  orderId: number;
  invoiceNumber: string;
  totalAmount: number;
}

export interface OrdersListResponse {
  orderId: number;
  customerName: string;
  totalAmount: number;
  paymentProofUrl: string;
  paymentReference: string;
  submittedAt: string;
  paymentMethod: string;
  utr: string;
  phone: string;
  status: string;  
}
export interface PlaceOrderRequest {
  deliveryName: string;
  deliveryPhone: string;
  deliveryAddress: string;
  landmark: string;
}
export interface MyOrdersResponse {
  orderId: number;
  totalAmount: number;
  orderStatus: number;
  orderStatusText: string;
  createdAt: string; // ISO date string
  paymentProofUrl: string | null;
  deliveryName: string | null;
  phone: string | null;
  address: string | null;
  canEditAddress: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  private baseUrl = environment.apiBaseUrl + '/order';
  constructor(private http: HttpClient) {}

  placeOrder(idempotencyKey: string,order: PlaceOrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.baseUrl}/place-order`,
      order,
      {headers: 
        {'Idempotency-Key': idempotencyKey},
      });
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${orderId}`);
  }

  submitPaymentById(orderId: number, paymentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${orderId}/submit-payment`, paymentData);
  }

  getOrderList(status: number): Observable<OrdersListResponse[]> {
    return this.http.get<OrdersListResponse[]>( `${this.baseUrl}/?status=${status}`);
  }

  verifyPayment(orderId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${orderId}/verify-payment`, {});
  }

  markOrderShipped(orderId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${orderId}/mark-shipped`, {});
  }
  
  getMyOrders(): Observable<MyOrdersResponse> {
  return this.http.get<MyOrdersResponse>(`${this.baseUrl}/my-orders`);
 }
}
