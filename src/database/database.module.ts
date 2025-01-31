import { Module } from '@nestjs/common';
import { Track } from '../tracks/entities/Track.entity';
import { Artist } from '../artists/entities/Artist.entity';
import { Album } from '../albums/entities/Album.entity';


const trackDB = {
  provide: 'TRACK_DATABASE',
  useValue: new Map<string, Track>()
}

const artistDB = {
  provide: 'ARTIST_DATABASE',
  useValue: new Map<string, Artist>()
}

const albumDB = {
  provide: 'ALBUM_DATABASE',
  useValue: new Map<string, Album>()
}

@Module({
  providers: [trackDB, artistDB, albumDB],
  exports: [trackDB, artistDB, albumDB]
})
export class DatabaseModule {}
