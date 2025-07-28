export interface Subject {
  id: number;
  name: string;
  code: string;
  coefficient: number;
  level: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateSubjectRequest {
  name: string;
  code: string;
  coefficient: number;
  level: string;
  description?: string;
}