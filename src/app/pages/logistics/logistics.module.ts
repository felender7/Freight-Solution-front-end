import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookingComponent } from './booking/booking.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ControlTowerComponent } from './control-tower/control-tower.component';


@NgModule({
  declarations: [
    BookingComponent,
    TrackingComponent,
    ControlTowerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
})
export class LogisticsModule {}
