import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: 'public/storage/image'
    })
  }))
  @Post('upload')
  async local(@UploadedFile() file:Express.Multer.File){
    return {
      statusCode: 200,
      data: file.path
    }
  }
}
