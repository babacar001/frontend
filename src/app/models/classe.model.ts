export interface Classe {
  id: number;
  name: string;
  level: string;
  academic_year: string;
  capacity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Computed
  student_count?: number;
}

export interface CreateClasseRequest {
  name: string;
  level: string;
  academic_year: string;
  capacity: number;
}