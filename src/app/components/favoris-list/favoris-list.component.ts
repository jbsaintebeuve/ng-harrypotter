import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PokemonCard } from '../../interfaces/pokemon-card';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardPlaceholderComponent } from '../pokemon-card-placeholder/pokemon-card-placeholder.component';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-favoris-list',
  standalone: true,
  imports: [PokemonCardComponent, RouterLink, PokemonCardPlaceholderComponent],
  templateUrl: './favoris-list.component.html',
  styles: ``,
})
export class FavorisListComponent {
  favoritePokemons: PokemonCard[] = [];
  isLoading = true;
  placeholders = Array(6).fill({});

  constructor(public pokemonService: PokemonService) {
    const favIds = this.pokemonService.getFav();

    if (favIds.length === 0) {
      this.isLoading = false;
    } else {
      const pokemonRequests = favIds.map((id) =>
        this.pokemonService.fetchPokemon(id),
      );

      forkJoin(pokemonRequests)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe((responses) => {
          this.favoritePokemons = responses.map((response) => response.data);
        });
    }
  }

  get favoriteCount(): number {
    return this.pokemonService.getFavoriteCount();
  }

  clearFavorites() {
    this.pokemonService.clearFav();
    this.favoritePokemons = [];
  }
}
