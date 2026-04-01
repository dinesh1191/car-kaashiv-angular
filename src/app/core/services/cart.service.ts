import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface AddToCartRequest{
  partId:number;
  quantity:number;  
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

    private apiUrl = `${environment.apiBaseUrl}/api/cart`
  constructor(private http: HttpClient) {}

  addToCart(payload:AddToCartRequest):Observable<any>{
    return this.http.post(`${this.apiUrl}/add`,payload) 
}
}