import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface AddToCartRequest{
  partId:number;
  quantity:number;  
}


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiBaseUrl}/api/Cart`;
  constructor(private http: HttpClient) {}

  addToCart(payload: AddToCartRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, payload);
  }
  getCartItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  decreaseQuantity(partId: number,quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-quantity`, { partId, quantity });
  }
  increaseQuantity(partId: number,quantity: number): Observable<any> {    
    return this.http.put(`${this.apiUrl}/update-quantity`, { partId, quantity });
  }
  removeItem(partId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${partId}`);
  }
}