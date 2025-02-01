import { Injectable } from '@angular/core';
import { ShoppingCart, ShoppingCartProduct } from '../interfaces/shopping-cart';
import { PokemonService } from './pokemon.service';
import { BehaviorSubject, Observable, forkJoin, map, of } from 'rxjs';

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
    const storedCart = localStorage.getItem('ng-poke-cart');
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
    // this.totalCart();
    localStorage.setItem('ng-poke-cart', JSON.stringify(this.cart));
    this.cartSubject.next({ ...this.cart });
  }

  addToCart(productId: string, quantity: number) {
    const storedCart = localStorage.getItem('ng-poke-cart');
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

  removeFromCart(productId: string): ShoppingCart {
    this.cart.stock = this.cart.stock.filter(
      (p: ShoppingCartProduct) => p.id !== productId,
    );
    localStorage.setItem('ng-poke-cart', JSON.stringify(this.cart));
    // this.totalCart();
    this.updateCart();
    return this.cart;
  }

  changeQuantity(productId: string, quantity: number) {
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
    localStorage.setItem('ng-poke-cart', JSON.stringify(this.cart));
    // this.totalCart();
    this.updateCart();
    return this.cart;
  }

  totalCart(): Observable<number> {
    if (this.cart.stock.length === 0) {
      return of(0);
    }

    const pokemonRequests = this.cart.stock.map((item) =>
      this.pokemonService.fetchPokemon(item.id).pipe(
        map((response) => {
          const price = response.data.tcgplayer?.prices?.holofoil?.market || 0;
          return price * item.quantity;
        }),
      ),
    );

    return forkJoin(pokemonRequests).pipe(
      map((prices) => {
        const total = prices.reduce((sum, price) => sum + price, 0);
        this.cart.total_price = total;
        this.updateCart();
        return total;
      }),
    );
  }

  constructor(private pokemonService: PokemonService) {}
}
