import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidCartShopping } from '@ng-icons/font-awesome/solid';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SidePanelService } from '../../services/side-panel.service';
import { ItemPlaceholderComponent } from '../item-placeholder/item-placeholder.component';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';
import { Subject, takeUntil, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ShoppingCartComponentItem,
    RouterLink,
    ItemPlaceholderComponent,
  ],
  providers: [provideIcons({ faSolidCartShopping })],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css'],
})
export class SidePanelComponent implements OnDestroy, OnInit {
  constructor(
    public sidePanelService: SidePanelService,
    private shoppingCartService: ShoppingCartService,
  ) {}

  cart: ShoppingCart = {
    total_price: 0,
    stock: [],
  };

  isLoading = true;
  placeholders = Array(3).fill({});
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.cart = this.shoppingCartService.getCart();

    this.shoppingCartService.cart$
      .pipe(
        tap(() => {
          this.isLoading = this.cart.stock.length > 0;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((cart) => {
        this.cart = cart;
        this.isLoading = false;
      });

    setTimeout(() => {
      const hostElement = document.querySelector('app-side-panel');
      hostElement?.classList.add('open');
    }, 0);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get cartCount(): number {
    return this.cart.stock.reduce((acc, item) => acc + item.quantity, 0);
  }

  prepareClose() {
    const hostElement = document.querySelector('app-side-panel');
    hostElement?.classList.remove('open');
    setTimeout(() => {
      this.sidePanelService.close();
    }, 300);
  }

  clearCart() {
    this.cart = this.shoppingCartService.clearCart();
  }

  closePanel() {
    this.sidePanelService.close();
  }
}
