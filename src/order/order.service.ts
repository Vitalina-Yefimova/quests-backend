import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderInput } from './interfaces/create-order.interface';


@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  private readonly fixedPrice = 100

  async create(data: CreateOrderInput) {
    return this.prisma.order.create({
      data: {
        user: { connect: { id: data.userId } },
        questId: data.questId,
        date: data.date,
        participants: data.participants,
        price: this.fixedPrice,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' }
      // 'desc' = descending, то есть сортировка по убыванию (новые сверху)
    })
  }

  async findByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async update(
    id: number,
    userId: number,
    data: {
      date: Date;
      participants: number
    }) {
    return this.prisma.order.update({
      where: { id, userId },
      data: {
        date: data.date,
        participants: data.participants,
      }
    })
  }

  async findUnique(id: number) {
    return this.prisma.order.findUnique({
      where: { id }
    });
  }
}

