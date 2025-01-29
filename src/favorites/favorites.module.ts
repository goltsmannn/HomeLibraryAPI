import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  providers: [FavoritesService, TracksService, AlbumsService, ArtistsService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
