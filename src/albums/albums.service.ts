import { Injectable } from '@nestjs/common';
import { Album } from './entities/Album.entity';
import { isUUID } from 'class-validator';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { CustomError } from '../errors/CustomError';
import prisma from '../../singleton';

@Injectable()
export class AlbumsService {

  public async getAll() {
    const albums = await prisma.album.findMany();
    return albums;
  }

  public async getById(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid album ID", 400);
    }
    const album = await prisma.album.findUnique({
      where: { id: id }
    });
    if (!album) {
      throw new CustomError("Album not found", 404);
    }
    return album;
  }

  public async create(album: CreateAlbumDto) {
    const id = Album.generateId();
    return await prisma.album.create({
      data: {
        id: id,
        name: album.name,
        year: album.year,
        artistId: album.artistId
      }
    });
  }

  public async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid album ID", 400);
    }
    const album = await prisma.album.update({
      data: {
        ...updateAlbumDto
      },
      where: { id: id }
    });
    return album;
  }

  public async delete(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid album ID", 400);
    }
    await prisma.album.delete({
      where: { id: id }
    }).catch(() => {
      throw new CustomError("Album not found", 404);
    });
  }

}