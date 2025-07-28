import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardStats, ClassStats, Activity } from '../../../services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  classStats: ClassStats[] = [];
  recentActivity: Activity[] = [];
  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loading = true;

    // Charger les statistiques générales
    this.dashboardService.getStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats = response.data;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    });

    // Charger les statistiques des classes
    this.dashboardService.getClassStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.classStats = response.data;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques des classes:', error);
      }
    });

    // Charger l'activité récente
    this.dashboardService.getRecentActivity().subscribe({
      next: (response) => {
        if (response.success) {
          this.recentActivity = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'activité récente:', error);
        this.loading = false;
      }
    });
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'grade': return 'grade';
      case 'report_card': return 'description';
      case 'student': return 'person_add';
      default: return 'info';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'grade': return 'primary';
      case 'report_card': return 'accent';
      case 'student': return 'warn';
      default: return 'primary';
    }
  }
}