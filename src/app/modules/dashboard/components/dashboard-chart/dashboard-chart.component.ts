import { ChangeDetectionStrategy, Component, OnDestroy, signal, viewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { CATEGORIES, ChartOptions, Inflation } from '../../dashboard.types';
import { DashboardService } from '../../services/dashboard.service';
import { Subject, takeUntil } from 'rxjs';

@Component( {
  selector: 'dashboard-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './dashboard-chart.component.html',
  styleUrl: './dashboard-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class DashboardChartComponent implements OnDestroy
{
  /**
   * Views Children
   */
  private _chart = viewChild<ChartComponent>( 'chart' );
  /**
   * Variables
   */
  private _chartOptions = signal<Partial<ChartOptions>>( this._generateChartOptions() );
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor( private _dashboardService: DashboardService )
  {
    this._inflationChangesSubscribe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next( null );
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for chart
   */
  get chart(): ChartComponent
  {
    return <ChartComponent>this._chart();
  }

  /**
   * Getter for chartOptions
   */
  get chartOptions(): Partial<ChartOptions>
  {
    return this._chartOptions();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Subscribes to the inflation observable
   */
  private _inflationChangesSubscribe(): void
  {
    this._dashboardService.inflation$
      .pipe( takeUntil( this._unsubscribeAll ) )
      .subscribe(
        ( inflation: Inflation ): void =>
        {
          this._chartOptions.update( ( chartOptions: Partial<ChartOptions> ): Partial<ChartOptions> =>
          {
            return {
              ...chartOptions,
              series: [
                {
                  name: 'Inflación',
                  data: inflation.data,
                }
              ],
              title: {
                ...chartOptions.title,
                text: `Inflación mensual en Venezuela, ${ inflation.year }`,
              }
            };
          } );
        }
      );
  }

  /**
   * Generates the chart options
   */
  private _generateChartOptions(): Partial<ChartOptions>
  {
    return {
      series: [
        {
          name: '',
          data: []
        }
      ],
      chart: {
        height: 450,
        width: 800,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function ( val )
        {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: [ '#304758' ]
        }
      },
      xaxis: {
        categories: CATEGORIES,
        position: 'top',
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [ 0, 100 ],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [ 50, 0, 100, 100 ]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function ( val )
          {
            return val + '%';
          }
        }
      },
      title: {
        text: '',
        floating: false,
        offsetY: 430,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    };
  }
}
