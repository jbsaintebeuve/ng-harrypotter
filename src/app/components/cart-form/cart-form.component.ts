import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';
import { PopupComponent } from '../popup/popup.component';

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
    PopupComponent,
  ],
  templateUrl: './cart-form.component.html',
  styles: ``,
})
export class CartFormComponent {
  @ViewChild(PopupComponent) popup!: PopupComponent;

  cart: ShoppingCart = {
    total_price: 0,
    stock: [],
  };

  checkoutForm: FormGroup;

  popupData = {
    title: 'Confirmation de commande',
    description: '',
  };

  constructor(
    private shoppingCartService: ShoppingCartService,
    private fb: FormBuilder,
    private router: Router,
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
    this.shoppingCartService.totalCart().subscribe((total) => {
      this.cart.total_price = total;
    });

    if (this.cart.stock.length === 0) {
      this.router.navigate(['/panier']);
    }
  }

  onCartUpdate() {
    this.cart = this.shoppingCartService.getCart();
    this.shoppingCartService.totalCart().subscribe((total) => {
      this.cart.total_price = total;
    });
  }

  clearCart() {
    this.cart = this.shoppingCartService.clearCart();
  }

  get isInvalid(): boolean {
    return !this.checkoutForm.valid;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const formData = this.checkoutForm.value;
      this.popupData.description = `
        Merci ${formData.firstName} ${formData.lastName} pour votre commande !
        Montant total : ${this.cart.total_price}€
        La commande sera livrée à : ${formData.address}, ${formData.zipCode} ${formData.city}
      `;
      this.popup.open();
    }
  }
}
