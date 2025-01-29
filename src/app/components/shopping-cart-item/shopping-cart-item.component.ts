import { CurrencyPipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidImage, faSolidTrash } from '@ng-icons/font-awesome/solid';
import { Product } from '../../interfaces/product';
import { ShoppingCartProduct } from '../../interfaces/shopping-cart';
import { ProductService } from '../../services/product.service';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [
    NgIconComponent,
    QuantitySelectorComponent,
    CurrencyPipe,
    DecimalPipe,
    UpperCasePipe,
    RouterLink,
  ],
  providers: [provideIcons({ faSolidImage, faSolidTrash })],
  templateUrl: './shopping-cart-item.component.html',
  styles: ``,
})
export class ShoppingCartComponentItem implements OnInit {
  @Input() minimized = false;
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
  quantity = 1;
  data = localStorage.getItem('ng_hp_cart');
  products: Product[] = this.data ? JSON.parse(this.data) : [];
  cart: Product[] = [...this.products];

  @Output() addItemEvent = new EventEmitter<number>();
  @Output() cartUpdated = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private ShoppingCartService: ShoppingCartService,
  ) {}

  ngOnInit(): void {
    const fetchedProduct = this.productService.getProduct(this.item.id);
    this.product = fetchedProduct ? fetchedProduct : this.product;
    this.quantity = this.item.quantity;
  }

  get price(): number {
    return this.product.price * this.item.quantity;
  }
  changeQuantity(value: number) {
    this.ShoppingCartService.changeQuantity(this.product.id, value);
  }
  removeFromCart() {
    this.ShoppingCartService.removeFromCart(this.product.id);
    this.cartUpdated.emit();
  }
  onChangeQuantity(value: number) {
    this.item.quantity = value;
    this.ShoppingCartService.changeQuantity(this.product.id, value);
    this.cartUpdated.emit();
  }
}
