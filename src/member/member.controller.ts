import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SearchMemberDto } from './dto/search-member.dto';
import { v4 as uuidv4 } from 'uuid';



class CreateMemberDtoSwagger extends CreateMemberDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Upload document' })
  document: any;
}

@ApiTags('member')
@Controller('member')
@ApiBearerAuth('JWT-auth')
@UseGuards(RolesGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post()
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({ status: 201, description: 'Member successfully created.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateMemberDtoSwagger })
  create(
    @Body() createMemberDto: CreateMemberDto,
    @UploadedFile() document: Express.Multer.File,
  ) {
    if (document) {
      createMemberDto.documentPath = document.path;
    }

    // if(createMemberDto.loanAmount){
    //   createMemberDto.loanId=uuidv4()
    //   createMemberDto.loanStartDate=new Date()
    // }    
    return this.memberService.create(createMemberDto, document);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all members' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all members.' })
  findAll() {
    return this.memberService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search members based on query parameters' })
  @ApiQuery({ name: 'query', type: SearchMemberDto, required: false, description: 'Query parameters for searching members' })
  @ApiResponse({ status: 200, description: 'Search results returned' })
  search(@Query() query: any) {
    return this.memberService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the member to retrieve' })
  @ApiResponse({ status: 200, description: 'Member found' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Update a member' })
  @ApiParam({ name: 'id', description: 'The ID of the member to update' })
  @ApiResponse({ status: 200, description: 'Member updated successfully' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateMemberDto, description: 'Fields to update' })
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto, @UploadedFile() document: Express.Multer.File) {
    if (document) {
      updateMemberDto.documentPath = document.path;
    }
    return this.memberService.update(+id, updateMemberDto, document);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a member' })
  @ApiParam({ name: 'id', description: 'The ID of the member to delete' })
  @ApiResponse({ status: 200, description: 'Member deleted successfully' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
