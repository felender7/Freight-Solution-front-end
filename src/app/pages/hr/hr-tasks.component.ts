import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { EmployeeService } from '../../services/employee.service';
import { profile } from 'src/app/models/profile.model';

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

    <button
      (click)="openAddTaskModal()"
      class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition shadow-md hover:shadow-lg"
    >
      <!-- Plus Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
      </svg>
      Add Task
    </button>
  </div>

  <!-- Loading -->
  <div *ngIf="loading" class="flex flex-col items-center justify-center py-16">
    <div class="animate-spin h-10 w-10 border-2 border-blue-500 border-t-transparent rounded-full"></div>
    <p class="mt-4 text-slate-400">Loading tasks...</p>
  </div>

  <!-- Error -->
  <div *ngIf="error && !loading"
    class="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-xl mb-6">
    {{ error }}
  </div>

  <!-- Task List -->
  <div *ngIf="!loading && !error" class="space-y-4">

    <div *ngFor="let task of tasks"
      (click)="toggleTaskDescription(task.id)"
      class="group cursor-pointer rounded-xl border border-slate-700 bg-slate-900/60 p-5 transition-all duration-200 hover:border-slate-500 hover:bg-slate-900 hover:shadow-md">

      <!-- Top Row -->
      <div class="flex items-start justify-between gap-4">

        <div class="flex items-start gap-4 flex-1">

          <!-- Checkbox -->
          <input
            type="checkbox"
            class="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-2 focus:ring-blue-500/30"
            [checked]="task.status === 'done'"
            (change)="onTaskStatusChange($event, task)"
            (click)="$event.stopPropagation()"
          />

          <!-- Title + Meta -->
          <div class="flex-1">
            <p class="text-slate-100 font-medium text-base group-hover:text-white">
              {{ task.title }}
            </p>

            <!-- Meta Row -->
            <div class="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">

              <!-- Priority -->
              <span
                [class]="getPriorityColorClass(task.priority)"
                class="px-2.5 py-1 rounded-md border font-medium"
              >
                {{ togglePriorityDisplay(task) }}
              </span>

              <!-- Due Date -->
              <div class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>{{ formatDate(task.due_date) }}</span>
              </div>

              <!-- Assigned -->
              <div class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                    d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span [class]="getEmployeeNameClass(task.employee_id)">
                  {{ getAssignedToName(task.employee_id) }}
                </span>
              </div>

            </div>
          </div>
        </div>

        <!-- Status Badge -->
        <span
          [class]="getStatusClass(task.status)"
          class="px-3 py-1 rounded-md text-xs font-medium shrink-0"
        >
          {{ getStatusDisplay(task.status) }}
        </span>

      </div>

      <!-- Description -->
      <div *ngIf="isTaskExpanded(task.id)"
        class="mt-4 pt-3 border-t border-slate-700 text-sm text-slate-300 leading-relaxed">
        {{ task.description }}
      </div>

    </div>
  </div>

  <!-- Empty -->
  <div *ngIf="!loading && !error && tasks.length === 0"
    class="text-center py-16 text-slate-400 text-sm">
    No tasks found.
  </div>
</div>

<!-- Add Task Modal -->
<div *ngIf="showAddModal"
  class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

  <div class="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-6">

    <!-- Header -->
    <div class="flex justify-between items-center mb-5">
      <h4 class="text-lg font-semibold text-white">New Task</h4>
      <button (click)="closeAddTaskModal()" class="text-slate-400 hover:text-white">
        ✕
      </button>
    </div>

    <form (ngSubmit)="saveTask()" class="space-y-4">

      <!-- Title -->
      <div>
        <label class="text-sm text-slate-300 mb-1 block">Title</label>
        <input [(ngModel)]="newTask.title" name="title" required
          class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
      </div>

      <!-- Description -->
      <div>
        <label class="text-sm text-slate-300 mb-1 block">Description</label>
        <textarea [(ngModel)]="newTask.description" name="description"
          class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white h-24 resize-none focus:ring-2 focus:ring-blue-500/30"></textarea>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 gap-4">

        <div>
          <label class="text-sm text-slate-300 mb-1 block">Priority</label>
          <select [(ngModel)]="newTask.priority" name="priority"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500/30">
            <option value="">Select</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label class="text-sm text-slate-300 mb-1 block">Due Date</label>
          <input type="date" [(ngModel)]="newTask.due_date" name="due_date"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500/30">
        </div>

      </div>

      <!-- Status -->
      <div>
        <label class="text-sm text-slate-300 mb-1 block">Status</label>
        <select [(ngModel)]="newTask.status" name="status"
          class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500/30">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-4">
        <button type="submit"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow">
          Save Task
        </button>
        <button type="button" (click)="closeAddTaskModal()"
          class="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-lg">
          Cancel
        </button>
      </div>

    </form>
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
  expandedTaskId: number | null = null;
  currentProfile: profile | null = null;
  // Modal state
  showAddModal = false;
  newTask: Partial<Task> = {
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    status: 'todo',
    employee_id: 0
  };

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadCurrentProfile();
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

loadCurrentProfile(): void {
  const result = this.employeeService.getCurrentProfile();

  if (result) {
    result.subscribe(profile => {
      this.currentProfile = profile;
      console.log('Current user loaded:', this.currentProfile);
    });
  }
}

  loadEmployeeNamesForTasks(): void {
    const employeeIds = [...new Set(this.tasks.map((task) => task.employee_id).filter((id) => id))];
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
    if (this.employeeNames.has(employeeId)) {
      return this.employeeNames.get(employeeId)!;
    }
    if (this.currentUser && employeeId === this.currentUser.id) {
      return `${this.currentUser.first_name} ${this.currentUser.last_name}`;
    }
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

  toggleTaskDescription(taskId: number): void {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }

  isTaskExpanded(taskId: number): boolean {
    return this.expandedTaskId === taskId;
  }

  togglePriorityDisplay(task: Task): string {
    return task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
  }

  openAddTaskModal(): void {
    this.showAddModal = true;
    this.newTask = {
      title: '',
      description: '',
      priority: 'medium',
      due_date: '',
      status: 'todo',
      employee_id: this.currentProfile ? this.currentProfile.id : 0
    };
    console.log('Opening Add Task Modal for employee ID:', this.newTask.employee_id);
  }

  closeAddTaskModal(): void {
    this.showAddModal = false;
  }

  saveTask(): void {
    const taskData = this.newTask as Omit<Task, "id">;
    this.taskService.createTask(taskData).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.closeAddTaskModal();
        console.log("Task created:", task);
      },
      error: (err) => {
        console.error("Error creating task:", err);
        this.error = "Failed to create task";
      },
    });
  }

  onTaskStatusChange(event: Event, task: Task): void {
    event.stopPropagation();
    this.updateTaskStatus(task.id, 'done');
  }

  updateTaskStatus(taskId: number, status: Task['status']): void {
    this.taskService.updateTask(taskId, { status }).subscribe({
      next: () => {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
          task.status = status;
        }
      },
      error: (err) => {
        console.error('Error updating task status:', err);
      },
    });
  }
}
