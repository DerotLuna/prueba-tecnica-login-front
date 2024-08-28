import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule
} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { NgTemplateOutlet } from '@angular/common';
import { AuthenticationService } from '../core/authentication/services/authentication.service';

@Component( {
  selector: 'layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatToolbar,
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatNavList,
    MatListItem,
    RouterLink,
    NgTemplateOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
} )
export class LayoutComponent
{

  /**
   * Constructor
   */
  constructor( private _authenticationService: AuthenticationService, )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign out
   */
  signOut(): void
  {
    this._authenticationService.signOut();
  }

}
