import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request, ParseIntPipe, ForbiddenException } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { OrderResponseDto } from './dto/order-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  // create order (user)
  @Post()
  async create(@Request() req, @Body() dto: CreateOrderDto) {
    const order = await this.orderService.create({
      userId: req.user.userId,
      ...dto,
    });
    return new OrderResponseDto(order);
  }

  // get orders (user)
  @Get('me')
  async findMyOrders(@Request() req) {
    const orders = await this.orderService.findByUser(req.user.userId)
    return orders.map((order) => new OrderResponseDto(order));
  }

  // update date/participants (user)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { date: Date; participants: number }
  ) {
    const order = await this.orderService.findUnique(id);

    if (!order || order.userId !== req.user.userId) {
      throw new ForbiddenException('You can only update your own orders');
    }

    const updated = await this.orderService.update(id, req.user.userId, data);
    return new OrderResponseDto(updated);
  }

  // get all orders (admin)
  @Get()
  @Roles('ADMIN')
  async findAll() {
    const orders = await this.orderService.findAll()
    return orders.map((order) => new OrderResponseDto(order));
  }

  // get user's orders by ID (admin)
  @Get('user/:userId')
  @Roles('ADMIN')
  async getOrdersByUser(@Param('userId', ParseIntPipe) userId: number) {
    const orders = await this.orderService.findByUser(userId);
    return orders.map((order) => new OrderResponseDto(order));
  }
}
