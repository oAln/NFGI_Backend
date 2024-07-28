import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Member } from '../../member/entities/member.entity';
import { Repayment } from 'src/repayment/entities/repayment.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, member => member.loans)
  member: Member;

  @Column('decimal')
  amount: number;

  @Column()
  issuedAt: Date;

  @Column('decimal',{nullable:true})
  installment: number;

  @OneToMany(() => Repayment, repayment => repayment.loan,{ cascade: true, onDelete: 'CASCADE' })
  repayments: Repayment[];

  @Column({ nullable: true })
  status?: string;
}
