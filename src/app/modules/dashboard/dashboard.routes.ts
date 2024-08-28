import { Router, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';

/**
 * Dashboard resolver
 */
const dashboardResolver = () =>
{
  const dashboardService: DashboardService = inject( DashboardService );
  const router: Router = inject( Router );

  return dashboardService.getInflationByYear( '2023' )
    .pipe(
      // Error here means the requested client is not available
      catchError( async () =>
      {
        return router.navigate( [ '/404' ] );
      } ),
    );
}
export default [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      dashboard: dashboardResolver,
    },
  },
] as Routes;
