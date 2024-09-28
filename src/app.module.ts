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
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './auth/constants';
import { FilesModule } from './files/files.module';
import { AwsModule } from './aws/aws.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';
import { PlaylistModule } from './playlist/playlist.module';
import { PlaylistEntity } from './playlist/entities/playlist.entity';
import { MusicEntity } from './music/entities/music.entity';
import { FavoritesModule } from './favorites/favorites.module';
import { SearchModule } from './search/search.module';


@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      port: Number(process.env.DATABASE_PORT),
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      type: 'mysql',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    ArtistModule,
    MusicModule,
    AlbumModule,
    UserModule,
    ListenersModule,
    AuthModule,
    FilesModule,
    AwsModule,
    PlaylistModule,
    FavoritesModule,
    // SearchModule
  ],
  controllers: [AppController],
  providers: [HashingService, AppService,
    {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }
  ],
})
export class AppModule {}
