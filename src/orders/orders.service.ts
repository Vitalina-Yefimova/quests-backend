import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { OrdersDataService } from './orders-data.service';
import { OrdersRequest, OrdersResponse } from './interfaces';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersData: OrdersDataService) { }

  async create(data: OrdersRequest): Promise<OrdersResponse> {
    if (data.participants < 1 || data.participants > 8) {
      throw new BadRequestException('Participants must be between 1 and 8.');
    }
    return this.ordersData.create(data);
  }

  async getOrders(
    userId?: number,
    createdAt?: string,
    updatedAt?: string,
    date?: string,
  ): Promise<OrdersResponse[]> {
    const where: any = {};

    if (userId) where.userId = userId;
    if (createdAt) where.createdAt = new Date(createdAt);
    if (updatedAt) where.updatedAt = new Date(updatedAt);
    if (date) where.date = new Date(date);

    return this.ordersData.findOrders(where);
  }

  async update(
    id: number,
    userId: number,
    data: { date: Date; participants: number },
  ): Promise<OrdersResponse> {
    const order = await this.ordersData.findById(id);
    if (!order) throw new NotFoundException('Order not found.');
    if (order.userId !== userId) {
      throw new ForbiddenException('This is not your order.');
    }

    const now = new Date();
    const questDate = new Date(order.date);
    const diffInDays = Math.ceil((questDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays < 7) {
      throw new BadRequestException('Cannot update less than 7 days before the quest date.');
    }

    if (data.participants < 1 || data.participants > 8) {
      throw new BadRequestException('Participants must be between 1 and 8.');
    }

    return this.ordersData.update(id, data);
  }
}

