import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantity-selector.component.html',
  styles: ``,
})
export class QuantitySelectorComponent {
  @Input() quantity = 1;
  @Input() min = 1;
  @Input() max = 10;
  @Output() quantityChange = new EventEmitter<number>();

  increment() {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  decrement() {
    if (this.quantity > this.min) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
