// src/files/dto/create-file.dto.ts
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Type of the document (collection/disbursement)' })
  documentType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ID of the associated member' })
  memberId: string;
}

export class BulkCreateFileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ID of the associated member' })
  memberId: string;
}
