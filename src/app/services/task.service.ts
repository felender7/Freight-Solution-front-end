import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeService } from './employee.service';

export interface Task {
  id: number;
  employee_id: number;
  assigned_by_id: number | null;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  due_date: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiEndpoint = '/hrm/tasks';

  constructor(
    private httpService: HttpService,
    private employeeService: EmployeeService
  ) {}

  getTasks(): Observable<Task[]> {
    return this.httpService.sendRequest<Task[]>(this.apiEndpoint).pipe(
      map((tasks: Task[]) =>
        tasks.map(task => ({
          ...task,
          employee_name: task.employee_id
            ? `${task.employee_id}` // Will be replaced with actual name
            : undefined
        }))
      )
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpService.sendRequest<Task>(`${this.apiEndpoint}/${id}`);
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.httpService.sendRequest<Task>(this.apiEndpoint, task, 'POST');
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.httpService.sendRequest<Task>(`${this.apiEndpoint}/${id}`, task, 'PUT');
  }

  deleteTask(id: number): Observable<void> {
    return this.httpService.sendRequest<void>(`${this.apiEndpoint}/${id}`, null, 'DELETE');
  }
}