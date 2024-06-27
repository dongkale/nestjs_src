import {
  Controller,
  Get,
  Inject,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindTodosInboundPortOutputDto,
  IFindTodosInboundPort,
} from '@/todo/inbound-port/find-todos.inbound-port.interface';
import { ResponseEntity } from '@/libs/response/response.entity';

@ApiTags('Todo API')
@Controller()
export class GetTodosController {
  private readonly logger = new Logger(GetTodosController.name);
  constructor(
    @Inject(IFindTodosInboundPort) //modules에서 지정한 토큰
    private readonly findTodosInboundPort: IFindTodosInboundPort,
  ) {}

  @ApiOperation({
    summary: 'Get All Todo',
    description: '모든 Todo를 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: '모든 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/todos')
  async handle() {
    const result = await this.findTodosInboundPort.execute();

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    return ResponseEntity.Ok<FindTodosInboundPortOutputDto[]>(result);
    // return result;
  }
}
