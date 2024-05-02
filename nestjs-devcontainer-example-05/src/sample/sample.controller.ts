import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  create(@Body() createSampleDto: CreateSampleDto) {      
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  findAll() {
    return this.sampleService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.sampleService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.update(name, updateSampleDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.sampleService.remove(name);
  }
}
