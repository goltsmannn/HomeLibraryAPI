import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async getAlbums() {
    return await this.albumsService.getAll();
  }

  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    try {
      return await this.albumsService.getById(id);
    } catch (err: any) {
      throw new HttpException(
        {
          status: err.statusCode,
          error: err.message,
        },
        err.statusCode,
      );
    }
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return await this.albumsService.create(createAlbumDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Album already exists or invalid data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.albumsService.update(id, updateAlbumDto);
    } catch (err) {
      throw new HttpException(
        {
          status: err.statusCode,
          error: err.message,
        },
        err.statusCode,
      );
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    try {
      return await this.albumsService.delete(id);
    } catch (err) {
      throw new HttpException(
        {
          status: err.statusCode,
          error: err.message,
        },
        err.statusCode,
      );
    }
  }
}