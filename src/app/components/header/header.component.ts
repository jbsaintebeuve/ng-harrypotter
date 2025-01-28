import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ProductService } from '../../services/product.service';
import { SidePanelService } from '../../services/side-panel.service';
import { faSolidCartShopping } from '@ng-icons/font-awesome/solid';
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
export class HeaderComponent {
  constructor(public sidePanelService: SidePanelService) {}

  openSidePanel() {
    this.sidePanelService.toggle();
  }
}
