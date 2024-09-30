import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { S3Service } from 'src/aws/services/s3.service';

@Injectable()
export class FilesService {
    constructor(private readonly filesRepository:FilesRepository,private readonly s3Service:S3Service){}
    async uploadFile(file:Express.Multer.File){
        console.log(file , 'file')
        // [Album
          // {
          //     fieldname: 'album',
          //     originalname: 'Screenshot 2024-08-22 175225.png',
          //     encoding: '7bit',
          //     mimetype: 'image/png',
          //     buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 ac 00 00 01 4a 08 06 00 00 00 19 b9 d2 f2 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 51764 more bytes>,
          //     size: 51814
          // }
        // ] file

        //{
        //   fieldname: 'cover',
        //   originalname: 'Screenshot 2024-08-22 175225.png',
        //   encoding: '7bit',
        //   mimetype: 'image/png',
        //   buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 ac 00 00 01 4a 08 06 00 00 00 19 b9 d2 f2 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 51764 more bytes>,
        //   size: 51814
        // } file

        const fileName = file.originalname?.split(".").slice(0,-1).join(".")

        //undefined fileName

        console.log(fileName, "fileName")

        const result = await this.s3Service.upload(file,file.originalname)
        console.log(result, "originalnameresult")

        const savedFile = await this.filesRepository.save(fileName,result.Location,result.Key,result.Bucket)

        return savedFile
    }

    async getFile(fileId:number){
        const file = await this.filesRepository.findOne(fileId)
        const protectedUrl = await this.s3Service.getPresignedUrl(file.key,file.bucket)

        return file
    }
}
