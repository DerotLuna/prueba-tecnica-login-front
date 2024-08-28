import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = ( req: HttpRequest<unknown>, next: HttpHandlerFn ): Observable<HttpEvent<unknown>> =>
{
  const authenticationService: AuthenticationService = inject( AuthenticationService );
  const router: Router = inject( Router );

  // Clone the request
  let newReq: HttpRequest<unknown> = req.clone();

  // Add the Authorization header
  if ( authenticationService.accessTokenLocalStorage )
  {
    newReq = req.clone( {
      headers: req.headers.set( 'Authorization', `Bearer ${ authenticationService.accessTokenLocalStorage }` ),
    } );
  }

  // Response
  return next( newReq ).pipe(
    catchError( ( error ) =>
    {
      // Catch "400 Bad Request" responses
      if ( error instanceof HttpErrorResponse && error.status === 400 )
      {
        window.alert( JSON.stringify( error.error ) );
        // TODO: IF THE ERROR IS DUE TO A FORM, HANDLE IT IN THE FORM
      }

      // Catch "401 Unauthorized" responses
      if ( error instanceof HttpErrorResponse && error.status === 401 )
      {
        authenticationService.signOut();
      }

      // Catch "403 Forbidden"
      if ( error instanceof HttpErrorResponse && error.status === 403 )
      {
        router.navigate( [ '403' ] ).then();
      }

      // Catch "404 Not Found" responses
      if ( error instanceof HttpErrorResponse && error.status === 404 )
      {
        router.navigate( [ '404' ] ).then();
      }

      // Catch "500 Internal Server Error" responses
      if ( error instanceof HttpErrorResponse && error.status === 500 )
      {
        router.navigate( [ '500' ] ).then();
      }

      return throwError( () => new Error( error ) );
    } ),
  );
};
