import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {

  constructor(private favoriteService: FavoritesService) {}

  @Get()
  async getAll() {
    return this.favoriteService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    try {
      return this.favoriteService.addTrack(id);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }


}
