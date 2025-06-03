import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateQuestDto } from './create-quest.dto';

export class CreateManyQuestsDto {
  @ValidateNested({ each: true }) // проверяет каждый элемент массива на соответствие CreateQuestDto
  @Type(() => CreateQuestDto) // преобразует каждый элемент массива в CreateQuestDto
  quests: CreateQuestDto[]; // массив квестов
}

