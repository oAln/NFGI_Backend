import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateLoanDto } from './dto/update-loan.dto';

@ApiTags('loans')
@Controller('loans')
@ApiBearerAuth('JWT-auth') 
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a loan for a member' })
  @ApiResponse({ status: 201, description: 'The loan has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createLoan(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.createLoan(createLoanDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing loan' })
  @ApiResponse({ status: 200, description: 'The loan has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Loan not found.' })
  updateLoan(@Param('id') id: number, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.updateLoan(id, updateLoanDto);
  }

  @Get('member/:memberId')
  @ApiOperation({ summary: 'Get all loans of a particular member' })
  @ApiResponse({ status: 200, description: 'Loans retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Member not found.' })
  findLoansByMemberId(@Param('memberId') memberId: string) {
    return this.loanService.findLoansByMemberId(memberId);
  }
}
