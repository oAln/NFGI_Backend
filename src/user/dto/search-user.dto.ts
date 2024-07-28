import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchUserDto{
    @ApiPropertyOptional({ example: 'John Doe', description: 'Full name of the user' })
    name: string;

    @ApiPropertyOptional({ example: 'johndoe123', description: 'Login ID for the user' })
    loginId: string;
}
