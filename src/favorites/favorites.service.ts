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


  public async addAlbum(albumId: string, userId: string) {
    if(!isUUID(albumId) || !isUUID(userId)) {
      throw new CustomError('Invalid UUID for Album or user', 400);
    }
    if (await prisma.favorites_UserAlbum.findUnique({
      where: {
        albumId_userId: {userId: userId, albumId: albumId}
      }
    }) !== null) {
      throw new CustomError('Album already in favorites', 400);
    }
    if (!prisma.user.findUnique({where: {id: userId}})) {
      throw new CustomError('User not found', 422);
    }
    if (!prisma.album.findUnique({where: {id: albumId}})) {
      throw new CustomError('Album not found', 422);
    }
    return prisma.favorites_UserAlbum.create({
      data: {
        albumId: albumId,
        userId: userId
      }
    })
  }

  public async addArtist(artistId: string, userId: string) {
    if(!isUUID(artistId) || !isUUID(userId)) {
      throw new CustomError('Invalid UUID for Artist or user', 400);
    }
    if (await prisma.favorites_UserArtist.findUnique({
      where: {
        artistId_userId: {userId: userId, artistId: artistId}
      }
    }) !== null) {
      throw new CustomError('Artist already in favorites', 400);
    }
    if (!prisma.user.findUnique({where: {id: userId}})) {
      throw new CustomError('User not found', 422);
    }
    if (!prisma.artist.findUnique({where: {id: artistId}})) {
      throw new CustomError('Artist not found', 422);
    }
    return prisma.favorites_UserArtist.create({
      data: {
        artistId: artistId,
        userId: userId
      }
    })
  }

  public async removeTrack(trackId: string, userId: string) {
    if(!isUUID(trackId) || !isUUID(userId)) {
      throw new CustomError('Invalid UUID for track or user', 400);
    }

   await prisma.favorites_UserTrack.delete({
      where: {
        trackId_userId: {userId: userId, trackId: trackId}
      }
    });
  }

  public async removeAlbum(albumId: string, userId: string) {
    if(!isUUID(albumId) || !isUUID(userId)) {
      throw new CustomError('Invalid UUID for album or user', 400);
    }

    await prisma.favorites_UserAlbum.delete({
      where: {
        albumId_userId: {userId: userId, albumId: albumId}
      }
    });
  }

  public async removeArtist(artistId: string, userId: string) {
    if(!isUUID(artistId) || !isUUID(userId)) {
      throw new CustomError('Invalid UUID for artist or user', 400);
    }

    await prisma.favorites_UserArtist.delete({
      where: {
        artistId_userId: {userId: userId, artistId: artistId}
      }
    });
  }

}
