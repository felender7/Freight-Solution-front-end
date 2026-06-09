import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Services } from '../core/Services';

export interface AttendanceRecord {
  id: number;
  employee_id: number;
  user_id: number;
  clock_in: string;
  clock_out: string | null;
  date: string;
  status: string;
  ip_address: string;
  created_at: string;
  updated_at: string;
}

export interface AttendanceStatus {
  status: 'clocked_in' | 'clocked_out';
  clock_in?: string;
  date?: string;
  duration?: string;
  record?: AttendanceRecord;
  last_clock_out?: string;
}

export interface AttendanceSummary {
  total_days: number;
  present: number;
  absent: number;
  late: number;
  total_hours: number;
}

export interface AttendanceListResponse {
  records: AttendanceRecord[];
  summary: AttendanceSummary;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private http: HttpService) {}

  getAttendanceRecords(params?: { start_date?: string; end_date?: string }): Observable<AttendanceListResponse> {
    return this.http.sendRequest<AttendanceListResponse>(Services.HR_ATTENDANCE, undefined, 'GET', params as Record<string, string>);
  }

  getCurrentStatus(): Observable<AttendanceStatus> {
    return this.http.sendRequest<AttendanceStatus>(Services.HR_ATTENDANCE_STATUS);
  }

  clockIn(): Observable<any> {
    return this.http.sendRequest<any>(Services.HR_ATTENDANCE_CLOCK_IN, {}, 'POST');
  }

  clockOut(): Observable<any> {
    return this.http.sendRequest<any>(Services.HR_ATTENDANCE_CLOCK_OUT, {}, 'POST');
  }
}