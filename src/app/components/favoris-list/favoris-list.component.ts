import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favoris-list',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './favoris-list.component.html',
  styles: ``,
})
export class FavorisListComponent {
  constructor(public productService: ProductService) {}

  get favoriteCount(): number {
    return this.productService.getFavoriteCount();
  }

  get favoriteProducts(): Product[] {
    // return this.productService.products.filter((p) => p.isFavorite);
    const fav = this.productService.getFav();
    return this.productService.products.filter((p) => fav.includes(p.id));
  }

  clearFavorites() {
    this.productService.clearFav();
  }
}
