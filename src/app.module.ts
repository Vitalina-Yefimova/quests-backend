import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestsModule } from './quests/quests.module';
import { OrderModule } from './orders/order.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { FavoriteModule } from './favorites/favorite.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.MONGO_URI), QuestsModule, OrderModule, FavoriteModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ]

})
export class AppModule { }
