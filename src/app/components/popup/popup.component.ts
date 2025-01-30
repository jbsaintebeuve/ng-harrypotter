import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styles: '',
})
export class PopupComponent {
  @Input() data: any;
  isOpen = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private route: Router,
  ) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.shoppingCartService.clearCart();
    this.route.navigate(['']);
  }
}
