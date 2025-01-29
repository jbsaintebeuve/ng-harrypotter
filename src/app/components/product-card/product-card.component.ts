import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faHeart } from '@ng-icons/font-awesome/regular';
import { faSolidHeart } from '@ng-icons/font-awesome/solid';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

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
  constructor(public productService: ProductService) {}
  @Input({ required: true }) product: Product = {
    id: 0,
    name: '',
    isFavorite: false,
    price: 0,
    createdDate: new Date(),
  };

  switchFav(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.productService.addToFav(this.product);
  }
}
