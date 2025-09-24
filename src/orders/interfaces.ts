export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export interface OrdersRequest {
  userId?: number;
  questId: string;
  date: string;
  participants: number;
}

export interface OrdersResponse {
  id: number;
  userId: number;
  questId: string;
  date: Date;
  participants: number;
  price: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
