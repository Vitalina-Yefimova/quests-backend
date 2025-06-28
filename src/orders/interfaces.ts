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
  createdAt: Date;
  updatedAt: Date;
}
