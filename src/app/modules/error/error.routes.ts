import { Routes } from '@angular/router';
import { ErrorComponent } from './error.component';
import { Error404Component } from './components/error-404/error-404.component';
import { Error500Component } from './components/error-500/error-500.component';

export default [
  {
    path: '',
    component: ErrorComponent,
    children: [
      {
        path: '403',
        component: Error404Component,
      },
      {
        path: '404',
        component: Error404Component,
      },
      {
        path: '500',
        component: Error500Component,
      },
    ]
  },
] as Routes;
