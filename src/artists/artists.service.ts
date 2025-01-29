import { Injectable } from '@nestjs/common';
import { Artist } from './entities/Artist.entity';
import { plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { CustomError } from '../errors/CustomError';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  public getAll() {
    return plainToInstance(Artist, this.artists);
  }

  public getById(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid artist ID", 400);
    }
    const artist = this.artists.find(artist => artist.id === id);
    if (!artist) {
      throw new CustomError("Artist not found", 404);
    }

    return plainToInstance(Artist, artist);
  }

  public create(artist: CreateArtistDto) {
    this.artists.push({
      id: Artist.generateId(),
      name: artist.name,
      grammy: artist.grammy,
    });
  }

  public update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid artist ID", 400);
    }
    const artist = this.artists.find(artist => artist.id === id);
    if (!artist) {
      throw new CustomError("Artist not found", 404);
    }
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  public delete(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid artist ID", 400);
    }
    const artistIndex = this.artists.findIndex(artist => artist.id === id);
    if (artistIndex === -1) {
      throw new CustomError("Artist not found", 404);
    }
    this.artists.splice(artistIndex, 1);
  }
}