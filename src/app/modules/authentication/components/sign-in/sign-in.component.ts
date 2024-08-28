import { Component } from '@angular/core';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { AuthenticationService } from '../../../../core/authentication/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'sign-in',
  standalone: true,
  imports: [
    SignInFormComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
} )
export class SignInComponent
{
  /**
   * Constructor
   */
  constructor( private _authenticationService: AuthenticationService,
               private _snackBar: MatSnackBar,
               private _router: Router, )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   * @param credentials
   */
  signIn( credentials: any )
  {
    this._authenticationService.signIn( credentials ).subscribe(
      {
        next: () =>
        {
          const redirectURL = '/signed-in-redirect';
          // Navigate to the redirect url
          this._router.navigateByUrl( redirectURL ).then();
        },
        error: () =>
        {
          this._snackBar.open('Correo o contraseña incorrectos', 'X', {
            duration: 2000,
          });
        },
      }
    );
  }

}
