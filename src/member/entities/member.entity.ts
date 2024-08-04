import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { Loan } from 'src/loan/entities/loan.entity';
import { Repayment } from 'src/repayment/entities/repayment.entity';


@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  firstName?: string;

  @Column({nullable:true})
  lastName?: string;

  @Column({nullable:true})
  memberRelation?: string;

  @Column({nullable:true})
  memTaluka?: string;

  @Column({nullable:true})
  memAadharNO?: string;

  @Column({nullable:true})
  memPanNo?: string;

  @Column({ unique: true })
  memberId: string;

  @Column({nullable:true})
  gender?: string;

  @Column({nullable:true})
  occupation?: string;

  @Column({nullable:true})
  townCity?: string;

  @Column({nullable:true})
  areaLandmark?: string;

  @Column({nullable:true})
  pinCode?: string;

  @Column({nullable:true})
  accountNo?: string;

  @Column({nullable:true})
  accountStatus?: string;

  @Column({nullable:true})
  dateOfBirth?: string;

  @Column({nullable:true})
  branch?: string;

  @Column({nullable:true})
  state?: string;

  @Column({nullable:true})
  contact?: string;

  @Column({nullable:true})
  installment?: number;

  @Column({nullable:true})
  loanAmount?: number;

  @Column({nullable:true})
  holderName?: string;

  @Column({nullable:true})
  bankName?: string;

  @Column({nullable:true})
  ifscCode?: string;

  @Column({nullable:true})
  bankAddress?: string;

  @Column({nullable:true})
  annualIncome?: number;

  @Column({nullable:true})
  guarantorName?: string;

  @Column({nullable:true})
  guarantorBusinessName?: string;

  @Column({nullable:true})
  guarantorContact?: string;

  @Column({nullable:true})
  guarAadharNO?: string;

  @Column({nullable:true})
  guarPanNo?: string;

  @Column({ nullable: true })
  documentPath?: string;

  @Column({ nullable: true })
  accountId?: string;

  @Column({ nullable: true })
  loanPurpose?: string;

  @Column({ nullable: true })
  nomineeName?: string;

  @Column({ nullable: true })
  nomineeRelation?: string;

  @Column({ nullable: true })
  nomineeDOB?: string;

  @Column({ nullable: true })
  nomineeContact?: string;

  @Column({ nullable: true })
  nomineeAddress?: string;

  @Column({ nullable: true })
  nomineeCity?: string;

  @Column({ nullable: true })
  nomineeDistrict?: string;

  @Column({ nullable: true })
  loanStartDate?: Date;
  
  @OneToMany(() => File, file => file.member, { cascade: true, onDelete: 'CASCADE' }) // Set cascade and onDelete options
  files: File[];

  @OneToMany(() => Loan, loan => loan.member,{ cascade: true, onDelete: 'CASCADE' })
  loans: Loan[];
}
