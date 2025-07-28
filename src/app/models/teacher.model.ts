import { User } from './user.model';
import { Subject } from './subject.model';
import { Classe } from './classe.model';

export interface Teacher {
  id: number;
  user_id: number;
  teacher_number: string;
  specialization: string;
  hire_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations
  user: User;
  subjects: Subject[];
  classes: Classe[];
}

export interface CreateTeacherRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  specialization: string;
  hire_date: string;
  subject_ids: number[];
  class_ids?: number[];
}