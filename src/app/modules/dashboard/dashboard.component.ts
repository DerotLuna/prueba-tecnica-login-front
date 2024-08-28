import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    DashboardChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

}
