import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { SidePanelService } from '../../services/side-panel.service';
import { PokemonCard } from '../../interfaces/pokemon-card';
import { PokemonResponse } from '../../interfaces/pokemon-response';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  pokemon: PokemonCard | undefined;
  isFlipped = false;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private sidePanelService: SidePanelService,
  ) {
    this.route.params.subscribe((params) => {
      this.pokemonService
        .fetchPokemon(params['id'])
        .pipe(
          catchError((error) => {
            this.router.navigate(['404']);
            return of(null);
          }),
        )
        .subscribe((response: PokemonResponse | null) => {
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
}
