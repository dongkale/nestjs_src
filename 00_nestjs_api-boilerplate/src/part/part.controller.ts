import {
  Controller,
  Get,
  Post,
  Logger,
  Param,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PartService } from './part.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Part } from './part.entity';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreatePartDto, UpdatePartDto, ResponsePartDto } from './dto/part.dto';
import { CustomResponseDto } from '../common/response/custom-response.dto';
import { ApiOkCustomResponse } from '../common/response/custom-response';
import { AuthGuard } from '@nestjs/passport';

@ApiSecurity('X-API-KEY')
@Controller('part')
@ApiTags('Part API')
export class PartController {
  private readonly logger = new Logger(PartController.name);

  constructor(private partService: PartService) {}

  // @ApiOkCustomResponse(ResponsePartDto)
  // @Get('/findAll2')
  // async findAll2() {
  //   const findAll = await this.partService.findAll();

  //   return {
  //     resultCode: 0,
  //     resultMessage: '',
  //     data: findAll,
  //   };
  // }

  @ApiOperation({
    summary: '데이터 리스트 요청 API',
    description: '데이터 리스트 요청한다.',
  })
  // @ApiExtraModels(ResponsePartDto)
  // @ApiCommonResponse({
  //   $ref: getSchemaPath(ResponsePartDto),
  // })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Get()
  async findAll() {
    const findAll = await this.partService.findAll();

    return {
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: findAll,
    };

    // return makeSuccessCustomResponseDto(findAll);
  }

  @ApiOperation({
    summary: '지정 id 데이터 요청 API',
    description: '지정 id 데이터를 요청한다.',
  })
  // @ApiExtraModels(ResponsePartDto)
  // @ApiCommonResponse({
  //   $ref: getSchemaPath(ResponsePartDto),
  // })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const find = await this.partService.findOne(id);

    return {
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: find ? [find] : [],
    };

    // return makeSuccessCustomResponseDto(find ? [find] : []);
  }

  @ApiOperation({
    summary: '지정 데이터 생성 API',
    description: '지정 데이터를 생성한다.',
  })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Post()
  async create(@Body() createPart: CreatePartDto) {
    const create = await this.partService.create(createPart);

    return {
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: create,
    };

    // return makeSuccessCustomResponseDto(create);
  }

  @ApiOperation({
    summary: '지정 데이터 삭제 API',
    description: '지정 데이터를 삭제한다.',
  })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const remove = await this.partService.remove(id);

    return {
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: remove,
    };

    // return makeSuccessCustomResponseDto(remove);
  }

  @ApiOperation({
    summary: '지정 데이터 수정 API',
    description: '지정 데이터를 수정한다.',
  })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePart: UpdatePartDto) {
    const update = await this.partService.update(id, updatePart);

    return {
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: update,
    };

    // return makeSuccessCustomResponseDto(update);
  }
}
