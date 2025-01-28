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
    this.cart = JSON.parse(localStorage.getItem('shoppingCart') || '{}');
    return this.cart;
  }

  addToCart(productId: number, quantity: number) {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
    if (this.cart.stock.find((p: ShoppingCartProduct) => p.id === productId)) {
      this.changeQuantity(productId, quantity);
    } else {
      const new_prod: ShoppingCartProduct = {
        id: productId,
        quantity: quantity,
      };
      this.cart.stock.push(new_prod);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
  }

  removeFromCart(productId: number): ShoppingCart {
    this.cart.stock = this.cart.stock.filter(
      (p: ShoppingCartProduct) => p.id !== productId,
    );
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
    return this.cart;
  }

  changeQuantity(productId: number, quantity: number) {
    const index = this.cart.stock.findIndex(
      (p: ShoppingCartProduct) => p.id === productId,
    );
    if (index > -1) {
      console.log('onchange success index', index);
      this.cart.stock[index].quantity = quantity;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
  }

  clearCart(): ShoppingCart {
    this.cart = {
      total_price: 0,
      stock: [],
    };
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    return this.cart;
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
