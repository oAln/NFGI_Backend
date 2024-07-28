import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto{
    @ApiPropertyOptional({ example: 'John Doe', description: 'Full name of the user' })
    name: string;

    @ApiPropertyOptional({ example: 'user', description: 'user type'})
    userType?: string;
}
