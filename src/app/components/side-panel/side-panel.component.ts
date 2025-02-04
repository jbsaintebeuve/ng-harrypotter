import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { SidePanelService } from '../../services/side-panel.service';
import { Product } from '../../interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidCartShopping } from '@ng-icons/font-awesome/solid';
import { ShoppingCartComponentItem } from '../shopping-cart-item/shopping-cart-item.component';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { RouterLink } from '@angular/router';
import { ItemPlaceholderComponent } from '../item-placeholder/item-placeholder.component';

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
export class SidePanelComponent {
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

  ngOnInit() {
    this.shoppingCartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.shoppingCartService.totalCart().subscribe((total) => {
        this.cart.total_price = total;
        this.isLoading = false;
      });
    });

    setTimeout(() => {
      const hostElement = document.querySelector('app-side-panel');
      hostElement?.classList.add('open');
    }, 0);
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
