import { Routes } from '@angular/router';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FavorisListComponent } from './components/favoris-list/favoris-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
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
    path: 'panier',
    title: 'ShoppingCart',
    component: ShoppingCartComponent,
  },
  {
    path: 'favoris',
    title: 'Favoris',
    component: FavorisListComponent,
  },
  {
    path: 'panier/informations',
    title: 'Form',
    component: CartFormComponent,
  },
];
