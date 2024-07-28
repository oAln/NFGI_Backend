import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLoanDto {
  @ApiProperty()
  @IsNumber()
  memberId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  installment: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  issuedAt?: string;
}
