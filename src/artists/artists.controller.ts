import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  async getArtists() {
    return await this.artistsService.getAll();
  }

  @Get(':id')
  async getArtist(@Param('id') id: string) {
    try {
      return await this.artistsService.getById(id);
    } catch (err: any) {
      throw new HttpException(
        { status: err.statusCode, error: err.message },
        err.statusCode,
      );
    }
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    try {
      await this.artistsService.create(createArtistDto);
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
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return await this.artistsService.update(id, updateArtistDto);
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
  async deleteArtist(@Param('id') id: string) {
    try {
      await this.artistsService.delete(id);
    } catch(err) {
        throw new HttpException(
          {
            status: err.statusCode || HttpStatus.NOT_FOUND,
            error: err.message || 'Error deleting artist',
          },
          err.statusCode || HttpStatus.NOT_FOUND,);
    }
  }
}