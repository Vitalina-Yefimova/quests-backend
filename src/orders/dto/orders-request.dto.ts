import { IsDateString, IsNumber, IsString, Min } from 'class-validator';
import { OrdersRequest } from '../interfaces';

export class OrdersRequestDto {

  @IsString()
  questId: string;

  @IsDateString()
  date: string;

  @IsNumber()
  @Min(1)
  participants: number;
}