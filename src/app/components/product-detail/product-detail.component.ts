import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
} from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    UpperCasePipe,
    DatePipe,
    NgIconComponent,
  ],
  templateUrl: './product-detail.component.html',
  styles: ``,
})
export class ProductDetailComponent {
  product!: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
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

  switchFav() {
    this.productService.switchFav(this.product);
  }
}
