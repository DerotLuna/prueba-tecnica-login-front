import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared.types';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class BackendService
{

  constructor( private _httpClient: HttpClient )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get domain
   * @param api
   */
  domain( api: API = API.CORE ): string
  {
    return environment[ api ];
  }

  /**
   * HttpClient get method
   * @param path
   * @param options
   * @param api
   */
  get( path: string, options?: any, api?: API ): Observable<any>
  {
    const url: string = this.domain( api ).concat( path );
    return this._httpClient.get( url, options );
  }

  /**
   * HttpClient post method
   * @param payload
   * @param path
   * @param api
   * @param options
   */
  post( path: string, payload: any, options?: any, api?: API ): Observable<any>
  {
    const url: string = this.domain( api ).concat( path );
    return this._httpClient.post( url, payload, options );
  }

  /**
   * HttpClient put method
   * @param payload
   * @param path
   * @param options
   * @param api
   */
  put( path: string, payload: any, options?: any, api?: API ): Observable<any>
  {
    const url: string = this.domain( api ).concat( path );
    return this._httpClient.put( url, payload, options );
  }

  /**
   * HttpClient patch method
   * @param payload
   * @param path
   * @param options
   * @param api
   */
  patch( path: string, payload: any, options?: any, api?: API ): Observable<any>
  {
    const url: string = this.domain( api ).concat( path );
    return this._httpClient.patch( url, payload, options );
  }

  /**
   * HttpClient delete method
   * @param path
   * @param options
   * @param api
   */
  delete( path: string, options?: any, api?: API ): Observable<any>
  {
    const url: string = this.domain( api ).concat( path );
    return this._httpClient.delete( url, options );
  }

  /**
   * HttpClient options method
   * @param path
   * @param options
   * @param api
   */
  options( path: string, options?: any, api?: API ): Observable<any>
  {
    const url: string = this.domain( api ).concat( path );
    return this._httpClient.options( url, options );
  }

  /**
   * HttpClient head method
   * @param path
   * @param options
   * @param api
   */
  head( path: string, options?: any, api?: API ): Observable<any>
  {
    const url: string = this.domain( api ).concat( path );
    return this._httpClient.head( url, options );
  }

}
