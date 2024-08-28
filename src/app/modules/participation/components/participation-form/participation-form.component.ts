import { ChangeDetectionStrategy, Component, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatPrefix
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ErrorMessagesParticipation, Participation } from '../../participation.types';
import { MatButton } from '@angular/material/button';
import { FieldErrorPipe } from '../../../../shared/pipes/field-error.pipe';
import { REGEX_PHONE } from '../../../../shared/shared.types';

@Component( {
  selector: 'participation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    MatIcon,
    MatButton,
    MatError,
    FieldErrorPipe,
  ],
  templateUrl: './participation-form.component.html',
  styleUrl: './participation-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class ParticipationFormComponent
{
  /**
   * Outputs
   */
  readonly dataParticipation: OutputEmitterRef<Participation> = output();
  /**
   * Variables
   */
  protected form: FormGroup = this._generateForm();
  protected errorMessages: any = new ErrorMessagesParticipation();


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

    this.dataParticipation.emit( this.form.getRawValue() );
  }

  /**
   * Get the error message by field
   * @param field
   */
  getErrorMessageByField(field: 'name' | 'last_name' | 'phone'): string {
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
      name: [ null,
        [
          Validators.required,
          Validators.maxLength( 50 ),
        ],
      ],
      last_name: [ null,
        [
          Validators.required,
          Validators.maxLength( 50 ),
        ],
      ],
      phone: [ null,
        [
          Validators.required,
          Validators.pattern( REGEX_PHONE ),
        ],
      ],
    } );
  }

}
