import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'user@example.com', description: 'The unique login ID of the user', required: true })
    loginId: string;

    @ApiProperty({ example: 'securePassword123', description: 'The password of the user', required: true })
    password: string;
}
