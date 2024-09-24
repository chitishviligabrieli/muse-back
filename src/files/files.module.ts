import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { FilesRepository } from './files.repository';
import { S3Service } from 'src/aws/services/s3.service';

@Module({
  imports:[TypeOrmModule.forFeature([FileEntity])],
  controllers: [FilesController],
  providers: [FilesService,FilesRepository,S3Service],
  exports: [FilesRepository, S3Service, FilesService]
})
export class FilesModule {}
