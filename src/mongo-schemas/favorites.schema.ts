import { Schema, model } from 'mongoose';
import { FavoritesResponse } from '../favorites/interfaces';

const favoritesSchema = new Schema<FavoritesResponse>(
  {
    userId: { type: String, required: true },
    questId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

favoritesSchema.index({ userId: 1, questId: 1 }, { unique: true });

export const FavoritesModel = model<FavoritesResponse>('Favorite', favoritesSchema);
export const FavoritesSchema = favoritesSchema;

