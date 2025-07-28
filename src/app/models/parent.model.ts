import { User } from './user.model';
import { Student } from './student.model';

export interface ParentModel {
  id: number;
  user_id: number;
  profession?: string;
  workplace?: string;
  emergency_contact?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  user: User;
  students: Student[];
}