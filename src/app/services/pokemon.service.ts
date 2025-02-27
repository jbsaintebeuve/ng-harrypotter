import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { PokemonCard } from '../interfaces/pokemon-card';
import { PokemonResponse } from '../interfaces/pokemon-response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private cache: { [key: string]: Observable<PokemonResponse> } = {};
  private mainPokemonsCache$: Observable<any> | null = null;

  constructor(private http: HttpClient) {}

  private pokemonSubject = new BehaviorSubject<PokemonCard[]>([]);
  private typesSubject = new BehaviorSubject<string[]>([]);

  fetchPokemons(): Observable<any> {
    if (this.mainPokemonsCache$) {
      return this.mainPokemonsCache$;
    }

    this.mainPokemonsCache$ = this.http
      .get(
        'https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1%20TO%20151]&orderBy=nationalPokedexNumbers&pageSize=151',
      )
      .pipe(
        tap((response: any) => {
          const data = response.data;
          const allTypes = new Set<string>();

          data.forEach((pokemon: PokemonCard) => {
            pokemon.types?.forEach((type) => allTypes.add(type));
          });

          this.pokemonSubject.next(data);
          this.typesSubject.next(Array.from(allTypes));
        }),
        shareReplay(1),
      );

    return this.mainPokemonsCache$;
  }

  fetchPokemon(id: string): Observable<PokemonResponse> {
    if (this.cache[id]) {
      return this.cache[id];
    }

    this.cache[id] = this.http
      .get<PokemonResponse>(`https://api.pokemontcg.io/v2/cards/${id}`)
      .pipe(shareReplay(1));

    return this.cache[id];
  }

  getPokemons(): Observable<PokemonCard[]> {
    return this.pokemonSubject.asObservable();
  }

  getTypes(): Observable<string[]> {
    return this.typesSubject.asObservable();
  }

  private favSubject = new BehaviorSubject<string[]>(['']);
  fav$ = this.favSubject.asObservable();

  fav: string[] = [];
  static cart$: any;

  getFav(): string[] {
    const storedFav = localStorage.getItem('ng-poke-fav');
    if (storedFav) {
      this.fav = JSON.parse(storedFav);
    } else {
      this.fav = [];
    }
    this.favSubject.next(this.fav);
    return this.fav;
  }

  getFavoriteCount(): number {
    return this.getFav().length;
  }
  private updateFav() {
    localStorage.setItem('ng-poke-fav', JSON.stringify(this.fav));
    this.favSubject.next({ ...this.fav });
  }

  addToFav(product: PokemonCard) {
    const storedFav = localStorage.getItem('ng-poke-fav');
    if (storedFav) {
      this.fav = JSON.parse(storedFav);
    }

    const existingProduct = this.fav.find((f) => f === product.id);
    if (existingProduct) {
      this.fav = this.fav.filter((f) => f !== product.id);
    } else {
      this.fav.push(product.id);
    }

    this.updateFav();
  }

  removeFromFav(productId: string): string[] {
    this.fav = this.fav.filter((p: string) => p !== productId);
    localStorage.setItem('ng-poke-fav', JSON.stringify(this.fav));
    this.updateFav();
    return this.fav;
  }
  isFavorite(productId: string): boolean {
    return this.fav.includes(productId);
  }

  clearFav(): string[] {
    this.fav = [];
    localStorage.setItem('ng-poke-fav', JSON.stringify(this.fav));
    this.updateFav();
    return this.fav;
  }
}
