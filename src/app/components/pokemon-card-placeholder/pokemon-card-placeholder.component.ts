import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faHeart } from '@ng-icons/font-awesome/regular';

@Component({
  selector: 'app-pokemon-card-placeholder',
  standalone: true,
  imports: [],
  providers: [provideIcons({ faHeart })],
  templateUrl: './pokemon-card-placeholder.component.html',
  styles: ``,
})
export class PokemonCardPlaceholderComponent {}
