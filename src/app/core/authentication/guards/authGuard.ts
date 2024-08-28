import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = ( route, state ) =>
{
  const router: Router = inject( Router );

  // Check the authentication status
  return inject( AuthenticationService ).check().pipe(
    switchMap( ( authenticated ) =>
    {
      // If the user is not authenticated, redirect to the sign-in page
      if ( !authenticated )
      {
        return of( router.parseUrl( `sign-in` ) );
      }

      // Allow the access
      return of( true );
    } ),
  );
};
