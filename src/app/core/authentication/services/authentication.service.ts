import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of, switchMap, throwError } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import {
  Credentials,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_KEY, LoginData
} from '../authentication.types';
import { User } from '../../user/user.types';
import { BackendService } from '../../../shared/services/backend.service';
import { AUTHENTICATION_PATH } from '../authentication.paths';
import { Router } from '@angular/router';

@Injectable( {
  providedIn: 'root'
} )
export class AuthenticationService
{

  private _authenticated: boolean = false;

  constructor( private _router: Router,
               private _userService: UserService,
               private _backendService: BackendService, )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set access token in local storage
   */
  set accessTokenLocalStorage( token: string )
  {
    localStorage.setItem( LOCAL_STORAGE_TOKEN_KEY, token );
  }

  /**
   * Get access token in local storage
   */
  get accessTokenLocalStorage(): string
  {
    return localStorage.getItem( LOCAL_STORAGE_TOKEN_KEY ) ?? '';
  }

  /**
   * Set user in local storage
   */
  set userLocalStorage( user: User )
  {
    localStorage.setItem( LOCAL_STORAGE_USER_KEY, JSON.stringify( user ) );
  }

  /**
   * Get user in local storage
   */
  get userLocalStorage(): User | null
  {
    try
    {
      return JSON.parse( localStorage.getItem( LOCAL_STORAGE_USER_KEY ) ?? '' );
    }
    catch ( error )
    {
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn( credentials: Credentials ): Observable<LoginData>
  {
    if ( this._authenticated )
    {
      throwError( () => new Error( 'User is already logged in.' ) );
    }

    return this._backendService.post( AUTHENTICATION_PATH.SIGN_IN, credentials ).pipe(
      switchMap( ( response: LoginData ) =>
      {
        this.accessTokenLocalStorage = response.access_token;
        this.userLocalStorage = response.user;
        this._userService.user = response.user;
        this._authenticated = true;
        return of( response );
      } ),
    );
  }

  /**
   * Sign out
   */
  signOut(): void
  {
    /* if ( this._authenticated && this.accessTokenLocalStorage )
    {
      lastValueFrom( this._backendService.get( AUTHENTICATION_PATH.SIGN_OUT ) ).then();
    } */

    this.removeAllItemsLocalStorage();
    this._authenticated = false;
    this._router.navigate( [ '/sign-in' ] ).then();
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean>
  {
    if ( this._authenticated || this.accessTokenLocalStorage )
    {
      this._userService.user = this._userService.user ?? this.userLocalStorage;
      return of( true );
    }

    return of( false );
  }

  /**
   * Remove the access token and user from the local storage
   */
  removeAllItemsLocalStorage(): void
  {
    localStorage.removeItem( LOCAL_STORAGE_TOKEN_KEY );
    localStorage.removeItem( LOCAL_STORAGE_USER_KEY );
  }
}
