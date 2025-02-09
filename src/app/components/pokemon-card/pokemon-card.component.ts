import { Component, Input } from '@angular/core';
import { PokemonCard } from '../../interfaces/pokemon-card';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidHeart } from '@ng-icons/font-awesome/solid';
import { faHeart } from '@ng-icons/font-awesome/regular';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ faHeart, faSolidHeart })],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  constructor(private pokemonService: PokemonService) {}
  @Input({ required: true }) pokemon: PokemonCard = {} as PokemonCard;

  get isFavorite(): boolean {
    return this.pokemonService.isFavorite(this.pokemon.id);
  }

  switchFav(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.pokemonService.addToFav(this.pokemon);
  }
}
