import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Services } from '../core/Services';
import { Timesheet } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  constructor(private http: HttpService) {}

  getTimesheets(): Observable<Timesheet[]> {
    return this.http.sendRequest<Timesheet[]>(Services.HR_TIMESHEETS);
  }

  createTimesheet(data: Partial<Timesheet>, submit: boolean = false): Observable<Timesheet> {
    return this.http.sendRequest<Timesheet>(`${Services.HR_TIMESHEETS}?submit=${submit}`, { timesheet: data }, 'POST');
  }

  updateTimesheet(id: number, data: Partial<Timesheet>, submit: boolean = false): Observable<Timesheet> {
    return this.http.sendRequest<Timesheet>(`${Services.HR_TIMESHEETS}/${id}?submit=${submit}`, { timesheet: data }, 'PATCH');
  }

  submitTimesheet(id: number): Observable<Timesheet> {
    return this.http.sendRequest<Timesheet>(`${Services.HR_TIMESHEETS}/${id}/submit`, {}, 'PATCH');
  }

  approveTimesheet(id: number): Observable<Timesheet> {
    return this.http.sendRequest<Timesheet>(Services.HR_TIMESHEETS_APPROVE.replace(':id', id.toString()), {}, 'PATCH');
  }

  rejectTimesheet(id: number): Observable<Timesheet> {
    return this.http.sendRequest<Timesheet>(Services.HR_TIMESHEETS_REJECT.replace(':id', id.toString()), {}, 'PATCH');
  }

  deleteTimesheet(id: number): Observable<any> {
    return this.http.sendRequest<any>(`${Services.HR_TIMESHEETS}/${id}`, undefined, 'DELETE');
  }
}
