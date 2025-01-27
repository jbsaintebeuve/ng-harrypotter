import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidCaretDown } from '@ng-icons/font-awesome/solid';
import { SelectOption } from '../../interfaces/select-option';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ faSolidCaretDown })],
  templateUrl: './select.component.html',
  styles: [],
})
export class SelectComponent {
  @Input() name: string = '';
  @Input() options: SelectOption[] = [];
  @Input() selectedIndex: number = 0;
  @Output() selectedChange = new EventEmitter<number>();

  isSelectorOpen: boolean = false;

  handleSelectChange(index: number) {
    this.selectedIndex = index;
    this.selectedChange.emit(index);
    this.isSelectorOpen = false;
  }

  toggleSelector() {
    this.isSelectorOpen = !this.isSelectorOpen;
  }

  closeSelector() {
    this.isSelectorOpen = false;
  }
}
