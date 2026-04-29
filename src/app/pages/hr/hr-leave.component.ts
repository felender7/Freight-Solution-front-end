import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { AuthService } from '../../services/auth.service';
import { LeaveRequest } from '../../models/leave.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-hr-leave',
  templateUrl: './hr-leave.component.html',
  styleUrls: ['./hr-leave.component.css']
})
export class HrLeaveComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  currentUser: User | null = null;
  showModal = false;
  leaveForm: FormGroup;
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isEditMode = false;
  selectedLeaveId: number | null = null;

  leaveStats = {
    annual: { used: 0, total: 21 },
    sick: { used: 0, total: 10 },
    study: { used: 0, total: 5 }
  };

  leaveTypes = [
    { value: 'annual', label: 'Annual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'paternity', label: 'Paternity Leave' },
    { value: 'unpaid', label: 'Unpaid Leave' },
    { value: 'study', label: 'Study Leave' }
  ];

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private authService: AuthService
  ) {
    this.leaveForm = this.fb.group({
      leave_type: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      reason: ['', Validators.required]
    });

    // Add conditional validator for study leave
    this.leaveForm.get('leave_type')?.valueChanges.subscribe(type => {
      this.selectedFile = null;
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserFromStorage();
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.isLoading = true;
    this.leaveService.getLeaveRequests().subscribe({
      next: (requests) => {
        this.leaveRequests = requests;
        this.calculateStats();
        this.isLoading = false;
        console.log('Leave requests loaded:', this.leaveRequests);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load leave requests';
        this.isLoading = false;
      }
    });
  }

  calculateStats(): void {
    const stats = {
      annual: 0,
      sick: 0,
      study: 0
    };

    this.leaveRequests.forEach(leave => {
      if (leave.status === 'approved') {
        const days = leave.number_of_days || 0;
        if (leave.leave_type === 'annual') stats.annual += days;
        if (leave.leave_type === 'sick') stats.sick += days;
        if (leave.leave_type === 'study') stats.study += days;
      }
    });

    this.leaveStats.annual.used = stats.annual;
    this.leaveStats.sick.used = stats.sick;
    this.leaveStats.study.used = stats.study;
  }

  openModal(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.selectedLeaveId = null;
    this.leaveForm.reset();
    this.selectedFile = null;
    this.errorMessage = '';
  }

  editLeave(leave: LeaveRequest): void {
    if (leave.status !== 'pending') return;
    this.showModal = true;
    this.isEditMode = true;
    this.selectedLeaveId = leave.id!;
    this.leaveForm.patchValue({
      leave_type: leave.leave_type,
      start_date: leave.start_date,
      end_date: leave.end_date,
      reason: leave.reason
    });
    this.selectedFile = null;
    this.errorMessage = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
    this.selectedLeaveId = null;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUploadNote(event: any, id: number): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;
      this.leaveService.uploadMedicalCertificate(id, file).subscribe({
        next: () => {
          this.successMessage = 'Doctor\'s note uploaded successfully';
          this.loadLeaveRequests();
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Failed to upload doctor\'s note';
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.leaveForm.invalid) {
      this.markFormGroupTouched(this.leaveForm);
      return;
    }

    const leaveType = this.leaveForm.get('leave_type')?.value;
    if (leaveType === 'study' && !this.selectedFile) {
      this.errorMessage = 'Timetable is required for study leave';
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('leave_request[leave_type]', leaveType);
    formData.append('leave_request[start_date]', this.leaveForm.get('start_date')?.value);
    formData.append('leave_request[end_date]', this.leaveForm.get('end_date')?.value);
    formData.append('leave_request[reason]', this.leaveForm.get('reason')?.value);

    if (this.selectedFile) {
      if (leaveType === 'study') {
        formData.append('leave_request[study_timetable]', this.selectedFile);
      } else {
        formData.append('leave_request[medical_certificate]', this.selectedFile);
      }
    }

    const request$ = this.isEditMode && this.selectedLeaveId
      ? this.leaveService.updateLeaveRequest(this.selectedLeaveId, formData)
      : this.leaveService.createLeaveRequest(formData);

    request$.subscribe({
      next: () => {
        this.successMessage = this.isEditMode ? 'Leave request updated successfully' : 'Leave request submitted successfully';
        this.closeModal();
        this.loadLeaveRequests();
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to process leave request';
        this.isLoading = false;
      }
    });
  }

  approveRequest(id: number): void {
    if (!confirm('Are you sure you want to approve this request?')) return;
    this.leaveService.approveLeaveRequest(id).subscribe({
      next: () => this.loadLeaveRequests(),
      error: (error) => this.errorMessage = 'Failed to approve request'
    });
  }

  rejectRequest(id: number): void {
    if (!confirm('Are you sure you want to reject this request?')) return;
    this.leaveService.rejectLeaveRequest(id).subscribe({
      next: () => this.loadLeaveRequests(),
      error: (error) => this.errorMessage = 'Failed to reject request'
    });
  }

  deleteRequest(id: number): void {
    if (!confirm('Are you sure you want to cancel this request?')) return;
    this.leaveService.deleteLeaveRequest(id).subscribe({
      next: () => this.loadLeaveRequests(),
      error: (error) => this.errorMessage = 'Failed to cancel request'
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin' || this.currentUser?.role === 'hr_manager';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-400';
      case 'rejected': return 'bg-red-500/10 text-red-400';
      default: return 'bg-yellow-500/10 text-yellow-400';
    }
  }

  getLeaveTypeLabel(type: string): string {
    const leaveType = this.leaveTypes.find(t => t.value === type);
    return leaveType ? leaveType.label : type;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  needsDoctorNote(leave: LeaveRequest): boolean {
    return ['sick', 'maternity', 'paternity'].includes(leave.leave_type) && !leave.status; // simplified check
  }
}
