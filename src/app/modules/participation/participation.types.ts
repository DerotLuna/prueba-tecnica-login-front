// -----------------------------------------------------------------------------------------------------
// @ Const
// -----------------------------------------------------------------------------------------------------
import { Base, FieldErrorBase, REQUIRED_FIELD } from '../../shared/shared.types';

export const MAX_LENGTH_FIELD_PARTICIPATION: 'Debe tener máximo 50 caracteres' = 'Debe tener máximo 50 caracteres';

// -----------------------------------------------------------------------------------------------------
// @ Class
// -----------------------------------------------------------------------------------------------------

export class Participation extends Base {
  name: string;
  last_name: string;
  phone: string;

  constructor(id: number, name: string, last_name: string, phone: string) {
    super(id);
    this.name = name;
    this.last_name = last_name;
    this.phone = phone;
  }
}

export class ErrorMessagesParticipation
{
  name: FieldErrorName;
  last_name: FieldErrorName;
  phone: FieldErrorPhone;

  constructor() {
    this.name = {
      required: REQUIRED_FIELD,
      maxlength: MAX_LENGTH_FIELD_PARTICIPATION,
    };
    this.last_name = {
      required: REQUIRED_FIELD,
      maxlength: MAX_LENGTH_FIELD_PARTICIPATION,
    };
    this.phone = {
      required: REQUIRED_FIELD,
      pattern: 'Debe ser un número de teléfono',
    };
  }
}

// -----------------------------------------------------------------------------------------------------
// @ Interfaces
// -----------------------------------------------------------------------------------------------------

interface FieldErrorName extends FieldErrorBase {
  maxlength: string;
}

interface FieldErrorPhone extends FieldErrorBase {
  pattern: string;
}
