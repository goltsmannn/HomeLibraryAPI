import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import * as http from 'node:http';

@Controller('favs')
export class FavoritesController {

  constructor(private favoriteService: FavoritesService) {}

  @Get()
  async getAll(@Body('id') id: string) {
    return await this.favoriteService.getAll(id);
  }

  @Post('track/:id')
  async addTrack(@Param('id') trackId: string, @Body('id') userId: string) {
    try {
      return await this.favoriteService.addTrack(trackId, userId);
    } catch (err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

  @Post('album/:id')
  async addAlbum(@Param('id') albumId: string, @Body('id') userId: string) {
    try {
      return this.favoriteService.addAlbum(albumId, userId);
    } catch (err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

  @Post('artist/:id')
  async addArtist(@Param('id') artistId: string, @Body('id') userId: string) {
    try {
      return this.favoriteService.addArtist(artistId, userId);
    } catch (err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

  @HttpCode(204)
  @Delete('track/:id')
  async removeTrack(@Param('id') trackId: string, @Body('id') userId: string) {
    try {
       await this.favoriteService.removeTrack(trackId, userId);
    } catch (err) {
      throw new HttpException("Track to delete doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(204)
  @Delete('album/:id')
  async removeAlbum(@Param('id') albumId: string, @Body('id') userId: string) {
    try {
      await this.favoriteService.removeAlbum(albumId, userId);
    } catch (err) {
      throw new HttpException("", HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async removeArtist(@Param('id') artistId: string, @Body('id') userId: string) {
    try {
      await this.favoriteService.removeArtist(artistId, userId);
    } catch (err) {
      throw new HttpException("", HttpStatus.NOT_FOUND);
    }
  }
}
