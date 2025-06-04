import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestsModule } from './quests/quests.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.MONGO_URI), QuestsModule],

})
export class AppModule { }
