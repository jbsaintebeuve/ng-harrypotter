import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  styles: `
  :host {
    margin-top: auto;
  }
  `,
})
export class FooterComponent {
  date = new Date();
}
