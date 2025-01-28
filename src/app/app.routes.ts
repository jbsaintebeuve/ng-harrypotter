import { Routes } from '@angular/router';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FavorisListComponent } from './components/favoris-list/favoris-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
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
    path: 'shopping-cart',
    title: 'ShoppingCart',
    component: ShoppingCartComponent,
  },
  {
    path: 'favoris',
    title: 'Favoris',
    component: FavorisListComponent,
  },
];
