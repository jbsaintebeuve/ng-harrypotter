import { Injectable } from '@angular/core';
import { ShoppingCart, Produit} from '../interfaces/shopping-cart';
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
    const new_prod: Produit = { id : productId, quantite : quantity };
    this.cart.stock.push(new_prod);
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
  }
  removeFromCart(productId: number) {
    this.cart.stock.filter((p: Produit) => p.id !== productId);
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
  }
  changeQuantity(productId: number, quantity: number) {
    const index = this.cart.stock.findIndex((p: Produit) => p.id === productId);
    if (index !== -1) {
      this.cart.stock[index].quantite = quantity;
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
    this.cart.stock.forEach((p: Produit) => {
      total += p.quantite;
    });
    this.cart.total_price = total;
    return total;
  }

  
  constructor() { }
}
