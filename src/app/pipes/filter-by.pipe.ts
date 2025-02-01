import { Pipe, PipeTransform } from '@angular/core';
import { PokemonCard } from '../interfaces/pokemon-card';

@Pipe({
  name: 'filterBy',
  standalone: true,
})
export class FilterByPipe implements PipeTransform {
  transform(pokemons: PokemonCard[], types: string[]): PokemonCard[] {
    if (!types || types.length === 0) return pokemons;
    if (!pokemons || pokemons.length === 0) return [];

    return pokemons.filter((pokemon) =>
      types.some((type) => pokemon.types.includes(type)),
    );
  }
}
