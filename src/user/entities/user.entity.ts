import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  loginId: string;

  @Column()
  password: string;

  @Column({default:'user'})
  userType: string;

  @Column({nullable:true})
  lastLoginAt?: Date;
}
