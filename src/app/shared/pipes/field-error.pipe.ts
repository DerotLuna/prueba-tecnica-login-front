import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldError',
  standalone: true
})
export class FieldErrorPipe implements PipeTransform {

  transform( value: any, error: any ): string
  {
    // if the value is null or undefined, return an empty string
    if ( !value || !error )
    {
      return '';
    }
    // returns only the first key that you have, important the order
    return value[ Object.keys( error )[ 0 ] ];
  }

}
