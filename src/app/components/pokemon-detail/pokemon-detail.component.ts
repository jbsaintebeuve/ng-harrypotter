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
import { faSolidArrowRightLong } from '@ng-icons/font-awesome/solid';

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
  providers: [provideIcons({ faSolidArrowRightLong })],
})
export class PokemonDetailComponent {
  pokemon: PokemonCard | null = null;
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
          retryWhen((errors) =>
            errors.pipe(
              tap((err) => {
                if (err.status !== 429) throw err;
                this.loadingError =
                  'Trop de requêtes, nouvelle tentative dans 5 secondes...';
              }),
              delay(5000),
              take(3),
            ),
          ),
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
            console.log(this.pokemon);
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
  get isFavorite(): boolean {
    return this.pokemon
      ? this.pokemonService.isFavorite(this.pokemon.id)
      : false;
  }
  onChangeQuantity(value: number) {
    this.quantity = value;
  }
  switchFav() {
    if (this.pokemon) {
      this.pokemonService.addToFav(this.pokemon);
    }
  }
}
