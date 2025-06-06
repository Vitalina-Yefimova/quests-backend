import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteModel } from './favorite.schema';
import { FavoriteDocument } from './interfaces/favorite-document.interface';
import { Schema } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Favorite',
        schema: FavoriteModel.schema as Schema<FavoriteDocument>,
      },
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule { }
