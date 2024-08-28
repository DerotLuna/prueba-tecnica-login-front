import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParticipationFormComponent } from './components/participation-form/participation-form.component';
import { Participation } from './participation.types';
import { ParticipationService } from './services/participation.service';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'participation',
  standalone: true,
  imports: [
    ParticipationFormComponent,
    ParticipationFormComponent
  ],
  templateUrl: './participation.component.html',
  styleUrl: './participation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipationComponent {
  /**
   * Variables
   */

  /**
   * Constructor
   */
  constructor( private _participationService: ParticipationService,
               private _snackBar: MatSnackBar ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Receives the data from the form
   * @param participation
   */
  dataParticipation(participation: Participation): void {
    lastValueFrom( this._participationService.add(participation) ).then((participation: Participation) => {
      if (participation.id) {
        this._snackBar.open('¡Gracias por participar!', 'X', {
          duration: 2000,
        });
      }
    });
  }

}
