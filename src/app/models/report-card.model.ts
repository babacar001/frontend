import { Student } from './student.model';
import { Classe } from './classe.model';

export interface ReportCard {
  id: number;
  student_id: number;
  class_id: number;
  period: string;
  academic_year: string;
  general_average: number;
  rank: number;
  mention: string;
  appreciation?: string;
  pdf_path?: string;
  generated_at: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  student: Student;
  classe: Classe;
  
  // Computed
  mention_text: string;
}

export interface GenerateReportCardRequest {
  student_id: number;
  period: string;
  academic_year: string;
}