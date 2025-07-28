import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GradeService } from '../../../services/grade.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  currentUser: User | null = null;
  recentGrades: any[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    this.loadRecentGrades();
  }

  loadRecentGrades(): void {
    this.loading = true;
    this.gradeService.getGrades({ limit: 10 }).subscribe({
      next: (response) => {
        if (response.success) {
          this.recentGrades = response.data.data.slice(0, 10);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notes:', error);
        this.loading = false;
      }
    });
  }
}