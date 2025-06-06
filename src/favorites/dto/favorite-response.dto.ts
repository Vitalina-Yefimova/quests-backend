import { IsNumber, IsString } from 'class-validator';

export class FavoriteResponseDto {
  @IsString()
  id: string;

  @IsNumber()
  userId: number;

  @IsString()
  questId: string;

  constructor(partial: Partial<FavoriteResponseDto>) {
    Object.assign(this, partial);
  }
}