import { Component, OnInit, OnDestroy } from '@angular/core';
import { AttendanceService, AttendanceRecord, AttendanceStatus, AttendanceListResponse } from '../../services/attendance.service';

@Component({
  selector: 'app-hr-attendance',
  templateUrl: './hr-attendance.component.html'
})
export class HrAttendanceComponent implements OnInit, OnDestroy {
  loading = true;
  error: string | null = null;
  successMessage: string | null = null;

  currentStatus: AttendanceStatus | null = null;
  records: AttendanceRecord[] = [];
  summary = { total_days: 0, present: 0, absent: 0, late: 0, total_hours: 0 };

  isClockingIn = false;
  isClockingOut = false;

  currentTime = '';

  private refreshInterval: any;
  private timeInterval: any;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.updateCurrentTime();
    this.loadData();
    this.startAutoRefresh();
    this.startTimeUpdate();
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  updateCurrentTime(): void {
    this.currentTime = new Date().toLocaleTimeString('en-ZA', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  }

  startTimeUpdate(): void {
    this.timeInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  }

  startAutoRefresh(): void {
    this.refreshInterval = setInterval(() => {
      this.loadCurrentStatus();
    }, 30000);
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.attendanceService.getCurrentStatus().subscribe({
      next: (status) => {
        this.currentStatus = status;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load attendance status';
        this.loading = false;
      }
    });

    this.attendanceService.getAttendanceRecords().subscribe({
      next: (response) => {
        this.records = response.records;
        this.summary = response.summary;
      },
      error: (err) => {
        console.error('Failed to load attendance records:', err);
      }
    });
  }

  loadCurrentStatus(): void {
    this.attendanceService.getCurrentStatus().subscribe({
      next: (status) => {
        this.currentStatus = status;
      },
      error: (err) => {
        console.error('Failed to load current status:', err);
      }
    });
  }

  clockIn(): void {
    if (this.currentStatus?.status === 'clocked_in' || this.isClockingIn) return;

    this.isClockingIn = true;
    this.error = null;
    this.successMessage = null;

    this.attendanceService.clockIn().subscribe({
      next: (response) => {
        this.successMessage = 'Successfully clocked in!';
        this.currentStatus = { status: 'clocked_in', clock_in: response.record.clock_in, date: response.record.date, record: response.record };
        this.loadData();
        setTimeout(() => this.successMessage = null, 3000);
        this.isClockingIn = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to clock in';
        this.isClockingIn = false;
      }
    });
  }

  clockOut(): void {
    if (this.currentStatus?.status !== 'clocked_in' || this.isClockingOut) return;

    this.isClockingOut = true;
    this.error = null;
    this.successMessage = null;

    this.attendanceService.clockOut().subscribe({
      next: (response) => {
        this.successMessage = `Successfully clocked out! Duration: ${response.duration}`;
        this.currentStatus = { status: 'clocked_out', last_clock_out: response.record.clock_out };
        this.loadData();
        setTimeout(() => this.successMessage = null, 3000);
        this.isClockingOut = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to clock out';
        this.isClockingOut = false;
      }
    });
  }

  formatTime(dateStr: string | null | undefined): string {
    if (!dateStr) return '--:--';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'present': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'late': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'absent': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  }

  calculateDuration(record: AttendanceRecord): string {
    if (!record.clock_in || !record.clock_out) return '--';
    const start = new Date(record.clock_in);
    const end = new Date(record.clock_out);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  }
}