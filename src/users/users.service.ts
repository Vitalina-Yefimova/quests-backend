import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { UsersRequest } from './interfaces';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly usersData: UsersDataService,
    private readonly jwtService: JwtService,
  ) { }

  async getUser(token: string) {
    const id = this.getUserIdFromToken(token);
    return this.usersData.getUser({ id });
  }

  async findUser(where: {
    id?: number;
    email?: string;
    phone?: string
  }) {
    return this.usersData.getUser(where);
  }


  private getUserIdFromToken(token: string): number {
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async createUser(user: UsersRequest) {
    return this.usersData.createUser(user);
  }

  async updateUser(data: Partial<Pick<UsersRequest, 'firstName' | 'lastName' | 'phone' | 'password' | 'email' | 'verify' | 'newEmail' | 'emailVerified'> & { oldPassword?: string }>, token?: string) {

    const user = await this.getUser(token);
    if (!user)
      throw new Error('User not found');

    const { oldPassword, ...updateData } = data;
    const finalUpdateData: any = {};

    if (
      updateData.phone &&
      updateData.phone !== user.phone &&
      user.authMethod === 'phone'
    ) {
      throw new UnauthorizedException(
        'Cannot change phone number for users registered with phone'
      );
    }

    let type = null
    if (token) {
      try {
        const payload = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        })
        type = payload.type
      } catch (e) {
        throw new UnauthorizedException('Invalid or expired token')
      }
    }

    if (updateData.newEmail && user.emailVerified) {
      throw new UnauthorizedException('Email already verified. Cannot change it again.');
    }

    if (updateData.email && updateData.email !== user.email) {
      if (type === 'verify-email') {
        finalUpdateData.email = updateData.email
        finalUpdateData.emailVerified = true
        finalUpdateData.newEmail = null
      } else {
        throw new UnauthorizedException('Unauthorized to update email')
      }
    }

    if (updateData.password) {
      if (type === 'reset-password') {
        finalUpdateData.password = await bcrypt.hash(updateData.password, 10)
      } else if (oldPassword) {
        const isOldPasswordValid = await bcrypt.compare(
          oldPassword,
          user.password
        )
        if (!isOldPasswordValid) {
          throw new UnauthorizedException('Old password is incorrect');
        }
        finalUpdateData.password = await bcrypt.hash(updateData.password, 10);
      } else {
        throw new UnauthorizedException('Missing old password or token')
      }
    }

    if (updateData.firstName) finalUpdateData.firstName = updateData.firstName
    if (updateData.lastName) finalUpdateData.lastName = updateData.lastName
    if (updateData.newEmail) finalUpdateData.newEmail = updateData.newEmail

    if (updateData.verify !== undefined) finalUpdateData.verify = updateData.verify;
    if (updateData.emailVerified !== undefined) finalUpdateData.emailVerified = updateData.emailVerified;

    return this.usersData.updateUser(user.id, finalUpdateData);
  }
}