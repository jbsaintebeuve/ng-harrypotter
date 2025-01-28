import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [],
  templateUrl: './form-input.component.html',
  styles: ``,
})
export class FormInputComponent {
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) type: string = '';
  @Input({ required: true }) placeholder: string = '';
}
