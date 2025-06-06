import { Role } from '@prisma/client';

export interface AuthPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role?: Role;
}
