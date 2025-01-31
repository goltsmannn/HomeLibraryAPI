import { Inject, Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { CustomError } from '../errors/CustomError';
import { isUUID } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Artist } from '../artists/entities/Artist.entity';
import { Track } from '../tracks/entities/Track.entity';

@Injectable()
export class AlbumsService {

  constructor(@Inject("ALBUM_DATABASE") private albums: Map<string, Album>,
              @Inject("ARTIST_DATABASE") private artists: Map<string, Artist>,
              @Inject("TRACK_DATABASE") private tracks: Map<string, Track>) {}

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
    if(!this.artists.has(album.artistId)) {
      throw new CustomError("Artist for which the album is being created does not exist", 400);
    }
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
    for(const [key, value] of this.tracks) {
      if (value.albumId === id) {
        value.albumId = null;
      }
    }
  }

}