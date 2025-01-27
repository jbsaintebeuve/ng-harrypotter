import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchForPipe } from '../../pipes/search-for.pipe';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SelectComponent } from '../select/select.component';
import { Product } from '../../interfaces/product';
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    ProductCardComponent,
    FormsModule,
    SortByPipe,
    SearchForPipe,
    SelectComponent,
    SearchComponent,
    RouterLink,
  ],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent implements OnInit {
  constructor(public productService: ProductService) {}
  @Input() searchTerm: string = '';
  products: Product[] = [];

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

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

  onSearch(term: string) {
    this.searchTerm = term;
  }
}
