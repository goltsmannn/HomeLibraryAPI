import { Injectable } from '@nestjs/common';
import { Track } from './entities/Track.entity';
import { plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { UpdateTrackDto } from './dto/UpdateTrackDto';
import { CustomError } from '../errors/CustomError';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  public getAll() {
    return plainToInstance(Track, this.tracks);
  }

  public getById(id: string) {
    console.log(id);
    if(!isUUID(id)) {
      throw new CustomError("Invalid track ID", 400);
    }
    const track = this.tracks.find(track => track.id === id);
    if (!track) {
      throw new CustomError("Track not found", 404);
    }

    return plainToInstance(Track, track);
  }

  public create(track: CreateTrackDto) {
    this.tracks.push({
      id: Track.generateId(),
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
    const track = this.tracks.find(track => track.id === id);
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
    const trackIndex = this.tracks.findIndex(track => track.id === id);
    if(trackIndex === -1) {
      throw new CustomError("Track not found", 404);
    }
    this.tracks.splice(trackIndex, 1);
  }
}
