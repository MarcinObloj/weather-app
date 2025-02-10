import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';

  authService = inject(AuthService);
  router = inject(Router);

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        alert('Login successful!');
        this.router.navigate(['cities']);
      },
      error: (err) => alert(`Error: ${err.message}`),
    });
  }
}
