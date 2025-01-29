import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/Favorites.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { CustomError } from '../errors/CustomError';

@Injectable()
export class FavoritesService {
  constructor(
    private trackService: TracksService,
    private albumService: AlbumsService,
    private artistService: ArtistsService,
  ) {}

  private Favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    return {
      artists: this.getArtists(),
      albums: this.getAlbums(),
      tracks: this.getTracks(),
    };
  }

  public getArtists() {
    let response = [];
    for (const artist of this.artistService.getAll()) {
      if (artist.id in this.Favorites.artists) {
        response.push(artist);
      }
    }
    return response;
  }

  public getAlbums() {
    let response = [];
    for (const album of this.albumService.getAll()) {
      if (album.id in this.Favorites.albums) {
        response.push(album);
      }
    }
    return response;
  }

  public getTracks() {
    let response = [];
    for (const track of this.trackService.getAll()) {
      if (track.id in this.Favorites.tracks) {
        response.push(track);
      }
    }
    return response;
  }

  public addTrack(id: string) {
    if (this.Favorites.tracks.includes(id)) {
      throw new CustomError('Track already in favorites', 400);
    }

    const track = this.trackService.getById(id);
    this.Favorites.tracks.push(track.id);
  }


}
