import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidHeart } from '@ng-icons/font-awesome/solid';
import { ProductService } from '../../services/product.service';
import { SidePanelService } from '../../services/side-panel.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  providers: [provideIcons({ faSolidHeart })],
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
