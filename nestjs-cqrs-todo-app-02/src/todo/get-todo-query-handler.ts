import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetToDoQuery } from './get-todo-query';

@QueryHandler(GetToDoQuery)
export class GetToDoQueryHandler implements IQueryHandler<GetToDoQuery> {
  async execute(query: GetToDoQuery): Promise<any> {
    // Fetch data using repository or factory and return it
    // Sample Response
    return [
      {
        id: 1,
        title: 'Test',
        description: 'Reminder to complete daily activity',
      },
      {
        id: 2,
        title: 'Test 2',
        description: 'Reminder to complete daily activity2',
      },
    ];
  }
}
