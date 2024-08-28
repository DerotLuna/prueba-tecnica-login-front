import { Injectable } from '@angular/core';
import { BackendService } from '../../../shared/services/backend.service';
import { DASHBOARD_PATH } from '../dashboard.paths';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Inflation } from '../dashboard.types';

@Injectable( {
  providedIn: 'root'
} )
export class DashboardService
{
  private _inflation: ReplaySubject<Inflation> = new ReplaySubject<Inflation>( 1 );

  /**
   * Constructor
   */
  constructor( private _backendService: BackendService, )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter for inflation
   * @param value
   */
  set inflation( value: Inflation )
  {
    this._inflation.next( value );
  }

  /**
   * Getter for inflation
   */
  get inflation$(): Observable<Inflation>
  {
    return this._inflation.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the inflation by year
   * @param year
   */
  getInflationByYear( year: string ): Observable<Inflation>
  {
    console.log( year );
    const path = DASHBOARD_PATH.INFLATION_BY_YEAR.replace( '{year}', year );
    return this._backendService.get( path )
      .pipe(
        tap( ( inflation: Inflation ): Inflation =>
        {
          this.inflation = inflation;
          return inflation;
        } )
      );
  }
}
