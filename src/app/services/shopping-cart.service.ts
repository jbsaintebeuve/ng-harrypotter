import { Injectable } from '@angular/core';
import { ShoppingCart, ShoppingCartProduct } from '../interfaces/shopping-cart';
@Injectable({
  providedIn: 'root',
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
    const new_prod: ShoppingCartProduct = { id: productId, quantity: quantity };
    this.cart.stock.push(new_prod);
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
  }
  removeFromCart(productId: number) {
    this.cart.stock = this.cart.stock.filter(
      (p: ShoppingCartProduct) => p.id !== productId,
    );
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
  }
  changeQuantity(productId: number, quantity: number) {
    const index = this.cart.stock.findIndex(
      (p: ShoppingCartProduct) => p.id === productId,
    );
    if (index !== -1) {
      this.cart.stock[index].quantity = quantity;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
  }
  clearCart() {
    this.cart = {
      total_price: 0,
      stock: [],
    };
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
  }
  totalCart() {
    let total = 0;
    this.cart.stock.forEach((p: ShoppingCartProduct) => {
      total += p.quantity;
    });
    this.cart.total_price = total;
    return total;
  }

  constructor() {}
}
