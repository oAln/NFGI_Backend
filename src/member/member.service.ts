import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { File } from '../files/entities/file.entity';
import { LoanService } from 'src/loan/loan.service';


@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private loanService: LoanService
  ) {}

  async create(createMemberDto: CreateMemberDto,document?:Express.Multer.File): Promise<Member> {
    const memberCount=await this.memberRepository.count({where:{memberId:createMemberDto.memberId}})    
    if(memberCount>0){
        throw new BadRequestException(`duplicate member id : ${createMemberDto.memberId}`);
    }
    const member = this.memberRepository.create(createMemberDto);
    const savedMember= await this.memberRepository.save(member)
    console.log("member...",savedMember,document);
    
    if (createMemberDto?.documentPath) {
      const file = this.filesRepository.create({
        documentType: 'initial', // You can change this as per your requirement
        documentPath: createMemberDto?.documentPath,
        originalName:document.originalname,
        fileName:document.filename,
        member:savedMember,
        memberId: savedMember.id.toString(),
      });
      await this.filesRepository.save(file);
    }
    if (createMemberDto.loanAmount) {
      await this.loanService.createLoan({ memberId: savedMember.memberId, amount:createMemberDto.loanAmount,installment: createMemberDto.installment ,status:"Active"});
    }
    return savedMember;
  }

  findAll(): Promise<Member[]> {
    return this.memberRepository.find({relations: ['files','loans','loans.repayments']});
  }

  findOne(id: number): Promise<Member> {
    return this.memberRepository.findOne({where:{ id },relations:['files','loans','loans.repayments']});
  }

  async update(id: number, updateMemberDto: UpdateMemberDto,document?:Express.Multer.File): Promise<Member> {
    const savedMember=await this.memberRepository.update(id, updateMemberDto);
    const updatedMember=await this.memberRepository.findOneBy({ id })
    if (updateMemberDto?.documentPath) {
      const file = this.filesRepository.create({
        documentType: 'initial', // You can change this as per your requirement
        documentPath: updateMemberDto?.documentPath,
        originalName:document.originalname,
        fileName:document.filename,
        member:updatedMember,
        memberId: id.toString(),
      });
      await this.filesRepository.save(file);
    }

    if (updateMemberDto?.loanId) {
      // Update existing loan
      await this.loanService.updateLoan(updateMemberDto.loanId, {
        amount: updateMemberDto.loanAmount,
        installment: updateMemberDto.installment,
        status:"Active"
      });
    } else if (updateMemberDto?.loanAmount) {
      // Create new loan
      await this.loanService.createLoan({
        memberId: updateMemberDto.memberId,
        amount: updateMemberDto.loanAmount,
        installment: updateMemberDto.installment,
        status:"Active"
      });
    }
    return updatedMember;
  }

  async remove(id: number): Promise<void> {
    console.log('delete id', id);
    console.log('this.memberRepository', this.memberRepository);
    
    
    await this.filesRepository.delete({ memberId: id.toString() });

    await this.memberRepository.delete(id);
  }

  async search(query: any): Promise<Member[]> {
    const qb = this.memberRepository.createQueryBuilder('member');    
    Object.keys(query).forEach((key) => {
      qb.andWhere(`member.${key} LIKE :${key}`, { [key]: `%${query[key]}%` });
    });

    return qb.getMany();
  }
}
