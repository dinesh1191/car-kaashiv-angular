import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';


@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}
  cartItems: any[] = [];

ngOnInit(): void {  
 this.getCartItems();
}
  

    getCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (res) => {
        console.log('Cart Items:', res.data);
        this.cartItems = res.data ?? [];
       // this.cartItems[0].imageUrl = 'assets/shared/fake-image.png';
       this.cartItems.forEach((item: any) => {
        item.imageUrl = 'assets/shared/fake-image.png';
      });
      },
      error: (err) => {
        console.error('Failed to load cart items', err);
      },
    });
}
}
