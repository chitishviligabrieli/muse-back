import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService:FilesService){}
    @Post("upload")
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file:Express.Multer.File){   
        return this.fileService.uploadFile(file)
    }
    @Get(":id")
    getFile(@Param("id") id:number){   
        return this.fileService.getFile(id)
    }  
}


