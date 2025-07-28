import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse, PaginatedResponse } from './api.service';
import { ReportCard, GenerateReportCardRequest } from '../models/report-card.model';

@Injectable({
  providedIn: 'root'
})
export class ReportCardService {
  constructor(private apiService: ApiService) {}

  getReportCards(params?: any): Observable<ApiResponse<PaginatedResponse<ReportCard>>> {
    return this.apiService.get<PaginatedResponse<ReportCard>>('report-cards', params);
  }

  getReportCard(id: number): Observable<ApiResponse<ReportCard>> {
    return this.apiService.get<ReportCard>(`report-cards/${id}`);
  }

  generateReportCard(data: GenerateReportCardRequest): Observable<ApiResponse<ReportCard>> {
    return this.apiService.post<ReportCard>('report-cards/generate', data);
  }

  downloadReportCard(id: number): Observable<Blob> {
    return this.apiService.downloadFile(`report-cards/${id}/download`);
  }
}