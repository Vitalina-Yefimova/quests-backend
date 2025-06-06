import { Schema, model } from 'mongoose';
import { FavoriteDocument } from './interfaces/favorite-document.interface';

const favoriteSchema = new Schema<FavoriteDocument>(
  {
    userId: { type: Number, required: true },
    questId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const FavoriteModel = model<FavoriteDocument>('Favorite', favoriteSchema);

