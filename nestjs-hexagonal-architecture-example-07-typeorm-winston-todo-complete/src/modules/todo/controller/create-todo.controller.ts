import {
  Controller,
  Inject,
  Body,
  Logger,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateTodoInboundPortInputDto,
  ICreateTodoInboundPort,
} from '@/todo/inbound-port/create-todo.inbound-port.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '@/libs/response/response.entity';

@ApiTags('Todo API')
@Controller()
export class CreateTodoController {
  private readonly logger = new Logger(CreateTodoController.name);

  constructor(
    @Inject(ICreateTodoInboundPort)
    private readonly createTodoInboundPort: ICreateTodoInboundPort,
  ) {}

  @ApiOperation({ summary: 'Create Todo', description: 'Todo를 생성한다.' })
  @ApiResponse({
    status: 200,
    description: '생성된 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/todo')
  async handle(@Body() createTodo: CreateTodoInboundPortInputDto) {
    const result = await this.createTodoInboundPort.execute(createTodo);

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    // return result;
    return ResponseEntity.CREATED_WITH(result);
  }
}
