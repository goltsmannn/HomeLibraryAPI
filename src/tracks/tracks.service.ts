import { Inject, Injectable } from '@nestjs/common';
import { Track } from './entities/Track.entity';
import { plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { UpdateTrackDto } from './dto/UpdateTrackDto';
import { CustomError } from '../errors/CustomError';

@Injectable()
export class TracksService {
  constructor(@Inject("TRACK_DATABASE") private tracks: Map<string, Track>) {}


  public getAll() {
    return plainToInstance(Track, Array.from(this.tracks.values()));
  }

  public getById(id: string) {
    console.log(id);
    if(!isUUID(id)) {
      throw new CustomError("Invalid track ID", 400);
    }
    const track = this.tracks.get(id);
    if (!track) {
      throw new CustomError("Track not found", 404);
    }

    return plainToInstance(Track, track);
  }

  public create(track: CreateTrackDto) {
    const id = Track.generateId();

    this.tracks.set(id, {
      id: id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    });
  }

  public update(id: string, updateTrackDto: UpdateTrackDto) {
    if (isUUID(updateTrackDto['id'])) {
      throw new CustomError("Invalid track ID", 400);
    }
    const track = this.tracks.get(id);
    if(!track) {
      throw new CustomError("Track not found", 404);
    }
    Object.assign(track, updateTrackDto);
    return track;
  }

  public delete(id: string) {
    if(!isUUID(id)) {
      throw new CustomError("Invalid track ID", 400);
    }
    const removed = this.tracks.delete(id);
    if(!removed) {
      throw new CustomError("Track not found", 404);
    }
  }
}
