import { Pipe, PipeTransform } from '@angular/core';
import { PokemonCard } from '../interfaces/pokemon-card';
@Pipe({
  name: 'searchFor',
  standalone: true,
})
export class SearchForPipe implements PipeTransform {
  transform(pokemons: PokemonCard[], search: string) {
    if (!search) {
      return pokemons;
    }

    return pokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
