import { Controller, Body, Post, Get } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { CreateManyQuestsDto } from './dto/create-many-quests.dto';
import { QuestDocument } from './interfaces/quest-document.interface';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) { }


  @Post('batch')
  async insertMany(@Body() dto: CreateManyQuestsDto) {
    return this.questsService.insertMany(dto.quests);
  }


  @Get()
  async getAllQuests(): Promise<QuestDocument[]> {
    return this.questsService.findAll();
  }
}
