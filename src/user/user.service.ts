import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, confirmPassword, ...rest } = createUserDto;
    const userCount=await this.userRepository.count({where:{loginId:createUserDto.loginId}})    
    if(userCount>0){
        throw new BadRequestException(`duplicate user loginId : ${createUserDto.loginId}`);
    }
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByLoginId(loginId: string): Promise<User> {
    return this.userRepository.findOneBy({ loginId });
  }

  async updateLastLogin(userId: number): Promise<User> {
    const updatedResult=await this.userRepository.update(userId, { lastLoginAt: new Date() });
    return this.findOne(userId)   
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async search(query: any): Promise<User[]> {
    const qb = this.userRepository.createQueryBuilder('user');
    console.log("query",query);
    
    
    if (query.loginId) {
      qb.andWhere('user.loginId LIKE :loginId', { loginId: `%${query.loginId}%` });
    }
    if (query.name) {
      qb.andWhere('user.name LIKE :name', { name: `%${query.name}%` });
    }

    return qb.getMany();
  }
}
