import { Pipe, PipeTransform } from '@angular/core';
import { PokemonCard } from '../interfaces/pokemon-card';

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortByPipe implements PipeTransform {
  transform(pokemons: PokemonCard[], type?: string, asc?: boolean) {
    switch (type) {
      case 'name':
        return this.sortByName(pokemons, asc);
      case 'hp':
        return this.sortByHp(pokemons, asc);
      default:
        return pokemons;
    }
  }

  sortByName(pokemons: PokemonCard[], asc?: boolean) {
    return asc
      ? pokemons.sort((a, b) => a.name.localeCompare(b.name))
      : pokemons.sort((a, b) => b.name.localeCompare(a.name));
  }
  sortByHp(pokemons: PokemonCard[], asc?: boolean) {
    return asc
      ? pokemons.sort((a, b) => parseInt(a.hp) - parseInt(b.hp))
      : pokemons.sort((a, b) => parseInt(b.hp) - parseInt(a.hp));
  }
}
