import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRepaymentDto {
  @ApiProperty()
  @IsNumber()
  memberId: string;

  @ApiProperty()
  @IsNumber()
  loanId: number;

  @ApiProperty()
  @IsNumber()
  amountPaid: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  lateFees?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  paymentDate?: string;
}
