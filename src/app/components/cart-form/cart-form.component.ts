import { CurrencyPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [
    FormInputComponent,
    ShoppingCartComponentItem,
    CurrencyPipe,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './cart-form.component.html',
  styles: ``,
})
export class CartFormComponent {
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

  checkoutForm: FormGroup;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private fb: FormBuilder,
  ) {
    this.checkoutForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      city: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cart = this.shoppingCartService.getCart();
    this.cart.total_price = this.shoppingCartService.totalCart();
  }

  onCartUpdate() {
    this.cart = this.shoppingCartService.getCart();
    this.cart.total_price = this.shoppingCartService.totalCart();
  }

  clearCart() {
    this.cart = this.shoppingCartService.clearCart();
  }

  get isInvalid(): boolean {
    return !this.checkoutForm.valid;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form submitted', this.checkoutForm.value);
    }
  }
}
