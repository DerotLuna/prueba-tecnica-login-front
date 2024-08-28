import { ChangeDetectionStrategy, Component, output, OutputEmitterRef } from '@angular/core';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatPrefix
} from '@angular/material/form-field';
import { FieldErrorPipe } from '../../../../shared/pipes/field-error.pipe';
import { Credentials, ErrorMessagesSignIn } from '../../../../core/authentication/authentication.types';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'sign-in-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    NgOptimizedImage
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent {
  /**
   * Outputs
   */
  readonly dataSignIn: OutputEmitterRef<Credentials> = output();
  /**
   * Variables
   */
  protected form: FormGroup = this._generateForm();
  protected errorMessages: any = new ErrorMessagesSignIn();

  /**
   * Constructor
   */
  constructor( private _formBuilder: FormBuilder,
               private _fieldErrorPipe: FieldErrorPipe)
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Emits the form
   */
  submit(): void
  {
    if ( this.form.invalid )
    {
      return;
    }

    this.dataSignIn.emit( this.form.getRawValue() );
  }

  /**
   * Get the error message by field
   * @param field
   */
  getErrorMessageByField(field: 'email' | 'password'): string {
    return this._fieldErrorPipe.transform(this.errorMessages[field], this.form.controls[field].errors);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Generates the form
   */
  private _generateForm(): FormGroup
  {
    return this._formBuilder.group( {
      email: [ null,
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: [ null,
        [
          Validators.required,
        ],
      ],
    } );
  }
}
