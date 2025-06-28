import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { QuestsRequestDto } from './quests-request.dto';

export class QuestsCreateManyDto {
  @ValidateNested({ each: true })
  @Type(() => QuestsRequestDto)
  quests: QuestsRequestDto[];
}

