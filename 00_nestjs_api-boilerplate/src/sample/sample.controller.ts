import {
  Controller,
  Get,
  Post,
  Logger,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { SampleService } from './sample.service';
// import { Sample } from './sample.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateSampleDto,
  UpdateSampleDto,
  ResponseSampleDto,
} from './dto/sample.dto';
// import { ApiCommonResponse } from 'src/common/response/common-response';
// import { CommonResponse } from '../common/response/api-custom-response';
// import { ResponseDto } from 'src/common/response/response.dto';
// import { ApiCommonResponse } from 'src/common/response/common-response';
// import { Sample } from './sample.entity';
import { makeSuccessApiCommonResponse } from 'src/common/response/common-response.dto';
import { ApiOkCustomResponse } from 'src/common/response/custom-response';

@Controller('sample')
@ApiTags('샘플 API')
export class SampleController {
  private readonly logger = new Logger(SampleController.name);

  constructor(private sampleService: SampleService) {}

  // @ApiOperation({
  //   summary: '데이터 리스트 요청2 API',
  //   description: '데이터 리스트 요청한다.2',
  // })
  // @ApiOkCustomResponse(ResponseSampleDto)
  // @Get('/findAll2')
  // async findAll2() {
  //   const findAll = await this.sampleService.findAll();

  //   return {
  //     result_code: 0,
  //     result_message: '',
  //     data: findAll,
  //   };
  // }

  @ApiOperation({
    summary: '데이터 리스트 요청 API',
    description: '데이터 리스트 요청한다.',
  })
  // @ApiResponse({
  //   description: '데이터 리스트',
  //   isArray: true,
  //   type: ResponseDto<SampleResponse>,
  //   status: 200,
  // })
  // @ApiExtraModels(ResponseSampleDto)
  // @ApiCommonResponse({
  //   $ref: getSchemaPath(ResponseSampleDto),
  // })
  @ApiOkCustomResponse(ResponseSampleDto)
  @Get()
  async findAll() {
    const findAll = await this.sampleService.findAll();

    // return {
    //   result_code: ApiCommonResponseDto.SUCCESS_CODE,
    //   result_message: ApiCommonResponseDto.SUCCESS_STRING,
    //   result_data: findAll,
    // };

    return makeSuccessApiCommonResponse(findAll);
  }

  @ApiOperation({
    summary: '지정 id 데이터 요청 API',
    description: '지정 id 데이터를 요청한다.',
  })
  // @ApiExtraModels(ResponseSampleDto)
  // @ApiCommonResponse({
  //   $ref: getSchemaPath(ResponseSampleDto),
  // })
  @ApiOkCustomResponse(ResponseSampleDto)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const find = await this.sampleService.findOne(id);

    // return {
    //   result_code: ApiCommonResponseDto.SUCCESS_CODE,
    //   result_message: ApiCommonResponseDto.SUCCESS_STRING,
    //   result_data: find,
    // };

    return makeSuccessApiCommonResponse(find);
  }

  @ApiOperation({
    summary: '지정 데이터 생성 API',
    description: '지정 데이터를 생성한다.',
  })
  // @ApiResponse({
  //   description: '데이터 생성',
  //   type: Sample,
  // })
  // @ApiCommonResponse({
  //   properties: {
  //     userId: {
  //       type: 'string',
  //       description: '생성된 user Id',
  //     },
  //   },
  // })
  @ApiOkCustomResponse(ResponseSampleDto)
  @Post()
  async create(@Body() createSample: CreateSampleDto) {
    const create = await this.sampleService.create(createSample);

    // return {
    //   result_code: ApiCommonResponseDto.SUCCESS_CODE,
    //   result_message: ApiCommonResponseDto.SUCCESS_STRING,
    //   result_data: create,
    // };

    return makeSuccessApiCommonResponse(create);
  }

  @ApiOperation({
    summary: '지정 데이터 삭제 API',
    description: '지정 데이터를 삭제한다.',
  })
  @ApiOkCustomResponse(ResponseSampleDto)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const remove = await this.sampleService.remove(id);

    // return new ApiCommonResponseDto<Sample>(0, 'Success', remove);
    // return {
    //   result_code: ApiCommonResponseDto.SUCCESS_CODE,
    //   result_message: ApiCommonResponseDto.SUCCESS_STRING,
    //   result_data: remove,
    // };

    return makeSuccessApiCommonResponse(remove);
  }

  @ApiOperation({
    summary: '지정 데이터 수정 API',
    description: '지정 데이터를 수정한다.',
  })
  @ApiOkCustomResponse(ResponseSampleDto)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateSample: UpdateSampleDto) {
    const update = await this.sampleService.update(id, updateSample);

    // return {
    //   result_code: ApiCommonResponseDto.SUCCESS_CODE,
    //   result_message: ApiCommonResponseDto.SUCCESS_STRING,
    //   result_data: update,
    // };

    return makeSuccessApiCommonResponse(update);
  }
}
