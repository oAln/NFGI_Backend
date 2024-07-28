// src/files/files.controller.ts
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFiles,
    Body,
    BadRequestException,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Get,
    Res,
    NotFoundException,
  } from '@nestjs/common';
  import { FileFieldsInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname, join } from 'path';
  import { FilesService } from './files.service';
  import { BulkCreateFileDto } from './dto/create-file.dto';
  import { ApiConsumes, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { Response } from 'express';
import * as archiver from 'archiver';

  
  @ApiTags('files')
  @Controller('files')
  @ApiBearerAuth('JWT-auth')
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}
  
    @Post('upload') 
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'collections', maxCount: 10 },
        { name: 'disbursements', maxCount: 10 },
      ], {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      }),
    )
    @ApiOperation({ summary: 'Upload multiple documents for a member' })
    @ApiResponse({ status: 201, description: 'Files successfully uploaded.' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'Files and metadata for bulk upload',
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          collections: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          disbursements: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          memberId: {
            type: 'string',
          },
        },
      },
    })
    async uploadFiles(
      @Body() bulkCreateFileDto: BulkCreateFileDto,
      @UploadedFiles() files: { collections?: Express.Multer.File[], disbursements?: Express.Multer.File[] },
    ) {
      console.log("files....",files);
      console.log("bulkCreateFileDto...",bulkCreateFileDto);
      
        
      const { collections, disbursements } = files;
  
      if (!collections.length && !disbursements.length) {
        throw new BadRequestException('Files are missing.');
      }
  
      const collectionsData = collections?.map((file) => ({
        dto: { documentType: 'collection', memberId: bulkCreateFileDto.memberId },
        path: file.path,
        originalName:file.originalname,
        fileName:file.filename
      }));
  
      const disbursementsData = disbursements?.map((file) => ({
        dto: { documentType: 'disbursement', memberId: bulkCreateFileDto.memberId },
        path: file.path,
        originalName:file.originalname,
        fileName:file.filename
      }));
  
      return this.filesService.bulkCreate(bulkCreateFileDto.memberId, collectionsData, disbursementsData);
    }


    @Get('download/:memberId/:fileId')
    @ApiOperation({ summary: 'Download a file if it belongs to the specified member' })
    @ApiResponse({ status: 200, description: 'File successfully downloaded.' })
    @ApiResponse({ status: 404, description: 'File not found or does not belong to the member.' })
    async downloadFile(
      @Param('memberId') memberId: string,
      @Param('fileId', ParseIntPipe) fileId: number,
      @Res() res: Response
    ) {
      try {
        const file = await this.filesService.verifyAndGetFile(memberId, fileId);
        const filePath = join(__dirname, '../../', file.documentPath);
        const fileStream = createReadStream(filePath);
        
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`)
  
        fileStream.pipe(res);
      } catch (error) {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Get('download-all/:memberId')
  @ApiOperation({ summary: 'Download all files for a member as a zip' })
  @ApiResponse({ status: 200, description: 'Files successfully downloaded.' })
  @ApiResponse({ status: 404, description: 'Member or files not found.' })
  async downloadAllFiles(
    @Param('memberId') memberId: number,
    @Res() res: Response
  ) {
    try {
      const files = await this.filesService.getAllFilesForMember(memberId);

      if (files.length === 0) {
        throw new NotFoundException('No files found for the member');
      }

      const archive = archiver('zip', {
        zlib: { level: 9 },
      });

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="member_${memberId}_files.zip"`);

      archive.on('error', (err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

      archive.pipe(res);

      for (const file of files) {
        const filePath = join(__dirname, '../../', file.documentPath);
        archive.file(filePath, { name: file.documentPath });
      }

      await archive.finalize();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  }
  