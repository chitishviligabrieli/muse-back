import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from './music/music.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: 'gabr12ieli34',
      database: 'muse-back',
      autoLoadEntities: true,
      synchronize: true,
      type: 'mysql',
    }),
    ArtistModule,
    MusicModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
