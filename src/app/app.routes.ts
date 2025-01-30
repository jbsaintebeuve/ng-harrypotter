import { Routes } from '@angular/router';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { FavorisListComponent } from './components/favoris-list/favoris-list.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
export const routes: Routes = [
  {
    path: '',
    title: 'Accueil',
    component: ProductGridComponent,
  },
  {
    path: 'product/:id',
    title: 'Détail du produit',
    component: ProductDetailComponent,
  },
  {
    path: 'panier',
    title: 'Panier',
    component: ShoppingCartComponent,
  },
  {
    path: 'favoris',
    title: 'Favoris',
    component: FavorisListComponent,
  },
  {
    path: 'panier/informations',
    title: 'Panier - Informations',
    component: CartFormComponent,
  },
  {
    path: '**',
    title: 'Erreur 404',
    component: PageErrorComponent,
  },
  {
    path: '404',
    title: 'Erreur 404',
    component: PageErrorComponent,
  },
];
