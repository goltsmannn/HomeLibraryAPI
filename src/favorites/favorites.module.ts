import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { DatabaseModule } from '../database/database.module';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [DatabaseModule],
  providers: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
