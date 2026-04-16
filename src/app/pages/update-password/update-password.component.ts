import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UpdatePasswordRequest } from '../../models/user.model';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent implements OnInit {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  loading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.error = 'All fields are required';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'New passwords do not match';
      return;
    }

    if (this.newPassword.length < 8) {
      this.error = 'Password must be at least 8 characters';
      return;
    }

    this.loading = true;
    this.error = null;

    const data: UpdatePasswordRequest = {
      current_password: this.currentPassword,
      new_password: this.newPassword,
      new_password_confirmation: this.confirmPassword
    };

    this.authService.updatePassword(data).subscribe({
      next: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.message || 'Failed to update password';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}