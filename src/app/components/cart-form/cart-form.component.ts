import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, Subject, takeUntil, tap } from 'rxjs';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { PopupComponent } from '../popup/popup.component';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';
import { ItemPlaceholderComponent } from '../item-placeholder/item-placeholder.component';

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
    ItemPlaceholderComponent,
  ],
  templateUrl: './cart-form.component.html',
  styles: ``,
})
export class CartFormComponent implements OnInit, OnDestroy {
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

  isLoading = true;
  placeholders = Array(3).fill({});
  private destroy$ = new Subject<void>();

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

    if (this.cart.stock.length === 0) {
      this.isLoading = false;
      return;
    }

    this.shoppingCartService
      .totalCart()
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
      )
      .subscribe((total) => {
        this.cart = this.shoppingCartService.getCart();
        this.cart.total_price = total;
      });

    this.shoppingCartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cart) => {
        this.cart = cart;
      });

    if (this.cart.stock.length === 0) {
      this.router.navigate(['/panier']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // onCartUpdate() {
  //   this.cart = this.shoppingCartService.getCart();
  //   this.shoppingCartService.totalCart().subscribe((total) => {
  //     this.cart.total_price = total;
  //   });
  // }

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
