import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersDataService } from './users-data.service';
import { OrdersModule } from '../orders/orders.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [OrdersModule, FavoritesModule],
  providers: [UsersService, UsersDataService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
