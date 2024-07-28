// src/files/entities/file.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from '../../member/entities/member.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentType: string;

  @Column()
  documentPath: string;

  @ManyToOne(() => Member, member => member.files)
  member: Member;

  @Column()
  memberId: string;

  @Column()
  fileName: string;

  @Column()
  originalName: string
}
