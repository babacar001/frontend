import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse, PaginatedResponse } from './api.service';
import { Subject, CreateSubjectRequest } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private apiService: ApiService) {}

  getSubjects(params?: any): Observable<ApiResponse<PaginatedResponse<Subject>>> {
    return this.apiService.get<PaginatedResponse<Subject>>('subjects', params);
  }

  getSubject(id: number): Observable<ApiResponse<Subject>> {
    return this.apiService.get<Subject>(`subjects/${id}`);
  }

  createSubject(data: CreateSubjectRequest): Observable<ApiResponse<Subject>> {
    return this.apiService.post<Subject>('subjects', data);
  }

  updateSubject(id: number, data: Partial<CreateSubjectRequest>): Observable<ApiResponse<Subject>> {
    return this.apiService.put<Subject>(`subjects/${id}`, data);
  }

  deleteSubject(id: number): Observable<ApiResponse<any>> {
    return this.apiService.delete(`subjects/${id}`);
  }
}