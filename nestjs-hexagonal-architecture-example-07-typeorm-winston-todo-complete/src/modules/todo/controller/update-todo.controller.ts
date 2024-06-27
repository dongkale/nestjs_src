import {
  Controller,
  Inject,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  UpdateTodoInboundPortInputDto,
  IUpdateTodoInboundPort,
} from '@/todo/inbound-port/update-todo.inbound-port.interface';
import { ResponseEntity } from '@/libs/response/response.entity';

@ApiTags('Todo API')
@Controller()
export class UpdateTodoController {
  private readonly logger = new Logger(UpdateTodoController.name);

  constructor(
    @Inject(IUpdateTodoInboundPort)
    private readonly updateTodoInboundPort: IUpdateTodoInboundPort,
  ) {}

  @ApiOperation({ summary: 'Update Todo', description: 'Todo를 수정한다.' })
  @ApiResponse({
    status: 200,
    description: '수정된 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.CREATED)
  @Patch('/todo')
  async handle(@Body() updateTodo: UpdateTodoInboundPortInputDto) {
    const result = await this.updateTodoInboundPort.execute(updateTodo);

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    // return result;
    return ResponseEntity.Ok(result);
  }
}
