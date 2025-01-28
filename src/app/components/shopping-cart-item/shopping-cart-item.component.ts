import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Input } from '@angular/core';
import {
  ShoppingCartProduct,
  ShoppingCart,
} from '../../interfaces/shopping-cart';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';
import { faSolidImage, faSolidTrash } from '@ng-icons/font-awesome/solid';
@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [NgIconComponent, QuantitySelectorComponent],
  providers: [provideIcons({ faSolidImage, faSolidTrash })],
  templateUrl: './shopping-cart-item.component.html',
  styles: ``,
})
export class ShoppingCartComponentItem {
  @Input({ required: true }) product: ShoppingCartProduct = {
    id: 0,
    quantity: 0,
  };
  // name: String = this.product.name;
  // price: number = this.product.price * this.qte;
  data = localStorage.getItem('ng_hp_cart');
  products: Product[] = this.data ? JSON.parse(this.data) : [];
  cart: Product[] = [...this.products];
  // total: String = this.price + '€';

  @Output() addItemEvent = new EventEmitter<number>();

  addToCart(product: Product) {
    // Add the product to the cart
    this.cart = [...this.cart, product];

    // Update the total price
    //this.total = this.cart.reduce((sum, p) => sum + p.price, 0);

    // Update the localStorage after adding the product
    localStorage.setItem('ng_hp_cart', JSON.stringify(this.cart));
  }

  removeFromCart(product: Product) {
    // Filter out the product to remove it from the cart
    this.cart = this.cart.filter((p: Product) => p.id !== product.id);

    // Update the total price
    //this.total = this.cart.reduce((sum, p) => sum + p.price, 0);

    // Update the localStorage after removing the product
    localStorage.setItem('ng_hp_cart', JSON.stringify(this.cart));
  }
  // quantityChangeplus() {
  //   this.qte = this.qte++;
  // }
  // quantityChangeminus() {
  //   this.qte = this.qte--;
  // }
}
