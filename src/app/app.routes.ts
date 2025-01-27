import { Routes } from '@angular/router';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShoppingCartComponentItem } from './components/shopping-cart-item/shopping-cart-item.component';
import { FavorisListComponent } from './components/favoris-list/favoris-list.component';
export const routes: Routes = [
  {
    path: '',
    title: 'ProductList',
    component: ProductGridComponent,
  },
  {
    path: 'product/:id',
    title: 'ProductDetail',
    component: ProductDetailComponent,
  },
  {
    path: 'shopping-cart-item',
    title: 'ShoppingCart',
    component: ShoppingCartComponentItem,
  },
  {
    path: 'favoris',
    title: 'Favoris',
    component: FavorisListComponent,
  },
];
