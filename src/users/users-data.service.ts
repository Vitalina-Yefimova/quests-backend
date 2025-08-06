import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRequest } from './interfaces';

@Injectable()
export class UsersDataService {
  constructor(private prisma: PrismaService) { }

  async getUser(where: {
    id?: number;
    email?: string;
    phone?: string
  }) {
    return this.prisma.users.findFirst({
      where: {
        OR: [
          where.id ? { id: where.id } : undefined,
          where.email ? { email: where.email } : undefined,
          where.phone ? { phone: where.phone } : undefined,
        ].filter(Boolean),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        password: true,
        role: true,
        verify: true,
        emailVerified: true,
        newEmail: true,
        authMethod: true
      },
    });
  }

  async createUser(user: UsersRequest) {
    return this.prisma.users.create({ data: user })
  }

  async updateUser(id: number, data: Partial<Pick<UsersRequest,
    'firstName' | 'phone' | 'password' | 'lastName' | 'verify' | 'emailVerified' | 'email' | 'newEmail'>>) {
    return this.prisma.users.update({
      where: { id },
      data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        verify: true,
        emailVerified: true,
        newEmail: true,
        role: true,
        authMethod: true
      },
    });
  }
}