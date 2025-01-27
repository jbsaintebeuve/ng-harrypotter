import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Input } from '@angular/core';
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styles: ``
})
export class ShoppingCartComponent {
  @Input({ required: true }) product: Product = {
    id: 0,
    name: '',
    isFavorite: false,
    price: 0,
    createdDate: new Date(),
  };
  data = localStorage.getItem('ng_hp_cart');
  products: Product[] = this.data ? JSON.parse(this.data) : [];
  cart: Product[] = [...this.products];
  total: number = this.cart.reduce((sum, product) => sum + product.price, 0);
  qte: number = 1;

  removeFromCart(product: Product) {
    // Filter out the product to remove it from the cart
    this.cart = this.cart.filter((p: Product) => p.id !== product.id);
  
    // Update the total price
    this.total = this.cart.reduce((sum, p) => sum + p.price, 0);
  
    // Update the localStorage after removing the product
    localStorage.setItem('ng_hp_cart', JSON.stringify(this.cart));
  }  
}
