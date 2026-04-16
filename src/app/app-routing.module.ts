import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HrComponent } from './pages/hr/hr.component';
import { HrDashboardComponent } from './pages/hr/hr-dashboard.component';
import { HrProfileComponent } from './pages/hr/hr-profile.component';
import { HrAttendanceComponent } from './pages/hr/hr-attendance.component';
import { HrPerformanceComponent } from './pages/hr/hr-performance.component';
import { HrLeaveComponent } from './pages/hr/hr-leave.component';
import { HrTimesheetsComponent } from './pages/hr/hr-timesheets.component';
import { HrTasksComponent } from './pages/hr/hr-tasks.component';
import { HrLmsComponent } from './pages/hr/hr-lms.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { LogisticsComponent } from './pages/logistics/logistics.component';
import { BookingComponent } from './pages/logistics/booking/booking.component';
import { TrackingComponent } from './pages/logistics/tracking/tracking.component';
import { ControlTowerComponent } from './pages/logistics/control-tower/control-tower.component';
import { VendorsComponent } from './pages/vendors/vendors.component';
import { RecordsComponent } from './pages/records/records.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'update-password', component: UpdatePasswordComponent },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'hrm',
        component: HrComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: HrDashboardComponent },
          { path: 'profile', component: HrProfileComponent },
          { path: 'performance', component: HrPerformanceComponent },
          { path: 'attendance', component: HrAttendanceComponent },
          { path: 'lms', component: HrLmsComponent },
          { path: 'timesheets', component: HrTimesheetsComponent },
          { path: 'leave', component: HrLeaveComponent },
          { path: 'tasks', component: HrTasksComponent },
        ],
      },
      { path: 'finance', component: FinanceComponent },
      {
        path: 'logistics',
        component: LogisticsComponent,
        children: [
          { path: 'booking', component: BookingComponent },
          { path: 'tracking', component: TrackingComponent },
          { path: 'tracking/:trackingNumber', component: TrackingComponent },
          { path: 'control-tower', component: ControlTowerComponent },
        ]
      },
      { path: 'vendors', component: VendorsComponent },
      { path: 'warehouse', component: WarehouseComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
