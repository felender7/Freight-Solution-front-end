import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-hr-tasks',
  template: `
  <div class="bg-slate-800/70 backdrop-blur rounded-2xl border border-slate-700 p-6 shadow-lg">
  
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
    <div>
      <h3 class="text-2xl font-semibold text-white tracking-tight">Tasks</h3>
      <p class="text-slate-400 text-sm mt-1">
        Manage and track your assigned tasks
      </p>
    </div>
  </div>

  <!-- Loading -->
  <div *ngIf="loading" class="flex flex-col items-center justify-center py-16">
    <div class="animate-spin h-10 w-10 border-2 border-blue-500 border-t-transparent rounded-full"></div>
    <p class="mt-4 text-slate-400">Loading tasks...</p>
  </div>

  <!-- Error -->
  <div
    *ngIf="error && !loading"
    class="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-xl mb-6"
  >
    {{ error }}
  </div>

  <!-- Task List -->
  <div *ngIf="!loading && !error" class="space-y-4">
    
    <div
      *ngFor="let task of tasks"
      (click)="toggleTaskDescription(task.id)"
      class="group cursor-pointer rounded-xl border border-slate-700 bg-slate-900/60 p-5 transition-all duration-200 hover:border-slate-500 hover:bg-slate-900 hover:shadow-md"
    >
      
      <div class="flex items-start gap-4">
        
        <!-- Checkbox -->
        <input
          type="checkbox"
          class="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-2 focus:ring-blue-500/30"
          [checked]="task.status === 'done'"
          (change)="onTaskStatusChange($event, task)"
          (click)="$event.stopPropagation()"
        />

        <!-- Content -->
        <div class="flex-1">
          
          <!-- Title -->
          <div class="flex items-center justify-between gap-3">
            <p class="text-slate-100 font-medium text-base group-hover:text-white">
              {{ task.title }}
            </p>

            <!-- Status + Priority -->
            <div class="flex items-center gap-2 shrink-0">
              <span
                [class]="getStatusClass(task.status)"
                class="px-2.5 py-1 rounded-md text-xs font-medium"
              >
                {{ getStatusDisplay(task.status) }}
              </span>

              <span
                [class]="getPriorityColorClass(task.priority)"
                class="px-2.5 py-1 rounded-md text-xs border font-medium"
              >
                {{ togglePriorityDisplay(task) }}
              </span>
            </div>
          </div>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400">
            
            <!-- Calendar Icon -->
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(task.due_date) }}</span>
            </div>

            <!-- User Icon -->
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span [class]="getEmployeeNameClass(task.employee_id)">
                {{ getAssignedToName(task.employee_id) }}
              </span>
            </div>

          </div>

          <!-- Description -->
          <div
            *ngIf="isTaskExpanded(task.id)"
            class="mt-4 pt-3 border-t border-slate-700 text-sm text-slate-300 leading-relaxed"
          >
            {{ task.description }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty -->
  <div *ngIf="!loading && !error && tasks.length === 0" class="text-center py-16">
    
    <div class="flex flex-col items-center gap-3">
      <!-- Empty Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M9 5h6m2 0a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2m2 0V3h6v2" />
      </svg>

      <p class="text-slate-400 text-sm">No tasks found.</p>
    </div>

  </div>

</div>
  `,
})
export class HrTasksComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  error: string | null = null;
  currentUser: User | null = null;
  employeeNames: Map<number, string> = new Map();
  expandedTaskId: number | null = null; // Track which task is expanded

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadCurrentUser();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = null;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loadEmployeeNamesForTasks();
        this.loading = false;
        console.log('HR Tasks component initialized', this.tasks);
      },
      error: (err) => {
        this.error = err.message || 'Failed to load tasks';
        this.loading = false;
        console.error('Error fetching tasks:', err);
      },
    });
  }

  loadCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUserFromStorage();
  }

  loadEmployeeNamesForTasks(): void {
    // Get unique employee IDs from tasks
    const employeeIds = [...new Set(this.tasks.map((task) => task.employee_id).filter((id) => id))];

    // Fetch names for each employee
    employeeIds.forEach((employeeId) => {
      this.employeeService.getEmployeeName(employeeId).subscribe({
        next: (name) => {
          this.employeeNames.set(employeeId, name);
        },
        error: (err) => {
          console.error(`Error fetching name for employee ${employeeId}:`, err);
        },
      });
    });
  }

  getAssignedToName(employeeId: number | null | undefined): string {
    if (employeeId == null) {
      return 'Unassigned';
    }

    // Check if we have cached name
    if (this.employeeNames.has(employeeId)) {
      return this.employeeNames.get(employeeId)!;
    }

    // If employeeId matches current user's ID, show current user's name
    if (this.currentUser && employeeId === this.currentUser.id) {
      return `${this.currentUser.first_name} ${this.currentUser.last_name}`;
    }

    // Fallback: return ID for now while loading
    return `Employee #${employeeId}`;
  }

  getEmployeeNameClass(employeeId: number | null | undefined): string {
    if (employeeId != null && this.employeeNames.has(employeeId)) {
      return 'text-slate-200';
    }
    return 'text-slate-500';
  }

  formatDate(dateString: string | null | undefined): string {
    if (dateString == null) {
      return 'N/A';
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  getPriorityLabel(priority: Task['priority']): string {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return priority;
    }
  }

    getStatusDisplay(status: Task['status']): string {
    switch (status) {
      case 'done':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'todo':
        return 'To Do';
      default:
        return status;
    }
  }

  getPriorityColor(priority: Task['priority']): string {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  }


  toggleTaskDescription(taskId: number): void {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }

  isTaskExpanded(taskId: number): boolean {
    return this.expandedTaskId === taskId;
  }


  togglePriorityDisplay(task: Task): string {
    return task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
  }

  getStatusClass(status: Task['status']): string {
    switch (status) {
      case 'done':
        return 'bg-green-500/10 text-green-400';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-400';
      case 'todo':
        return 'bg-yellow-500/10 text-yellow-400';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  }

  getPriorityColorClass(priority: Task['priority']): string {
    switch (priority) {
      case 'high':
        return 'border-red-500/50 text-red-400';
      case 'medium':
        return 'border-orange-500/50 text-orange-400';
      case 'low':
        return 'border-green-500/50 text-green-400';
      default:
        return 'border-slate-500/50 text-slate-400';
    }
  }

  onTaskStatusChange(event: Event, task: Task): void {
    // Prevent the click on checkbox from triggering the card toggle
    event.stopPropagation();
    // When checkbox is clicked, set status to 'done' (will show as 'Completed' in UI)
    this.updateTaskStatus(task.id, 'done');
  }

  updateTaskStatus(taskId: number, status: Task['status']): void {
    this.taskService.updateTask(taskId, { status }).subscribe({
      next: () => {
        // Update the task in our local array
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
          task.status = status;
        }
      },
      error: (err) => {
        console.error('Error updating task status:', err);
        // Optionally show an error message to the user
      },
    });
  }
}
