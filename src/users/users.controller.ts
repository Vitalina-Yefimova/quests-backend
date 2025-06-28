import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResponseDto } from './dto/users-response.dto';
import { UsersRequestDto } from './dto/users-request.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUser({ id });
    return new UsersResponseDto(user)
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<Pick<UsersRequestDto, 'firstName' | 'lastName' | 'phone' | 'password'>>,
  ) {
    const updatedUser = await this.usersService.updateUser(id, {
      ...dto,
    });
    return new UsersResponseDto(updatedUser);
  }
}
