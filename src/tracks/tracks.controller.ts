import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { UpdateTrackDto } from './dto/UpdateTrackDto';

@Controller('track')
export class TracksController {

  constructor(private trackService: TracksService) {}

  @Get()
  public async getAll() {
    return await this.trackService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    try {
      return await this.trackService.getById(id);
    } catch(err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

  @Post()
  public async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    try {
      return await this.trackService.update(id, updateTrackDto);
    } catch(err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(@Param('id') id: string) {
    try {
      return await this.trackService.delete(id);
    } catch(err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

}
