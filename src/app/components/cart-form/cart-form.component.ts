import { Component } from '@angular/core';
import { FormInputComponent } from '../form-input/form-input.component';
import { CurrencyPipe, NgFor } from '@angular/common';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [
    FormInputComponent,
    ShoppingCartComponentItem,
    CurrencyPipe,
    RouterLink,
  ],
  templateUrl: './cart-form.component.html',
  styles: ``,
})
export class CartFormComponent {
  cart: ShoppingCart = {
    total_price: 0,
    stock: [
      // { id: 4, quantity: 2 },
      // { id: 2, quantity: 10 },
    ],
  };

  product: Product = {
    id: 0,
    name: 'test',
    isFavorite: false,
    price: 100,
    createdDate: new Date(),
  };

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.cart = this.shoppingCartService.getCart();
    this.cart.total_price = this.shoppingCartService.totalCart();
  }

  onCartUpdate() {
    this.cart = this.shoppingCartService.getCart();
    this.cart.total_price = this.shoppingCartService.totalCart();
  }

  clearCart() {
    this.cart = this.shoppingCartService.clearCart();
  }
}
