import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse, PaginatedResponse } from './api.service';
import { Teacher, CreateTeacherRequest } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private apiService: ApiService) {}

  getTeachers(params?: any): Observable<ApiResponse<PaginatedResponse<Teacher>>> {
    return this.apiService.get<PaginatedResponse<Teacher>>('teachers', params);
  }

  getTeacher(id: number): Observable<ApiResponse<Teacher>> {
    return this.apiService.get<Teacher>(`teachers/${id}`);
  }

  createTeacher(data: CreateTeacherRequest): Observable<ApiResponse<Teacher>> {
    return this.apiService.post<Teacher>('teachers', data);
  }

  updateTeacher(id: number, data: Partial<CreateTeacherRequest>): Observable<ApiResponse<Teacher>> {
    return this.apiService.put<Teacher>(`teachers/${id}`, data);
  }

  deleteTeacher(id: number): Observable<ApiResponse<any>> {
    return this.apiService.delete(`teachers/${id}`);
  }
}