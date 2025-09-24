import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersDataService } from './orders-data.service';
import { OrdersRequest, OrdersResponse, OrderStatus } from './interfaces';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersData: OrdersDataService) { }

  private async checkQuestConflict(questId: string, date: string, excludeOrderId?: number): Promise<void> {
    const questDate = new Date(date);
    const existingOrders = await this.ordersData.findOrders({
      questId,
      date: questDate,
      status: { in: [OrderStatus.PENDING, OrderStatus.CONFIRMED] },
    });

    const conflictingOrders = excludeOrderId
      ? existingOrders.filter(order => order.id !== excludeOrderId)
      : existingOrders;

    if (conflictingOrders.length > 0) {
      throw new BadRequestException(
        'This quest is already booked for this date.',
      );
    }
  }

  async create(data: OrdersRequest): Promise<OrdersResponse> {
    const quest = await this.ordersData['questsModel'].findById(data.questId);
    if (!quest) throw new NotFoundException('Quest not found.');

    const minPlayers = quest.players?.min;
    const maxPlayers = quest.players?.max;

    if (data.participants < minPlayers || data.participants > maxPlayers) {
      throw new BadRequestException(
        `Participants must be between ${minPlayers} and ${maxPlayers}.`,
      );
    }

    const now = new Date();
    const questDate = new Date(data.date);
    const diffInDays = Math.ceil(
      (questDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffInDays < 7) {
      throw new BadRequestException(
        'Booking must be made at least 7 days in advance.',
      );
    }

    await this.checkQuestConflict(data.questId, data.date);

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
    data: { date: string; participants: number },
  ): Promise<OrdersResponse> {
    const order = await this.ordersData.findById(id);
    if (!order) throw new NotFoundException('Order not found.');
    if (order.userId !== userId) {
      throw new ForbiddenException('This is not your order.');
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('Cannot update cancelled order.');
    }

    const quest = await this.ordersData['questsModel'].findById(order.questId);
    if (!quest) throw new NotFoundException('Quest not found.');

    const minPlayers = quest.players?.min;
    const maxPlayers = quest.players?.max;

    if (data.participants < minPlayers || data.participants > maxPlayers) {
      throw new BadRequestException(
        `Participants must be between ${minPlayers} and ${maxPlayers}.`,
      );
    }

    const now = new Date();
    const questDate = new Date(data.date);
    const diffInDays = Math.ceil(
      (questDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffInDays < 7) {
      throw new BadRequestException(
        'Cannot update less than 7 days before the quest date.',
      );
    }

    await this.checkQuestConflict(order.questId, data.date, id);
    return this.ordersData.update(id, {
      date: new Date(data.date),
      participants: data.participants,
      status: OrderStatus.PENDING,
    })
  }

  async delete(id: number, userId: number): Promise<void> {
    const order = await this.ordersData.findById(id);
    if (!order) throw new NotFoundException('Order not found.');
    if (order.userId !== userId) throw new ForbiddenException('This is not your order.');

    const now = new Date();
    const questDate = new Date(order.date);
    const diffInDays = Math.ceil((questDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays < 7) {
      throw new BadRequestException('Cannot cancel less than 7 days before the quest date.');
    }

    await this.ordersData.delete(id);
  }
}
