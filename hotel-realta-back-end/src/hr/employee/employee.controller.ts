import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { diskStorage } from 'multer';
import { join, parse } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: 'uploads/image/human_resource',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const extte = parse(file.originalname).ext;
    // cb(null, 'photo1.jpg');
    cb(null, file.fieldname + '-' + uniqueSuffix + extte);
  },
});

@Controller('hr/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    createEmployeeDto.shift_id = JSON.parse(
      createEmployeeDto.shift_id as string,
    );

    if (file) {
      return this.employeeService.create(createEmployeeDto, file);
    }
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('shift')
  getShift(@Query('search') search: string) {
    return this.employeeService.findShift(search);
  }
  @Get('shift/:id')
  OneShift(@Param('id') id: number) {
    return this.employeeService.shiftById(id);
  }

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('entry') entry: number,
    @Query('status') status: string,
  ) {
    return this.employeeService.findAll(page, entry, search, status);
  }

  @Get('job_role')
  allJobRole() {
    return this.employeeService.findJobRole();
  }
  @Get('department')
  allDepartment() {
    return this.employeeService.findDepartment();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    if (file) {
      return this.employeeService.update(+id, updateEmployeeDto, file.filename);
    }
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
