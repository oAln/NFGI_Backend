import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Loan } from '../../loan/entities/loan.entity';
import { Member } from '../../member/entities/member.entity';

@Entity()
export class Repayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Loan,loan => loan.repayments,{ cascade: true, onDelete: 'CASCADE' })
  loan: Loan;

  @Column('decimal')
  amountPaid: number;

  @Column('decimal', { nullable: true })
  lateFees: number;

  @Column()
  paymentDate: Date;
}
