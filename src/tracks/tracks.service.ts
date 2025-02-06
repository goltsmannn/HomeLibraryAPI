import { Injectable } from '@nestjs/common';
import { Track } from './entities/Track.entity';
import { isUUID } from 'class-validator';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { UpdateTrackDto } from './dto/UpdateTrackDto';
import { CustomError } from '../errors/CustomError';
import prisma from '../../singleton';

@Injectable()
export class TracksService {

  public async getAll() {
    const tracks = await prisma.track.findMany();
    return tracks;
  }

  public async getById(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid track ID", 400);
    }
    const track = await prisma.track.findUnique({
      where: { id: id }
    });
    if (!track) {
      throw new CustomError("Track not found", 404);
    }
    return track;
  }

  public async create(track: CreateTrackDto) {
    const id = Track.generateId();
    return await prisma.track.create({
      data: {
        id: id,
        name: track.name,
        artistId: track.artistId,
        albumId: track.albumId ?? null,
        duration: track.duration
      }
    });
  }

  public async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid track ID", 400);
    }
    const track = await prisma.track.update({
      data: {
        ...updateTrackDto
      },
      where: { id: id }
    });
    return track;
  }

  public async delete(id: string) {
    if (!isUUID(id)) {
      throw new CustomError("Invalid track ID", 400);
    }
    await prisma.track.delete({
      where: { id: id }
    }).catch(() => {
      throw new CustomError("Track not found", 404);
    });
  }

}