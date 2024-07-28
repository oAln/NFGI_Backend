import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RepaymentService } from './repayment.service';
import { CreateRepaymentDto } from './dto/create-repayment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('repayments')
@Controller('repayments')
@ApiBearerAuth('JWT-auth') 
export class RepaymentController {
  constructor(private readonly repaymentService: RepaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Record a loan repayment' })
  @ApiResponse({ status: 201, description: 'The repayment has been successfully recorded.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createRepayment(@Body() createRepaymentDto: CreateRepaymentDto) {
    return this.repaymentService.createRepayment(createRepaymentDto);
  }

  @Get(':loanId')
  @ApiOperation({ summary: 'Get all repayments for a particular loan' })
  @ApiResponse({ status: 200, description: 'Repayments retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Loan not found.' })
  getRepaymentsByLoanId(@Param('loanId') loanId: number) {  
    return this.repaymentService.getRepaymentsByLoanId(loanId);
  }
}
