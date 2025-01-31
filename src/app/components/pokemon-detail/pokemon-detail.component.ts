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
  styles: ``,
})
export class PokemonDetailComponent {
  pokemon: PokemonCard | undefined;

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
}
