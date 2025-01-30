import { PokemonCard } from './pokemon-card';
import { PokemonType } from './pokemon-type';

export interface PokemonData {
  pokemons: PokemonCard[];
  pokemonTypes: PokemonType[];
}
