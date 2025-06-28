import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { Quests, QuestsSchema } from '../mongo-schemas/quests.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [QuestsService],
  controllers: [QuestsController],
  imports: [MongooseModule.forFeature([{ name: Quests.name, schema: QuestsSchema }])],
})
export class QuestsModule { }
