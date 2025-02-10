import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
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
    MatToolbarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  currentTheme: string;

  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'system';
    this.applyTheme(this.currentTheme);
  }

  ngOnInit(): void {}

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
