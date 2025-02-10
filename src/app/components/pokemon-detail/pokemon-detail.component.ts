import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SidePanelService } from '../../services/side-panel.service';
import { PokemonCard } from '../../interfaces/pokemon-card';
import { PokemonResponse } from '../../interfaces/pokemon-response';
import { catchError, retryWhen, delay, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrencyPipe, NgIf } from '@angular/common';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  faSolidArrowRightLong,
  faSolidHeart,
} from '@ng-icons/font-awesome/solid';
import { faHeart } from '@ng-icons/font-awesome/regular';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    QuantitySelectorComponent,
    RouterLink,
    NgIf,
    NgIconComponent,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  providers: [provideIcons({ faSolidArrowRightLong, faSolidHeart, faHeart })],
})
export class PokemonDetailComponent {
  pokemon: PokemonCard = {} as PokemonCard;
  isFlipped = false;
  quantity = 1;
  isLoading = false;
  loadingError: string | null = null;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private sidePanelService: SidePanelService,
  ) {
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      this.loadingError = null;

      this.pokemonService
        .fetchPokemon(params['id'])
        .pipe(
          catchError((error) => {
            this.isLoading = false;
            if (error.status === 429) {
              this.loadingError =
                'Impossible de charger le Pokémon. Veuillez réessayer plus tard.';
            }
            this.router.navigate(['404']);
            return of(null);
          }),
        )
        .subscribe((response: PokemonResponse | null) => {
          this.isLoading = false;
          this.loadingError = null;
          if (response && response.data) {
            this.pokemon = response.data;
          }
        });
    });
  }

  onMouseMove(event: MouseEvent) {
    if (this.isFlipped) return;
    const cardInner = (event.currentTarget as HTMLElement).querySelector(
      '.card-inner',
    ) as HTMLElement;
    const rect = cardInner.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onMouseLeave() {
    if (this.isFlipped) return;
    const cardInner = document.querySelector('.card-inner') as HTMLElement;
    if (cardInner) {
      cardInner.style.transform =
        'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    }
  }

  onCardClick(event: MouseEvent) {
    const cardInner = (event.currentTarget as HTMLElement).querySelector(
      '.card-inner',
    ) as HTMLElement;
    cardInner.classList.add('spinning');

    setTimeout(() => {
      cardInner.classList.remove('spinning');
    }, 1600);
  }

  addToCart() {
    if (this.pokemon?.id) {
      this.shoppingCartService.addToCart(this.pokemon.id, this.quantity);
    }
    this.sidePanelService.open(true);
  }
  onChangeQuantity(value: number) {
    this.quantity = value;
  }
  get isFavorite(): boolean {
    return this.pokemonService.isFavorite(this.pokemon.id);
  }

  switchFav(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.pokemonService.addToFav(this.pokemon);
  }
}
