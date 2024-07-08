import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './music/entities/music.entity';
import { MusicModule } from './music/music.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    port: 3306,
    host: 'localhost',
    username: 'root',
    password: '123456',
    database: 'muse-back',
    autoLoadEntities: true,
    synchronize: true,
    type: 'mysql'
  }), MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
