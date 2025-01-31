import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post } from '@nestjs/common';
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

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    try {
      return this.favoriteService.addAlbum(id);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    try {
      return this.favoriteService.addArtist(id);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @HttpCode(204)
  @Delete('track/:id')
  async removeTrack(@Param('id') id: string) {
    try {
      return this.favoriteService.removeTrack(id);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @HttpCode(204)
  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string) {
    try {
      return this.favoriteService.removeAlbum(id);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string) {
    try {
      return this.favoriteService.removeArtist(id);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
