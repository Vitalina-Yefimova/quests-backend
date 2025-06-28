import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
  Max
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestsRequest } from '../interfaces';

class GenreDto {
  @IsString()
  @IsNotEmpty()
  genreName: string;
}

class PlayersDto {
  @IsNumber()
  @Min(2)
  @Max(8)
  min: number;

  @IsNumber()
  @Min(2)
  @Max(8)
  max: number;
}

export class QuestsRequestDto implements QuestsRequest {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenreDto)
  genres: GenreDto[];

  @ValidateNested()
  @Type(() => PlayersDto)
  players: PlayersDto;

  @IsString()
  @IsNotEmpty()
  difficulty: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  imageBg: string;
}
