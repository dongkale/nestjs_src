import {
  Controller,
  Inject,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DeleteTodoInboundPortInputDto,
  IDeleteTodoInboundPort,
} from '@/todo/inbound-port/delete-todo.inbound-port.interface';
import { ResponseEntity } from '@/libs/response/response.entity';

@ApiTags('Todo API')
@Controller()
export class DeleteTodoController {
  private readonly logger = new Logger(DeleteTodoController.name);

  constructor(
    @Inject(IDeleteTodoInboundPort)
    private readonly deleteTodoInboundPort: IDeleteTodoInboundPort,
  ) {}

  @ApiOperation({ summary: 'Delete Todo', description: 'Todo를 삭제한다.' })
  @ApiResponse({
    status: 200,
    description: '삭제된 Todo 정보',
    type: ResponseEntity,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/todo')
  async handle(@Body() deleteTodo: DeleteTodoInboundPortInputDto) {
    const result = await this.deleteTodoInboundPort.execute(deleteTodo);

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    // return result;
    return ResponseEntity.Ok(result);
  }
}
