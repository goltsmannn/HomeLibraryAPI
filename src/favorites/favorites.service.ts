import { Inject, Injectable } from '@nestjs/common';
import { CustomError } from '../errors/CustomError';
import { isUUID } from 'class-validator';
import prisma from '../../singleton';
@Injectable()
export class FavoritesService {


  async getAll(userId: string) {
    if(!isUUID(userId)) {
      throw new CustomError('Invalid UUID', 400);
    }
    const response = {
      artists: await prisma.favorites_UserArtist.findMany({
        select: {artistId: true},
        where: {userId: userId}
      }),
      albums: await prisma.favorites_UserAlbum.findMany({
        select: {albumId: true},
        where: {userId: userId}
      }),
      tracks: await prisma.favorites_UserTrack.findMany({
        select: {trackId: true},
        where: {userId: userId}
      }),
    };
    return response;
  }

  public async addTrack(trackId: string, userId: string) {
    if(!isUUID(trackId) || !isUUID(userId)) {
      throw new CustomError('Invalid UUID for track or user', 400);
    }
    if (await prisma.favorites_UserTrack.findUnique({
      where: {
        trackId_userId: {userId: userId, trackId: trackId}
      }
      }) !== null) {
      throw new CustomError('Track already in favorites', 400);
    }
    if (!prisma.user.findUnique({where: {id: userId}})) {
      throw new CustomError('User not found', 422);
    }
    if (!prisma.track.findUnique({where: {id: trackId}})) {
      throw new CustomError('Track not found', 422);
    }
    return prisma.favorites_UserTrack.create({
      data: {
        trackId: trackId,
        userId: userId
      }
    })
  }
  //
  // public addAlbum(id: string) {
  //   if(!isUUID(id)) {
  //     throw new CustomError('Invalid UUID', 400);
  //   }
  //   if (this.Favorites.albums.includes(id)) {
  //     throw new CustomError('Album already in favorites', 400);
  //   }
  //   if (this.albums.has(id)) {
  //     this.Favorites.albums.push(id);
  //     return;
  //   }
  //   throw new CustomError('Album not found', 422);
  // }
  //
  // public addArtist(id: string) {
  //   if(!isUUID(id)) {
  //     throw new CustomError('Invalid UUID', 400);
  //   }
  //   if (this.Favorites.artists.includes(id)) {
  //     throw new CustomError('Artist already in favorites', 400);
  //   }
  //   if (this.artists.has(id)) {
  //     this.Favorites.artists.push(id);
  //     return;
  //   }
  //   throw new CustomError('Artist not found', 422);
  // }
  //
  // public removeTrack(id: string) {
  //   if(!isUUID(id)) {
  //     throw new CustomError('Invalid UUID', 400);
  //   }
  //   if (!this.Favorites.tracks.includes(id)) {
  //     throw new CustomError('Track not in favorites', 404);
  //   }
  //   this.Favorites.tracks = this.Favorites.tracks.filter((track) => track !== id);
  // }
  //
  // public removeAlbum(id: string) {
  //   if(!isUUID(id)) {
  //     throw new CustomError('Invalid UUID', 400);
  //   }
  //   if (!this.Favorites.albums.includes(id)) {
  //     throw new CustomError('Album not in favorites', 404);
  //   }
  //   this.Favorites.albums = this.Favorites.albums.filter((album) => album !== id);
  // }
  //
  // public removeArtist(id: string) {
  //   if(!isUUID(id)) {
  //     throw new CustomError('Invalid UUID', 400);
  //   }
  //   if (!this.Favorites.artists.includes(id)) {
  //     throw new CustomError('Artist not in favorites', 404);
  //   }
  //   this.Favorites.artists = this.Favorites.artists.filter((artist) => artist !== id);
  // }

}
