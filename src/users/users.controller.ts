import { Controller, Get, Patch, Param, Body, ParseIntPipe, Headers, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResponseDto } from './dto/users-response.dto';
import { UsersRequestDto } from './dto/users-request.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  async getUser(@Headers('authorization') authHeader?: string) {
    const token = authHeader?.replace('Bearer ', '');
    const user = await this.usersService.getUser({ token });

    if (!user) {
      throw new Error('User not found');
    }

    return new UsersResponseDto({
      ...user,
      hasPassword: !!user.password
    });
  }

  @Patch()
  async updateUser(
    @Body() dto: Partial<Pick<UsersRequestDto, 'firstName' | 'lastName' | 'phone' | 'password' | 'email'> & { oldPassword?: string }>,
    @Headers('authorization') authHeader?: string,
  ) {
    const token = authHeader?.replace('Bearer ', '');
    const updatedUser = await this.usersService.updateUser(dto, token);
    return new UsersResponseDto(updatedUser);
  }
}
