import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { SidePanelService } from '../../services/side-panel.service';
import { Product } from '../../interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css'],
})
export class SidePanelComponent {
  constructor(
    public sidePanelService: SidePanelService,
    public productService: ProductService,
  ) {}

  get favoriteCount(): number {
    return this.productService.getFavoriteCount();
  }

  get favoriteProducts(): Product[] {
    return this.productService.products.filter((p) => p.isFavorite);
  }

  ngOnInit() {
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

  clearFavorites() {
    this.productService.clearFavorites();
  }
}
