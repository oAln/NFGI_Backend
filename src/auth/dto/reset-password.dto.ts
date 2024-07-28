import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';


export class ResetPasswordDto {
    @ApiProperty({ example: 'user@example.com', description: 'The unique login ID of the user', required: true })
    @IsString()
    @IsNotEmpty()
    loginId: string;

    @ApiProperty({ example: 'newSecurePassword123', description: 'The new password for the user', required: true })
    @IsString()
    @IsNotEmpty()
    newPassword: string;

    @ApiProperty({ example: 'newSecurePassword123', description: 'The password of the user', required: true })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    
    @ApiProperty({ example: 'oldPassword123', description: 'The password of the user', required: true })
    @IsString()
    @IsNotEmpty()
    oldPassword: string;
}
