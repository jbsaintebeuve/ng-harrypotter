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

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ShoppingCartComponentItem,
    RouterLink,
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

  product: Product = {
    id: 0,
    name: 'test',
    isFavorite: false,
    price: 100,
    createdDate: new Date(),
  };

  ngOnInit() {
    this.cart = this.shoppingCartService.getCart();
    this.cart.total_price = this.shoppingCartService.totalCart();

    this.shoppingCartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.cart.total_price = this.shoppingCartService.totalCart();
    });

    setTimeout(() => {
      const hostElement = document.querySelector('app-side-panel');
      hostElement?.classList.add('open');
    }, 0);
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
