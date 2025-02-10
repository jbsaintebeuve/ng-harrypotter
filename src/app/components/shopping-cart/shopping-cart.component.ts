import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidTrash } from '@ng-icons/font-awesome/solid';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ItemPlaceholderComponent } from '../item-placeholder/item-placeholder.component';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';
import { Subject, takeUntil, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    ShoppingCartComponentItem,
    NgIconComponent,
    NgFor,
    CurrencyPipe,
    RouterLink,
    ItemPlaceholderComponent,
  ],
  providers: [provideIcons({ faSolidTrash })],
  templateUrl: './shopping-cart.component.html',
  styles: ``,
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart: ShoppingCart = {
    total_price: 0,
    stock: [],
  };

  isLoading = true;
  placeholders = Array(3).fill({});
  private destroy$ = new Subject<void>();

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.cart = this.shoppingCartService.getCart();

    if (this.cart.stock.length === 0) {
      this.isLoading = false;
      return;
    }

    this.shoppingCartService
      .totalCart()
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
      )
      .subscribe((total) => {
        this.cart = this.shoppingCartService.getCart();
        this.cart.total_price = total;
      });

    this.shoppingCartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearCart() {
    this.cart = this.shoppingCartService.clearCart();
  }
}
