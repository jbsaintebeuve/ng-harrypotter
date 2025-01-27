import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { ProductService } from '../../services/product.service';
import { SearchForPipe } from '../../pipes/search-for.pipe';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    ProductCardComponent,
    FormsModule,
    SortByPipe,
    SearchForPipe,
    SelectComponent,
  ],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent {
  @Input() searchTerm: string = '';
  productService = inject(ProductService);
  products = this.productService.getProducts();

  get favoriteCount(): number {
    return this.productService.getFavoriteCount();
  }

  sortOpt = [
    { name: 'A-Z', value: 'name', asc: true },
    { name: 'Z-A', value: 'name', asc: false },
    { name: 'Plus récente', value: 'date', asc: false },
    { name: 'Plus ancienne', value: 'date', asc: true },
  ];
  sortSelected: number = 0;
}
