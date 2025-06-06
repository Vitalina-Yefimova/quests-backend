import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) { }

  @Post()
  async addFavorite(
    @Request() req,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<FavoriteResponseDto> {
    console.log('Current user:', req.user);

    const favorite = await this.favoriteService.addFavorite(
      req.user.userId,
      createFavoriteDto.questId,
    );

    return new FavoriteResponseDto(favorite);
  }

  @Get()
  async getFavorites(@Request() req): Promise<FavoriteResponseDto[]> {
    console.log('Get favorites for user:', req.user);

    const favorites = await this.favoriteService.getFavoritesByUser(req.user.userId);

    return favorites.map((favorite) => new FavoriteResponseDto(favorite));
  }

  @Delete(':id')
  async removeFavorite(@Param('id') id: string): Promise<void> {
    await this.favoriteService.removeFavorite(id);
  }
}
