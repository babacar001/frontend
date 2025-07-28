import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse, PaginatedResponse } from './api.service';
import { Student, CreateStudentRequest } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private apiService: ApiService) {}

  getStudents(params?: any): Observable<ApiResponse<PaginatedResponse<Student>>> {
    return this.apiService.get<PaginatedResponse<Student>>('students', params);
  }

  getStudent(id: number): Observable<ApiResponse<Student>> {
    return this.apiService.get<Student>(`students/${id}`);
  }

  createStudent(data: CreateStudentRequest): Observable<ApiResponse<Student>> {
    return this.apiService.post<Student>('students', data);
  }

  updateStudent(id: number, data: Partial<CreateStudentRequest>): Observable<ApiResponse<Student>> {
    return this.apiService.put<Student>(`students/${id}`, data);
  }

  deleteStudent(id: number): Observable<ApiResponse<any>> {
    return this.apiService.delete(`students/${id}`);
  }

  getStudentGrades(studentId: number, params?: any): Observable<ApiResponse<any>> {
    return this.apiService.get(`students/${studentId}/grades`, params);
  }
}