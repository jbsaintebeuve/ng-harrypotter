import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styles: ``,
})
export class SearchComponent {
  @Output() changeSearchEvent = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch(searchTerm: string) {
    this.changeSearchEvent.emit(searchTerm);
  }
}
