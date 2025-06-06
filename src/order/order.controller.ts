import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request, ParseIntPipe, ForbiddenException } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  // create order (user)
  @Post()
  async create(@Request() req, @Body() dto: CreateOrderDto) {
    return this.orderService.create({
      userId: req.user.userId,
      ...dto
    })
  }

  // get orders (user)
  @Get('me')
  async findMyOrders(@Request() req) {
    return this.orderService.findByUser(req.user.userId)
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

    return this.orderService.update(id, req.user.userId, data);
  }

  // get all orders (admin)
  @Get()
  @Roles('ADMIN')
  async findAll() {
    return this.orderService.findAll()
  }

  // get user's orders by ID (admin)
  @Get('user/:userId')
  @Roles('ADMIN')
  async getOrdersByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.findByUser(userId);
  }
}
