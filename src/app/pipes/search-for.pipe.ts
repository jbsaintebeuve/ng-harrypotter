import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';
@Pipe({
  name: 'searchFor',
  standalone: true,
})
export class SearchForPipe implements PipeTransform {
  transform(products: Product[], search: string) {
    if (!search) {
      return products;
    }

    return products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
