import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portail Scolaire';
  currentUser: User | null = null;
  isMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToHome(): void {
    if (this.currentUser) {
      if (this.currentUser.roles.includes('admin')) {
        this.router.navigate(['/admin/dashboard']);
      } else if (this.currentUser.roles.includes('teacher')) {
        this.router.navigate(['/teacher/dashboard']);
      } else if (this.currentUser.roles.includes('student') || this.currentUser.roles.includes('parent')) {
        this.router.navigate(['/portal/bulletins']);
      }
    }
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
}