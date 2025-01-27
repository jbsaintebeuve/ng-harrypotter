import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortByPipe implements PipeTransform {
  transform(products: Product[], type?: string, asc?: boolean) {
    switch (type) {
      case 'name':
        return this.sortByName(products, asc);
      case 'date':
        return this.sortByDate(products, asc);
      default:
        return products;
    }
  }

  sortByName(products: Product[], asc?: boolean) {
    return asc
      ? products.sort((a, b) => a.name.localeCompare(b.name))
      : products.sort((a, b) => b.name.localeCompare(a.name));
  }
  sortByDate(products: Product[], asc?: boolean) {
    return asc
      ? products.sort(
          (a, b) => a.createdDate.getTime() - b.createdDate.getTime(),
        )
      : products.sort(
          (a, b) => b.createdDate.getTime() - a.createdDate.getTime(),
        );
  }
}
