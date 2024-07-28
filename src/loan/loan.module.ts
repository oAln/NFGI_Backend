import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { Member } from '../member/entities/member.entity';
import { Repayment } from 'src/repayment/entities/repayment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, Member,Repayment])],
  providers: [LoanService],
  controllers: [LoanController],
})
export class LoanModule {}
