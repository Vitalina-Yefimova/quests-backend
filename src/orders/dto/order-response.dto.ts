import { IsNumber, IsDate, IsString, IsOptional } from 'class-validator';

export class OrderResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  questId: string | null;

  @IsDate()
  date: Date;

  @IsNumber()
  participants: number;

  @IsNumber()
  price: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<OrderResponseDto>) {
    Object.assign(this, partial);
  } // нужен, чтобы удобно вызывать new OrderResponseDto(order)
}
