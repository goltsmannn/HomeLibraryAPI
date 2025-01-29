import { Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { CustomError } from '../errors/CustomError';
import { isUUID } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  getAll() {
    return plainToInstance(Album, this.albums);
  }

  getById(id: string) {
    if (!isUUID(id)) {
      throw new CustomError('Invalid album ID', 400);
    }
    const album = this.albums.find(album => album.id === id);
    if (!album) {
      throw new CustomError('Album not found', 404);
    }
    return plainToInstance(Album, album);
  }

  create(album: CreateAlbumDto) {
    this.albums.push({
      id: Album.generateId(),
      name: album.name,
      artistId: album.artistId,
      year: album.year,
    });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id)) {
      throw new CustomError('Invalid album ID', 400);
    }
    const album = this.albums.find(album => album.id === id);
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
    const album = this.albums.find(album => album.id === id);
    if (!album) {
      throw new CustomError('Album not found', 404);
    }
    this.albums = this.albums.filter(album => album.id !== id);
  }
}