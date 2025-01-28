import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form-input.component.html',
})
export class FormInputComponent implements ControlValueAccessor {
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) type: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) name: string = '';
  @Input() formControlName: string = '';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  disabled: boolean = false;

  constructor(public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any) {
    this.onChange(event.target.value);
    this.onTouched();
  }

  get isInvalid(): boolean {
    return (
      (this.ngControl?.invalid &&
        (this.ngControl?.dirty || this.ngControl?.touched)) ||
      false
    );
  }

  get errorMessage(): string {
    if (!this.isInvalid) return '';

    const errors = this.ngControl?.errors;
    if (errors?.['required']) return 'Ce champ est requis';
    if (errors?.['email']) return 'Email invalide';
    if (errors?.['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} caractères`;
    if (errors?.['pattern']) {
      if (this.type === 'tel') return 'Numéro de téléphone invalide';
      if (this.formControlName === 'zipCode') return 'Code postal invalide';
    }
    return 'Champ invalide';
  }
}
