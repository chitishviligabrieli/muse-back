import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from './music/music.module';
import { AlbumModule } from './album/album.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { HashingService } from './user/hashing.service';

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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashingService],
})
export class AppModule {}
