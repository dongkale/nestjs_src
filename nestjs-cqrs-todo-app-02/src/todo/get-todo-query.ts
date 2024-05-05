import { IQuery } from '@nestjs/cqrs';

export class GetToDoQuery implements IQuery {
  constructor() {}
}
