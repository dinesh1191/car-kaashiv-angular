import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { PartService } from '../../../parts/part.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { EmptyStateComponent } from "../../../../shared/components/empty-state/empty-state.component";
import { CartService } from '../../../../core/services/cart.service';
import { FallbackImageDirective } from "../../../../shared/directives/fallback-image.directive";


@Component({
  selector: 'app-user-part-list',
  imports: [SharedModule, EmptyStateComponent, FallbackImageDirective],
  templateUrl: './user-part-list.component.html',
  styleUrl: './user-part-list.component.scss',
})
export class UserPartListComponent implements OnInit {
  parts: any[] = [];
  constructor(
    private partService: PartService,
    private cartService: CartService,
    private snackbarService: SnackbarService,
  ) {}
  ngOnInit(): void {
    this.loadParts();
    this.cartService.getCartItemCount().subscribe();   
  }
  loadParts() {
    this.partService.getAllParts().subscribe({
      next: (res) => {
        this.parts = res.data ?? []; //if data exists → use it.undefined fallback to empty array
        this.parts[0].imageUrl = 'abc'; //to test fallback image functionality remove this line after testing
      },
      error(err) {
        console.error('Failed to load parts', err);
      },
    });
  }

  addCart(part: any) {
      this.cartService.addToCart({ partId: part.id, quantity: 1 }).subscribe({
      next: (res) => {
        this.snackbarService.show(
          res.message ? res.message : 'successfully added to cart',
          'success',
        );
        this.cartService.refreshCartCount();
      },
    });
  }





}