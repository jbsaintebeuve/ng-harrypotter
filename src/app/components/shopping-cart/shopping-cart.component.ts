import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidTrash } from '@ng-icons/font-awesome/solid';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ItemPlaceholderComponent } from '../item-placeholder/item-placeholder.component';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';

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
export class ShoppingCartComponent implements OnInit, OnChanges {
  cart: ShoppingCart = {
    total_price: 0,
    stock: [],
  };

  isLoading = true;
  placeholders = Array(3).fill({});

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.cart = this.shoppingCartService.getCart();

    this.shoppingCartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.shoppingCartService.totalCart().subscribe((total) => {
        this.cart.total_price = total;
        this.isLoading = false;
      });
    });
  }

  ngOnChanges() {
    this.onCartUpdate();
  }

  onCartUpdate() {
    this.isLoading = true;
    this.cart = this.shoppingCartService.getCart();
    this.shoppingCartService.totalCart().subscribe((total) => {
      this.cart.total_price = total;
      this.isLoading = false;
    });
  }

  clearCart() {
    this.cart = this.shoppingCartService.clearCart();
  }
}
