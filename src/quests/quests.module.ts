import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { Quest, QuestSchema } from './quest.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [QuestsService],
  controllers: [QuestsController],
  imports: [MongooseModule.forFeature([{ name: Quest.name, schema: QuestSchema }])],
})
export class QuestsModule { }
