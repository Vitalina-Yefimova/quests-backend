import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PrismaService } from 'src/prisma/prisma.service';
import { Quests, QuestsDocument } from 'src/mongo-schemas/quests.schema';
import { OrdersRequest, OrdersResponse } from './interfaces';

@Injectable()
export class OrdersDataService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Quests.name) private readonly questsModel: Model<QuestsDocument>,
  ) { }

  async create(data: OrdersRequest): Promise<OrdersResponse> {
    const quest = await this.questsModel.findById(data.questId);
    if (!quest) throw new NotFoundException('Quest not found.');

    return this.prisma.orders.create({
      data: {
        user: { connect: { id: data.userId } },
        questId: data.questId,
        date: data.date,
        participants: data.participants,
        price: quest.price,
      },
    });
  }

  async findOrders(where: any): Promise<OrdersResponse[]> {
    const orders = await this.prisma.orders.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return Promise.all(
      orders.map(async (order) => {
        const quest = await this.questsModel.findById(order.questId);
        return {
          ...order,
          questTitle: quest?.title || 'Unknown Quest',
          questId: order.questId
        };
      }),
    );
  }

  async findById(id: number): Promise<OrdersResponse | null> {
    return this.prisma.orders.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: { date: Date; participants: number },
  ): Promise<OrdersResponse> {
    return this.prisma.orders.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.orders.delete({ where: { id } });
  }
}
