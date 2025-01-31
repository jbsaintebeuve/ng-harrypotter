import { Routes } from '@angular/router';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { FavorisListComponent } from './components/favoris-list/favoris-list.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
export const routes: Routes = [
  {
    path: '',
    title: 'Accueil',
    component: ProductGridComponent,
  },
  {
    path: 'pokemon/:id',
    title: 'Détail du pokemon',
    component: PokemonDetailComponent,
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
