import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-selector.component.html',
  styles: ``,
})
export class MultiSelectorComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) options!: string[];
  @Input({ required: true }) selectedValues!: string[];
  @Output() onSelect = new EventEmitter<string>();

  isSelectorOpen = signal(false);

  protected handleSelectChange(value: string): void {
    this.onSelect.emit(value);
  }

  protected toggleSelector(): void {
    this.isSelectorOpen.update((state) => !state);
  }

  protected closeSelector(): void {
    this.isSelectorOpen.set(false);
  }
}
