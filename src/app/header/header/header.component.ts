import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentTheme: string;
  authService = inject(AuthService);
  isLoggedIn$ = this.authService.isLoggedIn;
  isMobileMenuOpen = false;
  
  router =inject(Router);
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'system';
    this.applyTheme(this.currentTheme);
  }

  logout(): void {
    this.authService.logout();
    this.isMobileMenuOpen = false; 
    this.router.navigate(['/']);  

  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  applyTheme(theme: string): void {
    const htmlElement = document.documentElement;
    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      htmlElement.classList.toggle('dark', prefersDark);
    } else {
      htmlElement.classList.toggle('dark', theme === 'dark');
    }
  }
}
