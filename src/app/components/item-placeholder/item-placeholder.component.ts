import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './item-placeholder.component.html',
  styles: ``,
})
export class ItemPlaceholderComponent {
  @Input() minimized = false;
}
