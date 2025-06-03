import { Controller, Body, Post, Get } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { CreateManyQuestsDto } from './dto/create-many-quests.dto';


@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) { }


  @Post('batch')
  async insertMany(@Body() dto: CreateManyQuestsDto) {
    return this.questsService.insertMany(dto.quests);
  }
}

