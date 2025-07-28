import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from './api.service';

export interface DashboardStats {
  students_count: number;
  teachers_count: number;
  classes_count: number;
  grades_count: number;
  report_cards_count: number;
}

export interface ClassStats {
  id: number;
  name: string;
  level: string;
  students_count: number;
  capacity: number;
  average: number;
}

export interface GradeStats {
  subject_name: string;
  grades_count: number;
  average: number;
  min: number;
  max: number;
}

export interface Activity {
  type: string;
  message: string;
  date: string;
}

export interface MonthlyStats {
  month: string;
  students: number;
  grades: number;
  report_cards: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private apiService: ApiService) {}

  getStats(): Observable<ApiResponse<DashboardStats>> {
    return this.apiService.get<DashboardStats>('dashboard/stats');
  }

  getClassStats(): Observable<ApiResponse<ClassStats[]>> {
    return this.apiService.get<ClassStats[]>('dashboard/class-stats');
  }

  getGradeStats(params?: any): Observable<ApiResponse<GradeStats[]>> {
    return this.apiService.get<GradeStats[]>('dashboard/grade-stats', params);
  }

  getRecentActivity(): Observable<ApiResponse<Activity[]>> {
    return this.apiService.get<Activity[]>('dashboard/recent-activity');
  }

  getMonthlyStats(): Observable<ApiResponse<MonthlyStats[]>> {
    return this.apiService.get<MonthlyStats[]>('dashboard/monthly-stats');
  }
}