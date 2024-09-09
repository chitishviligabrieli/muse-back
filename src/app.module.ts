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
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './auth/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: '123456',
      database: 'music-app',
      autoLoadEntities: true,
      synchronize: true,
      type: 'mysql',
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
    }),
    ArtistModule,
    MusicModule,
    AlbumModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashingService],
})
export class AppModule {}
