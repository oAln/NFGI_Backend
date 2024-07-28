import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLoanDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  installment?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: string;
}
