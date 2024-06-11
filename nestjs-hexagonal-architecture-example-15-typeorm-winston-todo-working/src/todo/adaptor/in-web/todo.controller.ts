import { UpdateTodoValidationPipe } from '@/todo/application/port/in/pipe/update-todo-validation.pipe';
import { UpdateTodoBodyRequest } from '@/todo/application/port/in/dto/update-todo-body-req.dto';
// import {
//   HandleBoardUseCase,
//   HandleBoardUseCaseSymbol,
// } from '@/board/application/port/in/handle-board.use-case';
import { TodoId } from '@/todo/domain/todo.entity';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/create-todo-req.dto';
import { ResponseEntity } from '@/common/res/response.entity';
// import { TodoCommand } from '@/board/application/port/in/dto/todo.command';
import {
  TodoUseCase,
  TodoUseCaseSymbol,
} from '@/todo/application/port/in/todo.use-case';
import {
  Controller,
  Get,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('todo')
export class TodoController {
  constructor(
    @Inject(TodoUseCaseSymbol)
    private readonly _todoUseCase: TodoUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTodos() {
    return ResponseEntity.OK_WITH(await this._todoUseCase.getTodos());
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    return ResponseEntity.OK_WITH(await this._todoUseCase.getTodo(id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTodo(@Body() dto: CreateTodoRequest) {
    return ResponseEntity.CREATED_WITH(await this._todoUseCase.createTodo(dto));
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: TodoId,
    @Body(UpdateTodoValidationPipe) dto: UpdateTodoBodyRequest,
  ) {
    return ResponseEntity.OK_WITH(await this._todoUseCase.updateTodo(id, dto));
  }

  // // @UseGuards(AuthGuard, RolesGuard)
  // // @Roles(Role.Me)
  // @HttpCode(HttpStatus.OK)
  // @Delete(':id')
  // async deleteBoard(@Param('id', ParseIntPipe) id: BoardId) {
  //   return ResponseEntity.OK_WITH(
  //     await this._handleBoardUseCase.deleteBoard(id),
  //   );
  // }
}
