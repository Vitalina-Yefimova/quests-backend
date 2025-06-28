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
  }) {

    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      verify: data.verify
    };

    if (data.verify !== undefined) {
      updateData.verify = data.verify;
    }

    if (data.password) {
      updateData['password'] = await bcrypt.hash(data.password, 10);
    }

    return this.usersData.updateUser(id, updateData);
  }
}
