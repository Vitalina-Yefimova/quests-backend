import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRequestDto } from './dto/orders-request.dto';
import { OrdersResponseDto } from './dto/orders-response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async create(@Request() req, @Body() dto: OrdersRequestDto) {
    const order = await this.ordersService.create({
      userId: req.user.userId,
      ...dto,
    });
    return new OrdersResponseDto(order);
  }


  @Get()
  async getOrders(
    @Request() req,
    @Query('userId') userId?: number,
    @Query('createdAt') createdAt?: string,
    @Query('updatedAt') updatedAt?: string,
    @Query('date') date?: string,
  ) {
    let orders;

    if (req.user.role === 'ADMIN') {
      orders = await this.ordersService.getOrders(
        userId,
        createdAt,
        updatedAt,
        date,
      );
    } else {
      orders = await this.ordersService.getOrders(req.user.userId);
    }

    return orders.map((order) => new OrdersResponseDto(order));
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { date: Date; participants: number },
  ) {
    const updated = await this.ordersService.update(
      id,
      req.user.userId,
      data);
    return new OrdersResponseDto(updated);
  }
}
