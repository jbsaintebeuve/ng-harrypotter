import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styles: ``,
})
export class SearchComponent {
  @Input() set search(value: string) {
    if (value) {
      this.searchTerm = value;
      this.onSearch(value);
    }
  }
  @Output() changeSearchEvent = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch(searchTerm: string) {
    this.changeSearchEvent.emit(searchTerm);
  }
}
