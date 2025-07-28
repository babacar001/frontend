import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse, PaginatedResponse } from './api.service';
import { Grade, CreateGradeRequest } from '../models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(private apiService: ApiService) {}

  getGrades(params?: any): Observable<ApiResponse<PaginatedResponse<Grade>>> {
    return this.apiService.get<PaginatedResponse<Grade>>('grades', params);
  }

  getGrade(id: number): Observable<ApiResponse<Grade>> {
    return this.apiService.get<Grade>(`grades/${id}`);
  }

  createGrade(data: CreateGradeRequest): Observable<ApiResponse<Grade>> {
    return this.apiService.post<Grade>('grades', data);
  }

  updateGrade(id: number, data: Partial<CreateGradeRequest>): Observable<ApiResponse<Grade>> {
    return this.apiService.put<Grade>(`grades/${id}`, data);
  }

  deleteGrade(id: number): Observable<ApiResponse<any>> {
    return this.apiService.delete(`grades/${id}`);
  }
}