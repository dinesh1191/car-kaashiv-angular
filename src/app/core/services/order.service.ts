import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.apiBaseUrl +'/api/order';
  constructor(private http: HttpClient) { }


  placeOrder(idempotencyKey: string) {
    return this.http.post(`${this.baseUrl}/place-order`,{}, {
      headers: {
        'Idempotency-Key': idempotencyKey
      }
    });
  }
}
