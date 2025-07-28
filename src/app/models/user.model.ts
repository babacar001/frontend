export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  roles: string[];
  permissions?: string[];
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}