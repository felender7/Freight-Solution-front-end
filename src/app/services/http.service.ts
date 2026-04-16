import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiError } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  sendRequest<T>(
    endpoint: string,
    payload?: any,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    params?: Record<string, string | number | boolean>
  ): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options: any = {
      headers: this.getHeaders()
    };

    if (params) {
      options.params = new HttpParams({ fromObject: params });
    }

    let request$: Observable<T>;

    switch (method) {
      case 'GET':
        request$ = this.http.get<T>(url, options) as Observable<T>;
        break;
      case 'POST':
        request$ = this.http.post<T>(url, payload, options) as Observable<T>;
        break;
      case 'PUT':
        request$ = this.http.put<T>(url, payload, options) as Observable<T>;
        break;
      case 'PATCH':
        request$ = this.http.patch<T>(url, payload, options) as Observable<T>;
        break;
      case 'DELETE':
        request$ = this.http.delete<T>(url, options) as Observable<T>;
        break;
      default:
        request$ = this.http.get<T>(url, options) as Observable<T>;
    }

    return request$.pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        return throwError(() => ({ message: errorMessage } as ApiError));
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}