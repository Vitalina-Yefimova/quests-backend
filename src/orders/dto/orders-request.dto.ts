import { IsDateString, IsNumber, IsString, Min, Max } from 'class-validator';
import { OrdersRequest } from '../interfaces';

export class OrdersRequestDto {

  @IsString()
  questId: string;

  @IsDateString()
  date: string;

  @IsNumber()
  @Min(1)
  @Max(8)
  participants: number;
}