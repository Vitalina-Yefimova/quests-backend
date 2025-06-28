import { IsNumber, IsDate, IsString, IsOptional } from 'class-validator';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { OrdersResponse } from '../interfaces';

export class OrdersResponseDto extends BaseResponseDto<OrdersResponseDto> implements OrdersResponse {

  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  questId: string;

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
}
