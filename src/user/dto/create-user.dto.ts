import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
    name: string;

    @ApiProperty({ example: 'johndoe123', description: 'Login ID for the user' })
    loginId: string;

    @ApiProperty({ example: 'password123', description: 'Password for the user', writeOnly: true })
    password: string;

    @ApiProperty({ example: 'password123', description: 'Confirmation of the password', writeOnly: true })
    confirmPassword: string;

    @ApiPropertyOptional({ example: 'user', description: 'user type'})
    userType?: string;
}
