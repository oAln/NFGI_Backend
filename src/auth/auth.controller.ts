import { Controller, Post, Body, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@ApiBearerAuth('JWT-auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 201, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    console.log("login....",loginDto);
    
    return this.authService.login(loginDto.loginId, loginDto.password);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: ResetPasswordDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('token/admin')
  @ApiOperation({ summary: 'Get admin token for testing' })
  @ApiResponse({ status: 200, description: 'Admin token generated successfully.' })
  async getAdminToken() {
    return this.authService.getAdminToken();
  }

  @Get('token/member')
  @ApiOperation({ summary: 'Get member token for testing' })
  @ApiResponse({ status: 200, description: 'Member token generated successfully.' })
  async getMemberToken() {
    return this.authService.getMemberToken();
  }
}
