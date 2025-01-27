import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ProductService } from '../../services/product.service';
import { SidePanelService } from '../../services/side-panel.service';
import { faSolidCartShopping } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  providers: [provideIcons({ faSolidCartShopping })],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  constructor(
    public sidePanelService: SidePanelService,
    public productService: ProductService,
  ) {}

  get favoriteCount(): number {
    return this.productService.getFavoriteCount();
  }

  openSidePanel() {
    this.sidePanelService.toggle();
  }
}
