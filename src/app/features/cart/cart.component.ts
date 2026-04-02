import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { PRIME_IMPORTS } from '../../shared/prime';



@Component({
  selector: 'app-cart',
  imports: [CommonModule,MATERIAL_IMPORTS,PRIME_IMPORTS],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  total: any;

  constructor(
    private cartService: CartService,
    private snackbarService: SnackbarService,
  ) {}
  cartItems: any[] = [];

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (res) => {
        console.log('Cart Items:', res.data);
        this.cartItems = res.data ?? [];
        this.calculateGrandTotal();
      },
      error: (err) => {
        console.error('Failed to load cart items', err);
        this.snackbarService.show('Failed to load cart items');
      },
    });
  }
  calculateGrandTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.subTotal, 0);
    console.log('GrandoTtal:', this.total);
  }
  
  increaseQuantity(item: any){ 
    item.quantity++;
    item.subTotal = item.quantity * item.price;
    this.calculateGrandTotal();
    this.cartService.increaseQuantity(item.partId,item.quantity).subscribe({
      next: (res) => {
        console.log('Quantity increased successfully');
      this.snackbarService.show(res.message ||'Quantity increased successfully');  },
        
        error: (err) => {
          console.error('Failed to increase quantity', err);
          this.snackbarService.show(err.message ||'Failed to increase quantity');
        }
    });
    

  }
  decreaseQuantity(item: any){
    if(item.quantity > 1){
      item.quantity--;
      item.subTotal = item.quantity * item.price;
      this.calculateGrandTotal();+
      this.cartService.decreaseQuantity(item.partId,item.quantity).subscribe({
        next: (res) => {
          console.log('Quantity decreased successfully'); 
        this.snackbarService.show(res.message ||'Quantity decreased successfully')},
        error: (err) => {
          console.error('Failed to decrease quantity', err);
          this.snackbarService.show(err.message ||'Failed to decrease quantity');
        },
      });
    }
 }
    removeItem(item: any){
      this.cartItems = this.cartItems.filter(i=> i.cartId !== item.cartId);
      this.calculateGrandTotal();
      this.cartService.removeItem(item.partId).subscribe({
        next: (res) => {
          console.log('Item removed successfully'); },
        error: (err) => {
          console.error('Failed to remove item', err);
          this.snackbarService.show('Failed to remove item');
        },
      }); 
    }

}
