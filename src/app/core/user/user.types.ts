import { Base } from '../../shared/shared.types';

// -----------------------------------------------------------------------------------------------------
// @ Class
// -----------------------------------------------------------------------------------------------------

export class User extends Base
{
  name: string;
  last_name: string;
  phone: string;
  email: string;

  constructor(id: number, name: string, last_name: string, phone: string, email: string) {
    super(id);
    this.name = name;
    this.last_name = last_name;
    this.phone = phone;
    this.email = email;
  }
}
