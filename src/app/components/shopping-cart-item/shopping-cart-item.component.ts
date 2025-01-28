import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
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
  constructor(private shoppingCartService: ShoppingCartService) {}
  @Input({ required: true }) product: ShoppingCartProduct = {
    id: 0,
    quantity: 0,
  };
  @Input() quantityChange = 0;
  // name: String = this.product.name;
  // price: number = this.product.price * this.qte;
  data = localStorage.getItem('ng_hp_cart');
  products: Product[] = this.data ? JSON.parse(this.data) : [];
  cart: Product[] = [...this.products];
  // total: String = this.price + '€';

  @Output() addItemEvent = new EventEmitter<number>();

  addToCart() {
    this.shoppingCartService.addToCart(this.product.id, this.quantityChange);
    console.log('Product added to cart');
  }
  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product.id);
    console.log('Product removed from cart');
  }
  changeQuantity() {
    this.shoppingCartService.changeQuantity(this.product.id, this.quantityChange);
    console.log('Quantity changed');
  }
  
  
}
