import { CurrencyPipe, NgIf, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidImage, faSolidTrash } from '@ng-icons/font-awesome/solid';
import { catchError, of } from 'rxjs';
import { PokemonCard } from '../../interfaces/pokemon-card';
import { PokemonResponse } from '../../interfaces/pokemon-response';
import { ShoppingCartProduct } from '../../interfaces/shopping-cart';
import { PokemonService } from '../../services/pokemon.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';
@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [
    NgIconComponent,
    QuantitySelectorComponent,
    CurrencyPipe,
    // DecimalPipe,
    UpperCasePipe,
    RouterLink,
    NgIf,
  ],
  providers: [provideIcons({ faSolidImage, faSolidTrash })],
  templateUrl: './shopping-cart-item.component.html',
  styles: ``,
})
export class ShoppingCartComponentItem implements OnInit {
  @Input() minimized = false;
  @Input({ required: true }) item: ShoppingCartProduct = {
    id: '',
    quantity: 0,
  };

  pokemon: PokemonCard = {} as PokemonCard;
  quantity = 1;
  data = localStorage.getItem('ng_poke_cart');
  // products: Product[] = this.data ? JSON.parse(this.data) : [];
  pokemons: PokemonCard[] = this.data ? JSON.parse(this.data) : [];
  cart: PokemonCard[] = [...this.pokemons];

  @Output() addItemEvent = new EventEmitter<number>();
  @Output() cartUpdated = new EventEmitter<void>();

  constructor(
    // private productService: ProductService,
    private pokemonService: PokemonService,
    private ShoppingCartService: ShoppingCartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.pokemonService
      .fetchPokemon(this.item.id)
      .pipe(
        catchError((error) => {
          if (error.status === 429) {
            console.log(
              'Impossible de charger le Pokémon. Veuillez réessayer plus tard.',
            );
          }
          this.router.navigate(['404']);
          return of(null);
        }),
      )
      .subscribe((response: PokemonResponse | null) => {
        if (response && response.data) {
          this.pokemon = response.data;
        }
      });

    this.ShoppingCartService.cart$.subscribe((cart) => {
      const updatedItem = cart.stock.find((item) => item.id === this.item.id);
      if (updatedItem) {
        this.quantity = updatedItem.quantity;
        this.item.quantity = updatedItem.quantity;
      }
    });
  }

  get price(): number {
    if (!this.pokemon.cardmarket) {
      return 0;
    }
    return this.pokemon.cardmarket.prices.averageSellPrice * this.item.quantity;
  }
  changeQuantity(value: number) {
    this.ShoppingCartService.changeQuantity(this.pokemon.id, value);
  }
  removeFromCart() {
    this.ShoppingCartService.removeFromCart(this.pokemon.id);
    this.cartUpdated.emit();
  }
  onChangeQuantity(value: number) {
    this.quantity = value;
    this.item.quantity = value;
    this.ShoppingCartService.changeQuantity(this.item.id, value);
    this.cartUpdated.emit();
  }
}
