import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { User, LoginRequest, LoginResponse, UpdatePasswordRequest } from '../models/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(
    private _http: HttpService,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this._http.sendRequest<LoginResponse>('/auth/login', credentials, 'POST').pipe(
      tap((response) => {
        if (response.token) {
          this._http.setToken(response.token);
        }
        this.setCurrentUser(response.user);
      })
    );
  }

  updatePassword(data: UpdatePasswordRequest): Observable<any> {
    return this._http.sendRequest<any>('/auth/update_password', data, 'POST');
  }

  getCurrentUser(): Observable<User> {
    return this._http.sendRequest<User>('/auth/me', {}, 'GET');
  }

  logout(): void {
    this._http.sendRequest<any>('/auth/logout', {}, 'POST').subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession()
    });
  }

  clearSession(): void {
    this._http.removeToken();
    localStorage.removeItem('current_user');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  getCurrentUserFromStorage(): User | null {
    if (this.currentUser) return this.currentUser;
    const stored = localStorage.getItem('current_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this._http.isAuthenticated();
  }

  mustUpdatePassword(): boolean {
    const user = this.getCurrentUserFromStorage();
    return user?.must_update_password || false;
  }
}