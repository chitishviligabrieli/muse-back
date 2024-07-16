import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 3306,
      host: '127.0.0.1',
      username: 'root',
      password: '123456',
      database: 'music-app',
      autoLoadEntities: true,
      synchronize: true,
      type: 'mysql'
    }),
    ArtistModule,
    MusicModule,
    SearchModule,
    // AlbumModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
