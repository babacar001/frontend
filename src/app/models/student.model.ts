import { User } from './user.model';
import { Classe } from './classe.model';
import { ParentModel } from './parent.model';

export interface Student {
  id: number;
  user_id: number;
  parent_id: number;
  class_id: number;
  student_number: string;
  birth_date: string;
  birth_place: string;
  gender: 'M' | 'F';
  documents: string[];
  enrollment_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations
  user: User;
  parent: ParentModel;
  classe: Classe;
}

export interface CreateStudentRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  class_id: number;
  birth_date: string;
  birth_place: string;
  gender: 'M' | 'F';
  documents: string[];
  parent_name: string;
  parent_email: string;
  parent_phone?: string;
  parent_profession?: string;
  parent_workplace?: string;
}