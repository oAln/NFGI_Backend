import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repayment } from './entities/repayment.entity';
import { RepaymentService } from './repayment.service';
import { RepaymentController } from './repayment.controller';
import { Loan } from '../loan/entities/loan.entity';
import { Member } from '../member/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repayment, Loan, Member])],
  providers: [RepaymentService],
  controllers: [RepaymentController],
})
export class RepaymentModule {}
