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

  async updateUser(id: number, data: Partial<Pick<UsersRequest, 'firstName' | 'lastName' | 'phone' | 'password' | 'verify'> & { oldPassword?: string }>) {

    const { oldPassword, ...updateData } = data;
    const finalUpdateData = { ...updateData };

    if (updateData.password) {

      if (oldPassword) {
        const user = await this.getUser({ id });
        if (!user) {
          throw new Error('User not found');
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordValid) {
          throw new Error('Old password is incorrect');
        }
      }

      finalUpdateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return this.usersData.updateUser(id, finalUpdateData);
  }
}
