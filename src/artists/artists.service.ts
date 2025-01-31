import { Inject, Injectable } from '@nestjs/common';
import { Artist } from './entities/Artist.entity';
import { plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { CustomError } from '../errors/CustomError';

@Injectable()
export class ArtistsService {

  constructor(@Inject("ARTIST_DATABASE") private artists: Map<string, Artist>) {}

  public getAll() {
    return plainToInstance(Artist, Array.from(this.artists.values()));
  }

  public getById(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid artist ID", 400);
    }
    const artist = this.artists.get(id);
    if (!artist) {
      throw new CustomError("Artist not found", 404);
    }
    return plainToInstance(Artist, artist);
  }

  public create(artist: CreateArtistDto) {
    const id = Artist.generateId();
    this.artists.set(id,{
      id: id,
      name: artist.name,
      grammy: artist.grammy,
    });
  }

  public update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid artist ID", 400);
    }
    const artist = this.artists.get(id);
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
    const removed = this.artists.delete(id);
    if (!removed) {
      throw new CustomError("Artist not found", 404);
    }
  }
}