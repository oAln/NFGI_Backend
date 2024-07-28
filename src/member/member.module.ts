import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { MemberController } from './member.controller';
import { File } from '../files/entities/file.entity';
import { Loan } from 'src/loan/entities/loan.entity';
import { LoanService } from 'src/loan/loan.service';
import { Repayment } from 'src/repayment/entities/repayment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Member,File,Loan,Repayment])],
  providers: [MemberService,LoanService],
  controllers: [MemberController],
  exports: [MemberService],
})
export class MemberModule {}
