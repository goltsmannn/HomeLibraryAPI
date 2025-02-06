import { Inject, Injectable } from '@nestjs/common';
import { Artist } from './entities/Artist.entity';
import { plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { CustomError } from '../errors/CustomError';
import prisma from '../../singleton';


@Injectable()
export class ArtistsService {

  public async getAll() {
    const artists = await prisma.artist.findMany();
    return artists;
  }

  public async getById(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid artist ID", 400);
    }
    const artist = await prisma.artist.findUnique({
      where: {id: id}
    })
    if (!artist) {
      throw new CustomError("Artist not found", 404);
    }
    return artist;
  }

  public async create(artist: CreateArtistDto) {
    const id = Artist.generateId();
    return await prisma.artist.create({
      data: {
        id: id,
        name: artist.name,
        grammy: artist.grammy,
      }
    })
  }

  public update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid artist ID", 400);
    }
    const artist = prisma.artist.update({
      data: {
        ...updateArtistDto
      },
      where: { id: id }
    });
    return artist;
  }

  public async delete(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid artist ID", 400);
    }
    prisma.artist.delete({
      where: { id: id }
    })
      .catch( (err) => {
          throw new CustomError("Artist not found", 404);
    });
  }

}