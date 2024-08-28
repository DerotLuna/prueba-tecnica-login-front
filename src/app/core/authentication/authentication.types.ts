import { User } from '../user/user.types';
import { FieldErrorBase, REQUIRED_FIELD } from '../../shared/shared.types';

// -----------------------------------------------------------------------------------------------------
// @ Const
// -----------------------------------------------------------------------------------------------------

export const LOCAL_STORAGE_USER_KEY: 'user' = 'user';

export const LOCAL_STORAGE_TOKEN_KEY: 'accessToken' = 'accessToken';

// -----------------------------------------------------------------------------------------------------
// @ Class
// -----------------------------------------------------------------------------------------------------

export class Credentials
{
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class LoginData
{
  access_token: string;
  user: User;

  constructor(access_token: string, user: User) {
    this.access_token = access_token;
    this.user = user;
  }
}

export class ErrorMessagesSignIn
{
  email: FieldErrorEmail;
  password: FieldErrorBase;

  constructor() {
    this.email = {
      required: REQUIRED_FIELD,
      email: 'Debe ser un correo electrónico válido',
    };
    this.password = {
      required: REQUIRED_FIELD,
    };
  }
}

// -----------------------------------------------------------------------------------------------------
// @ Interfaces
// -----------------------------------------------------------------------------------------------------

interface FieldErrorEmail extends FieldErrorBase {
  email: string;
}
