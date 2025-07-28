import { Student } from './student.model';
import { Subject } from './subject.model';
import { Teacher } from './teacher.model';
import { Classe } from './classe.model';

export interface Grade {
  id: number;
  student_id: number;
  subject_id: number;
  teacher_id: number;
  class_id: number;
  period: string;
  grade_type: string;
  value: number;
  max_value: number;
  date: string;
  comment?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  student: Student;
  subject: Subject;
  teacher: Teacher;
  classe: Classe;
  
  // Computed
  percentage: number;
}

export interface CreateGradeRequest {
  student_id: number;
  subject_id: number;
  class_id: number;
  period: string;
  grade_type: string;
  value: number;
  max_value: number;
  date: string;
  comment?: string;
}