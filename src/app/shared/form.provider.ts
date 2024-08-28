import { EnvironmentProviders, Provider } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FieldErrorPipe } from './pipes/field-error.pipe';

export const formProvider = (): Array<Provider | EnvironmentProviders> =>
{
  return [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    FieldErrorPipe,
  ];
};
