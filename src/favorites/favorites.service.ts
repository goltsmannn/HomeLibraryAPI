import { Inject, Injectable } from '@nestjs/common';
import { Favorites } from './entities/Favorites.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { CustomError } from '../errors/CustomError';
import { Track } from '../tracks/entities/Track.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject("TRACK_DATABASE") private tracks: Map<string, Track>,
    @Inject("ALBUM_DATABASE") private albums: Map<string, Track>,
    @Inject("ARTIST_DATABASE") private artists: Map<string, Track>,
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
    return Array.from(this.Favorites.artists.map((id) => this.artists.get(id)));

  }

  public getAlbums() {
    return Array.from(this.Favorites.albums.map((id) => this.albums.get(id)));
  }

  public getTracks() {
    return Array.from(this.Favorites.tracks.map((id) => this.tracks.get(id)));
  }

  public addTrack(id: string) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid UUID', 400);
    }
    if (this.Favorites.tracks.includes(id)) {
      throw new CustomError('Track already in favorites', 400);
    }
    if (this.tracks.has(id)) {
      this.Favorites.tracks.push(id);
      return;
    }
    throw new CustomError('Track not found', 422);
  }

  public addAlbum(id: string) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid UUID', 400);
    }
    if (this.Favorites.albums.includes(id)) {
      throw new CustomError('Album already in favorites', 400);
    }
    if (this.albums.has(id)) {
      this.Favorites.albums.push(id);
      return;
    }
    throw new CustomError('Album not found', 422);
  }

  public addArtist(id: string) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid UUID', 400);
    }
    if (this.Favorites.artists.includes(id)) {
      throw new CustomError('Artist already in favorites', 400);
    }
    if (this.artists.has(id)) {
      this.Favorites.artists.push(id);
      return;
    }
    throw new CustomError('Artist not found', 422);
  }

  public removeTrack(id: string) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid UUID', 400);
    }
    if (!this.Favorites.tracks.includes(id)) {
      throw new CustomError('Track not in favorites', 404);
    }
    this.Favorites.tracks = this.Favorites.tracks.filter((track) => track !== id);
  }

  public removeAlbum(id: string) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid UUID', 400);
    }
    if (!this.Favorites.albums.includes(id)) {
      throw new CustomError('Album not in favorites', 404);
    }
    this.Favorites.albums = this.Favorites.albums.filter((album) => album !== id);
  }

  public removeArtist(id: string) {
    if(!isUUID(id)) {
      throw new CustomError('Invalid UUID', 400);
    }
    if (!this.Favorites.artists.includes(id)) {
      throw new CustomError('Artist not in favorites', 404);
    }
    this.Favorites.artists = this.Favorites.artists.filter((artist) => artist !== id);
  }




}
