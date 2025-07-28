import { Injectable } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { UsersRequest } from './interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersData: UsersDataService) { }

  async getUser(where: {
    id?: number;
    email?: string;
    phone?: string
  }) {
    return this.usersData.getUser(where);
  }

  async createUser(user: UsersRequest) {
    return this.usersData.createUser(user);
  }

  async updateUser(id: number, data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
    verify?: boolean;
    isHashedPassword?: boolean
  }) {
    const updateData: any = {};

    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.verify !== undefined) updateData.verify = data.verify;

    if (data.password) {
      updateData.password = data.isHashedPassword
        ? data.password
        : await bcrypt.hash(data.password, 10);
    }

    return this.usersData.updateUser(id, updateData);
  }

}
