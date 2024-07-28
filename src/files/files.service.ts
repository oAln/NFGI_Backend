// src/files/files.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Member } from '../member/entities/member.entity';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>
  ) {}

  async create(createFileDto: CreateFileDto, filePath: string): Promise<File> {
    const member = await this.membersRepository.findOneBy({ memberId: createFileDto.memberId });
    if (!member) {
      throw new Error('Member not found');
    }

    const file = this.filesRepository.create({
      documentType: createFileDto.documentType,
      documentPath: filePath,
      member,
    });

    return this.filesRepository.save(file);
  }

  async bulkCreate(memberId: string, collections: { dto: CreateFileDto, path: string,originalName:string,fileName:string }[], disbursements: { dto: CreateFileDto, path: string ,originalName:string,fileName:string}[]): Promise<File[]> {
    const member = await this.membersRepository.findOneBy({  memberId });
    if (!member) {
      throw new Error('Member not found');
    }

    const files: File[] = [];

    for (const fileData of collections) {
      const file = this.filesRepository.create({
        documentType: 'collection',
        documentPath: fileData.path,
        originalName:fileData.originalName,
        fileName:fileData.originalName,
        member,
      });
      files.push(file);
    }

    for (const fileData of disbursements) {
      const file = this.filesRepository.create({
        documentType: 'disbursement',
        documentPath: fileData.path,
        originalName:fileData.originalName,
        fileName:fileData.originalName,
        member,
      });
      files.push(file);
    }

    return this.filesRepository.save(files);
  }

  async findAll(): Promise<File[]> {
    return this.filesRepository.find({ relations: ['member'] });
  }

  async verifyAndGetFile(memberId: string, fileId: number): Promise<File> {
    const file = await this.filesRepository.findOne({ where: { id: fileId, memberId } });
    if (!file) {
      throw new NotFoundException('File not found or does not belong to the member');
    }
    return file;
  }

  async getAllFilesForMember(memberId: number): Promise<File[]> {
    const member = await this.membersRepository.findOne({ where: { id: memberId }, relations: ['files'] });
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member.files;
  }
}
