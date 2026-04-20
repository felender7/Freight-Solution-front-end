import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import  {LogisticsComponent} from './pages/logistics/logistics.component';
import { BookingComponent } from './pages/logistics/booking/booking.component';
import { TrackingComponent } from './pages/logistics/tracking/tracking.component';
import { ControlTowerComponent } from './pages/logistics/control-tower/control-tower.component';
import { VendorsComponent } from './pages/vendors/vendors.component';
import { VendorDetailComponent } from './pages/vendors/vendor-detail/vendor-detail.component';
import { RecordsComponent } from './pages/records/records.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpdatePasswordComponent,
    DashboardComponent,
    HrComponent,
    HrDashboardComponent,
    HrProfileComponent,
    HrAttendanceComponent,
    HrPerformanceComponent,
    HrLeaveComponent,
    HrTimesheetsComponent,
    HrTasksComponent,
    HrLmsComponent,
    FinanceComponent,
    LogisticsComponent,
    BookingComponent,
    TrackingComponent,
    ControlTowerComponent,
    VendorsComponent,
    VendorDetailComponent,
    RecordsComponent,
    SettingsComponent,
    WarehouseComponent,
    DashboardLayoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [HttpService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
