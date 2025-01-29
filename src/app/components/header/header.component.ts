import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidCartShopping } from '@ng-icons/font-awesome/solid';
import { SidePanelService } from '../../services/side-panel.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../interfaces/shopping-cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive],
  providers: [provideIcons({ faSolidCartShopping })],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent implements OnInit {
  constructor(
    public sidePanelService: SidePanelService,
    private shoppingCartService: ShoppingCartService,
  ) {}

  cart: ShoppingCart = {
    total_price: 0,
    stock: [],
  };
  ngOnInit() {
    this.shoppingCartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
  }

  openSidePanel() {
    this.sidePanelService.toggle();
  }
}
