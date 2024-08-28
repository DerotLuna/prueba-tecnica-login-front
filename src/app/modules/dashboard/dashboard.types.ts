import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from 'ng-apexcharts';

// -----------------------------------------------------------------------------------------------------
// @ Const
// -----------------------------------------------------------------------------------------------------

export const CATEGORIES: string[] = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

// -----------------------------------------------------------------------------------------------------
// @ Types
// -----------------------------------------------------------------------------------------------------

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

// -----------------------------------------------------------------------------------------------------
// @ Class
// -----------------------------------------------------------------------------------------------------

export class Inflation
{
  year: string;
  data: number[];

  constructor( year: string, data: number[] )
  {
    this.year = year;
    this.data = data;
  }
}

