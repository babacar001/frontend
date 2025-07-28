import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse, PaginatedResponse } from './api.service';
import { Classe, CreateClasseRequest } from '../models/classe.model';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  constructor(private apiService: ApiService) {}

  getClasses(params?: any): Observable<ApiResponse<PaginatedResponse<Classe>>> {
    return this.apiService.get<PaginatedResponse<Classe>>('classes', params);
  }

  getClasse(id: number): Observable<ApiResponse<Classe>> {
    return this.apiService.get<Classe>(`classes/${id}`);
  }

  createClasse(data: CreateClasseRequest): Observable<ApiResponse<Classe>> {
    return this.apiService.post<Classe>('classes', data);
  }

  updateClasse(id: number, data: Partial<CreateClasseRequest>): Observable<ApiResponse<Classe>> {
    return this.apiService.put<Classe>(`classes/${id}`, data);
  }

  deleteClasse(id: number): Observable<ApiResponse<any>> {
    return this.apiService.delete(`classes/${id}`);
  }
}