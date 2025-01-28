import { CurrencyPipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidImage, faSolidTrash } from '@ng-icons/font-awesome/solid';
import { Product } from '../../interfaces/product';
import { ShoppingCartProduct } from '../../interfaces/shopping-cart';
import { ProductService } from '../../services/product.service';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';
@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [
    NgIconComponent,
    QuantitySelectorComponent,
    CurrencyPipe,
    DecimalPipe,
    UpperCasePipe,
  ],
  providers: [provideIcons({ faSolidImage, faSolidTrash })],
  templateUrl: './shopping-cart-item.component.html',
  styles: ``,
})
export class ShoppingCartComponentItem implements OnInit {
  @Input({ required: true }) item: ShoppingCartProduct = {
    id: 0,
    quantity: 0,
  };

  product: Product = {
    id: 0,
    name: '',
    isFavorite: false,
    price: 0,
    createdDate: new Date(),
  };

  // name: String = this.product.name;
  // price: number = this.product.price * this.qte;
  data = localStorage.getItem('ng_hp_cart');
  products: Product[] = this.data ? JSON.parse(this.data) : [];
  cart: Product[] = [...this.products];
  // total: String = this.price + '€';

  @Output() addItemEvent = new EventEmitter<number>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const fetchedProduct = this.productService.getProduct(this.item.id);
    this.product = fetchedProduct ? fetchedProduct : this.product;
  }

  addToCart(product: Product) {
    // Add the product to the cart
    this.cart = [...this.cart, product];

    // Update the total price
    //this.total = this.cart.reduce((sum, p) => sum + p.price, 0);

    // Update the localStorage after adding the product
    localStorage.setItem('ng_hp_cart', JSON.stringify(this.cart));
  }

  get price(): number {
    return this.product.price * this.item.quantity;
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
