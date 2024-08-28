import { Injectable } from '@angular/core';
import { BackendService } from '../../../shared/services/backend.service';
import { Observable } from 'rxjs';
import { Participation } from '../participation.types';
import { PARTICIPATION_PATH } from '../participation.paths';

@Injectable( {
  providedIn: 'root'
} )
export class ParticipationService
{

  /**
   * Constructor
   */
  constructor( private _backendService: BackendService, )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add a participation
   * @param participation
   */
  public add( participation: Participation ): Observable<Participation>
  {
    return this._backendService.post( PARTICIPATION_PATH.ADD, participation );
  }

}
