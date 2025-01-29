import { Injectable } from '@angular/core';
import { ShoppingCart, ShoppingCartProduct } from '../interfaces/shopping-cart';
import { ProductService } from './product.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartSubject = new BehaviorSubject<ShoppingCart>({
    total_price: 0,
    stock: [],
  });
  cart$ = this.cartSubject.asObservable();

  cart: ShoppingCart = {
    total_price: 0,
    stock: [],
  };
  static cart$: any;

  getCart(): ShoppingCart {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    } else {
      this.cart = {
        total_price: 0,
        stock: [],
      };
    }
    this.cartSubject.next(this.cart);
    return this.cart;
  }

  private updateCart() {
    this.totalCart();
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.cartSubject.next({ ...this.cart });
  }

  addToCart(productId: number, quantity: number) {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }

    const existingProduct = this.cart.stock.find((p) => p.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cart.stock.push({
        id: productId,
        quantity: quantity,
      });
    }

    this.updateCart();
  }

  removeFromCart(productId: number): ShoppingCart {
    this.cart.stock = this.cart.stock.filter(
      (p: ShoppingCartProduct) => p.id !== productId,
    );
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
    this.updateCart();
    return this.cart;
  }

  changeQuantity(productId: number, quantity: number) {
    const index = this.cart.stock.findIndex(
      (p: ShoppingCartProduct) => p.id === productId,
    );
    if (index > -1) {
      this.cart.stock[index].quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCart();
      }
    }
  }

  clearCart(): ShoppingCart {
    this.cart = {
      total_price: 0,
      stock: [],
    };
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
    this.updateCart();
    return this.cart;
  }

  totalCart() {
    let total = 0;
    this.cart.stock.forEach((p: ShoppingCartProduct) => {
      if (p.id) {
        const price = this.productService.getProduct(p.id)?.price || 0;
        total += price * p.quantity;
      }
    });
    this.cart.total_price = total;
    return total;
  }

  constructor(private productService: ProductService) {}
}
