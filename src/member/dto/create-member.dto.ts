import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({ example: 'John', description: 'First name of the member' })
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the member' })
  lastName?: string;

  @ApiProperty({ example: 'Doe', description: 'Son or Wife of member' })
  memberRelation?: string;

  @ApiProperty({ example: '12345', description: 'Unique member ID' })
  memberId: string;

  @ApiProperty({ example: 'Male', description: 'Gender of the member' })
  gender?: string;

  @ApiProperty({ example: 'Engineer', description: 'Occupation of the member' })
  occupation?: string;

  @ApiProperty({ example: 'New York', description: 'Town or city of the member' })
  townCity?: string;

  @ApiProperty({ example: 'New York', description: 'Taluka of the member' })
  memTaluka?: string;

  @ApiProperty({ example: '12345', description: 'Aadhar of the member' })
  memAadharNO?: string;

  @ApiProperty({ example: 'CECQQ2131W', description: 'Pan of the member' })
  memPanNo?: string;

  @ApiProperty({ example: 'Central Park', description: 'Area or landmark' })
  areaLandmark?: string;

  @ApiProperty({ example: '10001', description: 'Postal code of the member' })
  pinCode?: string;

  @ApiProperty({ example: '1234567890', description: 'Bank account number' })
  accountNo?: string;

  @ApiProperty({ example: 'Active', description: 'Account status' })
  accountStatus?: string;

  @ApiProperty({ example: '1990-01-01', description: 'Date of birth', type: 'string', format: 'date' })
  dateOfBirth?: string;

  @ApiProperty({ example: 'Downtown Branch', description: 'Branch of the bank' })
  branch?: string;

  @ApiProperty({ example: 'New York', description: 'State of residence' })
  state?: string;

  @ApiProperty({ example: '1234567890', description: 'Contact number' })
  contact?: string;

  @ApiProperty({ example: 200, description: 'Monthly installment amount' })
  installment?: number;

  @ApiProperty({ example: 5000, description: 'Loan amount' })
  loanAmount?: number;

  @ApiProperty({ example: 'John Doe', description: 'Name on bank account' })
  holderName?: string;

  @ApiProperty({ example: 'Bank of NY', description: 'Bank name' })
  bankName?: string;

  @ApiProperty({ example: 'ABCD1234', description: 'Bank IFSC code' })
  ifscCode?: string;

  @ApiProperty({ example: '123 Main St, New York, NY', description: 'Bank address' })
  bankAddress?: string;

  @ApiProperty({ example: 50000, description: 'Annual income' })
  annualIncome?: number;

  @ApiProperty({ example: 'Jane Doe', description: 'Guarantor name' })
  guarantorName?: string;

  @ApiProperty({ example: 'Doe Enterprises', description: 'Guarantor business name' })
  guarantorBusinessName?: string;

  @ApiProperty({ example: '9876543210', description: 'Guarantor contact number' })
  guarantorContact?: string;

  @ApiProperty({ example: '9876543210', description: 'Guarantor aadhar number' })
  guarAadharNO?: string;

  @ApiProperty({ example: 'CDH6543210', description: 'Guarantor pan number' })
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

  loanStartDate?: Date;
}
