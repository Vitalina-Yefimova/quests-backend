export interface UsersRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone: string;
  verify?: boolean;
  emailVerified?: boolean;
  newEmail?: string;
  authMethod: 'email' | 'phone';
}

export interface UsersResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  verify: boolean;
  emailVerified?: boolean;
  hasPassword?: boolean
}

