import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-err-field',
  templateUrl: './err-field.component.html',
  styleUrls: ['./err-field.component.scss']
})
export class ErrFieldComponent {
  @Input() formField?: FormControl<any>

  fieldErr() {
    const control = this.formField;

    if (
      !control ||
      !control.errors ||
      !control.dirty ||
      !control.touched
    ) {
      return '';
    }


    if (control.getError('required'))
      return 'This field is required';

    const minlengthErr = control.getError('minlength');
    if (minlengthErr)
      return `Value cannot be shorter than ${minlengthErr.requiredLength}`;

    if (control.getError('email'))
      return 'Email is not valid';

    if (control.getError('pattern').requiredPattern === "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$") {
      return 'Phone is not valid';
    }

    if (control.getError('pattern').requiredPattern === "^[a-zA-Z]+$") {
      return 'This field is not valid';
    }

    return '';
  }

}
