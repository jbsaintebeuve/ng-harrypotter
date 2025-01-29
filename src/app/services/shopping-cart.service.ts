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
    this.cart = JSON.parse(localStorage.getItem('shoppingCart') || '{}');
    this.cartSubject.next(this.cart);
    return this.cart;
  }

  private updateCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  addToCart(productId: number, quantity: number) {
    let car_quantity: number | undefined;
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
    // Check if product is already in cart
    if (this.cart.stock.find((p: ShoppingCartProduct) => p.id === productId)) {
      car_quantity = this.cart.stock.find(
        (p: ShoppingCartProduct) => p.id === productId,
      )?.quantity;
      car_quantity = car_quantity ? car_quantity : 0;
      this.changeQuantity(productId, quantity + car_quantity);
    } else {
      const new_prod: ShoppingCartProduct = {
        id: productId,
        quantity: quantity,
      };
      this.cart.stock.push(new_prod);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
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
    }
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.totalCart();
    this.updateCart();
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
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
    let total = 0;
    let price_item = 0;
    this.cart.stock.forEach((p: ShoppingCartProduct) => {
      if (this.cart.stock.length > 0 && p.id) {
        price_item = this.productService.getProduct(p.id)?.price || 0;
        total += price_item * p.quantity;
      }
    });
    this.cart.total_price = total;
    return total;
  }

  constructor(private productService: ProductService) {}
}
