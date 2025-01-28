import { Component, OnInit } from '@angular/core';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartComponentItem],
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
}
