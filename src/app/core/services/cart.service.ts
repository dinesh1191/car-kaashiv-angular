import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { AddToCartRequest, CartItem, UpdateCartQuantityRequest } from '../../shared/interfaces/cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiBaseUrl}/api/Cart`;
  private CartCountSubject = new BehaviorSubject<number>(0); //BehaviorSubject keeps the latest state.
  cartCount$ = this.CartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<ApiResponse<CartItem[]>> {
    return this.http.get<ApiResponse<CartItem[]>>(this.apiUrl);
  }
  addToCart(payload: AddToCartRequest): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/add`, payload);
  }
  updateQuantity(
    request: UpdateCartQuantityRequest,
  ): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(
      `${this.apiUrl}/update-quantity`,
      request,
    );
  }
  removeItem(partId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/remove/${partId}`,
    );
  }
  getCartItemCount(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.apiUrl}/count`).pipe(
      tap((response) => {
        if (response.success && response.data !== undefined) {
          this.CartCountSubject.next(response.data);
        }
      }),
    );
  }

  refreshCartCount() {
    this.getCartItemCount().subscribe();
  }   
  updateCartCount(count: number) {
    this.CartCountSubject.next(count);
  }


}