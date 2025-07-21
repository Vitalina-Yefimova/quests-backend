import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesRequestDto } from './dto/favorites-request.dto';
import { FavoritesResponseDto } from './dto/favorite-response.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post()
  async addFavorite(
    @Request() req,
    @Body() favoritesCreateDto: FavoritesRequestDto,
  ): Promise<FavoritesResponseDto> {

    const favorites = await this.favoritesService.addFavorite(
      req.user.userId,
      favoritesCreateDto.questId,
    );

    return new FavoritesResponseDto(favorites);

  }

  @Get()
  async getFavorites(@Request() req): Promise<FavoritesResponseDto[]> {

    const favorites = await this.favoritesService.getFavoritesByUser(req.user.userId);

    return favorites.map((favorite) => new FavoritesResponseDto(favorite));
  }

  @Delete(':questId')
  async removeFavorite(
    @Request() req,
    @Param('questId') questId: string,
  ): Promise<void> {
    await this.favoritesService.removeFavorite(req.user.userId, questId);
  }
}
