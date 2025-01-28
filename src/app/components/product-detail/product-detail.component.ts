import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
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
  @Input() quantityChange = 0;
  product!: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
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
    this.shoppingCartService.addToCart(this.product.id, this.quantityChange);
    console.log('Product added to cart');
  }

  switchFav() {
    this.productService.switchFav(this.product);
  }
}
