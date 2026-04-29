import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Services } from '../core/Services';
import { LeaveRequest } from '../models/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  constructor(private http: HttpService) {}

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.sendRequest<LeaveRequest[]>(Services.HR_LEAVE);
  }

  createLeaveRequest(formData: FormData): Observable<LeaveRequest> {
    return this.http.sendRequest<LeaveRequest>(Services.HR_LEAVE, formData, 'POST');
  }

  updateLeaveRequest(id: number, formData: FormData): Observable<LeaveRequest> {
    return this.http.sendRequest<LeaveRequest>(`${Services.HR_LEAVE}/${id}`, formData, 'PATCH');
  }

  approveLeaveRequest(id: number): Observable<LeaveRequest> {
    return this.http.sendRequest<LeaveRequest>(Services.HR_LEAVE_APPROVE.replace(':id', id.toString()), {}, 'PATCH');
  }

  rejectLeaveRequest(id: number): Observable<LeaveRequest> {
    return this.http.sendRequest<LeaveRequest>(Services.HR_LEAVE_REJECT.replace(':id', id.toString()), {}, 'PATCH');
  }

  uploadMedicalCertificate(id: number, file: File): Observable<LeaveRequest> {
    const formData = new FormData();
    formData.append('medical_certificate', file);
    return this.http.sendRequest<LeaveRequest>(Services.HR_LEAVE_UPLOAD_MEDICAL.replace(':id', id.toString()), formData, 'PATCH');
  }

  deleteLeaveRequest(id: number): Observable<any> {
    return this.http.sendRequest<any>(`${Services.HR_LEAVE}/${id}`, undefined, 'DELETE');
  }
}
