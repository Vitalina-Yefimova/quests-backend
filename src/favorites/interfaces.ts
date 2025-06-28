export interface FavoritesRequest {
  questId: string;
}

export interface FavoritesResponse {
  id: string;
  userId: number;
  questId: string;
}