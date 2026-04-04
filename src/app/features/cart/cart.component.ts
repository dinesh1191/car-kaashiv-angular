import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { PRIME_IMPORTS } from '../../shared/prime';
import { FallbackImageDirective } from '../../shared/directives/fallback-image.directive';
import { CartItem, UpdateCartQuantityRequest } from '../../shared/interfaces/cart-item.interface';



@Component({
  selector: 'app-cart',
  imports: [CommonModule,MATERIAL_IMPORTS,PRIME_IMPORTS,FallbackImageDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  total: any;

  constructor(
    private cartService: CartService,
    private snackbarService: SnackbarService,
  ) {}
  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.getCartItems();
    this.cartService.getCartItemCount().subscribe(); // Subscribe to cart count updates on component initialization  
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (res) => {        
        this.cartItems = res.data ?? [];       
        this.calculateGrandTotal();
      },
      error: (err) => {
        console.error('Failed to load cart items', err);
        this.snackbarService.show('Failed to load cart items','error');
      },
    });
  } 
  
  updateQuantity(item:CartItem,delta: number){
    const previousQuantity = item.quantity;
    item.quantity += delta;
    if(item.quantity < 1){
      item.quantity = previousQuantity; // prevents quantity from going below 1
       return;
    }
    this.cartService.updateCartCount(item.quantity); // Optimistically update cart count in the UI
    item.subTotal = item.quantity * item.price;
    this.calculateGrandTotal();
    const request: UpdateCartQuantityRequest = {partId:item.partId,quantity:item.quantity};
    this.cartService.updateQuantity(request).subscribe({
      next: (res) => {       
      this.snackbarService.show(res.message ||'Quantity updated successfully','success'); 
      this.cartService.refreshCartCount(); // Refresh cart count after quantity update
     },  
        error: (err) => {
          item.quantity = previousQuantity; // Revert to previous quantity on error
          item.subTotal = item.quantity * item.price; // Recalculate subtotal after reverting quantity
          this.calculateGrandTotal(); // Recalculate grand total after reverting quantity
          console.error('Failed to update quantity', err);
          this.snackbarService.show('Failed to update quantity','error');
        },
    });
  }


  
    removeItem(item: CartItem){
      const previousCartItems = [...this.cartItems]; // Store previous cart items for potential revert  
      this.cartItems = this.cartItems.filter(i=> i.cartId !== item.cartId);//removes an item from the cart by filtering
      this.calculateGrandTotal();
      this.cartService.removeItem(item.partId).subscribe({
        next: (res) => {
          this.snackbarService.show(res.message || 'Item removed successfully','warning');
         },
        error: (err) => {
          this.cartItems = previousCartItems; // Revert the cart items to include the removed item on error
          this.calculateGrandTotal(); // Recalculate grand total after reverting cart items 
          console.error('Remove item API failed:', err);
          this.snackbarService.show('Failed to remove item.Please try again later','error');
      
        },
      }); 
    }

    calculateGrandTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.subTotal, 0);    
  }

}
