import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  //imports: [DatabaseModule],
  providers: [ArtistsService],
  controllers: [ArtistsController]
})
export class ArtistsModule {}
