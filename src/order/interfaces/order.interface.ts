export interface OrderEntity {
  id: number;
  userId: number;
  questId: string;
  date: Date;
  participants: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}