import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from './music/music.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { HashingService } from './user/hashing.service';
import { ListenersModule } from './listeners/listeners.module';

@Module({
  imports: [
    Consfig
    TypeOrmModule.forRoot({
      port: 3306,
      host: 'muse-back.ct6uqg20qi89.eu-north-1.rds.amazonaws.com',
      username: 'admin',
      password: 'Gabr12ieli34',
      database: 'museBack',
      autoLoadEntities: true,
      synchronize: true,
      type: 'mysql',
    }),
    ArtistModule,
    MusicModule,
    AlbumModule,
    UserModule,
    ListenersModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashingService],
})
export class AppModule {}
