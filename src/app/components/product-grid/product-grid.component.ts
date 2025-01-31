import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchForPipe } from '../../pipes/search-for.pipe';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SelectComponent } from '../select/select.component';
import { Product } from '../../interfaces/product';
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';
import { MultiSelectorComponent } from '../multi-selector/multi-selector.component';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonCard } from '../../interfaces/pokemon-card';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    ProductCardComponent,
    FormsModule,
    SortByPipe,
    SearchForPipe,
    SelectComponent,
    SearchComponent,
    RouterLink,
    MultiSelectorComponent,
    PokemonCardComponent,
  ],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent implements OnInit {
  constructor(
    public productService: ProductService,
    private pokemonService: PokemonService,
  ) {}
  @Input() searchTerm: string = '';
  products: Product[] = [];

  pokemons: PokemonCard[] = [];

  types: string[] = [];
  selectedTypes: string[] = [];

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.getFav();
    this.pokemonService.fetchPokemons();
    this.pokemonService.getPokemons().subscribe((pokemon) => {
      pokemon.forEach((p) => {
        this.pokemons.push(p);
      });
    });
    // this.pokemons = Array(20).fill({});
    this.pokemonService.getTypes().subscribe((types) => {
      this.types = types;
    });
  }

  get favoriteCount(): number {
    return this.productService.getFavoriteCount();
  }

  sortOpt = [
    { name: 'A-Z', value: 'name', asc: true },
    { name: 'Z-A', value: 'name', asc: false },
    { name: 'Plus récente', value: 'date', asc: false },
    { name: 'Plus ancienne', value: 'date', asc: true },
  ];
  sortSelected: number = 0;

  onSearch(term: string) {
    this.searchTerm = term;
  }

  onCategorySelect(categoryId: string): void {
    const index = this.selectedTypes.indexOf(categoryId);
    if (index === -1) {
      this.selectedTypes.push(categoryId);
    } else {
      this.selectedTypes.splice(index, 1);
    }
  }
}
