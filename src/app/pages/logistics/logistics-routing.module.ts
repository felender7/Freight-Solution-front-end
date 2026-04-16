import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogisticsComponent } from './logistics.component';
import { TrackingComponent } from './tracking/tracking.component';
import { BookingComponent } from './booking/booking.component';
import { ControlTowerComponent } from './control-tower/control-tower.component';

const routes: Routes = [
  {
    path: '',
    component: LogisticsComponent,
  },
  {
    path: 'tracking',
    component: TrackingComponent,
  },
  {
    path: 'tracking/:trackingNumber',
    component: TrackingComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'control-tower',
    component: ControlTowerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticsRoutingModule {}
