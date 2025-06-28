import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesSchema } from '../mongo-schemas/favorites.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Favorites',
        schema: FavoritesSchema,
      },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService]
})
export class FavoritesModule { }
