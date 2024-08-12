import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(loginId: string, password: string): Promise<any> {
    const user = await this.userService.findOneByLoginId(loginId);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginId: string, password: string) {
    const user = await this.validateUser(loginId, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password: userPassword, ...updatedUser } = await this.userService.updateLastLogin(user.id);
    const payload = { username: user.name, sub: user.id, role: user.userType };
    return {
      token: this.jwtService.sign(payload),
      ...updatedUser
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { loginId, newPassword, confirmPassword, oldPassword } = resetPasswordDto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const user = await this.userService.findOneByLoginId(loginId);
    if (!bcrypt.compare(oldPassword, user.password)) {
      throw new BadRequestException('old password is incorrect');
    }

    if (user) {
      user.password = await bcrypt.hash(newPassword, 10);
      await this.userService.update(user.id, user);
    }
    else {
      throw new UnauthorizedException('User not found')
    }
  }

  getAdminToken() {
    const payload = { username: 'admin', sub: 1, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getMemberToken() {
    const payload = { username: 'member', sub: 2, role: 'member' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
