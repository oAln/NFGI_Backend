import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repayment } from './entities/repayment.entity';
import { Loan } from '../loan/entities/loan.entity';
import { Member } from '../member/entities/member.entity';
import { CreateRepaymentDto } from './dto/create-repayment.dto';

@Injectable()
export class RepaymentService {
  constructor(
    @InjectRepository(Repayment)
    private repaymentRepository: Repository<Repayment>,
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async createRepayment(createRepaymentDto: CreateRepaymentDto): Promise<Repayment> {
    const { memberId, loanId, amountPaid, lateFees,status,paymentDate } = createRepaymentDto;

    const member = await this.memberRepository.findOne({where:{memberId}});
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const loan = await this.loanRepository.findOne({where:{id:loanId}});
    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    if(status){
        loan.status=status
        await this.loanRepository.save(loan);
    }

    const repayment = this.repaymentRepository.create({
      loan,
      amountPaid,
      lateFees: lateFees || null,
      paymentDate: paymentDate?new Date(paymentDate) : new Date()
    });

    return this.repaymentRepository.save(repayment);
  }

  async getRepaymentsByLoanId(loanId: number): Promise<Repayment[]> {
    const loan = await this.loanRepository.findOne({where:{id:loanId}});
    console.log("loan............",loan);
    
    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    return this.repaymentRepository.find({ where: { loan:{id:loanId} } });
  }
}
