import { CurrencyPipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidImage, faSolidTrash } from '@ng-icons/font-awesome/solid';
import { Product } from '../../interfaces/product';
import { ShoppingCartProduct } from '../../interfaces/shopping-cart';
import { ProductService } from '../../services/product.service';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCard } from '../../interfaces/pokemon-card';
import { catchError } from 'rxjs';
import { PokemonResponse } from '../../interfaces/pokemon-response';
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
  ) {}

  ngOnInit(): void {
    this.pokemonService
      .fetchPokemon(this.item.id)
      .pipe(
        catchError((error) => {
          console.error(error);
          return [];
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
