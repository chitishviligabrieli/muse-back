import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { ArtistRepository } from './artist/artist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
