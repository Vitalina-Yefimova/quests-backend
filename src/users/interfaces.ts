export interface UsersRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  verify?: boolean;
}

export interface UsersResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  verify: boolean;
}

