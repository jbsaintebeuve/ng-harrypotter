import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonCard } from '../interfaces/pokemon-card';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  private pokemonSubject = new BehaviorSubject<PokemonCard[]>([]);
  private typesSubject = new BehaviorSubject<string[]>([]);

  fetchPokemons() {
    this.http
      .get(
        'https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1%20TO%20150]',
      )
      .subscribe((response: any) => {
        const data = response.data;
        const allTypes = new Set<string>();

        data.forEach((pokemon: PokemonCard) => {
          pokemon.types?.forEach((type) => allTypes.add(type));
        });

        this.pokemonSubject.next(data);
        this.typesSubject.next(Array.from(allTypes));
      });
  }

  getPokemons(): Observable<PokemonCard[]> {
    return this.pokemonSubject.asObservable();
  }

  getTypes(): Observable<string[]> {
    return this.typesSubject.asObservable();
  }
}
