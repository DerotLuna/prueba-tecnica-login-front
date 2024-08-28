import { Routes } from '@angular/router';

export default [
  {
    path     : 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes'),
  },
  {
    path     : 'participation',
    loadChildren: () => import('./participation/participation.routes'),
  },
] as Routes;
