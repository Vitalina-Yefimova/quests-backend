import { IsDateString, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  questId: string;

  @IsDateString()
  date: string;

  @IsNumber()
  @Min(1)
  participants: number;
}