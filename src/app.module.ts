import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, TracksModule, FavoritesModule, ArtistsModule, AlbumsModule,
 //   DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
