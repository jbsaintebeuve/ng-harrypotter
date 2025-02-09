import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  private pokemons: PokemonCard[] = [];
  isLoading = true;
  placeholders = Array(6).fill({});

  constructor(public pokemonService: PokemonService) {
    this.pokemonService
      .fetchPokemons()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();

    this.pokemonService.getPokemons().subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  get favoriteCount(): number {
    return this.pokemonService.getFavoriteCount();
  }

  get favoritePokemons(): PokemonCard[] {
    const favIds = this.pokemonService.getFav();
    return this.pokemons.filter((pokemon) => favIds.includes(pokemon.id));
  }

  clearFavorites() {
    this.pokemonService.clearFav();
  }
}
