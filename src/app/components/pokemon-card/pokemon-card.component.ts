import { Component, Input } from '@angular/core';
import { PokemonCard } from '../../interfaces/pokemon-card';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styles: ``,
})
export class PokemonCardComponent {
  constructor() {}
  @Input({ required: true }) pokemon: PokemonCard | undefined;
}
