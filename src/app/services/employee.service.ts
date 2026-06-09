import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  employee_code?: string;
  position?: string;
  department?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiEndpoint = '/hrm/employees';

  constructor(private httpService: HttpService) {}

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpService.sendRequest<Employee>(`${this.apiEndpoint}/${id}`);
  }

  getEmployeeName(id: number): Observable<string> {
    if (!id) {
      return new Observable(observer => observer.next('Unassigned'));
    }
    return this.getEmployeeById(id).pipe(
      map((employee: Employee) => `${employee.first_name} ${employee.last_name}`)
    );
  }
}