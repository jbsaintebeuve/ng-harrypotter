import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PokemonCard } from '../../interfaces/pokemon-card';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { SearchForPipe } from '../../pipes/search-for.pipe';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { PokemonService } from '../../services/pokemon.service';
import { ProductService } from '../../services/product.service';
import { MultiSelectorComponent } from '../multi-selector/multi-selector.component';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SearchComponent } from '../search/search.component';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    FormsModule,
    SortByPipe,
    SearchForPipe,
    SelectComponent,
    SearchComponent,
    RouterLink,
    MultiSelectorComponent,
    PokemonCardComponent,
    FilterByPipe,
  ],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent implements OnInit {
  constructor(
    public productService: ProductService,
    private pokemonService: PokemonService,
  ) {}
  @Input() searchTerm: string = '';

  pokemons: PokemonCard[] = [];

  types: string[] = [];
  selectedTypes: string[] = [];

  ngOnInit(): void {
    this.pokemonService.fetchPokemons();
    this.pokemonService.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
      },
    });

    this.pokemonService.getTypes().subscribe({
      next: (types) => {
        this.types = types;
      },
    });
  }

  get favoriteCount(): number {
    return this.pokemonService.getFavoriteCount();
  }

  sortOpt = [
    { name: 'A-Z', value: 'name', asc: true },
    { name: 'Z-A', value: 'name', asc: false },
    { name: 'HP 0-9', value: 'hp', asc: true },
    { name: 'HP 9-0', value: 'hp', asc: false },
  ];
  sortSelected: number = 0;

  onSearch(term: string) {
    this.searchTerm = term;
  }

  onTypesSelect(type: string): void {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes = [...this.selectedTypes, type];
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    }
  }
}
