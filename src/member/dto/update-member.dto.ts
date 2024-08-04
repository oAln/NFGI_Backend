import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';


export class UpdateMemberDto {
    @ApiPropertyOptional({ example: 'John', description: 'First name of the member' })
    firstName?: string;
  
    @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the member' })
    lastName?: string;

    @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the member' })
    memberRelation?: string;
  
    @ApiPropertyOptional({ example: '12345', description: 'Unique member ID' })
    memberId: string;
  
    @ApiPropertyOptional({ example: 'Male', description: 'Gender of the member' })
    gender?: string;
  
    @ApiPropertyOptional({ example: 'Engineer', description: 'Occupation of the member' })
    occupation?: string;
  
    @ApiPropertyOptional({ example: 'New York', description: 'Town or city of the member' })
    townCity?: string;

    @ApiPropertyOptional({ example: 'New York', description: 'Town or city of the member' })
    memTaluka?: string;

    @ApiPropertyOptional({ example: 'New York', description: 'Town or city of the member' })
    memAadharNO?: string;

    @ApiPropertyOptional({ example: 'New York', description: 'Town or city of the member' })
    memPanNo?: string;
  
    @ApiPropertyOptional({ example: 'Central Park', description: 'Area or landmark' })
    areaLandmark?: string;
  
    @ApiPropertyOptional({ example: '10001', description: 'Postal code of the member' })
    pinCode?: string;
  
    @ApiPropertyOptional({ example: '1234567890', description: 'Bank account number' })
    accountNo?: string;
  
    @ApiPropertyOptional({ example: 'Active', description: 'Account status' })
    accountStatus?: string;
  
    @ApiPropertyOptional({ example: '1990-01-01', description: 'Date of birth', type: 'string', format: 'date' })
    dateOfBirth?: string;
  
    @ApiPropertyOptional({ example: 'Downtown Branch', description: 'Branch of the bank' })
    branch?: string;
  
    @ApiPropertyOptional({ example: 'New York', description: 'State of residence' })
    state?: string;
  
    @ApiPropertyOptional({ example: '1234567890', description: 'Contact number' })
    contact?: string;
  
    @ApiPropertyOptional({ example: 200, description: 'Monthly installment amount' })
    installment?: number;
  
    @ApiPropertyOptional({ example: 5000, description: 'Loan amount' })
    loanAmount?: number;
  
    @ApiPropertyOptional({ example: 'John Doe', description: 'Name on bank account' })
    holderName?: string;
  
    @ApiPropertyOptional({ example: 'Bank of NY', description: 'Bank name' })
    bankName?: string;
  
    @ApiPropertyOptional({ example: 'ABCD1234', description: 'Bank IFSC code' })
    ifscCode?: string;
  
    @ApiPropertyOptional({ example: '123 Main St, New York, NY', description: 'Bank address' })
    bankAddress?: string;
  
    @ApiPropertyOptional({ example: 50000, description: 'Annual income' })
    annualIncome?: number;
  
    @ApiPropertyOptional({ example: 'Jane Doe', description: 'Guarantor name' })
    guarantorName?: string;
  
    @ApiPropertyOptional({ example: 'Doe Enterprises', description: 'Guarantor business name' })
    guarantorBusinessName?: string;
  
    @ApiPropertyOptional({ example: '9876543210', description: 'Guarantor contact number' })
    guarantorContact?: string;

    @ApiPropertyOptional({ example: '9876543210', description: 'Guarantor aadhar number' })
    guarAadharNO?: string;

    @ApiPropertyOptional({ example: '9876543210', description: 'Guarantor pan number' })
    guarPanNo?: string;
  
    documentPath?: string;

    @ApiPropertyOptional({ example: '9876543210', description: 'account id' })
  accountId?: string;

  @ApiPropertyOptional({ example: 'nominee', description: 'loan purpose' })
  loanPurpose?: string;

  @ApiPropertyOptional({ example: 'abc', description: 'nominee name' })
  nomineeName?: string;

  @ApiPropertyOptional({ example: 'abc', description: 'nominee relation' })
  nomineeRelation?: string;

  @ApiPropertyOptional({ example: 'dd-mm-yy', description: 'nominee dob' })
  nomineeDOB?: string;

  @ApiPropertyOptional({ example: '9876543210', description: 'nominee contact number' })
  nomineeContact?: string;

  @ApiPropertyOptional({ example: 'abc', description: 'nominee address' })
  nomineeAddress?: string;

  @ApiPropertyOptional({ example: 'abc', description: 'nominee city' })
  nomineeCity?: string;

  @ApiPropertyOptional({ example: 'abc', description: 'nominee district' })
  nomineeDistrict?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  loanId?: number;

  loanStartDate?: Date;
}
