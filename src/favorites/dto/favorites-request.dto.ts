import { IsString } from 'class-validator';
import { FavoritesRequest } from '../interfaces';

export class FavoritesRequestDto implements FavoritesRequest {
  @IsString()
  questId: string;
}