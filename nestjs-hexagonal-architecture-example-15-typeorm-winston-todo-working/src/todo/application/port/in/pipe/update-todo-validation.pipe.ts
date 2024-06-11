import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateTodoBodyRequest } from '@/todo/application/port/in/dto/update-todo-body-req.dto';

@Injectable()
export class UpdateTodoValidationPipe implements PipeTransform {
  async transform(value: any) {
    const updateTodoBodyDto = plainToInstance(UpdateTodoBodyRequest, value);

    const errors = await validate(updateTodoBodyDto);

    if (
      errors.length > 0 ||
      (!updateTodoBodyDto.title && !updateTodoBodyDto.content)
    ) {
      throw new BadRequestException('요청 값에 문제가 있습니다.');
    }

    return updateTodoBodyDto;
  }
}
