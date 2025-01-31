import { Component, Input } from '@angular/core';
import { PokemonCard } from '../../interfaces/pokemon-card';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  constructor() {}
  @Input({ required: true }) pokemon: PokemonCard | undefined;
}
