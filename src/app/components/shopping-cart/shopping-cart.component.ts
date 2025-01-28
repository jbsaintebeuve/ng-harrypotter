import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { Product } from '../../interfaces/product';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidTrash } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartComponentItem, NgIconComponent, NgFor],
  providers: [provideIcons({ faSolidTrash })],
  templateUrl: './shopping-cart.component.html',
  styles: ``,
})
export class ShoppingCartComponent implements OnInit {
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
  }

  onCartUpdate() {
    this.cart = this.shoppingCartService.getCart();
  }

  clearCart() {
    this.cart = this.shoppingCartService.clearCart();
  }
}
