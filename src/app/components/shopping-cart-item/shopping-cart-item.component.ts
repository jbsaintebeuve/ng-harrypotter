import { CurrencyPipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidImage, faSolidTrash } from '@ng-icons/font-awesome/solid';
import { Product } from '../../interfaces/product';
import { ShoppingCartProduct } from '../../interfaces/shopping-cart';
import { ProductService } from '../../services/product.service';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
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

  constructor(private productService: ProductService, private ShoppingCartService : ShoppingCartService) {}

  ngOnInit(): void {
    const fetchedProduct = this.productService.getProduct(this.item.id);
    this.product = fetchedProduct ? fetchedProduct : this.product;
  }

  get price(): number {
    return this.product.price * this.item.quantity;
  }
  addToCart() {
    this.ShoppingCartService.addToCart(this.product.id, this.item.quantity);
  }
  changeQuantity(value: number) {
    this.ShoppingCartService.changeQuantity(this.product.id, value);
  }
  removeFromCart() {
    this.ShoppingCartService.removeFromCart(this.product.id);
  }
  onChangeQuantity(value: number) {
    this.item.quantity = value;
  }

}
