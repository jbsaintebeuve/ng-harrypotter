import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces/shopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cart: ShoppingCart = {
    total_price: 0,
    stock: [],
  };

  getCart(): ShoppingCart {
    return this.cart;
  }

  addToCart(productId: number, quantity: number) {
    this.cart.stock.push({ id: productId, quantity: quantity });
  }

  constructor() { }
}
