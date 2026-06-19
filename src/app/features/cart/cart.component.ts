import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { PRIME_IMPORTS } from '../../shared/prime';
import { FallbackImageDirective } from '../../shared/directives/fallback-image.directive';
import { CartItem, UpdateCartQuantityRequest } from '../../shared/interfaces/cart-item.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ImagePreviewDialogComponent } from '../../shared/components/image-preview-dialog/image-preview-dialog.component';



@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
    PRIME_IMPORTS,
    FallbackImageDirective,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  total: any;

  constructor(
    private cartService: CartService,
    private snackbarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog,
  ) {}
  cartItems: CartItem[] = [];
  gstRate = 0.18;
  subtotal: number = 0;
  gstAmount: number = 0;
  grandTotal: number = 0;

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
        this.snackbarService.show('Failed to load cart items', 'error');
      },
    });
  }

  updateQuantity(item: CartItem, delta: number) {
    const previousQuantity = item.quantity;
    item.quantity += delta;
    if (item.quantity < 1) {
      item.quantity = previousQuantity; // prevents quantity from going below 1
      return;
    }
    this.cartService.updateCartCount(item.quantity); // Optimistically update cart count in the UI
    item.subTotal = item.quantity * item.price;
    this.calculateGrandTotal();
    const request: UpdateCartQuantityRequest = {
      partId: item.partId,
      quantity: item.quantity,
    };
    this.cartService.updateQuantity(request).subscribe({
      next: (res) => {
        this.snackbarService.show(
          res.message || 'Quantity updated successfully',
          'success',
        );
        this.cartService.refreshCartCount(); // Refresh cart count after quantity update
      },
      error: (err) => {
        item.quantity = previousQuantity; // Revert to previous quantity on error
        item.subTotal = item.quantity * item.price; // Recalculate subtotal after reverting quantity
        this.calculateGrandTotal(); // Recalculate grand total after reverting quantity
        // this.cartService.refreshCartCount();
        console.error('Failed to update quantity', err);
        this.snackbarService.show(
          err.message || 'Failed to update quantity',
          'error',
          10000,
        );
      },
    });
  }

  removeItem(item: CartItem) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Cart Item',
        message: 'Are you sure you want to remove this item from your cart?',
        confirmText: 'Remove',
        cancelText: 'Cancel',
        icon: 'remove_shopping_cart',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const previousCartItems = [...this.cartItems];

        this.cartItems = this.cartItems.filter((i) => i.cartId !== item.cartId);

        this.calculateGrandTotal();

        this.cartService.removeItem(item.partId).subscribe({
          next: (res) => {
            this.snackbarService.show(
              res.message || 'Item removed successfully',
              'warning',
            );

            this.cartService.refreshCartCount();
          },
          error: (err) => {
            this.cartItems = previousCartItems;

            this.calculateGrandTotal();

            console.error('Remove item API failed:', err);

            this.snackbarService.show(
              'Failed to remove item. Please try again later',
              'error',
            );
          },
        });
      }
    });
  }
  calculateGrandTotal() {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.subTotal,
      0,
    );
    this.gstAmount = this.subtotal * this.gstRate;
    this.grandTotal = this.subtotal + this.gstAmount;
  }

  proceedToCheckout() {
    this.router.navigate(['checkout/checkout-dashboard']);
  }

  goBack() {
    this.router.navigate(['user/parts-dashboard']);
  }

  openImagePreview(imageUrl?: string) {
    if (!imageUrl) return;
    this.dialog.open(ImagePreviewDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
      data: {
        imageUrl,
        title: 'Cart item',
      },
    });
  }
}

