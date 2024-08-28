import { Routes } from '@angular/router';
import { AuthGuard } from 'app/core/authentication/guards/authGuard';
import { NoAuthGuard } from 'app/core/authentication/guards/no-auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // Redirect empty path to '/dashboard'
  {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

  // Redirect signed-in user to the '/dashboard'
  {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},

  // Authetication routes
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      {path: '', loadChildren: () => import('app/modules/authentication/authentication.routes')},
    ]
  },

  // Error routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('app/modules/error/error.routes')},
    ]
  },

  // Modules routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('app/modules/modules.routes')},
    ]
  },

  // Redirect non-existent route to '/404'
  {path: '**', redirectTo: '404'},
];
