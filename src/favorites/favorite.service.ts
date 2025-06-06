import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoriteDocument } from './interfaces/favorite-document.interface';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel('Favorite') private readonly favoriteModel: Model<FavoriteDocument>,
  ) { }

  async addFavorite(userId: number, questId: string) {

    const createdFavorite = await this.favoriteModel.create({
      userId,
      questId,
    });

    return {
      id: createdFavorite._id.toString(),
      userId: createdFavorite.userId,
      questId: createdFavorite.questId,
    };
  }

  async getFavoritesByUser(userId: number) {
    const favoriteDocuments = await this.favoriteModel.find({ userId }).exec();

    return favoriteDocuments.map((favoriteDocument) => ({
      id: favoriteDocument._id.toString(),
      userId: favoriteDocument.userId,
      questId: favoriteDocument.questId,
    }));
  }

  async removeFavorite(id: string): Promise<void> {
    await this.favoriteModel.findByIdAndDelete(id).exec();
  }
}
