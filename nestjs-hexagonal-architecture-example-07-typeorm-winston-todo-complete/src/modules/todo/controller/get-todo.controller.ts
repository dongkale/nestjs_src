import {
  Controller,
  Inject,
  Body,
  Get,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindTodoInboundPortInputDto,
  FindTodoInboundPortOutputDto,
  IFindTodoInboundPort,
} from '@/todo/inbound-port/find-todo.inbound-port.interface';
import { ResponseEntity } from '@/libs/response/response.entity';

@ApiTags('Todo API')
@Controller()
export class GetTodoController {
  private readonly logger = new Logger(GetTodoController.name);

  constructor(
    @Inject(IFindTodoInboundPort) //modules에서 지정한 토큰
    private readonly findTodoInboundPort: IFindTodoInboundPort,
  ) {}

  @ApiOperation({
    summary: 'Get One Todo',
    description: '지정 Todo를 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: '지정 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/todo')
  async handle(@Body() findTodo: FindTodoInboundPortInputDto) {
    const result = await this.findTodoInboundPort.execute(findTodo);

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    // return result;
    return ResponseEntity.Ok<FindTodoInboundPortOutputDto>(result);
  }
}
