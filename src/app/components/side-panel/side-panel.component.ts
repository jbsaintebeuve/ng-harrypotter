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

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ShoppingCartComponentItem],
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

  ngOnInit() {
    this.cart = this.shoppingCartService.getCart();
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

  onCartUpdate() {
    this.cart = this.shoppingCartService.getCart();
  }

  clearCart() {
    this.cart = this.shoppingCartService.clearCart();
  }
}
