import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SidePanelService } from '../../services/side-panel.service';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
} from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faHeart } from '@ng-icons/font-awesome/regular';
import { faSolidHeart, faSolidImage } from '@ng-icons/font-awesome/solid';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    UpperCasePipe,
    DatePipe,
    NgIconComponent,
    QuantitySelectorComponent,
  ],
  providers: [provideIcons({ faHeart, faSolidHeart, faSolidImage })],
  templateUrl: './product-detail.component.html',
  styles: ``,
})
export class ProductDetailComponent {
  quantity = 1;
  product!: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private sidePanelService: SidePanelService,
  ) {
    this.route.params.subscribe((params) => {
      const product = this.productService.getProduct(parseInt(params['id']));
      if (product) {
        this.product = product;
      } else {
        console.error('Product not found');
      }
    });
  }
  addToCart() {
    this.shoppingCartService.addToCart(this.product.id, this.quantity);
    this.sidePanelService.open(true);
  }
  get isFavorite(): boolean {
    return this.productService.isFavorite(this.product.id);
  }
  onChangeQuantity(value: number) {
    this.quantity = value;
  }
  switchFav() {
    this.productService.addToFav(this.product);
  }
}
