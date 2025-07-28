import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Rediriger si déjà connecté
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.redirectBasedOnRole();
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Erreur de connexion';
      }
    });
  }

  private redirectBasedOnRole(): void {
    const user = this.authService.getCurrentUserValue();
    if (!user) return;

    if (user.roles.includes('admin')) {
      this.router.navigate(['/admin/dashboard']);
    } else if (user.roles.includes('teacher')) {
      this.router.navigate(['/teacher/dashboard']);
    } else if (user.roles.includes('student') || user.roles.includes('parent')) {
      this.router.navigate(['/portal/bulletins']);
    } else {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}