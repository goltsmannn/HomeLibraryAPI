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
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getArtists() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getArtist(@Param('id') id: string) {
    try {
      return this.artistsService.getById(id);
    } catch (err: any) {
      throw new HttpException(
        { status: err.statusCode,
          error: err.message,},
        err.statusCode,
      );
    }
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    try {
      return this.artistsService.create(createArtistDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Artist already exists or invalid data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateArtist(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    try {
      return this.artistsService.update(id, updateArtistDto);
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
  deleteArtist(@Param('id') id: string) {
    try {
      return this.artistsService.delete(id);
    } catch (err) {
      throw new HttpException(
        {
          status: err.statusCode || HttpStatus.NOT_FOUND,
          error: err.message || 'Error deleting artist',
        },
        err.statusCode || HttpStatus.NOT_FOUND,
      );
    }
  }
}