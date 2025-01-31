import { Inject, Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { CustomError } from '../errors/CustomError';
import { isUUID } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AlbumsService {

  constructor(@Inject("ALBUM_DATABASE") private albums: Map<string, Album>) {}
  getAll() {
    return plainToInstance(Album, Array.from(this.albums.values()));
  }

  getById(id: string) {
    if (!isUUID(id)) {
      throw new CustomError('Invalid album ID', 400);
    }
    const album = this.albums.get(id);
    if (!album) {
      throw new CustomError('Album not found', 404);
    }
    return plainToInstance(Album, album);
  }

  create(album: CreateAlbumDto) {
    const id = Album.generateId();
    this.albums.set(id, {
      id: id,
      name: album.name,
      artistId: album.artistId,
      year: album.year,
    });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id)) {
      throw new CustomError('Invalid album ID', 400);
    }
    const album = this.albums.get(id);
    if (!album) {
      throw new CustomError('Album not found', 404);
    }

    Object.assign(album, updateAlbumDto);
    return plainToInstance(Album, album);
  }

  delete(id: string) {
    if (!isUUID(id)) {
      throw new CustomError('Invalid album ID', 400);
    }
    const removed = this.albums.delete(id);
    if (!removed) {
      throw new CustomError('Album not found', 404);
    }
  }
}