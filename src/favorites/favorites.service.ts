import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoritesResponse } from './interfaces';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel('Favorites') private readonly favoritesModel: Model<FavoritesResponse>,
  ) { }

  async addFavorite(userId: number, questId: string): Promise<FavoritesResponse> {

    const exists = await this.favoritesModel.findOne({ userId, questId }).exec();
    if (exists) {
      throw new BadRequestException('This quest is already in favorites.');
    }

    const createdFavorite = await this.favoritesModel.create({
      userId,
      questId,
    });

    return {
      id: createdFavorite._id.toString(),
      userId: createdFavorite.userId,
      questId: createdFavorite.questId,
    };
  }

  async getFavoritesByUser(userId: number): Promise<FavoritesResponse[]> {
    const favoriteDocuments = await this.favoritesModel.find({ userId }).exec();

    return favoriteDocuments.map((favoriteDocument) => ({
      id: favoriteDocument._id.toString(),
      userId: favoriteDocument.userId,
      questId: favoriteDocument.questId,
    }));
  }

  async removeFavorite(id: string): Promise<void> {
    await this.favoritesModel.findByIdAndDelete(id).exec();
  }
}
