import { Component, Input, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faHeart } from '@ng-icons/font-awesome/regular';
import { faSolidHeart } from '@ng-icons/font-awesome/solid';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
} from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    UpperCasePipe,
    DatePipe,
    NgIconComponent,
  ],
  providers: [provideIcons({ faHeart, faSolidHeart })],
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent {
  @Input({ required: true }) product: Product = {
    id: 0,
    name: '',
    isFavorite: false,
    price: 0,
    createdDate: new Date(),
  };

  productService = inject(ProductService);

  switchFav() {
    this.productService.switchFav(this.product);
  }
}
