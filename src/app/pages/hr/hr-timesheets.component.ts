import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetService } from '../../services/timesheet.service';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Timesheet } from '../../models/timesheet.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-hr-timesheets',
  templateUrl: './hr-timesheets.component.html',
  styleUrls: ['./hr-timesheets.component.css']
})
export class HrTimesheetsComponent implements OnInit {
  timesheets: Timesheet[] = [];
  tasks: Task[] = [];
  currentUser: User | null = null;
  showModal = false;
  timesheetForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isEditMode = false;
  selectedTimesheetId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.timesheetForm = this.fb.group({
      date: ['', Validators.required],
      hours_worked: ['', [Validators.required, Validators.min(0.5), Validators.max(24)]],
      description: ['', Validators.required],
      task_id: ['']
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserFromStorage();
    this.loadTimesheets();
    this.loadTasks();
  }

  loadTimesheets(): void {
    this.isLoading = true;
    this.timesheetService.getTimesheets().subscribe({
      next: (data) => {
        this.timesheets = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load timesheets';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error('Failed to load tasks', error);
      }
    });
  }

  openModal(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.selectedTimesheetId = null;
    this.timesheetForm.reset();
    this.errorMessage = '';
  }

  editTimesheet(timesheet: Timesheet): void {
    if (timesheet.status !== 'draft') return;
    this.showModal = true;
    this.isEditMode = true;
    this.selectedTimesheetId = timesheet.id!;
    this.timesheetForm.patchValue({
      date: timesheet.date,
      hours_worked: timesheet.hours_worked,
      description: timesheet.description,
      task_id: timesheet.task_id || ''
    });
    this.errorMessage = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
    this.selectedTimesheetId = null;
  }

  onSubmit(submit: boolean = false): void {
    if (this.timesheetForm.invalid) {
      this.markFormGroupTouched(this.timesheetForm);
      return;
    }

    this.isLoading = true;
    const formData = this.timesheetForm.value;

    const request$ = this.isEditMode && this.selectedTimesheetId
      ? this.timesheetService.updateTimesheet(this.selectedTimesheetId, formData, submit)
      : this.timesheetService.createTimesheet(formData, submit);

    request$.subscribe({
      next: () => {
        this.successMessage = submit ? 'Timesheet submitted successfully' : (this.isEditMode ? 'Timesheet updated successfully' : 'Timesheet saved as draft');
        this.closeModal();
        this.loadTimesheets();
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to process timesheet';
        this.isLoading = false;
      }
    });
  }

  submitTimesheet(id: number): void {
    if (!confirm('Are you sure you want to submit this timesheet?')) return;
    this.isLoading = true;
    this.timesheetService.submitTimesheet(id).subscribe({
      next: () => {
        this.successMessage = 'Timesheet submitted successfully';
        this.loadTimesheets();
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit timesheet';
        this.isLoading = false;
      }
    });
  }

  approveTimesheet(id: number): void {
    if (!confirm('Are you sure you want to approve this timesheet?')) return;
    this.timesheetService.approveTimesheet(id).subscribe({
      next: () => this.loadTimesheets(),
      error: (error) => this.errorMessage = 'Failed to approve timesheet'
    });
  }

  rejectTimesheet(id: number): void {
    if (!confirm('Are you sure you want to reject this timesheet?')) return;
    this.timesheetService.rejectTimesheet(id).subscribe({
      next: () => this.loadTimesheets(),
      error: (error) => this.errorMessage = 'Failed to reject timesheet'
    });
  }

  deleteTimesheet(id: number): void {
    if (!confirm('Are you sure you want to delete this timesheet?')) return;
    this.timesheetService.deleteTimesheet(id).subscribe({
      next: () => this.loadTimesheets(),
      error: (error) => this.errorMessage = 'Failed to delete timesheet'
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin' || this.currentUser?.role === 'hr_manager';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-400';
      case 'rejected': return 'bg-red-500/10 text-red-400';
      case 'submitted': return 'bg-blue-500/10 text-blue-400';
      default: return 'bg-slate-500/10 text-slate-400'; // Draft
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
