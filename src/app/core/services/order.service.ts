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
  recipientName: string | null;
  recipientPhone: string | null;
  recipientAddress: string | null;
  landMark: string | null;
  canEditAddress: boolean;
}
export interface OrderItem {
  partId: number;
  partName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderData {
  orderId: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  landMark: string;
  totalAmount: number;
  submittedAt: string | null;
  items: OrderItem[];
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
 
 getOrderDetailsById(OrderId:number){
   return this.http.get<OrderData>(`${this.baseUrl}/ordersDetails/${OrderId}`)
 }
}
