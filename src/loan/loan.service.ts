import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { Member } from '../member/entities/member.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
    const { memberId, amount, installment,status,issuedAt } = createLoanDto;
    const member = await this.memberRepository.findOneBy({memberId});
    if (!member) {
      throw new Error('Member not found');
    }

    const loan = this.loanRepository.create({
      member,
      amount,
      installment,
      status,
      issuedAt:issuedAt?new Date(issuedAt):new Date()
    });

    return this.loanRepository.save(loan);
  }

  async updateLoan(id: number, updateLoanDto: UpdateLoanDto): Promise<Loan> {
    const { amount, installment,status } = updateLoanDto;
    const loan = await this.loanRepository.findOneBy({id});

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    if (amount !== undefined) {
      loan.amount = amount;
    }

    if (status !== undefined) {
        loan.status = status;
    }

    if (installment !== undefined) {
      loan.installment = installment;
    }

    return this.loanRepository.save(loan);
  }

  async findLoansByMemberId(memberId: string): Promise<Loan[]> {
    const loans = await this.loanRepository.find({ where: { member: { memberId } }, relations: ['repayments'] });
    return loans;
  }
}
